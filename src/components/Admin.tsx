import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./common";

const Admin = () => {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleLogout = () => {
    logout();
  };

  console.log(user);
  return (
    <div>
      {isAuthenticated && <h1>Hello, {user?.name}</h1>}
      {isAuthenticated ? (
        <Button text="Logout" onClick={handleLogout} />
      ) : (
        <Button text="Login with google" onClick={handleLogin} />
      )}
    </div>
  );
};

export default Admin;
