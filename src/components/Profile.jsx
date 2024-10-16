import * as React from "react";
import Typography from "@mui/material/Typography";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Box, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";

export default function MediaCard({
    name,
    description,
    profile,
    githubLink,
    linkedInLink,
    portfolioLink,
}) {
    return (
        <Box
            sx={{
                display: "flex",
                margin: "2rem",
                padding: "1rem",
                flexDirection: "column",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                background: "#fff",
                borderRadius: "1.3rem",
                boxShadow: "1px 1px 9px 0px hsl(0, 0.00%, 84.10%)",
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    fontSize: "2.5rem",
                    fontWeight: 900,
                    fontFamily: "poppins",
                }}
            >
                {name}
            </Typography>
            <img src={profile} className="profilepic" />
            <Typography
                variant="inherit"
                color="inherit"
                sx={{
                    fontStyle: "italic",
                    maxWidth: "50ch",
                    display: "flex",
                    flexWrap: "wrap",
                }}
            >
                <FormatQuoteIcon
                    sx={{ fontSize: "3rem", transform: "rotate(180deg)" }}
                />
                {description}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <IconButton
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="large"
                >
                    <GitHubIcon />
                </IconButton>
                <IconButton
                    href={linkedInLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="large"
                >
                    <LinkedInIcon />
                </IconButton>
                <IconButton
                    href={portfolioLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="large"
                >
                    <LanguageIcon />
                </IconButton>
            </Box>
        </Box>
    );
}
