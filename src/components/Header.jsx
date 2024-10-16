import {
    IconButton,
    Menu,
    MenuItem,
    AppBar,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
    CssBaseline,
    Button,
    ButtonGroup,
} from "@mui/material";
import { React, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloudIcon from "../assets/GCSJicon.png";
import { NavLink } from "react-router-dom";

const Menubutton = () => {
    const [anchorElm, setAnchorElm] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setAnchorElm(null);
        setOpen(false);
    };
    const handleClick = (e) => {
        setAnchorElm(e.currentTarget);
        setOpen(true);
    };

    return (
        <Toolbar sx={{ marginLeft: "auto" }}>
            <IconButton onClick={handleClick}>
                <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorElm} open={open} onClose={handleClose}>
                <NavLink style={{ textDecoration: "none" }} to="/">
                    <MenuItem sx={{ color: "black" }} onClick={handleClose}>
                        Home
                    </MenuItem>
                </NavLink>
                <NavLink style={{ textDecoration: "none" }} to="/resources">
                    <MenuItem sx={{ color: "black" }} onClick={handleClose}>
                        Resources
                    </MenuItem>
                </NavLink>
                <NavLink style={{ textDecoration: "none" }} to="/leaderboard">
                    <MenuItem sx={{ color: "black" }} onClick={handleClose}>
                        Leaderboard{" "}
                    </MenuItem>
                </NavLink>
            </Menu>
        </Toolbar>
    );
};

const HeaderTabs = () => {
    return (
        <ButtonGroup sx={{ textDecoration: "none" }}>
            <NavLink className="navlink" to="/">
                <Button
                    sx={{
                        border: 0,
                        color: "black",
                        backgroundColor: "inherit",
                        fontWeight: 600,
                        textDecoration: "none",
                    }}
                    color="inherit"
                >
                    Home
                </Button>
            </NavLink>
            <NavLink className="navlink" to="/resources">
                <Button
                    sx={{
                        border: 0,
                        color: "black",
                        backgroundColor: "inherit",
                        fontWeight: 600,
                        textDecoration: "none",
                    }}
                    color="inherit"
                >
                    Resources
                </Button>
            </NavLink>
            <NavLink className="navlink" to="/leaderboard">
                <Button
                    sx={{
                        border: 0,
                        color: "black",
                        backgroundColor: "inherit",
                        fontWeight: 600,
                    }}
                    color="inherit"
                >
                    Leaderboard
                </Button>
            </NavLink>
        </ButtonGroup>
    );
};

const HeaderComp = () => {
    const theme = useTheme();
    const mobileView = useMediaQuery(theme.breakpoints.down(800));
    return (
        <>
            <AppBar sx={{ backgroundColor: "white", height: "60px"}}>
                <Toolbar sx={{ display: "flex" }}>
                    <img
                        src={CloudIcon}
                        alt="appIcon"
                        style={{ width: "2em", marginRight: "0.8rem" }}
                    />
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: "1.3rem",
                            flexGrow: 1,
                            color: "black",
                            fontFamily: "poppins",
                            fontWeight: 600,
                        }}
                    >
                        {mobileView ? "GCSJ" : "Google Cloud Study Jams"}
                    </Typography>
                    {mobileView ? <Menubutton /> : <HeaderTabs />}
                </Toolbar>
            </AppBar>
            <CssBaseline />
        </>
    );
};

export default HeaderComp;
