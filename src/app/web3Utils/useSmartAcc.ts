import {
  usePrivy,
  useWallets,
  useLogin,
  useLoginWithEmail,
} from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { connect, signMessage } from "./accUtils";
import { handleDelete } from "./utilsMethods";

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

  //callbacks for login flow
  const { login } = useLogin({
    onComplete: (user) => {
      console.log(user);
      //check if user has verified email, if not delete user
      if (!user.email) {
        console.log(
          "Your Account is not verified yet. Please verify your email"
        );
        handleDelete(user.id);
        logout();
        return;
      }
      //check if user has registered, if not delete user
      if (!user.wallet) {
        console.log("User not registered. Please register first.");
        handleDelete(user.id);
        logout();
        return;
      }
    },
  });

  //registration flow, created wallet for user when registering
  useEffect(() => {
    const walletCreation = async () => {
      if (authenticated && privyReady && walletsReady) {
        if (user?.email && !user?.wallet) {
          try {
            await createWallet();
            console.log("Wallet Created");
          } catch (error) {
            console.log("Error creating wallet:", error);
            logout();
          }
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
