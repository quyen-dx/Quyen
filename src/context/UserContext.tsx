// import { createContext, ReactNode, useState } from "react";

// type User = {
//     name: string
//     avatar: string
// }
// type userContextType = {
//     user: User | null;
//     setUser: (user: User | null) => void
// }
// export const UserContext = createContext<userContextType | null>(null)

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//     const [user, setUser] = useState<User | null>(null);

//     return(
//         <UserContext.Provider value={{ user, setUser }}>
//             {children}
//         </UserContext.Provider>
//     )
// }