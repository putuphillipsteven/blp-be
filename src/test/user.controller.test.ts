import request from 'supertest';
import express from "express";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import router from "../router";
import { errorHandler } from "../utils/error-handler";
import {afterAll, beforeAll, describe, it, expect, jest, beforeEach} from "@jest/globals";


dotenv.config({
    path: path.resolve(__dirname, '../.env'), // Ensure the path is correct
});

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

let server: any;

let token: String;

let roleId: number;

// Tests
describe('GET /api/v1/users', () => {
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

        roleId = res.body.data.user.role_id;

        expect(res.status).toBe(200);

        expect(res.body.data.accessToken).toBeDefined();

        expect(res.body.data.refreshToken).toBeDefined();
    })

    it('Should return max 10 users', async () => {
        const res = await request(app).get('/api/v1/users').set('Authorization', `Bearer ${token}`);

        if(roleId !== 3) {
        expect(res.status).toBe(200);
        expect(res.body.data).toBeDefined();
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data.length).toBeLessThanOrEqual(10);
        } else {
        expect(res.status).toBe(401);
        }

    });

    it("Should not returning password", async () => {
        const res = await request(app).get('/api/v1/users').set('Authorization', `Bearer ${token}`);

        if(roleId !== 3) {
        expect(res.status).toBe(200);
        expect(res.body.data).toBeDefined();
        expect(res.body.data[0].password).toBeUndefined();
        }else {
            expect(res.status).toBe(401);
        }
    })

    // Stop server and disconnect Prisma after tests
    afterAll(async () => {
        server.close();
    });
});
