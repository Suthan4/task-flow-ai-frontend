import type { RouteObject } from "react-router";
import SigninPage from "../pages/signinPage";
import RegisterPage from "../pages/registerPage";

export const authRoutes: RouteObject[] = [
  {
    path: "/signin",
    element: <SigninPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];
