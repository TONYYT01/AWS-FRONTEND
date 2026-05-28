import { useEffect, useState, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Home from "./Navbar/Home";

const quotes = [
  "Don't waste food. Someone is praying for it.",
  "Hunger exists not because of scarcity, but because of neglect.",
  "Food should fill stomachs, not landfills.",
  "What is extra for you can be everything for someone else.",
  "A shared meal is dignity restored.",
  "Care begins with sharing.",
];

const images = [
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
  "https://images.unsplash.com/photo-1593113598332-cd288d649433",
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
  "https://images.unsplash.com/photo-1543352634-8730b0d7b5c5",
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399",
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
];

export default function Afterlogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  const role = user.user_type;
  const email = user.email;
  const firstLetter = email.charAt(0).toUpperCase();
  const isAdmin = role === "admin";
  const isHome = location.pathname === "/afterlogin";

  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handler
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handler
      );
  }, []);

  return (
    <>
      <style>{`
        body {
          margin: 0;
          background: #07080f;
          font-family: Arial, sans-serif;
        }

        .al-root {
          min-height: 100vh;
          background: #07080f;
          color: white;
        }

        .al-nav {
          position: fixed;
          top: 15px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 30px);
          max-width: 1100px;
          z-index: 100;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 12px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .al-logo {
          font-size: 1.4rem;
          font-weight: bold;
          cursor: pointer;
        }

        .al-logo span {
          color: #4ade80;
        }

        .al-nav-links {
          display: flex;
          gap: 10px;
        }

        .al-nav-btn {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.7);
          padding: 10px 15px;
          border-radius: 10px;
          cursor: pointer;
          transition: 0.3s;
        }

        .al-nav-btn:hover {
          background: rgba(255,255,255,0.08);
          color: white;
        }

        .al-nav-right {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
        }

        .al-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(74,222,128,0.15);
          border: 1px solid rgba(74,222,128,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4ade80;
          font-weight: bold;
          cursor: pointer;
        }

        .al-avatar.rider {
          background: rgba(99,102,241,0.15);
          border-color: rgba(99,102,241,0.4);
          color: #818cf8;
        }

        .al-menu-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: white;
          cursor: pointer;
        }

        .al-dropdown {
          position: absolute;
          top: 55px;
          right: 0;
          width: 220px;
          background: #0d0e1a;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 8px;
        }

        .al-menu-item {
          padding: 12px;
          border-radius: 10px;
          cursor: pointer;
          transition: 0.3s;
          color: rgba(255,255,255,0.7);
        }

        .al-menu-item:hover {
          background: rgba(255,255,255,0.07);
          color: white;
        }

        .al-admin-root {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .al-admin-card {
          width: 100%;
          max-width: 600px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 35px;
        }

        .al-admin-title {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .al-admin-title span {
          color: #4ade80;
        }

        .al-admin-sub {
          color: rgba(255,255,255,0.6);
          margin-bottom: 30px;
        }

        .al-admin-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .al-admin-tile {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 20px;
          cursor: pointer;
          transition: 0.3s;
        }

        .al-admin-tile:hover {
          background: rgba(255,255,255,0.08);
        }

        .al-tile-icon {
          font-size: 1.8rem;
          margin-bottom: 10px;
        }

        .al-tile-label {
          font-size: 1rem;
          font-weight: bold;
        }

        .al-tile-desc {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.6);
          margin-top: 5px;
        }

        .al-hero {
          position: relative;
          height: 100vh;
          overflow: hidden;
        }

        .al-hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 1s;
        }

        .hidden {
          opacity: 0;
        }

        .al-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.3),
            rgba(0,0,0,0.85)
          );
        }

        .al-hero-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 20px;
        }

        .al-hero-title {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: bold;
          line-height: 1;
        }

        .al-hero-title span {
          color: #4ade80;
        }

        .al-hero-quote {
          margin-top: 20px;
          max-width: 700px;
          color: rgba(255,255,255,0.7);
        }

        .al-hero-dots {
          display: flex;
          gap: 6px;
          margin-top: 25px;
        }

        .al-hero-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          cursor: pointer;
        }

        .al-hero-dot.active {
          width: 22px;
          border-radius: 10px;
          background: #4ade80;
        }

        .al-outlet {
          padding-top: 100px;
        }

        @media (max-width: 768px) {
          .al-nav-links {
            display: none;
          }

          .al-admin-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="al-root">

        {/* ADMIN PANEL */}
        {isAdmin && isHome && (
          <div className="al-admin-root">

            <div className="al-admin-card">

              <div className="al-admin-title">
                Admin <span>Panel</span>
              </div>

              <div className="al-admin-sub">
                Manage the platform
              </div>

              <div className="al-admin-grid">

                {[
                  {
                    icon: "📊",
                    label: "Overall",
                    desc: "Platform statistics",
                    path: "/afterlogin/overall",
                  },
                  {
                    icon: "🎯",
                    label: "Promotions",
                    desc: "Manage campaigns",
                    path: "/afterlogin/promotions",
                  },
                  {
                    icon: "💼",
                    label: "Add Job",
                    desc: "Post jobs",
                    path: "/afterlogin/add-job",
                  },
                  {
                    icon: "🔔",
                    label: "Notifications",
                    desc: "Manage alerts",
                    path: "/afterlogin/notifications",
                  },
                  {
                    icon: "📝",
                    label: "To-Do",
                    desc: "Task manager",
                    path: "/afterlogin/todo",
                  },
                ].map((tile) => (
                  <div
                    key={tile.path}
                    className="al-admin-tile"
                    onClick={() =>
                      navigate(tile.path)
                    }
                  >
                    <div className="al-tile-icon">
                      {tile.icon}
                    </div>

                    <div className="al-tile-label">
                      {tile.label}
                    </div>

                    <div className="al-tile-desc">
                      {tile.desc}
                    </div>
                  </div>
                ))}

              </div>

            </div>
          </div>
        )}

        {/* USER / RIDER NAVBAR */}
        {!isAdmin && (
          <nav className="al-nav">

            <div
              className="al-logo"
              onClick={() =>
                navigate("/afterlogin")
              }
            >
              DW<span>JD</span>
            </div>

            <div className="al-nav-links">

              <button
                className="al-nav-btn"
                onClick={() =>
                  navigate("/afterlogin")
                }
              >
                Home
              </button>

              <button
                className="al-nav-btn"
                onClick={() =>
                  navigate("/afterlogin/about")
                }
              >
                About
              </button>

            </div>

            <div
              className="al-nav-right"
              ref={menuRef}
            >

              <div
                className={`al-avatar ${
                  role === "rider"
                    ? "rider"
                    : ""
                }`}
                onClick={() =>
                  navigate("/afterlogin/profile")
                }
              >
                {firstLetter}
              </div>

              <button
                className="al-menu-btn"
                onClick={() =>
                  setMenuOpen(!menuOpen)
                }
              >
                ☰
              </button>

              {menuOpen && (
                <div className="al-dropdown">

                  <div
                    className="al-menu-item"
                    onClick={() => {
                      navigate("/afterlogin");
                      setMenuOpen(false);
                    }}
                  >
                    🏠 Home
                  </div>

                  <div
                    className="al-menu-item"
                    onClick={() => {
                      navigate("/afterlogin/profile");
                      setMenuOpen(false);
                    }}
                  >
                    👤 Profile
                  </div>

                  {role === "user" ? (
                    <>
                      <div
                        className="al-menu-item"
                        onClick={() => {
                          navigate("/afterlogin/donate");
                          setMenuOpen(false);
                        }}
                      >
                        🎁 Donate
                      </div>

                      <div
                        className="al-menu-item"
                        onClick={() => {
                          navigate("/afterlogin/donate/request");
                          setMenuOpen(false);
                        }}
                      >
                        📋 My Requests
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="al-menu-item"
                        onClick={() => {
                          navigate("/afterlogin/pickup/requests");
                          setMenuOpen(false);
                        }}
                      >
                        📦 Pickup Requests
                      </div>

                      <div
                        className="al-menu-item"
                        onClick={() => {
                          navigate("/afterlogin/pickup/my-rides");
                          setMenuOpen(false);
                        }}
                      >
                        🏍️ My Deliveries
                      </div>
                    </>
                  )}

                  <div
                    className="al-menu-item"
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                  >
                    🚪 Logout
                  </div>

                </div>
              )}

            </div>
          </nav>
        )}

        {/* HERO */}
        {!isAdmin && isHome && (
          <>
            <HomeHero />

            <div
              style={{
                position: "relative",
                zIndex: 1,
              }}
            >
              <Home />
            </div>
          </>
        )}

        {/* OUTLET */}
        {!isHome && (
          <div className="al-outlet">
            <Outlet />
          </div>
        )}

      </div>
    </>
  );
}

/* HERO */

function HomeHero() {

  const [index, setIndex] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setIndex((prev) =>
        (prev + 1) % images.length
      );
    }, 4000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="al-hero">

      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt=""
          className={`al-hero-img ${
            i === index ? "" : "hidden"
          }`}
        />
      ))}

      <div className="al-hero-overlay"></div>

      <div className="al-hero-content">

        <h1 className="al-hero-title">
          Don't Waste.<br />
          <span>Just Donate.</span>
        </h1>

        <p className="al-hero-quote">
          "{quotes[index]}"
        </p>

        <div className="al-hero-dots">

          {images.map((_, i) => (
            <div
              key={i}
              className={`al-hero-dot ${
                i === index ? "active" : ""
              }`}
              onClick={() => setIndex(i)}
            />
          ))}

        </div>

      </div>
    </div>
  );
}
