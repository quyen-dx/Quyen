import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Dashboard from "./pages/dashboard";
function App() {
  const context = useContext(ThemeContext)
  if (!context) return null
  const { theme, actionTheme } = context

  return (
    <div>
      <div className={theme === "dark" ? "bg-black text-white" : "bg-white text-black"}>
        <Dashboard />
        <button className={theme === "dark" ? "bg-pink-600 py-[20px] px-[50px]" : "bg-green-600 py-[20px] px-[50px]"} onClick={actionTheme}>
          {theme === "light" ? "chuyển sang tối🌚" : " chuyển sang sáng☀️"} 
        </button>
      </div>
    </div>
  );
}
export default App;
