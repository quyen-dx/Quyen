import { Avatar, Button } from "antd";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Header = () => {
    const context = useContext(UserContext)
    if (!context) return null

    const { user,setUser } = context
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
        <div className="flex gap-5">
            {user ? (
                <div className="flex gap-2">
                    <Avatar src={user.avatar} />
                    <span>{user.name}</span>
                </div>
            ) : (
                <span>chua dang nhap</span>
            )}

            {user ? (
                <Button danger onClick={handleLogout} style={{ marginLeft: 10 }}>
                    Logout
                </Button>
            ) : (

                <Button type="primary" onClick={handleLogin}>
                    Login
                </Button>
            )}
        </div>
    )
}
export default Header;