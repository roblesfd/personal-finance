import { useEffect, useState } from "react";
import ThemeContext from "./themeContext";

interface ReactNodeProps {
  children: React.ReactElement;
}

const ThemeProvider = (props: ReactNodeProps) => {
  const themeStorage =
    typeof localStorage !== "undefined" && localStorage.getItem("theme")
      ? JSON.parse(localStorage.getItem("theme"))
      : false;
  const [darkTheme, setDarkTheme] = useState(themeStorage);
  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    setRenderComponent(true);
  });
  if (!renderComponent) return <></>;
  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div className={`${darkTheme && "dark"}`}>{props.children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
