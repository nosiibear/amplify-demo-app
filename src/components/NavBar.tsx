"use client"
import React, {useEffect, useState, useTransition} from 'react';
import Link from "next/link"
import { Button, Divider, Flex } from "@aws-amplify/ui-react"
import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation'
import { Hub } from "aws-amplify/utils"

export default function NavBar({isSignedIn}: {isSignedIn: boolean}) {
  const [authCheck, setAuthCheck] = useState(isSignedIn);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  useEffect(() => {
    const hubListenerCancel = Hub.listen("auth", (data) => {
      switch(data.payload.event) {
        case "signedIn":
          setAuthCheck(true);
          //router.push("/");
          startTransition(() => router.push("/"));
          startTransition(() => router.refresh());
          break;
        case "signedOut":
          setAuthCheck(false);
          //router.push("/");
          startTransition(() => router.push("/"));
          startTransition(() => router.refresh());
          break;
      }
    });
    
    return () => hubListenerCancel();
  }, [router]);

  const signOutSignIn = async () => {
    if(authCheck === true) {
      await signOut();
    } else {
      router.push("/signin");
    }
  };

  const defaultRoutes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/add",
      label: "Add Title",
      loggedIn: true,
    },
  ];

  const routes = defaultRoutes.filter(
    (route) => route.loggedIn == authCheck || route.loggedIn == undefined
  );

  return (
    <>
      <Flex direction="row" justifyContent="space-between" alignItems="center" padding={"1rem"}>
        <Flex as="nav" alignItems="center" gap="3rem" margin="0 2rem">
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>
              {route.label}
            </Link>
          ))}
        </Flex>
        <Button variation="primary" borderRadius="2rem" className="mr-4" onClick={signOutSignIn}>
          {authCheck === true ? "Sign Out" : "Sign In"}
        </Button>
      </Flex>
      <Divider size="small"></Divider>
    </>
  )
}