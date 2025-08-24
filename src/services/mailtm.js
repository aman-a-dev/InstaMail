const BASE = "https://api.mail.tm";

export async function getDomains() {
  const res = await fetch(`${BASE}/domains`);
  return res.json();
}

export async function createAccount(address, password) {
  const res = await fetch(`${BASE}/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, password }),
  });
  return res.json();
}

export async function getToken(address, password) {
  const res = await fetch(`${BASE}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, password }),
  });
  return res.json();
}

export async function fetchMessages(token) {
  const res = await fetch(`${BASE}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}