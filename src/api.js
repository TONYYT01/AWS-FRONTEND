const BASE_URL = "http://18.118.169.82:5000";
/* ================= SIGNUP ================= */
export async function signup(data) {
  const res = await fetch(`${BASE_URL}/api/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

/* ================= VERIFY OTP ================= */
export async function verifyOtp(data) {
  const res = await fetch(`${BASE_URL}/api/verify-otp`, {
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
