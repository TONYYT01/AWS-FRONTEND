
/* ================= SIGNUP ================= */
export async function signup(data) {
  const res = await fetch(`/api/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

/* ================= VERIFY OTP ================= */
export async function verifyOtp(data) {
  const res = await fetch(`/api/verify-otp`, {
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
