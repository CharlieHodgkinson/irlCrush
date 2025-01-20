import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a
  .schema({
    Crush: a.model({
      message: a.string().required(),
      to: a.string().required(),
      from: a.string().required(),
      crushSessionId: a.id(),
      crushSession: a.belongsTo("CrushSession", "crushSessionId"),
    }),
    CrushSession: a.model({
      name: a.string().required(),
      hostMessage: a.string(),
      joinCode: a.string().required(),
      sessionActive: a.boolean().default(false).required(),
      crushes: a.hasMany("Crush", "crushSessionId"),
    }),
  })
  .authorization((allow) => [allow.publicApiKey()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: { expiresInDays: 30 },
  },
});
