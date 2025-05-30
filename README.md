# ⚽ Upcoming Soccer Matches App

A simple web application that displays a list of upcoming soccer matches by fetching data from the [Football-Data.org](https://www.football-data.org/) API. The project features a **React** frontend and a **Node.js (Express)** backend to handle API requests securely and manage CORS.

---

## ✨ Features

- Displays upcoming soccer matches.
- Shows names of home and away teams.
- Displays scheduled date and time.
- Shows the league/competition name.
- Node.js backend abstracts API calls and handles CORS.

---

## 🛠️ Technologies Used

- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **API Client**: Axios  
- **Environment Variables**: dotenv  
- **External API**: [Football-Data.org](https://www.football-data.org/)

---

## 🚀 Getting Started

Follow the steps below to run the app on your local machine.

### ✅ Prerequisites

- Node.js and npm (or yarn)
- Git
- A free API key from [Football-Data.org](https://www.football-data.org/client/register)

---

### 1. Clone the Repository
       ```bash
           git clone https://github.com/Abhiman-Singh/soccer-central.git
           cd soccer-central

2. Backend Setup
bash
Copy
Edit
cd backend
npm install
🔐 Configure API Key
Create a .env file in the backend directory:

ini
Copy
Edit
FOOTBALL_DATA_KEY=YOUR_FOOTBALL_DATA_ORG_API_KEY_HERE
Replace YOUR_FOOTBALL_DATA_ORG_API_KEY_HERE with your actual API key.

▶️ Start the Backend Server
bash
Copy
Edit
npm start
The backend server will run at: http://localhost:5000

3. Frontend Setup
In a new terminal window:

bash
Copy
Edit
cd ../frontend
npm install
npm start
The React app will open at: http://localhost:3000

🔍 Usage
Once both servers are running:

Visit http://localhost:3000 in your browser.

The app will automatically fetch and display upcoming soccer matches.

The backend retrieves matches scheduled for the next 10 days (as per free API tier limits).

📡 API Details
External API: Football-Data.org

Backend Endpoint: http://localhost:5000/api/matches

Football-Data.org Endpoint Used: https://api.football-data.org/v4/matches

📁 Project Structure
bash
Copy
Edit
soccer-central/
├── backend/
│   ├── server.js
│   ├── .env
│   └── ...
├── frontend/
│   ├── src/
│   └── ...
└── README.md
