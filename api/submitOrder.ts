
// This is a serverless function.
// You need to create a folder named `api` in the root of your project
// and place this file named `submitOrder.ts` inside it.

import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import type { NextApiRequest, NextApiResponse } from 'next'; // Assuming a Next.js/Vercel environment for simplicity

// Define the structure of the incoming order data
interface OrderPayload {
  items: { name: string; quantity: number }[];
  total: number;
  address: {
    tower: string;
    floor: string;
    flat: string;
  };
}

// Ensure your environment variables are set in your deployment platform (e.g., Vercel, Netlify)
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
// The private key needs to be stored securely, often with newline characters replaced
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!SPREADSHEET_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
  throw new Error('Google Sheets API credentials are not set in environment variables.');
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { items, total, address }: OrderPayload = req.body;

    // Authenticate with Google Sheets API
    const client = new JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth: client });

    // Format the data for the new row
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const orderItems = items.map(item => `${item.name} (x${item.quantity})`).join(', ');
    const deliveryAddress = `T-${address.tower}, F-${address.floor}, #${address.flat}`;
    
    const newRow = [
      timestamp,
      deliveryAddress,
      orderItems,
      total,
      'NEW' // Order Status
    ];

    // Append the new row to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Orders!A:E', // Assumes a sheet named 'Orders'
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [newRow],
      },
    });

    return res.status(200).json({ success: true, message: 'Order submitted successfully.' });

  } catch (error) {
    console.error('Error submitting order to Google Sheets:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export default handler;
