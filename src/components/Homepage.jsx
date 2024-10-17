import Content from "./Content";
import { CssBaseline, Box, Typography} from "@mui/material";
import ScrollToContent from "./ScrollBanner";
function Homepage() {

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    justifyItems: "center",
                    textAlign: "center",
                    marginTop: "60px"
                }}
                className="banner"
            >
                <Typography
                    className="bannerText"
                    sx={{
                        fontFamily: "Poppins",
                        fontSize: "4.2em",
                        fontWeight: "bold",
                        lineHeight: "5rem",
                    }}
                >
                    {" "}
                    <span className="gradient-text">Gen AI</span> Study Jams
                </Typography>
                <ScrollToContent />
            </Box>
            <Content />
            <CssBaseline />
        </>
    );
}

export default Homepage;
