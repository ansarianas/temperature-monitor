import React from "react";
import { CircularProgress } from "@mui/material";

const Loader: React.FC = () => {
    return (
        <CircularProgress
            size={80}
            sx={{
                my: 3,
                background: "linear-gradient(45deg, #FF6B6B 10%, #4ECDC4 90%)",
                borderRadius: "50%",
                padding: "4px",
            }}
        />
    );
};

export default Loader;