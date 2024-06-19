import { usePrivy, useWallets, useLogin } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { connect, signMessage } from "./accUtils";

export const useSmartAcc = () => {
  const [smartAccountAddress, setSmartAccountAddress] = useState<string | null>(
    null
  );

  const { logout, authenticated, linkPhone, linkEmail } = usePrivy();
  const { wallets } = useWallets();

  const { login } = useLogin({
    onComplete: (user) => {
      if (!user.phone) {
        linkPhone();
      }
      if (!user.email) {
        linkEmail();
      }
    },
  });

  useEffect(() => {
    if (authenticated) {
      connect(wallets, setSmartAccountAddress);
    }
  }, [wallets]);

  return { smartAccountAddress, login, logout, signMessage, authenticated };
};
