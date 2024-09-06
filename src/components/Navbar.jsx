import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../utils/useUserContext";
import { logOut } from "../config/firebase";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUserContext();
  const handleLogoff = () => {
    logOut();
  };

  return (
    <nav>
      <NavLink to="/"> Home</NavLink>
      {user && (
        <>
          <NavLink to="/Dashboard"> Dashboard</NavLink>
        </>
      )}
    </nav>
  );
};

export default Navbar;
