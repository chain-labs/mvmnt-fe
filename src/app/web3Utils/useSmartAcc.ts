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

  const { login } = useLogin({
    onComplete: () => {
      // console.log("user", user);
      // console.log("isNewUser", isNewUser);
    },
  });

  useEffect(() => {
    if (authenticated && ready) {
      if (user?.wallet?.walletClientType !== "privy") {
        createWallet();
      }
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
