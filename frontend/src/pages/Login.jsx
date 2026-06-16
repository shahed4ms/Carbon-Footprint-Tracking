import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#16a34a,#22c55e,#4ade80)",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          width: "420px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#16a34a",
            marginBottom: "5px",
          }}
        >
          🌱 EcoTrack AI
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Track your carbon footprint
        </p>

        <label htmlFor="email">Email</label>

        <input
          id="email"
          aria-label="Email Address"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "8px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "2px solid #d1d5db",
            boxSizing: "border-box",
            fontSize: "15px",
          }}
        />

        <label htmlFor="password">Password</label>

        <div
          style={{
            position: "relative",
            marginTop: "8px",
            marginBottom: "20px",
          }}
        >
          <input
            id="password"
            aria-label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              paddingRight: "50px",
              borderRadius: "10px",
              border: "2px solid #d1d5db",
              boxSizing: "border-box",
              fontSize: "15px",
            }}
          />

          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button
          aria-label="Login"
          onClick={handleLogin}
          style={{
            width: "100%",
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            padding: "14px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#16a34a",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
