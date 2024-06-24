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
  const {
    ready: privyReady,
    logout,
    authenticated,
    linkPhone,
    createWallet,
    user,
  } = usePrivy();
  const { ready: walletsReady, wallets } = useWallets();

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
    // if (authenticated && privyReady && walletsReady) {
    //   if (wallets.length === 0) {
    //     if (!user?.wallet && user?.email) {
    //       setTimeout(async () => {
    //         try {
    //           await createWallet();
    //           console.log("Wallet Created");
    //         } catch (error) {
    //           console.log("Error creating wallet:", error);
    //           logout();
    //         }
    //       });
    //     }
    //   }
    // }
    const walletCreation = async () => {
      if (authenticated && privyReady && walletsReady) {
        if (wallets.length === 0 && user?.email && !user?.wallet) {
          try {
            await createWallet();
            console.log("Wallet Created");
          } catch (error) {
            console.log("Error creating wallet:", error);
            logout();
          }
        } else {
          console.log("Wallet already created");
        }
      }
    };
    walletCreation();
  }, [loginWithCode]);

  useEffect(() => {
    if (authenticated && privyReady) {
      connect(wallets, setSmartAccountAddress);
    }
  }, [wallets]);

  return {
    privyReady,
    walletsReady,
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
