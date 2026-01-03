import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { registerUser } from "../utils/authApi";

const Register = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    const res = await registerUser(email, password);

    if (res.error) {
      setError(res.error);
    } else {
      alert("Registration successful. Please login.");
      navigate("/login");
    }
  };

  return (
    <div className={`min-h-screen flex justify-center items-center ${theme==="dark"?"bg-gray-900 text-white":"bg-gray-100 text-black"}`}>
      <form onSubmit={handleRegister} className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg w-96 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">Register</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required
          className="p-3 rounded border focus:ring-2 focus:ring-orange-500"/>

        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} required
          className="p-3 rounded border focus:ring-2 focus:ring-orange-500"/>

        <input type="password" placeholder="Confirm Password" value={confirm}
          onChange={e => setConfirm(e.target.value)} required
          className="p-3 rounded border focus:ring-2 focus:ring-orange-500"/>

        <button type="submit" className="bg-green-500 text-white py-3 rounded hover:bg-green-600">
          Register
        </button>

        <p className="text-sm text-center">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
