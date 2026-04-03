// import { createContext, ReactNode, useState } from "react";

// type Theme = "light" | "dark"
// type ThemeContext = {
//     theme: Theme;
//     actionTheme: () => void
// }
// export const ThemeContext = createContext<ThemeContext | null>(null)

// export const ThemeProvider = ({children}: {children: ReactNode})=>{
//     const [theme,settheme] = useState<"light" | "dark">("light")
//     const actionTheme = (() => settheme(e => (e === "light" ? "dark" : "light")))
//     return(
//         <ThemeContext.Provider value={{theme, actionTheme}}>
//             {children}
//         </ThemeContext.Provider>
//     )
// }