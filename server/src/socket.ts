import { Server } from "socket.io";
import http from "http";
import express from "express";
import axios from "axios";
import connectDB from "./database/connector";
import config from "./utils/config";
import {
  getLatestReadings,
  saveReading,
} from "./database/repositories/readings";

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", async (socket) => {
  console.log(`Client connected: ${socket.id}`);

  const latestReadings = await getLatestReadings();
  socket.emit("temperature_reading", latestReadings);

  socket.on("disconnect", () =>
    console.log(`Client disconnected: ${socket.id}`)
  );
});

setInterval(async () => {
  try {
    const temperature = (Math.random() * 15 + 15).toFixed(2);
    const generatedReading = await saveReading(parseFloat(temperature));

    io.emit("temperature_reading", generatedReading);

    await axios.post(`${config.N8N_BASE_URI}/webhook/process-temperature`, {
      id: generatedReading._id,
      temperature: generatedReading.temperature,
    });
  } catch (error) {
    console.error(error);
  }
}, 2000);

app.post("/notify", async (req, res) => {
  try {
    console.log("Received update from API/n8n:", req.body);

    io.emit("processed_reading", req.body);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

server.listen(config.WS_PORT, async () => {
  await connectDB(config.DB_URI);
  console.log(`WebSocket server running on ${config.WS_BASE_URI}`);
});
