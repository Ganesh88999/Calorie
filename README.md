# 🥗 Calorie Tracking WebApp

A minimalistic and user-friendly calorie tracking web application that helps users monitor their daily calorie intake and visualize their progress.

## ✨ Features

### 🔐 User Authentication
- Login and Signup using email or mobile number
- Secure JWT-based authentication
- Protected routes for user data

### 🤖 Personalized AI Calorie Assistant
- Onboarding flow to collect age, weight, height, gender (optional)
- Set daily calorie goal or upload doctor-recommended deficit plan
- AI estimates calories from text descriptions
- Image recognition support for food detection (basic implementation)

### 📊 Calorie Tracking Dashboard
- Log food manually or via AI image recognition
- Displays total calories consumed per day
- Color-coded status indicators:
  - 🔴 Red: Far above the daily goal (>120%)
  - 🟨 Yellow: Slightly above the goal (100-120%)
  - 🟩 Green: Within the goal (80-100%)
  - 🔵 Blue: Below the goal (<80%)
- Weekly bar chart visualization of daily calorie consumption
- Today's food entries with meal type and timestamps

### 🏅 Monthly Achievement System
- Displays a badge "🏅 You're Healthy! 😊" if user stays within limits most days in a month
- Automatically calculates achievement based on 70% threshold

### 🍳 Recipe Finder
- Search for healthy recipes
- Categories:
  - 🥦 Veg Only
  - 🍗 Non-Veg
- Simple, authentic, step-by-step recipes with images
- Recipe detail view with ingredients and instructions

### ⚠️ Disclaimer Notice
- Visible notice on all pages: "Please consult a dietician or doctor before following a calorie deficit plan"

### 🌙 Dark Mode
- Toggle between light and dark themes
- Persistent theme preference

## 🛠️ Tech Stack

### Frontend
- **React.js** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Recharts** for data visualization
- **Lucide React** for icons
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Multer** for file uploads

## 📁 Project Structure

```
calorie/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Disclaimer.jsx
│   │   │   ├── FoodEntryModal.jsx
│   │   │   ├── MonthlyBadge.jsx
│   │   │   └── WeeklyChart.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Onboarding.jsx
│   │   │   ├── Recipes.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── CalorieEntry.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── calories.js
│   │   ├── recipes.js
│   │   └── user.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   └── calorieEstimator.js
│   ├── server.js
│   └── package.json
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd calorie
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   Create `backend/.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://your-connection-string
   JWT_SECRET=your-super-secret-jwt-key-here
   CLOUDINARY_CLOUD_NAME=your-cloudinary-name (optional)
   CLOUDINARY_API_KEY=your-cloudinary-key (optional)
   CLOUDINARY_API_SECRET=your-cloudinary-secret (optional)
   ```

4. **Run the development servers**
   
   Option 1: Run both frontend and backend together
   ```bash
   npm run dev
   ```
   
   Option 2: Run separately
   ```bash
   # Terminal 1 - Backend
   npm run dev:backend
   
   # Terminal 2 - Frontend
   npm run dev:frontend
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📝 Usage

1. **Sign Up**: Create a new account using email or mobile number
2. **Onboarding**: Complete the AI Calorie Assistant setup by providing your basic information
3. **Set Goals**: Set your daily calorie goal or upload doctor's recommendations
4. **Track Calories**: Add food entries manually or via image upload
5. **Monitor Progress**: View daily totals, weekly charts, and monthly achievements
6. **Find Recipes**: Browse healthy recipes by category (Veg/Non-Veg)

## 🔧 Configuration

### MongoDB Setup
- For local MongoDB: `MONGODB_URI=mongodb://localhost:27017/calorie-tracker`
- For MongoDB Atlas: Create a free cluster and get your connection string

### Calorie Estimation
The app uses a basic calorie estimation algorithm. For production, you can integrate:
- OpenAI API for advanced food recognition
- HuggingFace models for image recognition
- Spoonacular or Edamam API for accurate calorie data

## 🎨 Design Guidelines

- **Style**: Minimalistic, clean, and easy to navigate
- **Fonts**: Inter, Poppins, or Roboto (sans-serif)
- **Colors**: Soft greens and neutral tones with color-coded warnings
- **Icons**: Emojis and Lucide React icons for better UX

## 📦 Deployment

### Frontend (Vite)
```bash
cd frontend
npm run build
```
Deploy the `dist` folder to Vercel, Netlify, or any static hosting service.

### Backend (Express)
Deploy to Heroku, Railway, Render, or any Node.js hosting service.
Set environment variables in your hosting platform.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## ⚠️ Important Notice

**Please consult a dietician or doctor before following a calorie deficit plan. This app is meant only for tracking your food intake.**

---

Made with 💚 for healthy living!

