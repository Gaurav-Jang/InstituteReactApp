import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Progress = () => {
  return (
    <div style={{ width: "250px", height: "250px" }}>
      <div style={{ position: "relative" }}>
        {/* Outer Progress Bar */}
        <CircularProgressbar
          value={70}
          strokeWidth={4}
          styles={buildStyles({
            pathColor: "#64748b",
            trailColor: "#020617",
          })}
        />

        {/* Middle Progress Bar */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "180px",
            height: "180px",
          }}
        >
          <CircularProgressbar
            value={80}
            strokeWidth={6}
            styles={buildStyles({
              pathColor: "#fbbf24",
              trailColor: "#020617",
            })}
          />

          {/* Inner Progress Bar */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "110px",
              height: "110px",
            }}
          >
            <CircularProgressbar
              value={60}
              strokeWidth={8}
              styles={buildStyles({
                pathColor: "#3b82f6",
                trailColor: "#020617",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
