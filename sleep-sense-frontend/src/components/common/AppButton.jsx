import Button from "@mui/material/Button";

function AppButton({ children, variant = "contained", ...props }) {
  return (
    <Button
      variant={variant}
      sx={{
        borderRadius: "999px",
        textTransform: "none",
        px: 4,
        py: 1.5,
        fontWeight: 500,

        // Base colors
        borderColor: variant === "outlined" ? "#4F46E5" : "transparent",
        color: variant === "outlined" ? "#4F46E5" : "#FFFFFF",
        backgroundColor: variant === "contained" ? "#4F46E5" : "transparent",

        // Base shadow
        boxShadow:
          variant === "contained"
            ? "0px 6px 20px rgba(79, 70, 229, 0.25)"
            : "none",

        transition: "all 0.2s ease",

        "&:hover": {
          transform: "translateY(-3px)",

          boxShadow:
            variant === "contained"
              ? "0px 12px 30px rgba(79, 70, 229, 0.35)"
              : "0px 6px 20px rgba(79, 70, 229, 0.2)",

          backgroundColor:
            variant === "contained" ? "#4338CA" : "rgba(79, 70, 229, 0.05)",
        },
        
        "&:disabled": {
            backgroundColor: "#A5B4FC",
            cursor: "not-allowed",
            boxShadow: "none",
        },

      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default AppButton;
