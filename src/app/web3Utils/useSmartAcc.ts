import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { connect, signMessage } from "./accUtils";

export const useSmartAcc = () => {
  const [smartAccountAddress, setSmartAccountAddress] = useState<string | null>(
    null
  );

  const { login, logout, authenticated } = usePrivy();
  const { wallets } = useWallets();

  const onLogIn = () => {
    login();
  };

  useEffect(() => {
    if (authenticated) {
      connect(wallets, setSmartAccountAddress);
    }
  }, [login]);

  return { smartAccountAddress, onLogIn, logout, signMessage, authenticated };
};
