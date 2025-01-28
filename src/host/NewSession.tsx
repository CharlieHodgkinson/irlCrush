import { Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { client } from "../utils/amplifyClient";
import { useNavigate } from "react-router";
import { getJoinId } from "../utils/getJoinId";

export const NewSession = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, setError } = useForm({
    defaultValues: {
      name: "",
      hostMessage: "",
    },
  });

  const onSubmit = async (sessionData: {
    name: string;
    hostMessage?: string;
  }) => {
    try {
      const { errors, data } = await client.models.CrushSession.create({
        name: sessionData.name,
        hostMessage: sessionData.hostMessage,
        joinCode: getJoinId(),
        sessionActive: false,
      });
      if (errors) {
        console.error(errors);
        setError("root", {
          type: "manual",
          message: "error creating session",
        });
        return;
      }

      if (data) navigate(`/host/session/${data.id}`);
    } catch (e) {
      setError("root", {
        type: "manual",
        message: "error creating session",
      });
    }
  };

  return (
    <Stack
      sx={{
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
      direction={"column"}
      spacing={2}
      alignItems={"center"}
    >
      <Typography variant="h5" component="h1" color={"textPrimary"}>
        new crush session
      </Typography>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Paper>
          <TextFieldElement
            name="name"
            label="session name"
            required
            control={control}
          />
          <TextFieldElement
            name="hostMessage"
            label="message from the host"
            control={control}
          />
        </Paper>
        <Button variant="contained" type="submit">
          CREATE
        </Button>
      </form>
    </Stack>
  );
};
