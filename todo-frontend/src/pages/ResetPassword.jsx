import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function ResetPassword() {
const [newPassword, setNewPassword] = useState("");

const { token } = useParams();
const navigate = useNavigate();

const handleReset = async () => {
try {
console.log("Token:", token);    
await api.post(
`/users/reset-password/${token}`,
{
newPassword,
}
);
  alert("Password reset successful");
  navigate("/login");
} catch (error) {
  alert(error.response?.data?.message);
}

};

return ( <div> <h1>Reset Password</h1>

  <input
    type="password"
    placeholder="Enter new password"
    value={newPassword}
    onChange={(e) =>
      setNewPassword(e.target.value)
    }
  />

  <button onClick={handleReset}>
    Reset Password
  </button>
</div>

);
}

export default ResetPassword;
