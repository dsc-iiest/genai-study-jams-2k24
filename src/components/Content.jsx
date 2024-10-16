import { Box, Divider, Toolbar, Typography } from "@mui/material";
import codeIIEST_light from "../assets/codeIIEST_light.png";
import gdsc from "../assets/gdscLogo.png";
import MediaCard from "./Profile";

import Profile1 from "../assets/rishabDugar.jpeg";

export default function Content() {
    return (
        <Box sx={{ paddingTop: "2rem", background: "hsl(0, 0%, 95%)" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        textAlign: "center",
                        padding: "1.5rem",
                        paddingTop: 0,
                        fontWeight: 600,
                    }}
                >
                    About the Program
                    <Divider />
                </Typography>

                <Typography
                    variant="body"
                    sx={{
                        textAlign: "center",
                        maxWidth: "75ch",
                        minwidth: "50ch",
                        padding: "1rem",
                    }}
                >
                    <span style={{ fontSize: "1.2rem", fontWeight: "800" }}>
                        Google Cloud Study Jams
                    </span>{" "}
                    is an intensive learning program designed to introduce
                    participants to cloud computing concepts and technologies
                    over a 30-day period.
                    <br />
                    Throughout this program, participants engage in various
                    activities, labs, and challenges that cover the fundamentals
                    of cloud computing and its applications.
                </Typography>
                <Typography
                    variant="body"
                    sx={{
                        textAlign: "center",
                        maxWidth: "75ch",
                        minwidth: "50ch",
                        padding: "1rem",
                    }}
                >
                    It is an excellent opportunity for students, professionals,
                    and anyone interested in cloud technology to gain
                    foundational knowledge and hands-on experience. It provides
                    a structured learning path that can serve as a stepping
                    stone for further exploration and specialization in cloud
                    computing.
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                <Box className="logohome" sx={{ background: "transparent" }}>
                    <img src={codeIIEST_light} style={{ maxWidth: "10rem" }} />
                    <img src={gdsc} style={{ maxWidth: "20rem" }} />
                </Box>

                <Typography
                    variant="h3"
                    sx={{
                        textAlign: "center",
                        justifyContent: "center",
                        padding: "1.5rem",
                        paddingTop: "3rem",
                        fontWeight: 600,
                    }}
                >
                    Our Facilitators
                    <Divider />
                </Typography>

                <Toolbar
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        textAlign: "center",
                        maxWidth: "75ch",
                    }}
                >
                    Along the way, you will learn and practice concepts like
                    computing, application development, big data and machine
                    learning using cloud and if you get stuck, you will have
                    your "Facilitators" who are specially trained on Google
                    Cloud to help.
                </Toolbar>

                <MediaCard
                    name={"Rishab Dugar"}
                    description={
                        "I'm a dedicated Full-stack Web Developer proficient in MERN stack technologies. My focus is on delivering user-centric solutions, and I have experience in developing projects like a technical fest website and an open-source CLI tool for API development. I prioritize data security and performance optimization. As an adaptable learner, I'm committed to embracing emerging technologies and best practices."
                    }
                    profile={Profile1}
                    githubLink={"https://github.com/DugarRishab"}
                    linkedInLink={"https://www.linkedin.com/in/dugar-rishab/"}
                    portfolioLink={"https://dugarrishab.github.io/RishabDugar/"}
                />
            </Box>
        </Box>
    );
}
