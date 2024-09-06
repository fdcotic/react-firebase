import { logOut } from "../config/firebase";
import { useUserContext } from "../context/UserContext";

const Dashboard = () => {
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const { user } = useUserContext();
  return (
    <>
      <h1>Dashboard (ruta protegida)</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2>Bienvendido {user.name}</h2>
    </>
  );
};

export default Dashboard;
