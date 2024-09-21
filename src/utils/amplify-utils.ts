import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import outputs from '@/../amplify_outputs.json'
import {cookies} from "next/headers"
import { getCurrentUser } from "aws-amplify/auth/server";
import { getCurrentUser as getCurrentUserClient } from 'aws-amplify/auth';
import type { Schema } from '../../amplify/data/resource'
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/data';
import { generateClient } from "aws-amplify/api";

export const cookieBasedClient = generateServerClientUsingCookies<Schema>({
  config: outputs,
  cookies,
  authMode: "userPool"
  //authMode: "apiKey"
  //authMode: "identityPool"
});

export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs
});

export const isAuthenticated = async () => 
  await runWithAmplifyServerContext({
    nextServerContext: {cookies},
    async operation(contextSpec) {
      try {
        const user = await getCurrentUser(contextSpec);
        return !!user;
      } catch(error) {
        return false;
      }
    }
  })

export async function AuthGetCurrentUserServer() {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });
    console.log(currentUser);
    return currentUser;
  } catch (error) {
    console.error(error);
  }
}

//AuthGetCurrentUserServer();