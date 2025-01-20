import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";

export const Landing = () => {
  return (
    <>
      <style>
        {`
            html,
            body {
              height: 100%;
              width: 100%;
            }
            html {
              background-color: #FFEFEF;
            }
            `}
      </style>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              IRL_Crush
            </Typography>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <main style={{ display: "contents" }}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" component="h1" color={"textPrimary"}>
            Welcome to IRL_Crush!
          </Typography>
        </Box>
      </main>
    </>
  );
};
