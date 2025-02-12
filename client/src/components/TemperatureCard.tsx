import React from "react";
import { Typography, Box, alpha, Chip, Paper, useTheme, useMediaQuery, styled } from "@mui/material";
import { Wifi, WifiOff } from "@mui/icons-material";
import { formatRelativeTime } from "../utils/date-time";
import Loader from "../shared/Loader";
import CurrentTemperatureDisplay from "./CurrentTemperatureDisplay";

interface TemperatureCardProps {
    currentTemp: number | null;
    status: string;
    lastUpdated: string;
    isConnected: boolean;
}

const Title = styled(Typography)({
    fontWeight: 800,
    background: "linear-gradient(45deg, #FF6B6B 10%, #4ECDC4 90%)",
    backgroundSize: "200% 200%",
    backgroundClip: "text",
    textFillColor: "transparent",
    letterSpacing: "-0.5px",
});

const CurrentTemperature = styled(Typography)({
    color: "text.secondary",
    fontWeight: 600,
    mb: 3,
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: "0.75rem",
});

const StyledTemperatureCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    textAlign: "center",
    borderRadius: theme.shape.borderRadius,
    background: `linear-gradient(135deg, 
        ${alpha(theme.palette.background.paper, 0.9)} 0%, 
        ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
    marginBottom: theme.spacing(4),
    position: "relative",
    overflow: "hidden",
}));

const StyledBox = styled(Box)({
    marginTop: "3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 2,
});

const StyledChip = styled(Chip)<{ status: string }>(({ status }) => ({
    borderRadius: 8,
    fontWeight: 600,
    color: "white",
    background: status === "HIGH"
        ? "linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)"
        : "linear-gradient(45deg, #4ECDC4 30%, #2ECC71 90%)",
}));

const TemperatureCard: React.FC<TemperatureCardProps> = ({ currentTemp, status, lastUpdated, isConnected }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
                flexDirection={isMobile ? "column" : "row"}
                gap={2}
            >
                <Title variant="h4">Temperature Monitor</Title>
                <Chip
                    icon={isConnected ? <Wifi /> : <WifiOff />}
                    label={isConnected ? "Connected" : "Disconnected"}
                    color={isConnected ? "success" : "error"}
                    variant="filled"
                    sx={{
                        borderRadius: 3,
                        px: 1
                    }}
                />
            </Box>

            <StyledTemperatureCard elevation={8}>
                <CurrentTemperature variant="subtitle1">Current Temperature</CurrentTemperature>

                {currentTemp !== null ? <CurrentTemperatureDisplay currentTemp={currentTemp} /> : <Loader />}

                <StyledBox>
                    <StyledChip label={status} status={status} />
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            fontWeight: 500,
                        }}
                    >
                        Updated {lastUpdated ? formatRelativeTime(lastUpdated) : "--"}
                    </Typography>
                </StyledBox>
            </StyledTemperatureCard>
        </>
    );
};

export default TemperatureCard;