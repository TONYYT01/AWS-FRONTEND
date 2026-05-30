import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE_URL = "http://18.118.169.82:5000";

export default function Direction() {
  const navigate  = useNavigate();
  const { state } = useLocation();

  const donation = state?.donation;
  const user     = JSON.parse(localStorage.getItem("user") || "null");

  const [picked,     setPicked]     = useState(donation?.donation_status === "picked");
  const [showReject, setShowReject] = useState(false);
  const [reason,     setReason]     = useState("");
  const [loading,    setLoading]    = useState(false);

  /* ── missing data guard ── */
  if (!donation) {
    return (
      <div className="relative bg-[#080b0f] min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <Glows />
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 bg-red-500/10 border border-red-500/30 rounded-2xl px-8 py-10 text-center"
        >
          <p className="text-3xl mb-3">⚠️</p>
          <p className="text-red-300 font-semibold mb-4">
            Donation data missing. Please go back.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white text-sm"
          >
            ← Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  /* ── derived values using correct DB columns ── */
  const foodType   = donation.food_type || donation.item_type || "other";   // ✅ fixed column
  const address    = donation.pickup_address || donation.pickup_location || "Address not available"; // ✅ fixed column
  const donorName  = donation.donor_name || "Anonymous Donor";
  const donorPhone = donation.donor_phone;

  /* ✅ Fixed: was using donation.pickup_location */
  const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  /* ── pickup ── */
  const handlePickup = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/rider/pickup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donation_id: donation.id,        // ✅ fixed: was donation._id
          rider_email: user?.email,
        }),
      });
      const data = await res.json();
      if (data.status === "pickup_locked") {
        setPicked(true);
      } else {
        alert(data.message || data.status);
      }
    } catch {
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── reject ── */
  const handleReject = async () => {
    if (!reason.trim()) {
      alert("Please enter a rejection reason.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/rider/reject-pickup`, {  // ✅ fixed: was missing /api/
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donation_id: donation.id,        // ✅ fixed: was donation._id
          rider_email: user?.email,
          reason,
        }),
      });
      const data = await res.json();
      if (data.status === "pickup_rejected") {
        navigate("/afterlogin/pickup/requests");
      } else {
        alert(data.message || data.status);
      }
    } catch {
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-[#080b0f] min-h-screen flex items-center justify-center px-4 py-10 overflow-hidden">  {/* ✅ fixed: was "bg-blackflex" typo, missing min-h-screen & relative */}
      <Glows />

      {/* ── loading overlay ── */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 bg-black/70 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-emerald-500 animate-spin" />
              <p className="text-emerald-400 font-medium text-sm tracking-widest uppercase">
                Processing…
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-2xl space-y-5"
      >
        {/* ── header ── */}
        <div className="mb-2">
          <p className="text-emerald-500 text-xs font-semibold tracking-[0.2em] uppercase mb-1">
            Rider · Navigation
          </p>
          <h1 className="text-3xl font-black text-white leading-tight">
            Navigate to{" "}
            <span className="text-emerald-400">Pickup</span> 📍
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Reach the donor and confirm the item
          </p>
          <div className="mt-4 h-px bg-gradient-to-r from-emerald-500/40 via-emerald-500/10 to-transparent" />
        </div>

        {/* ── donation details card ── */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              {/* ✅ fixed: null-safe toUpperCase, correct columns */}
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
                {foodType.toUpperCase()}
              </p>
              <p className="text-white font-bold text-lg leading-tight mt-0.5">
                {donorName}
              </p>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>

          <div className="h-px bg-white/[0.06]" />

          <div className="space-y-2">
            <InfoRow icon="⚖️" label="Quantity"     value={donation.quantity || "—"} />
            <InfoRow icon="📍" label="Pickup"       value={address} />
            {donation.drop_address && (
              <InfoRow icon="🏁" label="Drop"       value={donation.drop_address} />
            )}
            {donorPhone && (
              <InfoRow icon="📞" label="Donor Phone" value={donorPhone} />
            )}
            {donation.notes && (
              <InfoRow icon="📝" label="Notes"      value={donation.notes} />
            )}
            {donation.pickup_time && (
              <InfoRow icon="🕐" label="Pickup Time" value={new Date(donation.pickup_time).toLocaleString("en-IN")} />
            )}
          </div>
        </div>

        {/* ── google maps ── */}
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full
                     bg-blue-600 hover:bg-blue-500 active:bg-blue-700
                     text-white font-bold py-4 rounded-2xl
                     transition-all duration-200 shadow-lg shadow-blue-900/30"
        >
          🧭 Open Google Maps Navigation
        </a>

        {/* ── action buttons ── */}
        <AnimatePresence mode="wait">
          {!picked ? (
            <motion.div
              key="actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-4"
            >
              <button
                disabled={loading}
                onClick={handlePickup}
                className="py-4 rounded-2xl font-bold transition-all duration-200
                           bg-emerald-400 text-black hover:bg-emerald-300
                           disabled:opacity-40 disabled:cursor-not-allowed
                           shadow-lg shadow-emerald-900/30"
              >
                ✅ Picked Up
              </button>

              <button
                onClick={() => setShowReject((v) => !v)}
                className="py-4 rounded-2xl font-bold transition-all duration-200
                           bg-red-600/90 text-white hover:bg-red-500
                           shadow-lg shadow-red-900/20"
              >
                ❌ Not Picked
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="verify"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() =>
                navigate("/afterlogin/pickup/verify", {
                  state: { donation_id: donation.id },  // ✅ fixed: was donation._id
                })
              }
              className="w-full py-4 rounded-2xl font-bold transition-all duration-200
                         bg-emerald-400 text-black hover:bg-emerald-300
                         shadow-lg shadow-emerald-900/30"
            >
              Verify OTP ✅
            </motion.button>
          )}
        </AnimatePresence>

        {/* ── reject form ── */}
        <AnimatePresence>
          {showReject && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-4 space-y-3">
                <p className="text-red-300 text-sm font-semibold">
                  Why couldn't you pick this up?
                </p>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter reason for not picking the item…"
                  rows={3}
                  className="w-full bg-black/40 text-white text-sm
                             border border-white/10 rounded-xl p-3
                             placeholder:text-gray-600 resize-none
                             focus:outline-none focus:ring-2 focus:ring-red-500/50"
                />
                <div className="grid grid-cols-2 gap-3">
                  <button
                    disabled={loading}
                    onClick={handleReject}
                    className="py-3 rounded-xl font-bold transition
                               bg-red-600 text-white hover:bg-red-500
                               disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => { setShowReject(false); setReason(""); }}
                    className="py-3 rounded-xl font-semibold transition
                               bg-white/10 text-white hover:bg-white/20"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── back ── */}
        <button
          onClick={() => navigate(-1)}
          className="block mx-auto text-sm text-gray-500 hover:text-white transition"
        >
          ← Back to Requests
        </button>
      </motion.div>
    </div>
  );
}

/* ── info row ── */
function InfoRow({ icon: ic, label, value }) {
  return (
    <div className="flex gap-2 items-start">
      <span className="text-sm shrink-0 mt-[1px]">{ic}</span>
      <div className="min-w-0">
        <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold leading-none mb-0.5">
          {label}
        </p>
        <p className="text-xs text-gray-300 leading-snug">{value}</p>
      </div>
    </div>
  );
}

/* ── background glows ── */
function Glows() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/15 rounded-full blur-[100px]" />
    </div>
  );
}