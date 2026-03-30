import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "antd";

const Login = () => {
  const context = useContext(UserContext);
  if (!context) return null;

  const { setUser } = context;

  const handleLogin = () => {
    setUser({
      name: "hihi",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjjIjqpK9jYOuyLlgE4qLJYDG7E2fAWDtVKA&s"
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      <Button type="primary" onClick={handleLogin}>
        Login
      </Button>

      <Button danger onClick={handleLogout} style={{ marginLeft: 10 }}>
        Logout
      </Button>
    </div>
  );
};

export default Login;