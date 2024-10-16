import { IconButton } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

export default function ScrollToContent() {
  const scroll = () => {
    const scrollPosition = window.innerHeight;
    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  };

  return (
    <IconButton
      onClick={scroll}
      sx={{
        color: "white",
        position: "absolute",
        bottom: 0,
      }}
    >
      <KeyboardDoubleArrowDownIcon
        sx={{
          fontSize: "2rem",
          opacity: 1,
          transition: "0.5s ease",
          "&:hover": {
            transform: "scale(1.5)",
          },
        }}
      />
    </IconButton>
  );
}
