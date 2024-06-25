import { NextResponse } from "next/server";
import { PrivyClient } from "@privy-io/server-auth";

const privy = new PrivyClient(
  "clxklxwn200kfdbk39te9ie6a",
  "4fSfNzRWQ7TM51yYCVetwPZF8WDt4TKyshvcJSDEKYW4b22bsLRQdgaBLDB4z1gDpHDG5JEWCKBjrUuiZAwdUXwZ"
);
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { id }: { id: string } = await req.json();
    await privy.deleteUser(id);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
