import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful");

      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
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
          }}
        >
          Create Account
        </h1>

        <label>Name</label>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "8px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "2px solid #d1d5db",
            boxSizing: "border-box",
          }}
        />

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
          }}
        />

        <label>Password</label>

        <div
          style={{
            position: "relative",
            marginTop: "8px",
            marginBottom: "15px",
          }}
        >
          <input
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
            }}
          />

          <button
            type="button"
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
          onClick={handleRegister}
          style={{
            width: "100%",
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            padding: "14px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Register
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/"
            style={{
              color: "#16a34a",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
