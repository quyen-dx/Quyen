import { ConfigProvider,theme as themeAntd} from "antd";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import App from "./App";

export default function AppTheme() {
  const context = useContext(ThemeContext);
  if (!context) return null;

  const { theme } = context;

  return (
    <ConfigProvider
        theme={{
            algorithm:theme === 'dark' ? themeAntd.darkAlgorithm : themeAntd.defaultAlgorithm
        }}
    >
        <App/>
    </ConfigProvider>
  );
}