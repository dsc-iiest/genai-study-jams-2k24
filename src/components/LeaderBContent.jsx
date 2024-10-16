import { Box, CssBaseline, Typography, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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

const rows = readExcelFile();
console.log(rows);

const [courses, skills, genai, studname] = [
	"# of Courses Completed",
	"# of Skill Badges Completed",
	"# of GenAI Game Completed",
	"Student Name",
];
const sortingFunc = (a, b) => {
	if (b[courses] + b[skills] + b[genai] - a[courses] - a[skills] - a[genai] !== 0) {
		return b[courses] + b[skills] + b[genai] - a[courses] - a[skills] - a[genai];
	} else if (b[courses] - a[courses] !== 0) {
		return b[courses] - a[courses];
	} else if (b[skills] - a[skills] !== 0) {
		return b[skills] - a[skills];
	} else if (b[genai] - a[genai] !== 0) {
		return b[genai] - a[genai];
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

rows.forEach((row, index) => {
	row.id = index + 1;
	row[studname] = toTitleCase(row[studname]);
});

var [gold, silver, bronze] = [1, 2, 3];
function assignRanks(arr, sortingFunc) {
	const sarr = [...arr];
	sarr.sort(sortingFunc);
	let rank = 1;
	let prev = sarr[0];
	prev.rank = 1;
	for (let i = 1; i < sarr.length; i++) {
		let curr = sarr[i];
		if (curr[courses] !== prev[courses] || curr[skills] !== prev[skills] || curr[genai] !== prev[genai]) {
			rank = rank + 1;
		}
		sarr[i].rank = rank;
		prev = curr;
	}
	return sarr;
}

const rows_ranked = assignRanks(rows, sortingFunc);
function HeaderText({ line1, line2 }) {
	return (
		<Typography style={{ lineHeight: "1.2em", textAlign: "center" }}>
			{line1}
			<br />
			{line2}
		</Typography>
	);
}

const columns = [
	{
		field: "rank",
		headerName: <Typography style={{ lineHeight: "1.2em" }}>Rank</Typography>,
		width: 60,
		headerClassName: "header",
		sortable: false,
	},
	{
		field: "Student Name",
		headerName: <Typography style={{ lineHeight: "1.2em" }}>Name</Typography>,
		headerClassName: "header",
		width: 350,
		sortable: false,
	},
	{
		field: "# of Courses Completed",
		headerName: <HeaderText line1={"Courses"} line2={"Done"} />,
		headerClassName: "header",
		type: "number",
		width: 120,
	},
	{
		field: "# of Skill Badges Completed",
		headerName: <HeaderText line1={"Skill badges"} line2={"earned"} />,
		headerClassName: "header",
		type: "number",
		width: 120,
	},
	{
		field: "# of GenAI Game Completed",
		headerName: <HeaderText line1={"GenAI games"} line2={"completed"} />,
		headerClassName: "header",
		type: "number",
		width: 120,
	},
	{
		field: "Total Completions of both Pathways",
		headerName: <HeaderText line1={"Total completion of"} line2={"Both pathways"} />,
		headerClassName: "header",
		width: 190,
		renderCell: renderStatusCell,
	},
];

function renderStatusCell(params) {
	const status = params.value;
	if (status === "Yes") {
		return <CheckCircleIcon sx={{ color: "#1ca45c" }} />;
	} else if (status === "No") {
		return <CancelIcon sx={{ color: "#da483b" }} />;
	}
}

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

function sliceIndex(name) {
	let [flag, i] = [0, 0];
	for (; i < rows_ranked.length; i++) {
		if (rows_ranked[i][studname].toLowerCase().startsWith(name.toLowerCase())) {
			flag = 1;
			break;
		}
	}

	if (flag === 1) {
		return i;
	}
	return 0;
}

function LeaderBoardTablularize() {
	const [currview, setcurrview] = React.useState(rows_ranked);
	const rows = readExcelFile();

	function searchName(name) {
		if (name.target.value !== "") {
			setcurrview(rows_ranked.slice(sliceIndex(name.target.value)));
		} else setcurrview(rows_ranked);
	}

	return (
		<Box className="leaderboard" style={{ boxShadow: "1px 1px 9px 0px hsl(0, 0.00%, 84.10%)" }}>
			<TextField
				label="Find yourself !"
				variant="filled"
				fullWidth
				sx={{ border: "2px solid #4486f4", borderRadius: "8px 8px 0 0", borderBottom: "none",color: "green"}}
				onChange={searchName}
				spellCheck={false}
			/>

			<DataGrid
				rows={currview}
				columns={columns}
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
				autoHeight
				pageSizeOptions={[10, 50, 100]}
				disableColumnMenu
				disableColumnFilter
				disableColumnSelector
				disableEval
				disableRowSelectionOnClick
				scrollbarSize={1}
			/>
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
