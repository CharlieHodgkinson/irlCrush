import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Schema } from "../../amplify/data/resource";
import { client } from "../utils/amplifyClient";
import { formatId } from "../utils/getJoinId";

export const ViewSession = () => {
  const [session, setSession] = useState<Schema["CrushSession"]["type"]>();
  const [crushes, setCrushes] = useState<Schema["Crush"]["type"][]>([]);
  const params = useParams();

  useEffect(() => {
    const fetchSession = async () => {
      if (params.sessionId) {
        const { data } = await client.models.CrushSession.get({
          id: params.sessionId,
        });
        console.log("crush retrieved", data);
        if (data) setSession(data);
      }
    };
    fetchSession();
  }, [params]);

  useEffect(() => {
    if (session) {
      const sub = client.models.Crush.observeQuery({
        filter: { crushSessionId: { eq: session.id } },
      }).subscribe({
        next: ({ items, isSynced }) => {
          setCrushes([...items]);
        },
      });
      return () => sub.unsubscribe();
    }
  }, []);

  if (!session) {
    return <Typography>loading...</Typography>;
  }

  const setSessionActive = async () => {
    const currentState = session.sessionActive;
    const { data } = await client.models.CrushSession.update({
      id: session.id,
      sessionActive: !currentState,
    });
    if (data) setSession(data);
    else console.error("error updating session");
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
      <Card sx={{ width: "100%" }}>
        <CardHeader
          title={session.name}
          slotProps={{
            title: {
              sx: { fontSize: "16px", color: "#712E4F", fontWeight: "bold" },
            },
          }}
          sx={{
            backgroundColor: "#FFBDC8",
            paddingTop: "14px",
            paddingBottom: "14px",
          }}
        />
        <CardContent
          sx={{
            paddingTop: "4px",
            paddingBottom: "0px",
          }}
        >
          <Typography variant="body1" fontSize={14} component="p">
            {session.hostMessage}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "right", paddingTop: "0px" }}>
          <Button
            sx={{
              backgroundColor: "#FFCFCF",
              borderRadius: "25px",
              paddingLeft: "24px",
              paddingRight: "24px",
            }}
            size="small"
            variant="contained"
          >
            EDIT
          </Button>
        </CardActions>
      </Card>
      <Typography variant="h5" component="h1" color={"textPrimary"}>
        Join ID: {session.sessionActive ? formatId(session.joinCode) : "..."}
      </Typography>
      <Stack
        direction={"row"}
        spacing={2}
        // alignItems={"stretch"}
        // sx={{ width: "100%" }}
      >
        <Button
          variant="contained"
          sx={{
            borderRadius: "25px",
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
          onClick={setSessionActive}
        >
          {session.sessionActive ? "END SESSION" : "START SESSION"}
        </Button>
        {session.sessionActive && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ED9AA8",
              borderRadius: "25px",
              paddingLeft: "24px",
              paddingRight: "24px",
            }}
          >
            LIVE MODE
          </Button>
        )}
      </Stack>
      <Divider
        variant="middle"
        sx={{
          borderColor: "#FFBDC8",
          borderWidth: "1px",
          borderRadius: "10px",
        }}
      />
      <Typography
        variant="h5"
        component="h1"
        color={"textPrimary"}
        textAlign={"center"}
      >
        crushes
      </Typography>
      {crushes.length < 1 && (
        <Typography variant="body1" color={"textPrimary"}>
          no crushes yet...
        </Typography>
      )}
      {crushes.map((crush, index) => (
        <Card
          key={`crush-${index}`}
          sx={{
            backgroundColor: "#FFBDC8",
            borderRadius: "10px",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <CardContent>
            <Typography variant="body1" color={"textPrimary"}>
              {crush.from} to {crush.to}
            </Typography>
            <Typography variant="body2" color={"textPrimary"}>
              {crush.message}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};
