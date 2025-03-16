import React from "react";

const InputYear = ({
  startYear,
  endYear,
  handleStartYearChange,
  handleEndYearChange,
  validateStartYear,
  validateEndYear,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "80%",
        justifyContent: "space-around",
        gap: 24,
        
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "flex-start",
          flex: 1,
        }}
      >
        <label style={{ opacity: 0.9 }}>Start Year:</label>
        <input
          value={startYear}
          onChange={handleStartYearChange}
          onBlur={validateStartYear} // Validate on blur
          type="number"
          min="1950"
          max="2023"
          style={{
            width: "90%",
            backgroundColor: "transparent",
            border: "none",
            borderBottom: "1px solid white",
            color: "white",
            outline: "none",
            padding: "8px 12px",
            WebkitAppearance: "none",
            MozAppearance: "none",
            appearance: "none",
            fontSize: 18,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "flex-start",
          flex: 1,
        }}
      >
        <label style={{ opacity: 0.9 }}>End Year:</label>
        <input
          value={endYear}
          onChange={handleEndYearChange}
          onBlur={validateEndYear} // Validate on blur
          type="number"
          min="1950"
          max="2023"
          style={{
            width: "90%",
            backgroundColor: "transparent",
            border: "none",
            borderBottom: "1px solid white",
            color: "white",
            outline: "none",
            padding: "8px 12px",
            WebkitAppearance: "none",
            MozAppearance: "none",
            appearance: "none",
            fontSize: 18,
          }}
        />
      </div>
    </div>
  );
};

export default InputYear;
