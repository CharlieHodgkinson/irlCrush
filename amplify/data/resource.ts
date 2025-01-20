import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  crushSession: a
    .model({
      name: a.string().required(),
      sessionId: a.string().required(),
      sessionActive: a.boolean().default(false).required(),
      crushes: a.string().array().default([]).required(),
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
