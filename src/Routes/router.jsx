import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import BookDetails from "../components/BookDetails/BookDetails";
import Wishlist from "../components/Wishlist/Wishlist";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/details/:id",
        element: <BookDetails></BookDetails>,
      },
      {
        path:'/wishlist',
        element:<Wishlist></Wishlist>
      }
    ],
  },
]);
