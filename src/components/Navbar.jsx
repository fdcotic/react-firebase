import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../utils/useUserContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUserContext();
  const handleLogoff = () => {
    setUser(false);
  };

  return (
    <nav>
      <NavLink to="/"> Home</NavLink>
      {user && (
        <>
          <NavLink to="/Dashboard"> Dashboard</NavLink>
          <button onClick={handleLogoff}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
