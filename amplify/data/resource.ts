import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  crushSession: a
    .model({
      name: a.string(),
      sessionId: a.string(),
      sessionActive: a.boolean(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
