import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Auth = ({ setUser }) => {
  const [hasAccount, setHasAccount] = useState(true);

  const toggleHasAccount = () => {
    setHasAccount(!hasAccount);
  };

  return (
    <div>
      {hasAccount ? (
        <LoginForm toggleForm={toggleHasAccount} setUser={setUser} />
      ) : (
        <RegisterForm toggleForm={toggleHasAccount} />
      )}
    </div>
  );
};

export default Auth;
