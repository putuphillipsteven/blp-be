import request from 'supertest';
import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import router from "../router";
import { errorHandler } from "../utils/error-handler";
import {afterAll, beforeAll, describe, it, expect} from "@jest/globals";

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

// Tests
describe('GET /api/v1/users', () => {
    // Start server before tests
    beforeAll(() => {
        server = app.listen(port, () => {
            console.log(`Test server running on port: ${port}`);
        });
    });

    // Stop server and disconnect Prisma after tests
    afterAll(async () => {
        server.close();
        await prisma.$disconnect();
    });

    it('Should return max 10 users', async () => {
        const res = await request(app).get('/api/v1/users');
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBeDefined();
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data.length).toBeLessThanOrEqual(10);
    });

    it("Should not returning password", async () => {
        const res = await request(app).get('/api/v1/users');
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBeDefined();
        expect(res.body.data[0].password).toBeUndefined();
    })


});
