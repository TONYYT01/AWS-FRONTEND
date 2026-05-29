// const BASE_URL = "http://localhost:5000";
// const BASE_URL = "https://back-end-project-group.onrender.com";

/* ================= SIGNUP ================= */
export async function signup(data) {
  const res = await fetch(`/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

/* ================= VERIFY OTP ================= */
export async function verifyOtp(data) {
  const res = await fetch(`/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

/* ================= RESEND OTP ================= */
export async function resendOtp(data) {
  const res = await fetch(`/api/resend-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
