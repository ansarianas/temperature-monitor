import { Router } from "express";
import * as readings from "../handlers/readings";

const { fetchLatestReadings, updateProcessedReading } = readings;
const router = Router();

router.route("/latest-readings").get(fetchLatestReadings);

router.route("/processed-reading").patch(updateProcessedReading);

export default router;