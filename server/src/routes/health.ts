import { Router } from "express";
import * as health from "../handlers/health";

const { healthStatus } = health;
const router = Router();

router.route("/status").get(healthStatus);

export default router;