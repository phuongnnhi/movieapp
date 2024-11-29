import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() =>{
        const sessionId = localStorage.getItem("session_id");
        setIsLoggedIn(!!sessionId);},
        []
    );

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}