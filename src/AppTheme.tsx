import { ConfigProvider, theme as themeAntd } from "antd";
import { useContext } from "react";
import App from "./App";
import { ThemeContext } from "./context/ThemeContext";

export default function AppTheme() {
  const context = useContext(ThemeContext);
  if (!context) return null;

  const { theme } = context;

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? themeAntd.darkAlgorithm : themeAntd.defaultAlgorithm
      }}
    >
      <div className={theme === "dark" ? "dark" : "light"}>
        <App />
      </div>

    </ConfigProvider>
  );
}