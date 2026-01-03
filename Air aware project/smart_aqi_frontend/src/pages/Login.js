import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { loginUser } from "../utils/authApi";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await loginUser(email, password);

    if (res.error) {
      setError(res.error);
    } else {
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    }
  };

  return (
    <div className={`min-h-screen flex justify-center items-center ${theme==="dark"?"bg-gray-900 text-white":"bg-gray-100 text-black"}`}>
      <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg w-96 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required
          className="p-3 rounded border focus:ring-2 focus:ring-orange-500"/>

        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} required
          className="p-3 rounded border focus:ring-2 focus:ring-orange-500"/>

        <button type="submit" className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600">
          Login
        </button>

        <p className="text-sm text-center">
          Don’t have an account? <Link to="/register" className="text-green-500">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
