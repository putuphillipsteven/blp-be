import request from 'supertest';
import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import router from "../router";
import { errorHandler } from "../utils/error-handler";
import {afterAll, beforeAll, describe, it, expect, jest, beforeEach} from "@jest/globals";
import {UserRepository} from "../adapters/repositories/user.repository";
import {GetUserProps, ReturnUserDTO, UserDTO} from "../use-cases/interfaces/user.interface";


dotenv.config({
    path: path.resolve(__dirname, '../.env'), // Ensure the path is correct
});

const prisma = new PrismaClient();

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(
    cors({
        origin: process.env.WHITELISTED_DOMAIN || '*', // Use a default for tests
    })
);

app.use('/api', router);

app.use('/api/uploads', express.static(path.join(__dirname, './public/images')));

app.use(errorHandler);

const port: number = Number(process.env.PORT || "8080");

let server: any; // Placeholder for server instance

let token: String;

jest.mock("../adapters/repositories/user.repository")

const userRepository = new UserRepository();

// Tests
describe('GET /api/v1/users', () => {
    // Start server before tests
    beforeEach(() => {
        jest.clearAllMocks();
    })

    beforeAll(() => {
        server = app.listen(port, () => {
            console.log(`Test server running on port: ${port}`);
        });
    });

    it('Should login first and return accessToken and refreshToken', async  () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: process.env.TEST_EMAIL || 'defaultcustomer@gmail.com',
            password: process.env.TEST_PASSWORD || ''
        })
        token = res.body.data.accessToken;
        expect(res.status).toBe(200);
        expect(res.body.data.accessToken).toBeDefined();
        expect(res.body.data.accessToken).toBeDefined();
    })

    it('Should return max 10 users', async () => {
        const mockUsers: UserDTO[] = [
            {
                id: 1,
                first_name: "John",
                last_name: "Doe",
                full_name: "John Doe",
                phone_number: "081234567891",
                second_phone_number: null,
                role_id: 1,
                is_verified: true,
                avatar_url: null,
                email: "johndoe@example.com"
            },
            {
                id: 2,
                first_name: "Jane",
                last_name: "Smith",
                full_name: "Jane Smith",
                phone_number: "081234567892",
                second_phone_number: "081234567893",
                role_id: 2,
                is_verified: false,
                avatar_url: null,
                email: "janesmith@example.com"
            },
            {
                id: 3,
                first_name: "Alice",
                last_name: "Johnson",
                full_name: "Alice Johnson",
                phone_number: "081234567894",
                second_phone_number: null,
                role_id: 3,
                is_verified: true,
                avatar_url: null,
                email: "alicejohnson@example.com"
            },
            {
                id: 4,
                first_name: "Bob",
                last_name: "Brown",
                full_name: "Bob Brown",
                phone_number: "081234567895",
                second_phone_number: null,
                role_id: 2,
                is_verified: false,
                avatar_url: null,
                email: "bobbrown@example.com"
            },
            {
                id: 5,
                first_name: "Carol",
                last_name: "Davis",
                full_name: "Carol Davis",
                phone_number: "081234567896",
                second_phone_number: "081234567897",
                role_id: 1,
                is_verified: true,
                avatar_url: null,
                email: "caroldavis@example.com"
            },
            {
                id: 6,
                first_name: "David",
                last_name: "Evans",
                full_name: "David Evans",
                phone_number: "081234567898",
                second_phone_number: null,
                role_id: 3,
                is_verified: true,
                avatar_url: null,
                email: "davidevans@example.com"
            },
            {
                id: 7,
                first_name: "Emily",
                last_name: "White",
                full_name: "Emily White",
                phone_number: "081234567899",
                second_phone_number: null,
                role_id: 2,
                is_verified: false,
                avatar_url: null,
                email: "emilywhite@example.com"
            },
            {
                id: 8,
                first_name: "Frank",
                last_name: "Green",
                full_name: "Frank Green",
                phone_number: "081234567900",
                second_phone_number: null,
                role_id: 3,
                is_verified: true,
                avatar_url: null,
                email: "frankgreen@example.com"
            },
            {
                id: 9,
                first_name: "Grace",
                last_name: "Harris",
                full_name: "Grace Harris",
                phone_number: "081234567901",
                second_phone_number: "081234567902",
                role_id: 1,
                is_verified: false,
                avatar_url: null,
                email: "graceharris@example.com"
            },
            {
                id: 10,
                first_name: "Henry",
                last_name: "King",
                full_name: "Henry King",
                phone_number: "081234567903",
                second_phone_number: null,
                role_id: 2,
                is_verified: true,
                avatar_url: null,
                email: "henryking@example.com"
            }
        ]

        const args: GetUserProps = {
            name: "",
            phone_number: "",
            role_id: 0,
            page: Number(1),
            page_size: Number(10),
        };

        (await userRepository.getUsers(args) as jest.Mock).mockResolvedValue(mockUsers);

        const res = await request(app).get('/api/v1/users').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data).toBeDefined();
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data.length).toBeLessThanOrEqual(10);
    });

    it("Should not returning password", async () => {
        const res = await request(app).get('/api/v1/users').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.data).toBeDefined();
        expect(res.body.data[0].password).toBeUndefined();
    })

    // Stop server and disconnect Prisma after tests
    afterAll(async () => {
        server.close();
        await prisma.$disconnect();
    });
});
