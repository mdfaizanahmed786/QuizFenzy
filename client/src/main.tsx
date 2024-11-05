import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// layouts
import RootLayout from "./layouts/root-layout.tsx";
import DashboardLayout from "./layouts/dashboard-layout.tsx";

// routes
import IndexPage from "./routes/index.tsx";
import SignUpPage from "./routes/sign-up.tsx";
import SignInPage from "./routes/sign-in.tsx";
import DashboardPage from "./routes/dashboard.tsx";
import PlayGroundPage from "./routes/playground.tsx";
import GameOverPage from "./routes/game-over.tsx";
import ResultsPage from "./routes/results.tsx";
import CreateQuizPage from "./routes/create-quiz.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <IndexPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/playground/:quizId",
        element: <PlayGroundPage />,
      },
      {
        path: "/game-over",
        element: <GameOverPage />,
      },
      {
        path: "/results",
        element: <ResultsPage />,
      },
      {
        element: <DashboardLayout />,
        path: "dashboard",
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/dashboard/quiz/:quizId", element: <CreateQuizPage /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
