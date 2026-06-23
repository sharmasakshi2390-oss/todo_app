import { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import background from "../assets/background.jpg.jpg";

function Login() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

const handleLogin = async () => {
    setError("");
  
  try {
    const res = await api.post("/users/login", {
      email,
      password,
    });

    console.log(res.data);

    localStorage.setItem("token", res.data.token);

    navigate("/dashboard");
  } catch (error) {
    console.log(error);
    console.log(error.response?.data);
    setError(
      error.response?.data?.message || 
      "Invalid email or password"
  );
}
};

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard");
  }
}, [navigate]);

  return (
  <div
  className="min-h-screen flex items-center justify-center bg-cover bg-center"
  style={{
    backgroundImage: `url(${background})`,
  }}
>
  <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
  <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
    <div className="relative z-10 w-full max-w-md p-8 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20">

<h1 className="text-3xl font-bold text-white text-center">
  Welcome Back 👋
</h1>

<p className="text-gray-300 text-center mb-6">
  Sign in to continue
</p>
      <h1 className="text-3xl font-bold text-white text-center mb-6">
        Login
      </h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-3 rounded-xl bg-white/20 text-white placeholder-white border border-white/20 outline-none"
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-3 rounded-xl bg-white/20 text-white placeholder-white border border-white/20 outline-none"
      />

      <button
        onClick={handleLogin}
        className="w-full p-3 rounded-xl bg-white text-black font-semibold"
      >
        Login
      </button>

 <p className="text-center mt-4">
  <Link
    to="/forgot-password"
    className="text-blue-400 hover:text-blue-300"
  >
    Forgot Password?
  </Link>
</p>

      {error && (

  <p
    className={`text-center mt-2 font-semibold ${
      error === "Please verify your email first"
        ? "text-green-400"
        : "text-red-500"
    }`}
  >
    {error}
  </p>
)}

      <p className="text-center text-white mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="font-bold">
          Register
        </Link>

      </p>
    </div>
  </div>
);
}
export default Login;