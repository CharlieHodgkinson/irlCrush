import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router";

export const Layout = () => {
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
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            // justifyContent: "center",
            // paddingLeft: "10px",
            // paddingRight: "10px",
            padding: "15px",
          }}
        >
          <Outlet />
        </Box>
      </main>
    </>
  );
};
