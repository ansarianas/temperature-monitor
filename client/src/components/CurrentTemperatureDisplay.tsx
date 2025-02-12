import React from "react";
import { Thermostat } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

interface CurrentTemperatureDisplayProps {
    currentTemp: number;
}

const DisplayWrapper = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    my: 3,
    position: "relative",
});

const StyledThermo = styled(Thermostat)({
    fontSize: "4rem",
    background: "linear-gradient(45deg, #FF6B6B 10%, #4ECDC4 90%)",
    backgroundClip: "text",
    textFillColor: "transparent",
    mr: 2,
});

const CurrentTemperatureDisplay: React.FC<CurrentTemperatureDisplayProps> = ({ currentTemp }) => {
    return (
        <DisplayWrapper>
            <StyledThermo />
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                    variant="h1"
                    sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        fontSize: { xs: "3rem", sm: "4rem" },
                    }}
                >
                    {currentTemp}°C
                </Typography>
            </Box>
        </DisplayWrapper>
    );
};

export default CurrentTemperatureDisplay;