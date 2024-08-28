import { Outlet, Link, Navigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import PulseLoader from "react-spinners/PulseLoader";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();
  const location = useLocation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (error) {
          console.error(error);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }
    return () => {
      effectRan.current = true;
    };

    //eslint-disable-next-line
  }, []);

  let content;

  if (!persist) {
    console.log("no persist");
    content = <Navigate to="/ingresar" state={{ from: location }} replace />;
  } else if (isLoading) {
    console.log("loading");
    content = <PulseLoader color={"#FFF"} />;
  } else if (isError) {
    console.log("error");
    content = <Navigate to="/ingresar" state={{ from: location }} replace />;
  } else if (isSuccess && trueSuccess) {
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
