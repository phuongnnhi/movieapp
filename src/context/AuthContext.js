import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [sessionId, setSessionId] = useState(localStorage.getItem('session_id'));
    const [accountId, setAccountId] = useState(localStorage.getItem('account_id'));
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('session_id') && localStorage.getItem('account_id') ? true : false;
      });

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
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, sessionId, accountId, setSessionId, setAccountId}}>
            {children}
        </AuthContext.Provider>
    )
}