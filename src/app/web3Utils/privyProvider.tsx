"use client";
import { PrivyProvider } from "@privy-io/react-auth";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId="clxklxwn200kfdbk39te9ie6a"
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          landingHeader: "Welcome to MVMNT",
          accentColor: "#676FFF",
          logo: "https://cdn-icons-png.flaticon.com/512/3081/3081840.png",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
