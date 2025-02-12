import React from "react";
import { alpha, Box, styled, Typography } from "@mui/material";
import RecentReadingDisplay from "./RecentReadingDisplay";
import { Reading } from "../../models/readings";

interface RecentReadingsProps {
    recentReadings: Reading[];
}

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    color: theme.palette.text.primary,
    position: "relative",
    "&::after": {
        content: '""',
        position: "absolute",
        bottom: "-8px",
        left: 0,
        width: "40px",
        height: "3px",
        background: "linear-gradient(45deg, #FF6B6B 10%, #4ECDC4 90%)",
        borderRadius: "2px",
    },
}));

const ReadingsWrapper = styled(Box)(({ theme }) => ({
    maxHeight: 300,
    overflowY: "auto",
    paddingRight: theme.spacing(1),
    "&::-webkit-scrollbar": {
        width: "6px",
    },
    "&::-webkit-scrollbar-track": {
        background: alpha(theme.palette.primary.main, 0.1),
        borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
        background: "linear-gradient(45deg, #FF6B6B 10%, #4ECDC4 90%)",
        borderRadius: "3px",
        "&:hover": {
            background: "linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 70%)",
        },
    },
}));

const RecentReadings: React.FC<RecentReadingsProps> = ({ recentReadings }) => {
    return (
        <>
            <Title variant="h6">Recent Readings</Title>

            <ReadingsWrapper>
                {recentReadings.map((reading) => (
                    <RecentReadingDisplay reading={reading} />
                ))}
            </ReadingsWrapper>
        </>
    );
};

export default RecentReadings;