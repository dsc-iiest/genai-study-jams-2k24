import { Box, CssBaseline, Typography, TextField, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState, useEffect } from "react";
import noRows from "../assets/null.svg";
import useGoogleSheets from "../hooks/useSheets";

const [skillBadges, arcadeGames, status, studname, profileurl] = [
    "# of Skill Badges Completed",
    "# of Arcade Games Completed",
    "All Skill Badges & Games Completed",
    "User Name",
    "Google Cloud Skills Boost Profile URL",
];

const sortingFunc = (a, b) => {
    const arcadeGamesA = parseInt(a[arcadeGames], 10) || 0;
    const arcadeGamesB = parseInt(b[arcadeGames], 10) || 0;
    const skillBadgesA = parseInt(a[skillBadges], 10) || 0;
    const skillBadgesB = parseInt(b[skillBadges], 10) || 0;

    if (arcadeGamesB + skillBadgesB - (arcadeGamesA + skillBadgesA) !== 0) {
        return arcadeGamesB + skillBadgesB - (arcadeGamesA + skillBadgesA);
    } else if (arcadeGamesB - arcadeGamesA !== 0) {
        return arcadeGamesB - arcadeGamesA;
    } else if (skillBadgesB - skillBadgesA !== 0) {
        return skillBadgesB - skillBadgesA;
    } else {
        return a[studname].localeCompare(b[studname]);
    }
};

function assignRanks(arr, sortingFunc) {
    if (!arr || arr.length === 0) return [];
    const sarr = [...arr];
    sarr.sort(sortingFunc);

    let rank = 1;
    let prev = sarr[0];

    if (!prev) return sarr;
    prev.rank = rank; 

    for (let i = 1; i < sarr.length; i++) {
        const curr = sarr[i];

        if (!curr) continue; 
        if (curr[skillBadges] !== prev[skillBadges] || curr[arcadeGames] !== prev[arcadeGames]) {
            rank += 1;
        }

        curr.rank = rank;
        prev = curr;
    }

    return sarr;
}

function toTitleCase(str) {
    const words = str.split(" ");
    const titleCaseWords = words.map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return titleCaseWords.join(" ");
}

function HeaderText({ line1, line2 }) {
    return (
        <Typography style={{ lineHeight: "1.2em", textAlign: "center" }}>
            {line1}
            <br />
            {line2}
        </Typography>
    );
}

function TooltipMessage({ msg }) {
    return <div style={{ fontSize: "0.8rem", fontWeight: "600" }}>{msg}</div>;
}

