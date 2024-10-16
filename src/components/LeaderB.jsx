import { Box, Typography} from "@mui/material";
import ScrollToContent from "./ScrollBanner";
import BoardData from './LeaderBContent2'

const Report = () => {
    return (
        <>
            <Box className="Lbanner" sx={{ marginTop: "60px" }}>
                <Box>
                    <Typography
                        sx={{
                            textAlign: "center",
                            fontWeight: 600,
                            fontSize: "min(12vw, 4rem)",
                            marginBottom: "40px"
                        }}
                    >
                        LeaderBoard
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: "center",
                            minWidth: "28ch",
                            maxWidth: "70ch",
                            color: "hsla(0, 0%, 100%, 0.65)",
                        }}
                    >
                        Discover the top performers and track your progress with
                        our leaderboard. Join the competition and climb the
                        ranks to showcase your skills!
                    </Typography>
                </Box>
                <ScrollToContent />
            </Box>
            <BoardData />
        </>
    );
};

export default Report;
