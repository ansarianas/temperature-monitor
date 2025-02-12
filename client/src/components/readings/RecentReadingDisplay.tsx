import React from "react";
import { Paper, alpha, Box, Typography, Chip, useTheme, styled } from "@mui/material";
import { Reading } from "../../models/readings";
import { formatRelativeTime } from "../../utils/date-time";

interface RecentReadingDisplayProps {
    reading: Reading;
}

const RecentDisplayWrapper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2.5),
    marginBottom: theme.spacing(2),
    borderRadius: 3,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    background: alpha(theme.palette.background.paper, 0.7),
    backdropFilter: "blur(10px)",
    border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
    "&:hover": {
        transform: "translateY(-3px) scale(1.02)",
        boxShadow: theme.shadows[10],
    },
}));

const StyledChip = styled(Chip)<{ status: "HIGH" | "NORMAL" }>(({ status }) => ({
    borderRadius: 8,
    fontWeight: 600,
    color: "white",
    background: status === "HIGH"
        ? "linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)"
        : "linear-gradient(45deg, #4ECDC4 30%, #2ECC71 90%)",
}));

const StyledTemperature = styled(Typography)({
    fontWeight: 700,
    background: "linear-gradient(45deg, #2c3e50 30%, #3498db 90%)",
    backgroundClip: "text",
    textFillColor: "transparent",
});

const RecentReadingDisplay: React.FC<RecentReadingDisplayProps> = ({ reading }) => {
    const theme = useTheme();

    return (
        <RecentDisplayWrapper key={reading.id} elevation={3}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <StyledTemperature variant="h6">{reading.temperature}°C</StyledTemperature>
                <StyledChip label={reading.status} status={reading.status} color={reading.status === "HIGH" ? "warning" : "success"} size="small"/>
            </Box>
            <Typography
                variant="caption"
                sx={{
                    display: "block",
                    mt: 1,
                    color: alpha(theme.palette.text.secondary, 0.8),
                    fontWeight: 500,
                }}
            >
                {formatRelativeTime(reading.createdAt)}
            </Typography>
        </RecentDisplayWrapper>
    );
};

export default RecentReadingDisplay;