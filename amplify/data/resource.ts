import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { generateClient } from 'aws-amplify/api';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
/*const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.guest()]),
});*/

const schema = a.schema({
  Post: a.model({
    title: a.string().required(),
    comments: a.hasMany("Comment", "postId"),
    owner: a.string().authorization(allow => [allow.owner().to(['read', 'delete'])])
  }).authorization(allow => [allow.guest().to(['read']), allow.owner()]),
  Comment: a.model({
    postId: a.id(),
    content: a.string().required(),
    post: a.belongsTo("Post", "postId"),
    owner: a.string().authorization(allow => [allow.owner().to(['read', 'delete'])])
  }).authorization(allow => [allow.guest().to(['read']), allow.owner()]),
})

export type Schema = ClientSchema<typeof schema>;

//export type LimitedSchema = Pick<Schema["Post"], 'title' | 'owner'>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool',
    apiKeyAuthorizationMode: {expiresInDays: 30}
  },
});