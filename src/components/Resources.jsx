import { Box, Typography } from "@mui/material";
import ScrollToContent from "./ScrollBanner";

function Resources() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyItems: "center",
          textAlign: "center",
          marginTop: "60px"
        }}
        className="Rbanner"
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "4.2em",
            fontWeight: "bold",
            lineHeight: "5rem",
          }}
        >
          Resources
        </Typography>
        <ScrollToContent />
      </Box>
    </>
  );
}

export default Resources;

{
  /* <Box sx={{
        backdropFilter: "blur(0.2rem)",
        backgroundColor: "#00000090",
        borderRadius: "1.5rem",
        borderTop: "0.5rem solid #da483b",
        borderBottom: "0.5rem solid #ff9e0f",
        borderLeft: "0.5rem solid #1ca45c",
        borderRight: "0.5rem solid #4486f4",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        placeItems: "center",
        p: "1rem",
        width: "max-content",
        marginTop: "1rem",
      }}>

        <Typography variant="body1" sx={{ fontSize: "1.5rem", "fontFamily": "poppins", fontWeight: 600 }}>Enter your email</Typography>
        <Box sx={{ display: "flex", placeItems: "center" }}>
          <AlternateEmailIcon sx={{ position: "relative", top: "0.5rem", left: "1rem" }} />
          <TextField id="outlined-basic" label="Email"
            sx={{
              m: "2rem",
              borderRadius: "1rem",
              width: "40ch"
            }}
            InputProps={{
              style: inputStyle,

            }}
            InputLabelProps={{
              style: labelStyle,
            }}
          />
        </Box>
        <Button variant="contained" sx={{
          borderRadius: "1.5rem"
        }}>Check Report</Button>

      </Box> */
}
