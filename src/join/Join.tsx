import React from "react";
import { useSessionState } from "../utils/useSessionStorage";
import { Outlet } from "react-router";
import { Typography, Stack, Button } from "@mui/material";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";

export const Join = () => {
  const [activeSession, setActiveSession] = useSessionState<{
    isSessionActive?: "true" | "false";
    sessionId?: string;
  }>("active-session", {});

  if (activeSession.isSessionActive === "true") {
    return <Outlet />;
  }

  return (
    <Stack direction={"column"} spacing={2} alignItems={"center"}>
      <Typography variant="h5" component="h1" color={"textPrimary"}>
        start crushing
      </Typography>
      <FormContainer
        defaultValues={{ sessionId: "" }}
        onSuccess={(data) => {
          console.log("check code is correct");
          setActiveSession({
            isSessionActive: "true",
            sessionId: data.sessionId,
          });
        }}
      >
        <TextFieldElement name="sessionId" label="enter join code" required />
        <Button variant="contained" type="submit">
          JOIN
        </Button>
      </FormContainer>
    </Stack>
  );
};
