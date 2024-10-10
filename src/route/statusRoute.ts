import { getStatusController } from "../controller/statusController";
import express from "express";

const router = express.Router();

router.get("/", getStatusController);

export = router;