const columns = [
    {
        field: "rank",
        renderHeader: () => <Typography style={{ lineHeight: "1.2em" }}>Rank</Typography>,
        width: 60,
        headerClassName: "header",
        sortable: false,
        renderCell: (params) => (
            <Tooltip title={<TooltipMessage msg={params.value} />} arrow placement="right">
                <>{params.value}</>
            </Tooltip>
        ),
    },
    {
        field: studname,
        renderHeader: () => <Typography style={{ lineHeight: "1.2em" }}>Name</Typography>,
        headerClassName: "header",
        width: 350,
        sortable: false,
        renderCell: (params) => (
            <Tooltip title={<TooltipMessage msg={params.value} />} arrow placement="right">
                <a
                    href={params.row[profileurl]}
                    aria-label={`${params.row[studname]}'s Profile URL`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {params.value}
                </a>
            </Tooltip>
        ),
    },
    {
        field: skillBadges,
        renderHeader: () => <HeaderText line1={"Skill Badges"} line2={"Earned"} />,
        headerClassName: "header-center",
        type: "number",
        width: 120,
        renderCell: (params) => (
            <Tooltip title={<TooltipMessage msg={`${params.value}`} />} arrow placement="right">
                <>{params.value}</>
            </Tooltip>
        ),
    },
    {
        field: arcadeGames,
        renderHeader: () => <HeaderText line1={"Arcade Games"} line2={"Completed"} />,
        headerClassName: "header-center",
        type: "number",
        width: 140,
        renderCell: (params) => (
            <Tooltip title={<TooltipMessage msg={params.value} />} arrow placement="right">
                <>{params.value}</>
            </Tooltip>
        ),
    },
    {
        field: status,
        renderHeader: () => <HeaderText line1={"All Skill Badges"} line2={"& Games done"} />,
        headerClassName: "header-center",
        width: 150,
        renderCell: renderStatusCell,
    },
];

function renderStatusCell(params) {
    const status = params.value;
    if (status === "Yes") {
        return (
            <Tooltip title={<TooltipMessage msg={params.value} />} arrow placement="right">
                <CheckCircleIcon sx={{ color: "#1ca45c" }} />
            </Tooltip>
        );
    } else if (status === "No") {
        return (
            <Tooltip title={<TooltipMessage msg={params.value} />} arrow placement="right">
                <CancelIcon sx={{ color: "#da483b" }} />
            </Tooltip>
        );
    }
}

var [gold, silver, bronze] = [1, 2, 3];

const GetRowStyle = (params) => {
    if (params.row.rank === gold) {
        return "firstpos";
    } else if (params.row.rank === silver) {
        return "secondpos";
    } else if (params.row.rank === bronze) {
        return "thirdpos";
    }
    return {};
};

function NoRowsOverlay() {
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingTop: "1rem",
            }}
        >
            <div className="fail-image">
                <img src={noRows} alt="search fail" style={{ width: 180 }} />
            </div>
            <span style={{ paddingTop: "1rem", fontSize: "1.2rem" }}>No Results Found</span>
        </Box>
    );
}

function LeaderBoardTablularize() {
    const { data, loading } = useGoogleSheets();
    const [currview, setCurrView] = useState([]);
    const [OrigView, setOrigView] = useState([]);

    useEffect(() => {
        if (data) {
            data.forEach((row, index) => {
                row.id = index + 1;
                row[studname] = toTitleCase(row[studname]);
            });
            const rankedRows = assignRanks(data, sortingFunc);
            setCurrView(rankedRows);
            setOrigView(rankedRows);
        }
    }, [data]);

    const handleSearch = (event) => {
        const value = event.target.value;
        if (!value) {
            setCurrView(OrigView);
            return;
        }

        const filteredData = OrigView.filter((e) => e[studname].toLowerCase().startsWith(value.toLowerCase()));
        setCurrView(filteredData);
    };

    return (
        <Box className="leaderboard" style={{ boxShadow: "1px 1px 9px 0px hsl(0, 0.00%, 84.10%)" }}>
            <TextField
                label="Find yourself !"
                variant="filled"
                fullWidth
                sx={{ border: "2px solid #4486f4", borderRadius: "8px 8px 0 0", borderBottom: "none", color: "green" }}
                onChange={handleSearch}
                spellCheck={false}
            />
            <Box height={600}>
                <DataGrid
                    columns={columns}
                    rows={currview}
                    sx={{
                        "& .MuiDataGrid-cell:": {
                            display: "flex",
                            alignContent: "center",
                        },
                        "& .numbers": {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        },
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    getCellClassName={(params) => {
                        if (typeof params.value === "number" || params.value === "No" || params.value === "Yes") {
                            return "numbers";
                        }
                        return "";
                    }}
                    getRowClassName={GetRowStyle}
                    pageSizeOptions={[10, 50, 100]}
                    disableColumnMenu
                    disableColumnFilter
                    disableColumnSelector
                    disableEval
                    scrollbarSize={1}
                    slots={{
                        noRowsOverlay: () => <NoRowsOverlay />,
                    }}
                    loading={loading}
                    slotProps={{
                        loadingOverlay: {
                            variant: "skeleton",
                            noRowsVariant: "skeleton",
                        },
                    }}
                />
            </Box>
        </Box>
    );
}

export default function BoardData() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                width: "100%",
                flexDirection: "column",
            }}
        >
            <CssBaseline />
            <LeaderBoardTablularize />
        </Box>
    );
}
