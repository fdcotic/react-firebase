import { useUserContext } from "../context/UserContext";

const Dashboard = () => {
  const { user } = useUserContext();
  return (
    <>
      <h1>Dashboard</h1>
      <h2>Bienvendido {user.name}</h2>
    </>
  );
};

export default Dashboard;
