import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faClose,
  faLightbulb,
  faMoon,
  faSquarePlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeContext from "../context/themeContext";
// import ThemeContext from "../context/themeContext";
// import ModalContext from "../context/ModalContext";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import usePersist from "../hooks/usePersist";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const [setPersist] = usePersist();
  const navigate = useNavigate(); // Hook para redirigir
  const [sendLogout, { isLoading, isError, error }] = useSendLogoutMutation();

  // const id = 100;
  // const { modal, setModal } = useContext(ModalContext);

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  if (isError) return <p>Error: {error.data?.message}</p>;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      setPersist(false);
      await sendLogout();
      navigate("/ingresar", { replace: true });
    } catch (error) {
      console.error("Fallo al cerrar sesión", error);
    }
  };

  return (
    <nav className="shadow-md bg-white dark:bg-primary-600 text-secondary-700 dark:text-white">
      <div className="px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Boton menu movil */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md  hover:bg-primary-30 dark:hover:bg-primary-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú</span>
              {!isOpen ? (
                <FontAwesomeIcon icon={faBars} />
              ) : (
                <FontAwesomeIcon icon={faClose} />
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center md:justify-between">
            <div className="flex-shrink-0">
              <Link to="/inicio">
                <h1 className="text-xl  font-semibold tracking-widest">
                  Personal finance
                </h1>
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex justify-end space-x-3">
                <button
                  title="Añadir transacción"
                  className=" hover:bg-primary-30 dark:hover:bg-primary-300 px-3 py-2 rounded-full"
                  // onClick={() =>
                  //   setModal({
                  //     isOpen: !modal.isOpen,
                  //     content: <FormCreateServer />,
                  //   })
                  // }
                >
                  <FontAwesomeIcon icon={faSquarePlus} />
                </button>
                <button
                  className=" hover:bg-primary-30 dark:hover:bg-primary-300 px-3 py-2 rounded-full"
                  onClick={() => {
                    setDarkTheme(!darkTheme);
                    localStorage.setItem("theme", darkTheme ? "false" : "true");
                  }}
                >
                  <FontAwesomeIcon icon={faMoon} />
                  {/* <FontAwesomeIcon icon={darkTheme ? faMoon : faLightbulb} /> */}
                </button>
                <button className=" hover:bg-primary-30 dark:hover:bg-primary-300 px-3 py-2 rounded-full">
                  <FontAwesomeIcon icon={faBell} />
                </button>

                <div className="relative">
                  <button
                    onClick={toggleUserDropdown}
                    className=" hover:bg-primary-30 dark:hover:bg-primary-300 px-3 py-2 rounded-full focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </button>
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                      <Link
                        to={`/perfil`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Perfil
                      </Link>
                      <Link
                        to={`#`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Configuración
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Menu mobile */}
      <div
        className={`${isOpen ? "block" : "hidden"} sm:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 ">
          <Link
            to="#"
            title="Añadir transacción"
            className="hover:bg-neutral-100 dark:hover:bg-primary-700 px-3 py-2 rounded-md text-base font-medium flex justify-center items-center gap-4"
          >
            <span>Añadir transacción</span>
            <FontAwesomeIcon icon={faSquarePlus} />
          </Link>
          <Link
            to="#"
            className="hover:bg-neutral-100 dark:hover:bg-primary-700  px-3 py-2 rounded-md text-base font-medium flex justify-center items-center gap-4"
          >
            <span>Notificaciones</span>
            <FontAwesomeIcon icon={faBell} />
          </Link>

          <Link
            to="/perfil"
            className="hover:bg-neutral-100 dark:hover:bg-primary-700  px-3 py-2 rounded-md text-base font-medium flex justify-center items-center gap-4"
          >
            <span>Perfil</span>
          </Link>
          <Link
            to="#"
            className="hover:bg-neutral-100 dark:hover:bg-primary-700  px-3 py-2 rounded-md text-base font-medium flex justify-center items-center gap-4"
            onClick={() => {
              setDarkTheme(!darkTheme);
              localStorage.setItem("theme", darkTheme ? "false" : "true");
            }}
          >
            {darkTheme ? "Modo claro" : "Modo oscuro"}
            <FontAwesomeIcon icon={darkTheme ? faMoon : faLightbulb} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
