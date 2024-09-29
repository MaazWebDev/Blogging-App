import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import UserLogin from "./components/UserLogin";
import AddBlog from "./components/AddBlog";
import SingleBlog from "./components/SingleBlog";
import AllBlogs from "./components/AlllBlogs";
import ProtectedRoute from "./components/ProtectedRoute";
import SelectedUserBlog from "./components/SelectedUserBlog";
import EditBlog from "./components/EditBlog";
import ProfilePage from "./components/ProfilePage";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <AllBlogs />,
      },

      {
        path: "addblog",
        element: <ProtectedRoute component={<AddBlog />} />,
      },
      {
        path: "singleblog/:id",
        element: <SingleBlog />,
      },
      {
        path: "selecteduserblog/:uid",
        element: <SelectedUserBlog />,
      },
      {
        path: "editblog/:id",
        element: <EditBlog />,
      },
      {
        path: "profilepage",
        element: <ProtectedRoute component={<ProfilePage />} />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "userlogin",
    element: <UserLogin />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
