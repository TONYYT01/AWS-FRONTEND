import React, { useEffect, useState } from "react";

function Message() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://18.118.169.82/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          backgroundColor: "#1e293b",
          padding: "40px",
          borderRadius: "20px",
          width: "500px",
          textAlign: "center",
          boxShadow: "0px 0px 20px rgba(0,0,0,0.5)",
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            marginBottom: "20px",
            fontSize: "40px",
          }}
        >
          React API Project
        </h1>

        <h2
          style={{
            color: "#38bdf8",
            marginBottom: "20px",
          }}
        >
          API Response
        </h2>

        {loading ? (
          <p style={{ color: "#ffffff" }}>Loading...</p>
        ) : (
          <div
            style={{
              backgroundColor: "#0f172a",
              padding: "20px",
              borderRadius: "10px",
              color: "#22c55e",
              fontSize: "20px",
            }}
          >
            {data.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;