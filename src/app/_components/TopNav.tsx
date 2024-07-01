import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { NavBar } from "./NavBar";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <NavBar />
      <div className="flex flex-row justify-between">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
