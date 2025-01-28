import React from "react";
import { useSessionState } from "../utils/useSessionStorage";
import { Outlet } from "react-router";
import { Typography, Stack, Button } from "@mui/material";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { client } from "../utils/amplifyClient";

export const Join = () => {
  const [activeSession, setActiveSession] = useSessionState<{
    isSessionActive?: "true" | "false";
    joinCode?: string;
    id?: string;
  }>("active-session", {});
  const { control, handleSubmit, setError } = useForm({
    defaultValues: {
      joinCode: "",
    },
  });

  if (activeSession.isSessionActive === "true") {
    return <Outlet />;
  }

  const validateJoinCode = async (
    joinCode: string
  ): Promise<{ error?: string; id?: string }> => {
    try {
      const { data: items, errors } = await client.models.CrushSession.list({
        filter: {
          joinCode: { eq: joinCode },
        },
      });
      console.log("items", items);
      console.log("errors", errors);
      if (errors) {
        console.error(errors);
        return { error: "sorry there was an error" };
      }
      if (items.length === 0) {
        return { error: "join code not found" };
      }
      if (items[0].sessionActive !== true) {
        return { error: "this session has ended" };
      }
      return { id: items[0].id };
    } catch (e) {
      console.error(e);
      return { error: "sorry there was an error" };
    }
  };

  return (
    <Stack direction={"column"} spacing={2} alignItems={"center"}>
      <Typography variant="h5" component="h1" color={"textPrimary"}>
        start crushing
      </Typography>
      <form
        onSubmit={handleSubmit(async (data) => {
          const { id, error } = await validateJoinCode(data.joinCode);
          console.log("id of joined session", id);
          if (error) {
            setError("joinCode", {
              type: "manual",
              message: error,
            });
          } else {
            setActiveSession({
              isSessionActive: "true",
              joinCode: data.joinCode,
              id: id,
            });
          }
        })}
        noValidate
      >
        <TextFieldElement
          name="joinCode"
          label="enter join code"
          control={control}
          required
        />
        <Button variant="contained" type="submit">
          JOIN
        </Button>
      </form>
    </Stack>
  );
};
