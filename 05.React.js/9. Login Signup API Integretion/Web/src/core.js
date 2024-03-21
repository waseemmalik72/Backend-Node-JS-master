const isLocalhost = window.location.href.includes("https");

export const API_URL = isLocalhost ? "" : "http://localhost:5000";
