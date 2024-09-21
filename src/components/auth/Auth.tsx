'use client'
import { Amplify } from "aws-amplify"
import config from "@/../amplify_outputs.json"
import "@aws-amplify/ui-react/styles.css"
import { Authenticator } from "@aws-amplify/ui-react"
import React from "react"

Amplify.configure(config, {ssr: true})

const Auth = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <Authenticator.Provider>{children}</Authenticator.Provider>
    </div>
  );
};

export default Auth;