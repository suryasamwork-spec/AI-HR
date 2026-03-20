# Backend Requirements

## Environment
- **Node.js**: >= 16.0.0
- **Environment Variables**: `.env` file required

## Core Technologies
- **Runtime**: Node.js
- **Server Framework**: Express 5
- **Communication**: SMTP (via Nodemailer)

## Dependencies
- `express`: ^5.2.1
- `cors`: ^2.8.6
- `dotenv`: ^17.3.1
- `nodemailer`: ^8.0.1

## Prerequisites
- **SMTP Credentials**: Gmail/Zoho or other SMTP provider for sending emails.
- **Port**: Default is 5000 (configurable via `.env`).

## Setup
1. CD into `backend`
2. Run `npm install`
3. Create a `.env` file with necessary credentials (SMTP_USER, SMTP_PASS, etc.).
4. Run `npm start` or `npm run dev`.
