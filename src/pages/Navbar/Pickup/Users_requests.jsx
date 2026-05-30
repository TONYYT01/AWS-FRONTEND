import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const BASE_URL = "http://localhost:5000";

/* ─── helpers ─────────────────────────────────────────────────── */
const fmt = (iso) =>
  iso
    ? new Date(iso).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

const FOOD_ICONS = {
  veg: "🥦",
  "non-veg": "🍗",
  beverage: "🥤",
  snack: "🍿",
  cooked: "🍛",
  raw: "🌾",
  other: "📦",
};

const icon = (type) => FOOD_ICONS[(type || "other").toLowerCase()] ?? "📦";

/* ─── main component ──────────────────────────────────────────── */
export default function UsersRequests() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await fetch(`${BASE_URL}/api/rider/available-pickups`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.status === "success") {
          setList(data.donations || []);
        } else {
          setError("Failed to load requests.");
        }
      } catch {
        setError("Server not reachable. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, []);

  /* derive unique food types for filter pills */
  const types = ["all", ...new Set(list.map((d) => (d.food_type || d.item_type || "other").toLowerCase()))];

  const filtered =
    filter === "all"
      ? list
      : list.filter((d) =>
          (d.food_type || d.item_type || "other").toLowerCase() === filter
        );

  /* ── loading ── */
  if (loading) {
    return (
      <Screen>
        <div className="flex flex-col items-center gap-4">
          <Spinner />
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-emerald-400 text-sm font-medium tracking-widest uppercase"
          >
            Finding pickups near you…
          </motion.p>
        </div>
      </Screen>
    );
  }

  /* ── error ── */
  if (error) {
    return (
      <Screen>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/10 border border-red-500/30 rounded-2xl px-8 py-10 text-center max-w-sm"
        >
          <p className="text-3xl mb-3">⚠️</p>
          <p className="text-red-300 font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-5 px-5 py-2 rounded-full bg-red-500/20 hover:bg-red-500/40 transition text-red-200 text-sm font-medium"
          >
            Retry
          </button>
        </motion.div>
      </Screen>
    );
  }

  /* ── main ── */
  return (
    <div className="relative bg-[#080b0f] min-h-screen overflow-hidden px-4 py-8">
      <Glows />

      {/* grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        {/* ── header ── */}
        <div className="mb-8">
          <p className="text-emerald-500 text-xs font-semibold tracking-[0.2em] uppercase mb-1">
            Rider Dashboard
          </p>
          <div className="flex items-end justify-between flex-wrap gap-3">
            <h1
              className="text-4xl font-black text-white leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Available&nbsp;
              <span className="text-emerald-400">Pickups</span>
            </h1>
            <span className="text-gray-500 text-sm">
              {list.length} request{list.length !== 1 ? "s" : ""} live
            </span>
          </div>

          {/* thin separator */}
          <div className="mt-4 h-px bg-gradient-to-r from-emerald-500/40 via-emerald-500/10 to-transparent" />
        </div>

        {/* ── filter pills ── */}
        {list.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-7">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200
                  ${
                    filter === t
                      ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
                  }`}
              >
                {t === "all" ? "All" : `${icon(t)} ${t}`}
              </button>
            ))}
          </div>
        )}

        {/* ── empty ── */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <p className="text-5xl mb-4">🛵</p>
              <p className="text-gray-400 font-medium">No pickups available right now.</p>
              <p className="text-gray-600 text-sm mt-1">Check back in a few minutes!</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((d, i) => (
                <PickupCard
                  key={d.id}
                  donation={d}
                  index={i}
                  onClick={() =>
                    navigate("/afterlogin/pickup/direction", {
                      state: { donation: d },
                    })
                  }
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Syne font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');`}</style>
    </div>
  );
}

/* ─── pickup card ─────────────────────────────────────────────── */
function PickupCard({ donation, onClick, index }) {
  // ✅ Fixed: use correct DB column names
  const foodType = donation.food_type || donation.item_type || "other";
  const address  = donation.pickup_address || donation.pickup_location || "Address not provided";
  const created  = donation.created_at || donation.createdAt;
  const notes    = donation.notes;

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      className="group cursor-pointer relative overflow-hidden
                 bg-white/[0.04] hover:bg-white/[0.07]
                 border border-white/10 hover:border-emerald-500/40
                 rounded-2xl p-5
                 shadow-xl transition-all duration-300"
    >
      {/* accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* top row */}
      <div className="flex items-start justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon(foodType)}</span>
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
              {foodType}
            </p>
            <h2 className="font-bold text-white text-base leading-tight">
              {donation.donor_name || "Anonymous Donor"}
            </h2>
          </div>
        </div>
        <StatusBadge />
      </div>

      {/* info rows */}
      <div className="space-y-2">
        <InfoRow icon="⚖️" label="Qty" value={donation.quantity || "—"} />
        <InfoRow icon="📍" label="Pickup" value={address} clamp />
        {donation.drop_address && (
          <InfoRow icon="🏁" label="Drop" value={donation.drop_address} clamp />
        )}
        {donation.pickup_time && (
          <InfoRow icon="🕐" label="Time" value={fmt(donation.pickup_time)} />
        )}
        {notes && (
          <InfoRow icon="📝" label="Note" value={notes} clamp />
        )}
      </div>

      {/* footer */}
      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
        <p className="text-[10px] text-gray-600">{fmt(created)}</p>
        <span className="text-emerald-400 text-xs font-semibold group-hover:translate-x-1 transition-transform duration-200">
          Start pickup →
        </span>
      </div>
    </motion.div>
  );
}

function StatusBadge() {
  return (
    <span className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full
                     bg-emerald-500/15 border border-emerald-500/30 text-emerald-400
                     text-[10px] font-bold uppercase tracking-wider">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      Live
    </span>
  );
}

function InfoRow({ icon: ic, label, value, clamp }) {
  return (
    <div className="flex gap-2 items-start">
      <span className="text-sm shrink-0 mt-[1px]">{ic}</span>
      <div className="min-w-0">
        <span className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold block leading-none mb-0.5">
          {label}
        </span>
        <p className={`text-xs text-gray-300 leading-snug ${clamp ? "line-clamp-2" : ""}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

/* ─── shared layout shell ─────────────────────────────────────── */
function Screen({ children }) {
  return (
    <div className="relative bg-[#080b0f] min-h-screen flex items-center justify-center px-4">
      <Glows />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ─── spinner ─────────────────────────────────────────────────── */
function Spinner() {
  return (
    <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-emerald-500 animate-spin" />
  );
}

/* ─── background glows ────────────────────────────────────────── */
function Glows() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/15 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-900/10 rounded-full blur-[80px]" />
    </div>
  );
}