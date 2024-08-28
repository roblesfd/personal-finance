import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  // const pathName = location.pathname;
  // const isNotServerConfigPage = !pathName.match(
  //   /servidores\/\d+\/configuracion/
  // );
  // const isNotExploreFriendsPage = !pathName.includes("explorar-amigos");
  // const isNotExploreServersPage = !pathName.includes("explorar-servidores");
  // const isNotHomePage = !pathName.includes("inicio");

  // // Evalua si la url de la pagina actua no corresponde a alguna del array
  // const evaluatePageUrls = [
  //   isNotServerConfigPage,
  //   isNotExploreFriendsPage,
  //   isNotExploreServersPage,
  //   isNotHomePage,
  // ].every((urlEval) => urlEval === true);

  return (
    <div className="text-primary-900 dark:text-primary-40 ">
      <Navbar />
      {/* main */}
      <div className="bg-primary-50 dark:bg-secondary-900 grid grid-cols-12 gap-0 min-h-[800px]">
        <div className="mx-auto col-span-12 overflow-x-scroll px-6 md:px-14 mt-10 mb-16">
          <Outlet />
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
