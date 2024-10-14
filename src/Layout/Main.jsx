import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar/Navbar";
import Footer from "../pages/shared/Footer/Footer";

const Main = () => {
  return (
    <div className="max-w-screen-xl	mx-auto">
      <Navbar></Navbar>
      <div className="min-h-screen">
      <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
