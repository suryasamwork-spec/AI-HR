// Backend API configuration
// Automatically selects the correct backend URL based on environment.
// - In local dev (localhost / 127.0.0.1): points to local backend on port 5000
// - In production (caldimengg.in): points to the live backend server

const isLocal =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

export const API_URL = isLocal
    ? 'http://localhost:5000'
    : 'https://caldim-website1.onrender.com'   // ← replace with your actual production backend URL
