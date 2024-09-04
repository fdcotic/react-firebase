import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Home = () => {
  const { setUser } = useUserContext();

  const navigate = useNavigate()

  const hableLogin = () => {
    setUser({
        name: 'Polo',
        email: 'polo@test.com'
    });
    navigate('/dashboard');
  };

  return (
    <>
      <h1>Home</h1>
      <button onClick={hableLogin}>Login</button>
    </>
  );
};

export default Home;
