import { Typography, Button, CardContent, Card, Stack } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router";

export const Landing = () => {
  return (
    <Stack direction={"column"} spacing={2} alignItems={"center"}>
      <Typography variant="h5" component="h1" color={"textPrimary"}>
        Welcome to IRL_Crush!
      </Typography>
      <Card>
        <CardContent>
          <Typography>
            you can join a crush session or host your own!
          </Typography>
        </CardContent>
      </Card>
      <Stack spacing={2} direction="row">
        <Button variant="contained" component={RouterLink} to="join">
          JOIN
        </Button>
        <Button variant="contained" component={RouterLink} to="host">
          HOST
        </Button>
      </Stack>
    </Stack>
  );
};
