import {
  usePrivy,
  useWallets,
  useLogin,
  useLoginWithEmail,
} from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { connect, signMessage } from "./accUtils";
import { log } from "console";

export const useSmartAcc = () => {
  const [smartAccountAddress, setSmartAccountAddress] = useState<string | null>(
    null
  );

  const { sendCode, loginWithCode } = useLoginWithEmail();
  const { logout, authenticated, linkPhone, createWallet, user } = usePrivy();
  const { ready, wallets } = useWallets();

  const handleDelete = async (userId: string) => {
    try {
      const response = await fetch("/api/userDelete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("An error occurred");
    }
  };

  const { login } = useLogin({
    onComplete: (user) => {
      console.log("user", user);
      if (!user.email) {
        console.log(
          "Your Account is not verified yet. Please verify your email"
        );
        handleDelete(user.id);
        logout();
      }
    },
  });

  useEffect(() => {
    if (authenticated && ready) {
      if (user?.wallet?.walletClientType !== "privy") {
        createWallet();
      }
    }
  }, [useLoginWithEmail]);

  useEffect(() => {
    if (authenticated) {
      connect(wallets, setSmartAccountAddress);
    }
  }, [wallets]);

  // useEffect(() => {
  //   if (authenticated && ready) {

  //   }
  // }, [login]);

  return {
    sendCode,
    loginWithCode,
    smartAccountAddress,
    login,
    logout,
    signMessage,
    authenticated,
    linkPhone,
  };
};
