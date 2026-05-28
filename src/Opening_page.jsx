import { useNavigate } from "react-router-dom";

export default function OpeningPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>

      {/* Background Overlay */}
      <div style={styles.overlay}></div>

      {/* Content */}
      <div style={styles.content}>
        <h1 style={styles.title}>
          Welcome to <span style={{ color: "#4ade80" }}>DWJD</span>
        </h1>

        <p style={styles.subtitle}>
          Don't Waste. Just Donate.
        </p>

        <div style={styles.buttonContainer}>
          <button
            style={styles.loginBtn}
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            style={styles.signupBtn}
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </div>
      </div>

    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100%",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1600&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.8))",
  },

  content: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    color: "white",
    padding: "20px",
  },

  title: {
    fontSize: "4rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "1.3rem",
    marginBottom: "40px",
    color: "#d1d5db",
  },

  buttonContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  loginBtn: {
    padding: "14px 35px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    background: "transparent",
    borderColor: "#4ade80",
    border: "2px solid #4ade80",
    color: "#4ade80",
    transition: "0.3s",
  },

  signupBtn: {
    padding: "14px 35px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    background: "#4ade80",
    color: "black",
    fontWeight: "bold",
    transition: "0.3s",
  },
};