function ForgotPassword() {
  return (
    <div>
      <h1>Forgot Password</h1>

      <input
        type="email"
        placeholder="Enter your email"
      />

      <button>
        Send Reset Link
      </button>
    </div>
  );
}

export default ForgotPassword;