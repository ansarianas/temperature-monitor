import { useEffect, useState } from "react";
import {
    Container,
    Card,
    Box,
    alpha,
    styled,
} from "@mui/material";
import io from "socket.io-client";
import { Reading } from "../models/readings";
import TemperatureCard from "./TemperatureCard";
import RecentReadings from "./readings/RecentReadings";

const socket = io("http://localhost:4000");

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: 6,
    overflow: "hidden",
    background: alpha(theme.palette.background.paper, 0.85),
    backdropFilter: "blur(20px)",
    border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
}));

const BackgroundWrapper = styled(Box)({
    minHeight: "90vh",
    background: "#23a6d5",
    padding: "4rem 2rem",
    borderRadius: "1rem",
});

export default function TemperatureMonitor() {
    const [currentTemp, setCurrentTemp] = useState<number | null>(null);
    const [status, setStatus] = useState<string>("LOADING");
    const [lastUpdated, setLastUpdated] = useState<string>("");
    const [recentReadings, setRecentReadings] = useState<Reading[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        socket.on("connect", () => setIsConnected(true));
        socket.on("disconnect", () => setIsConnected(false));

        socket.on("temperature_reading", (data: { temperature: number; createdAt: string }) => {
            setCurrentTemp(data.temperature);
            setLastUpdated(data.createdAt);
        });

        socket.on("processed_reading", (data: Reading) => {
            setStatus(data.status);
            setRecentReadings((prev) => [data, ...prev.slice(0, 4)]);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("temperature_reading");
            socket.off("processed_reading");
        };
    }, [currentTemp]);

    return (
        <BackgroundWrapper>
            <Container maxWidth="sm">
                <StyledCard elevation={24}>
                    <Box sx={{ p: { xs: 2, sm: 4 } }}>
                        <TemperatureCard
                            currentTemp={currentTemp}
                            isConnected={isConnected}
                            lastUpdated={lastUpdated}
                            status={status}
                        />;
                        <RecentReadings recentReadings={recentReadings} />;
                    </Box>
                </StyledCard>
            </Container>
        </BackgroundWrapper>
    );
}