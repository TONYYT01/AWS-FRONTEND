import React, { useEffect, useState } from "react";

function Databases() {
  const [databases, setDatabases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/databases")
      .then((res) => res.json())
      .then((data) => {
        setDatabases(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch databases");
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "600px",
          backgroundColor: "#1e293b",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0px 0px 20px rgba(0,0,0,0.5)",
        }}
      >
        <h1
          style={{
            color: "#38bdf8",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          MySQL Databases
        </h1>

        {loading ? (
          <h2 style={{ color: "white", textAlign: "center" }}>
            Loading...
          </h2>
        ) : error ? (
          <h2 style={{ color: "red", textAlign: "center" }}>{error}</h2>
        ) : (
          <div>
            {databases.map((db, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#334155",
                  color: "white",
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "15px",
                  fontSize: "18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{db.Database}</span>

                <span
                  style={{
                    backgroundColor: "#22c55e",
                    padding: "5px 10px",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                >
                  Active
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Databases;