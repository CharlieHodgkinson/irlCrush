import React from "react";
import { useSessionState } from "../utils/useSessionStorage";
import { Button, Stack, Typography } from "@mui/material";
import { redirect } from "react-router";
import { TextFieldElement, useForm } from "react-hook-form-mui";
import { Card } from "@aws-amplify/ui-react";
import { client } from "../utils/amplifyClient";

export const AddCrush = () => {
  const [activeSession, setActiveSession] = useSessionState<{
    isSessionActive?: "true" | "false";
    joinCode?: string;
    id?: string;
  }>("active-session", {});
  const { control, handleSubmit, setError } = useForm({
    defaultValues: {
      to: "",
      from: "",
      message: "",
    },
  });

  if (activeSession.isSessionActive === "false" || !activeSession.id) {
    redirect("/join");
  }

  const onSubmit = async (data) => {
    console.log("activeSession.id", activeSession);
    const res = await client.models.Crush.create({
      to: data.to,
      from: data.from,
      message: data.message,
      crushSessionId: activeSession.id,
    });
    console.log("res", res);
    if (!res.errors) {
      redirect("/crushes");
    }
  };

  return (
    <Stack
      sx={{
        paddingLeft: "10px",
        paddingRight: "10px",
        width: "100%",
      }}
      direction={"column"}
      spacing={2}
      alignItems={"stretch"}
    >
      <Typography variant="h5" component="h1" color={"textPrimary"}>
        submit your crush
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Card>
          <TextFieldElement
            name="to"
            label="who is your crush on"
            control={control}
            required
          />
          <TextFieldElement
            name="message"
            label="what do you want to tell them"
            control={control}
            required
          />
          <TextFieldElement
            name="from"
            label="who is it from"
            control={control}
            required
          />
        </Card>
        <Button variant="contained" type="submit">
          SUBMIT
        </Button>
      </form>
    </Stack>
  );
};
