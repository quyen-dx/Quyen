import { Avatar } from "antd";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Header = () => {
    const context = useContext(UserContext)
    if (!context) return null

    const { user } = context

    return (
        <div>
            {user ? (
                <>
                    <Avatar src={user.avatar} />
                    <span>{user.name}</span>
                </>
            ) : (
                <span>chua dang nhap</span>
            )}
        </div>
    )
}
export default Header;