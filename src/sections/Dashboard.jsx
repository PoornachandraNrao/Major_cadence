import React, { useState, useEffect } from "react";
import ECG from "../sections/ECG";
import "./Dashboard.css";

const Dashboard = () => {
  const [heartRate, setHeartRate] = useState(72);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.heartRate) {
          setHeartRate(data.heartRate);
        }
      } catch (e) {
        console.error("WebSocket parse error", e);
      }
    };
    return () => ws.close();
  }, []);

  // Classification
  let condition = "Normal";
  if (heartRate < 60) condition = "Bradycardia";
  else if (heartRate > 100) condition = "Tachycardia";

  return (
    <section className="dashboard container">
      <div className="card ecg-card">
        <h2>ECG Waveform</h2>
        <ECG />
        <div className="output-status">
          <h3>Condition: <span>{condition}</span></h3>
          <p>Heart Rate: {heartRate} BPM</p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
