import {
  Alert,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { client } from "../utils/amplifyClient";
import { Schema } from "../../amplify/data/resource";
import { useNavigate } from "react-router";

export const CrushSessions = () => {
  const [crushSessions, setCrushSessions] = React.useState<
    Array<Schema["CrushSession"]["type"]>
  >([]);
  const [dataError, setDataError] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrushSessions = async () => {
      try {
        const { data: items, errors } = await client.models.CrushSession.list();
        if (errors) {
          console.error(errors);
          setDataError(true);
          return;
        } else {
          setDataError(false);
          setCrushSessions(items);
        }
      } catch (e) {
        console.error(e);
        setDataError(true);
      }
    };

    fetchCrushSessions();
  }, [client]);

  return (
    <Stack
      spacing={2}
      direction={"column"}
      alignItems={"center"}
      sx={{ width: "100%", paddingLeft: "10px", paddingRight: "10px" }}
    >
      <Typography
        variant="h5"
        component={"h1"}
        color="textPrimary"
        fontWeight={"bold"}
      >
        crush sessions
      </Typography>

      {dataError && <Alert>error fetching alerts</Alert>}

      <List
        sx={{
          width: "100%",
          overflow: "auto",
          maxHeight: 300,
        }}
      >
        {crushSessions.length >= 1 ? (
          crushSessions.map((session, index) => (
            <ListItemButton
              key={`item-${index}`}
              sx={{
                backgroundColor: "white !important",
                marginTop: 1,
                marginBottom: 1,
                borderRadius: 3,
              }}
            >
              <ListItemText
                primary={session.name}
                slotProps={{
                  primary: { color: "primary" },
                }}
              />
            </ListItemButton>
          ))
        ) : (
          <ListItem>
            <ListItemText
              primary={"no sessions yet"}
              slotProps={{
                primary: { color: "primary" },
              }}
            />
          </ListItem>
        )}
      </List>

      <Button variant="contained" onClick={() => navigate("new")}>
        NEW CRUSH SESSION
      </Button>
    </Stack>
  );
};
