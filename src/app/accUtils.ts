import { baseSepolia } from "viem/chains";
import {
  createSmartAccountClient,
  BiconomySmartAccountV2,
} from "@biconomy/account";

export const connect = async (
  wallets: any[],
  setSmartAccount: (account: BiconomySmartAccountV2 | null) => void,
  setSmartAccountAddress: (address: string | null) => void
) => {
  try {
    const embeddedWallet = wallets.find(
      (wallet) => wallet.walletClientType === "privy"
    );

    await embeddedWallet.switchChain(baseSepolia.id);
    const provider = await embeddedWallet.getEthersProvider();
    const signer = await provider.getSigner();

    const smartWallet = await createSmartAccountClient({
      signer: signer,
      bundlerUrl: `https://bundler.biconomy.io/api/v2/${baseSepolia.id}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
      biconomyPaymasterApiKey: "EegseJJl5.0761a753-58e6-4cc0-b69f-db099d9592d6",
    });

    setSmartAccount(smartWallet);
    const saAddress = await smartWallet.getAccountAddress();
    setSmartAccountAddress(saAddress);
  } catch (error) {
    console.error("Connection error:", error);
  }
};
