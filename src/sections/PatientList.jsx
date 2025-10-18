import React from "react";
import "./PatientList.css";

const PatientList = ({ patient }) => {
  return (
    <aside className="patient-list-container">
      <h2>Patient List</h2>
      <div className="patient-list">
        <div className="patient-item active">
          <div>
            <h3>{patient.name}</h3>
            <p className="meta">ID: {patient.id}</p>
          </div>
          <div
            className="status-dot"
            style={{
              background: patient.status === "Active" ? "var(--success)" : "#f59e0b",
            }}
          ></div>
        </div>
      </div>
    </aside>
  );
};

export default PatientList;
