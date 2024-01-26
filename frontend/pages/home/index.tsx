import * as React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import HomePageButton from "../../components/homePageButton";



const Home: NextPage = () => {

  const handleClick = async () => {
    console.log("clicked");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 15, mb: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
            <HomePageButton title="Knowledge Base" src="/assets/books.png" to="#" />
            <HomePageButton title="Tickets" src="/assets/agent.png" to="/ticket"/>
            <HomePageButton title="FAQ Insights" src="/assets/lightbulb.png" to="#"/>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
