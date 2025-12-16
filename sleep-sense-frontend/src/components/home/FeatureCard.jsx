import { Typography, Box } from "@mui/material";
import AppCard from "../common/AppCard";

function FeatureCard({ icon, title, description, bg }) {
  return (
    <AppCard>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.2,
        }}
      >
        {/* Icon container */}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            backgroundColor: bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1,
          }}
        >
          {/* Icon size reduced */}
          <Box sx={{ fontSize: 20 }}>
            {icon}
          </Box>
        </Box>

        {/* Title */}
        <Typography fontWeight={600} fontSize="1rem">
          {title}
        </Typography>

        {/* Description */}
        <Typography
          color="text.secondary"
          fontSize="0.9rem"
          lineHeight={1.6}
        >
          {description}
        </Typography>
      </Box>
    </AppCard>
  );
}

export default FeatureCard;
