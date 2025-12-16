import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function AppCard({ children }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4, // rounded corners
        padding: 2.5,
        height: "100%",
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)", // shadow on all sides
        transition: "transform 0.2s ease, box-shadow 0.2s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default AppCard;
