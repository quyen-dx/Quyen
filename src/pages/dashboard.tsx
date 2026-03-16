import { Toaster } from "react-hot-toast";
import { Link, Route, Routes , Navigate } from "react-router-dom";
import { Signin } from "./signin";
import { Signup } from "./signup";
import { Userlist } from "./userlist";
import { Add } from "./add";
const Dashboard = () => {
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
                        <Link to="/userlist" className="hover:text-gray-200">
                            Danh sách
                        </Link>
                        <Link to="/add" className="hover:text-gray-200">
                            Thêm mới
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/signin" className="hover:text-gray-200">
                            Đăng nhập
                        </Link>
                        <Link to="/signup" className="hover:text-gray-200">
                            Đăng ký
                        </Link>
                    </div>
                </div>
            </nav>

            {/* MAIN CONTENT */}
            
            <Routes>
                <Route path="/" element={<Navigate to="/userlist"/>}></Route>
                <Route path="/signup" element={<Signup></Signup>}></Route>
                <Route path="/signin" element={<Signin></Signin>}></Route>
                <Route path="/userlist" element={<Userlist></Userlist>}></Route>
                <Route path="/add" element={<Add></Add>}></Route>
            </Routes>
            <Toaster />
        </>
    )
}
export default Dashboard