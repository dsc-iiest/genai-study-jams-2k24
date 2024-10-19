import { Box, Divider, Toolbar, Typography } from "@mui/material";
import codeIIEST_light from "../assets/codeIIEST_light.png";
import gdg from "../../public/assets/gdglogo.png";
import MediaCard from "./Profile";
import FacilitatorInfo from "../../public/assets/data/facilitatorsInfo.json";

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
                    <span style = {{fontSize: "1.2rem", fontWeight: "bold"}}>Immerse yourself in the world of Generative AI and unlock its boundless potential!</span><br />

                    Join us for an exhilarating journey into the realm of GenAI through our interactive Study Jams. These collaborative learning sessions are designed to ignite your passion for AI and equip you with the skills to harness its power.


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
                    Whether you're a seasoned developer or just starting your AI journey, our Study Jams offer something for everyone. Discover the latest advancements in GenAI, explore its practical applications across various industries, and gain valuable skills that will enhance your career prospects. Don't miss this chance to be at the forefront of the AI revolution! Register now and embark on a transformative learning experience.
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
                    <img src={codeIIEST_light} style={{ maxWidth: "10rem" }} alt="codeiiest"/>
                    <img src={gdg} style={{ maxWidth: "15rem" }} alt="gdg"/>
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
                    We are excited to introduce our team of talented and experienced facilitators who will be guiding you throughout your exciting journey ahead.
                </Toolbar>

                <div className="facilitators">
                    {/* <MediaCard
                        name={"Rishab Dugar"}
                        description={
                            "I'm a dedicated Full-stack Web Developer proficient in MERN stack technologies. I have experience in developing projects like a technical fest website and an open-source CLI tool for API development."
                        }
                        profile={Profile1}
                        githubLink={"https://github.com/DugarRishab"}
                        linkedInLink={"https://www.linkedin.com/in/dugar-rishab/"}
                        portfolioLink={"https://dugarrishab.github.io/RishabDugar/"}
                    />
                    <MediaCard
                        name={"Rishab Dugar"}
                        description={
                            "I'm a dedicated Full-stack Web Developer proficient in MERN stack technologies. I have experience in developing projects like a technical fest website and an open-source CLI tool for API development."
                        }
                        profile={Profile1}
                        githubLink={"https://github.com/DugarRishab"}
                        linkedInLink={"https://www.linkedin.com/in/dugar-rishab/"}
                        portfolioLink={"https://dugarrishab.github.io/RishabDugar/"}
                    />
                    <MediaCard
                        name={"Rishab Dugar"}
                        description={
                            "I'm a dedicated Full-stack Web Developer proficient in MERN stack technologies. I have experience in developing projects like a technical fest website and an open-source CLI tool for API development."
                        }
                        profile={Profile1}
                        githubLink={"https://github.com/DugarRishab"}
                        linkedInLink={"https://www.linkedin.com/in/dugar-rishab/"}
                        portfolioLink={"https://dugarrishab.github.io/RishabDugar/"}
                    /> */}
                    {FacilitatorInfo.map((person, i) => {
                        return (
                            <MediaCard
                                key = {i}
                                name={person.name}
                                description={
                                    person.desc
                                }
                                profile={`/assets/${person.profilepic}`}
                                githubLink={person.github}
                                linkedInLink={person.linkedin}
                                portfolioLink={person.portfolio}
                            />
                        );
                    })}
                </div>
            </Box>
        </Box>
    );
}
