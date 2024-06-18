import { baseSepolia } from "viem/chains";
import {
  createSmartAccountClient,
  BiconomySmartAccountV2,
} from "@biconomy/account";

export const connect = async (
  login: () => void,
  wallets: any[],
  setSmartAccount: (account: BiconomySmartAccountV2 | null) => void,
  setSmartAccountAddress: (address: string | null) => void,
  setIsLoggedIn: (loggedIn: boolean) => void
) => {
  try {
    login();
    setIsLoggedIn(true);

    const embeddedWallet = wallets.find(
      (wallet) => wallet.walletClientType === "privy"
    );

    if (!embeddedWallet) {
      throw new Error("Embedded wallet not found");
    }

    await embeddedWallet.switchChain(baseSepolia.id);
    const provider = await embeddedWallet.getEthersProvider();
    const signer = provider.getSigner();

    const smartWallet = await createSmartAccountClient({
      signer: signer,
      bundlerUrl: `https://bundler.biconomy.io/api/v2/${baseSepolia.id}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
      biconomyPaymasterApiKey: "EegseJJl5.0761a753-58e6-4cc0-b69f-db099d9592d6",
    });

    console.log("Biconomy Smart Account", smartWallet);
    setSmartAccount(smartWallet);
    const saAddress = await smartWallet.getAccountAddress();
    console.log("Smart Account Address", saAddress);
    setSmartAccountAddress(saAddress);
  } catch (error) {
    console.error("Connection error:", error);
  }
};
