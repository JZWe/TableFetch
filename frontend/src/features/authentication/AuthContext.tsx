import { createContext, useContext, useState } from 'react';

const AuthContext = createContext<{
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
}>({
  isAdmin: false,
  login: function () {},
  logout: function () {},
});

function AuthContextProvider({ children }: { children: JSX.Element }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  function login() {
    setIsAdmin(true);
  }

  function logout() {
    setIsAdmin(false);
  }

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext was used outside of AuthContextProvider');
  return context;
}

export { useAuth, AuthContextProvider };
