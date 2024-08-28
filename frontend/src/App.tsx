import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./views/Home";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import Profile from "./features/profile/Profile";
import NotFound from "./components/404";
import PersistLogin from "./features/auth/PersistLogin";

function App(): React.ReactElement {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<MainLayout />}>
          <Route path="/inicio" element={<Home />} />
          <Route path="/perfil" element={<Profile />} />
        </Route>
      </Route>

      <Route path="/ingresar" element={<Login />} />
      <Route path="/registrarse" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
