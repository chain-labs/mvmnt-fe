import { baseSepolia } from "viem/chains";
import {
  createSmartAccountClient,
  BiconomySmartAccountV2,
} from "@biconomy/account";

let smartAccount: BiconomySmartAccountV2 | null = null;

export const connect = async (
  wallets: any[],
  setSmartAccountAddress: (address: string | null) => void
) => {
  try {
    const embeddedWallet = wallets.find(
      (wallet) => wallet.walletClientType === "privy"
    );

    await embeddedWallet.switchChain(baseSepolia.id);
    const provider = await embeddedWallet.getEthersProvider();
    const signer = provider.getSigner();

    const smartWallet = await createSmartAccountClient({
      signer: signer,
      bundlerUrl: `https://bundler.biconomy.io/api/v2/${baseSepolia.id}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
      biconomyPaymasterApiKey: "EegseJJl5.0761a753-58e6-4cc0-b69f-db099d9592d6",
    });

    smartAccount = smartWallet;
    const saAddress = await smartWallet.getAccountAddress();
    setSmartAccountAddress(saAddress);
  } catch (error) {
    console.error("Connection error:", error);
  }
};

export const signMessage = async () => {
  if (!smartAccount) {
    console.error("Smart Account not initialized");
    return;
  }

  const message = "Hello";
  const signature = await smartAccount.signMessage(message);
  console.log("Signature", signature);
};
