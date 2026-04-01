import { Toaster } from "react-hot-toast";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import StoriesList from "./list";
import Signin from "./signin";
import { Button } from "antd";
import SignUp from "./signup";
const Dashboard = () => {
    const { user, setUser } = useAuthStore()
    return (
        <>
            <nav className="bg-blue-600 text-white shadow">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="#" className="text-xl font-semibold">
                        <strong>WEB2091 App</strong>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="#" className="hover:text-gray-200">
                            Trang chủ
                        </Link>
                        <Link to="/stories" className="hover:text-gray-200">
                            Danh sách
                        </Link>
                        <Link to="/add" className="hover:text-gray-200">
                            Thêm mới
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        {user ? (
                            <>
                                <img src={user.avatar} className="w-10 h-10 rounded-full"></img>
                                <span className="text-white">{user.name}</span>
                                <Button onClick={() => setUser(null)}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Link to="/signin" className="hover:text-gray-200">
                                    Đăng nhập
                                </Link>
                                <Link to="/signUp" className="hover:text-gray-200">
                                    Đăng ký
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* MAIN CONTENT */}

            <Routes>
                <Route path="/" element={<Navigate to="/stories" />}></Route>
                <Route path="/stories" element={<StoriesList></StoriesList>}></Route>
                <Route path="/signin" element={<Signin></Signin>}></Route>
                <Route path="/signup" element={<SignUp></SignUp>}></Route>
                {/* <Route path="/signup" element={<Signup></Signup>}></Route>
                <Route path="/signin" element={<Signin></Signin>}></Route> */}
            </Routes>
            <Toaster />
        </>
    )
}
export default Dashboard