import {
  faFacebook,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary-500 dark:bg-primary-600 text-white pt-8 pb-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="w-full flex justify-end mt-6 space-x-4 text-3xl h-16">
            <Link to="/">
              <FontAwesomeIcon icon={faGithub} />
            </Link>
            <Link to="/">
              <FontAwesomeIcon icon={faLinkedin} />
            </Link>
            <Link to="/">
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
          </div>
        </div>
        <div className="text-center mb-4 md:mb-0 space-y-4">
          <p className="text-sm">
            © 2024 Sockets chat. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
