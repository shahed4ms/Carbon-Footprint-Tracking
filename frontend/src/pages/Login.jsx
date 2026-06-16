import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      window.location.href = "/dashboard";
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
           EcoTrack AI
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

        <label>Email</label>

        <input
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

        <label>Password</label>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              flex: 1,
              padding: "14px",
              marginTop: "8px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "2px solid #d1d5db",
              boxSizing: "border-box",
              fontSize: "15px",
            }}
          />

          <button
            onClick={() => setShowPassword(!showPassword)}
            style={{
              marginTop: "8px",
              height: "50px",
              width: "50px",
              border: "2px solid #d1d5db",
              borderRadius: "10px",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button
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
