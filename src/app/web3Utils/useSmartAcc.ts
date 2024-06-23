import {
  usePrivy,
  useWallets,
  useLogin,
  useLoginWithEmail,
} from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { connect, signMessage } from "./accUtils";

export const useSmartAcc = () => {
  const [smartAccountAddress, setSmartAccountAddress] = useState<string | null>(
    null
  );

  const { sendCode, loginWithCode } = useLoginWithEmail();
  const { logout, authenticated, linkPhone, createWallet, user } = usePrivy();
  const { ready, wallets } = useWallets();

  // Delete user if verification condition is not met
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

  //callbacks for login flow
  const { login } = useLogin({
    onComplete: (user) => {
      console.log("user", user);
      //check if user has verified email, if not delete user
      if (!user.email) {
        console.log(
          "Your Account is not verified yet. Please verify your email"
        );
        handleDelete(user.id);
        logout();
      }
      //check if user has registered, if not delete user
      if (!user.wallet) {
        console.log("User not registered. Please register first.");
        handleDelete(user.id);
        logout();
      }
    },
  });

  // console.log("user", user?.createdAt);
  // const createdAt = new Date(user?.createdAt ?? "");
  // const d = new Date();
  // console.log(createdAt < d);

  //registration flow, created wallet for user when registering
  useEffect(() => {
    if (authenticated && ready) {
      if (wallets.length === 0) {
        console.log("wallets", wallets);
        if (!user?.wallet) {
          setTimeout(async () => {
            try {
              await createWallet();
              console.log("Wallet Created");
            } catch (error) {
              console.log("Error creating wallet:", error);
              logout();
            }
          });
        }
      }
      // else if (new Date() > new Date(user?.createdAt ?? "")) {
      //   console.log("User is already registered");
      //   logout();
      // }
    }
  }, [loginWithCode]);

  useEffect(() => {
    if (authenticated) {
      connect(wallets, setSmartAccountAddress);
    }
  }, [wallets]);

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
