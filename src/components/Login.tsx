import { Avatar, Button } from "antd";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
    const context = useContext(UserContext)
    if (!context) return null

    const { user,setUser } = context
const handleLogin = () => {
        setUser({
            name: "Ahoho",
            avatar: "https://img3.stockfresh.com/files/k/kraska/m/97/808337_stock-photo-user-icon.jpg"
        });
    };

    const handleLogout = () => {
        setUser(null);
    };
    return (
        <div className="flex gap-5">
            {user ? (
                <div className="flex gap-2">
                    <Avatar src={user.avatar}/>
                    <span>{user.name}</span>
                </div>
            ) : (
                <span><span style={{fontWeight: "bold"}}>❗</span> Login, Pls</span>
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
export default Login;