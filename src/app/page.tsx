"use client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { BiconomySmartAccountV2 } from "@biconomy/account";
import { useState } from "react";
import { connect } from "./accUtils";

export default function Home() {
  const [smartAccount, setSmartAccount] =
    useState<BiconomySmartAccountV2 | null>(null);
  const [smartAccountAddress, setSmartAccountAddress] = useState<string | null>(
    null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { login, logout } = usePrivy();
  const { wallets } = useWallets();

  const onLogIn = () => {
    connect(
      login,
      wallets,
      setSmartAccount,
      setSmartAccountAddress,
      setIsLoggedIn
    );
  };

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
      <button
        className="bg-purple-500 p-2 px-3 w-[100px] rounded-xl"
        onClick={onLogIn}
      >
        Log In
      </button>
      <button
        className="bg-blue-500 p-2 px-3 w-[100px] rounded-xl"
        onClick={signMessage}
      >
        Sign Message
      </button>
      <button
        className="bg-red-500 p-2 px-3 w-[100px] rounded-xl"
        onClick={logout}
      >
        Log Out
      </button>
    </main>
  );
}
