const BASE = "https://app.sonjj.com/v1";

export async function createEmail(expiryMinutes = 1440) {
    const res = await fetch(
        `${BASE}/temp_email/create?expiry_minutes=${expiryMinutes}`,
        {
            headers: {
                Accept: "application/json",
                "X-Api-Key": import.meta.env.VITE_SONJJ_KEY
            }
        }
    );
    return res.json();
}

export async function getInbox(email) {
    const res = await fetch(`${BASE}/temp_email/inbox?email=${email}`, {
        headers: {
            Accept: "application/json",
            "X-Api-Key": import.meta.env.VITE_SONJJ_KEY
        }
    });
    return res.json();
}
