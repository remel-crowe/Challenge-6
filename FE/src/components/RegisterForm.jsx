import { useState } from "react";
import { register } from "../services/auth.service.js";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ toggleForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const passwordIsValid = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!passwordIsValid(password)) {
      setError(
        "Password must contain at least 8 characters, an uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }
    try {
      await register(name, email, password);
      setError("");
      setSuccess("Successful! Redirecting to login page...");
      setTimeout(() => {
        toggleForm();
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-3 w-96 mx-auto mt-10 p-5 border-2 border-gray-200 rounded-lg shadow-md justify-center">
        <h1 className="text-center font-bold">Register</h1>
        <p className="text-center">
          Already have an account?{" "}
          <span
            onClick={toggleForm}
            className="underline font-bold cursor-pointer"
          >
            Login
          </span>
        </p>
        <label htmlFor="Name">Name</label>
        <input
          id="Name"
          type="text"
          className="border-2 border-gray-200"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="Email">Email</label>
        <input
          id="Email"
          type="email"
          className="border-2 border-gray-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="Password">Password</label>
        <input
          id="Password"
          type="password"
          className="border-2 border-gray-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="Confirm Password">Confirm Password</label>
        <input
          id="Confirm Password"
          type="password"
          className="border-2 border-gray-200"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!name || !email || !password || !confirmPassword}
          className="px-10 py-2 border-2 bg-blue-500 rounded-lg cursor-pointer"
        >
          Register
        </button>
        {success && (
          <p className="text-green-500 text-center mt-3">{success}</p>
        )}
        {error && (
          <p className="text-red-500 text-center  mt-2 mt-md-3">{error}</p>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
