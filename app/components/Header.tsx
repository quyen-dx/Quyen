import Link from "next/link";

export default function Header() {
  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          <strong>WEB2091 App</strong>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="hover:text-gray-200">Trang chủ</Link>
          <Link href="/list" className="hover:text-gray-200">Danh sách</Link>
          <Link href="/add" className="hover:text-gray-200">Thêm mới</Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="#" className="hover:text-gray-200">Đăng nhập</Link>
          <Link href="#" className="hover:text-gray-200">Đăng ký</Link>
        </div>
      </div>
    </nav>
  );
}