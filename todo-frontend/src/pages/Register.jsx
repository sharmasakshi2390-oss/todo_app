import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";
import background from "../assets/background.jpg.jpg";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await api.post("/users/register", {
        fullname,
        email,
        password,
      });

      console.log(res.data);

      navigate("/login");
    } catch (error) {
    console.log("Register Error:", error.response?.data);
    }
  };

  return (

  <div
    className="min-h-screen flex items-center justify-center bg-cover bg-center"
    style={{
  backgroundImage: `url(${background})`,
}}
  >
    <div className="absolute inset-0 bg-black/40"></div>

```
<div className="relative z-10 w-full max-w-md p-8 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20">
  <h1 className="text-3xl font-bold text-white text-center mb-6">
    Register
  </h1>

  <input
    type="text"
    placeholder="Full Name"
    value={fullname}
    onChange={(e) => setFullname(e.target.value)}
    className="w-full mb-4 p-3 rounded-xl bg-white/20 text-white placeholder-white border border-white/20 outline-none"
  />

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
    onClick={handleRegister}
    className="w-full p-3 rounded-xl bg-white text-black font-semibold"
  >
    Register
  </button>

  <p className="text-center text-white mt-4">
    Already have an account?{" "}
    <Link to="/login" className="font-bold">
      Login
    </Link>
  </p>
</div>
```

  </div>
);
}

export default Register;