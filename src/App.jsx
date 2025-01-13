import { Box, Container, Grid } from "@mui/material";
import TopBar from "./components/TopBar";
import VersionGuide from "./components/VersionGuide";
import EnvironmentCard from "./components/EnvironmentCard";
import Footer from "./components/Footer";

const environments = ["dev", "qa", "uat", "prod"];

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <TopBar />
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          py: 4,
          flex: 1,
        }}
      >
        <VersionGuide />
        <Grid container spacing={3}>
          {environments.map((env) => (
            <Grid item xs={12} sm={6} md={3} key={env}>
              <EnvironmentCard environment={env} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
