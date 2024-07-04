import { useState } from "react";
import { login } from "../services/auth.service.js";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ toggleForm, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      if (res?.accessToken) {
        localStorage.setItem("user", res.name);
        localStorage.setItem("accessToken", res.accessToken);
        setUser(res.name);
        navigate("/");
        return;
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col gap-3 w-96 mx-auto mt-10 p-5 border-2 border-gray-200 rounded-lg shadow-md justify-center "
        onSubmit={handleLogin}
      >
        <h1 className="text-center font-bold">Welcome Back!</h1>
        <p className="text-center">
          Dont have an account?{" "}
          <span
            onClick={toggleForm}
            className="underline font-bold cursor-pointer"
          >
            Register
          </span>
        </p>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-gray-200 "
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-gray-200 "
          aria-label="Password"
          required
        />
        <button
          type="submit"
          className="px-10 py-2 border-2 bg-blue-500 rounded-l cursor-pointer"
          disabled={!email || !password}
        >
          Login
        </button>
        {error && <p className="text-center text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
