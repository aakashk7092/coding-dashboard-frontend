import { useState } from "react";
import "./PlatformBar.css";
import { platforms } from "../data/platforms";

export default function PlatformBar({ onSelect }) {
  const [active, setActive] = useState(null);

  return (
    <div className="platform-wrapper">
      <h3 className="platform-title">Platforms</h3>

      <div className="platform-bar">
        {platforms.map((p) => (
          <button
            key={p.id}
            className={`platform-btn ${active === p.id ? "active" : ""}`}
            onClick={() => {
              setActive(p.id);
              onSelect(p);
            }}
          >
            <img src={p.icon} alt={p.name} />
            <span>{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
