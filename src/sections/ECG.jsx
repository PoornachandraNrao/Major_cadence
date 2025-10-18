import React, { useEffect, useState } from "react";
import "./ECG.css";

export default function ECG() {
  const [path, setPath] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.waveform) {
          setPath(data.waveform); // waveform string like "M0,100 L10,95 L20,110..."
        }
      } catch (e) {
        console.error("ECG WebSocket parse error", e);
      }
    };
    return () => ws.close();
  }, []);

  return (
    <svg className="ecg-svg" viewBox="0 0 800 200" preserveAspectRatio="none">
      <path d={path} fill="none" stroke="lime" strokeWidth="2" />
    </svg>
  );
}
