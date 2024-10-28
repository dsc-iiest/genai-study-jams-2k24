import { Box, CssBaseline, Typography, TextField, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useState, useEffect } from "react";
import noRows from "../assets/null.svg";

async function readExcelFile() {
    try {
        const filePath = "/assets/data/leaderboard.xlsx";

        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        return jsonData;
    } catch (error) {
        console.error("Error reading Excel file:", error);
        return null;
    }
}

const [skillBadges, arcadeGames, status, studname, profileurl] = [
    "# of Skill Badges Completed",
    "# of Arcade Games Completed",
    "All Skill Badges & Games Completed",
    "User Name",
    "Google Cloud Skills Boost Profile URL",
];

const sortingFunc = (a, b) => {
    if (b[arcadeGames] + b[skillBadges] - a[arcadeGames] - a[skillBadges] !== 0) {
        return b[arcadeGames] + b[skillBadges] - a[arcadeGames] - a[skillBadges];
    } else if (b[arcadeGames] - a[arcadeGames] !== 0) {
        return b[arcadeGames] - a[arcadeGames];
    } else if (b[skillBadges] - a[skillBadges] !== 0) {
        return b[skillBadges] - a[skillBadges];
    } else {
        return b[studname] > a[studname] ? -1 : 1;
    }
};

function toTitleCase(str) {
    const words = str.split(" ");
    const titleCaseWords = words.map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return titleCaseWords.join(" ");
}

function assignRanks(arr, sortingFunc) {
    const sarr = [...arr];
    sarr.sort(sortingFunc);
    let rank = 1;
    let prev = sarr[0];
    prev.rank = 1;
    for (let i = 1; i < sarr.length; i++) {
        let curr = sarr[i];
        if (curr[skillBadges] !== prev[skillBadges] || curr[arcadeGames] !== prev[arcadeGames]) {
            rank = rank + 1;
        }
        sarr[i].rank = rank;
        prev = curr;
    }
    return sarr;
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
    const [currview, setCurrView] = useState([]);
    const [OrigView, setOrigView] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data and set state when the component mounts
        const fetchData = async () => {
            const rows = await readExcelFile();
            if (rows) {
                rows.forEach((row, index) => {
                    row.id = index + 1;
                    row[studname] = toTitleCase(row[studname]);
                });
                const rankedRows = assignRanks(rows, sortingFunc);
                setCurrView(rankedRows);
                setOrigView(rankedRows);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value;
        if (!value) {
            setCurrView(OrigView);

            return;
        }

        var filteredData = [];
        OrigView.forEach((e) => {
            if (e[studname].toLowerCase().startsWith(value.toLowerCase())) {
                filteredData.push(e);
            }
        });

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
