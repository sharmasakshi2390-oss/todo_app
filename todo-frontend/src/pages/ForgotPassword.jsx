import { useState } from "react";
import api from "../services/api";

function ForgotPassword() {
const [email, setEmail] = useState("");

const handleSubmit = async () => {
try {
await api.post("/users/forgot-password", {
email,
});

  alert("Reset link sent to your email");
} catch (error) {
  alert(error.response?.data?.message);
}

};

return ( <div> <h1>Forgot Password</h1>

  <input
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  <button onClick={handleSubmit}>
    Send Reset Link
  </button>
</div>

)};

export default ForgotPassword;