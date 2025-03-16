import { useState } from "react";
import Barchart from "./components/Barchart";
import InputYear from "./components/InputYear";

function App() {
  const [startYear, setStartYear] = useState(2013);
  const [endYear, setEndYear] = useState(2023);

  const handleStartYearChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setStartYear(""); // Allow empty value for user input
    } else {
      setStartYear(Number(value));
    }
  };

  const handleEndYearChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setEndYear(""); // Allow empty value for user input
    } else {
      setEndYear(Number(value));
    }
  };

  const validateStartYear = () => {
    setStartYear((prev) => Math.max(1950, Math.min(prev, endYear)));
  };

  const validateEndYear = () => {
    setEndYear((prev) => Math.min(2023, Math.max(prev, startYear)));
  };
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        minHeight: "100vh",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "80vw",
        margin: "0 auto",
        gap: 12,
      }}
    >
      <InputYear
        endYear={endYear}
        handleEndYearChange={handleEndYearChange}
        handleStartYearChange={handleStartYearChange}
        startYear={startYear}
        validateStartYear={validateStartYear}
        validateEndYear={validateEndYear}
      />
      <Barchart startYear={startYear} endYear={endYear} />
    </main>
  );
}

export default App;
