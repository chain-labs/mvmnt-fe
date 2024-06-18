"use client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { BiconomySmartAccountV2 } from "@biconomy/account";
import { useEffect, useState } from "react";
import { connect } from "./accUtils";

export default function Home() {
  const [smartAccount, setSmartAccount] =
    useState<BiconomySmartAccountV2 | null>(null);
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
      connect(wallets, setSmartAccount, setSmartAccountAddress);
    }
  }, [login]);

  const signMessage = async () => {
    if (!smartAccount) {
      console.error("Smart Account not initialized");
      return;
    }

    const message = "Hello";
    const signature = await smartAccount.signMessage(message);
    console.log("Signature", signature);
  };

  return (
    <main className="flex flex-col justify-center h-screen items-center gap-20">
      {!authenticated && (
        <button
          className="bg-blue-400 p-3 w-[170px] rounded-xl"
          onClick={onLogIn}
        >
          Log In
        </button>
      )}
      {authenticated && <div>Smart Account Address: {smartAccountAddress}</div>}
      {authenticated && (
        <button
          className="bg-purple-500 p-3 w-[170px] rounded-xl"
          onClick={signMessage}
        >
          Sign Message
        </button>
      )}
      {authenticated && (
        <button
          className="bg-red-500 p-3 w-[170px] rounded-xl"
          onClick={logout}
        >
          Log Out
        </button>
      )}
    </main>
  );
}
