import { Authenticator } from "@aws-amplify/ui-react";
import React from "react";
import { Routes, Route } from "react-router";
import type {} from "@mui/material/themeCssVarsAugmentation";

import { Landing } from "./Landing";
import { Join } from "./join/Join";
import { AddCrush } from "./join/AddCrush";
import { ViewCrushes } from "./join/ViewCrushes";
import { CrushSessions } from "./host/CrushSessions";
import { NewSession } from "./host/NewSession";
import { ViewSession } from "./host/ViewSession";
import { LiveSession } from "./host/LiveSession";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f06292",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "red",
    },
    text: {
      primary: "#712E4F",
    },
    common: {
      black: "#712E4F",
    },
  },
  typography: {
    fontFamily: '"Roboto Mono", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route index element={<Landing />} />

        <Route path="join" element={<Join />}>
          <Route index element={<AddCrush />} />
          <Route path="crushes" element={<ViewCrushes />} />
        </Route>
        <Route path="host" element={<Authenticator />}>
          <Route index element={<CrushSessions />} />
          <Route path="new" element={<NewSession />} />
          <Route path="session/:sessionId" element={<ViewSession />} />
          <Route path="live/:sessionId" element={<LiveSession />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
