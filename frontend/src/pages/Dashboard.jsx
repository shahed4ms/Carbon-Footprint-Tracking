import { useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [vehicle, setVehicle] = useState("car");
  const [distance, setDistance] = useState("");
  const [electricity, setElectricity] = useState("");
  const [food, setFood] = useState("vegetarian");
  const [result, setResult] = useState(null);


  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const submitActivity = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/activity/add",
        {
          vehicle,
          distance: Number(distance),
          electricity: Number(electricity),
          food,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      setResult(res.data.carbonData);

      setDistance("");
      setElectricity("");
    } catch (error) {
      console.log(error);
      alert("Failed to calculate carbon footprint");
    }
  };

  const ecoScore = result
    ? result.totalCarbon < 10
      ? "🟢 Excellent"
      : result.totalCarbon < 20
        ? "🟡 Good"
        : "🔴 High Impact"
    : "Not Calculated";

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    marginTop: "8px",
    marginBottom: "18px",
    borderRadius: "12px",
    border: "2px solid #d1d5db",
    fontSize: "15px",
    backgroundColor: "#fafafa",
    outline: "none",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#f0fdf4,#dcfce7)",
        padding: "25px",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg,#16a34a,#22c55e)",
          color: "white",
          padding: "30px",
          borderRadius: "24px",
          marginBottom: "25px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "32px",
              }}
            >
            EcoTrack AI
            </h1>

            <p
              style={{
                marginTop: "10px",
              }}
            >
              Monitor and reduce your carbon footprint
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "24px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h3>🌍 Total Carbon</h3>

          <h2>{result ? `${result.totalCarbon} kg` : "0 kg"}</h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "24px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h3>♻ Eco Score</h3>

          <h2>{ecoScore}</h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "24px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h3>📈 Status</h3>

          <h2>{result ? "Tracking Active" : "Awaiting Data"}</h2>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "25px",
        }}
      >
        {/* Activity Form */}
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "24px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            ➕ Add Activity
          </h2>

          <label>Vehicle</label>

          <select
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            style={inputStyle}
          >
            <option value="car">Car</option>

            <option value="bus">Bus</option>

            <option value="bike">Bike</option>
          </select>

          <label>Distance Travelled (km)</label>

          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            style={inputStyle}
          />

          <label>Electricity Used (kWh)</label>

          <input
            type="number"
            value={electricity}
            onChange={(e) => setElectricity(e.target.value)}
            style={inputStyle}
          />

          <label>Food Type</label>

          <select
            value={food}
            onChange={(e) => setFood(e.target.value)}
            style={inputStyle}
          >
            <option value="vegetarian">Vegetarian</option>

            <option value="non-vegetarian">Non Vegetarian</option>
          </select>

          <button
            onClick={submitActivity}
            style={{
              width: "100%",
              background: "linear-gradient(135deg,#16a34a,#22c55e)",
              color: "white",
              border: "none",
              padding: "16px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "16px",
            }}
          >
            Calculate Carbon Footprint
          </button>
        </div>

        {/* Right Panel */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "24px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h2>📊 Carbon Report</h2>

            {result ? (
              <>
                <p>🚗 Travel: {result.travelCarbon} kg CO₂</p>

                <p>⚡ Electricity: {result.electricityCarbon} kg CO₂</p>

                <p>🍽 Food: {result.foodCarbon} kg CO₂</p>

                <hr />

                <h3>🌍 Total: {result.totalCarbon} kg CO₂</h3>
              </>
            ) : (
              <p>Submit an activity to generate a report.</p>
            )}
          </div>

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "24px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h2>🤖 AI Suggestions</h2>

            <ul>
              <li>Use public transport twice a week</li>

              <li>Reduce electricity usage by 10%</li>

              <li>Increase vegetarian meals</li>

              <li>Track your footprint daily</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
