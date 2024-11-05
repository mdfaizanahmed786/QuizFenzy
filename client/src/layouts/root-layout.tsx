import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const RootLayout = () => {
  const navigate = useNavigate();
  return (
    <ClerkProvider 
    routerPush={(to) => navigate(to)}
    routerReplace={(to) => navigate(to, { replace: true })}
    publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <main className="max-w-5xl mx-auto py-3">
        <header>
            <SignedIn>
                <UserButton/>
            </SignedIn>
            <SignedOut>
            <Link to="/sign-in">Sign In</Link>
          </SignedOut>
        </header>
        <Outlet />
      </main>
    </ClerkProvider>
  );
};

export default RootLayout;
