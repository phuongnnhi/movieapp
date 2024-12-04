import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [sessionId, setSessionId] = useState(null);
  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
    const storedSessionId = localStorage.getItem('session_id');
    const storedAccountId = localStorage.getItem('account_id');

    if (storedSessionId && storedAccountId) {
      setSessionId(storedSessionId);
      setAccountId(storedAccountId);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, sessionId, accountId}}>
            {children}
        </AuthContext.Provider>
    )
}