"use client";
import { useSmartAcc } from "./web3Utils/useSmartAcc";

export default function Home() {
  const { smartAccountAddress, onLogIn, logout, signMessage, authenticated } =
    useSmartAcc();

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
