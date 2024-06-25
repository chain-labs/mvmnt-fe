"use client";
import { useSmartAcc } from "./web3Utils/useSmartAcc";
import Register from "./web3Utils/Register";

export default function Home() {
  const {
    privyReady,
    walletsReady,
    smartAccountAddress,
    login,
    logout,
    signMessage,
    authenticated,
    linkPhone,
  } = useSmartAcc();

  return (
    <main className="flex flex-col justify-center h-screen items-center gap-20">
      {!authenticated && privyReady && walletsReady ? (
        <>
          <Register />
          <button
            className="bg-blue-400 p-3 w-[170px] rounded-xl"
            onClick={login}
          >
            Log In
          </button>
        </>
      ) : (
        <>
          <div>Smart Account Address: {smartAccountAddress}</div>
          <button
            className="bg-purple-500 p-3 w-[170px] rounded-xl"
            onClick={signMessage}
          >
            Sign Message
          </button>
          <button
            className="bg-orange-500 p-3 w-[170px] rounded-xl"
            onClick={linkPhone}
          >
            Link Phone
          </button>
          <button
            className="bg-red-500 p-3 w-[170px] rounded-xl"
            onClick={logout}
          >
            Log Out
          </button>
        </>
      )}
    </main>
  );
}
