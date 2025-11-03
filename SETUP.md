# 🚀 Quick Setup Guide

## Step 1: Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

Or use the convenience script:
```bash
npm run install:all
```

## Step 2: Configure MongoDB

### Option A: Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/calorie-tracker`

### Option B: MongoDB Atlas (Recommended for beginners)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier available)
4. Get your connection string
5. Replace `<password>` with your database password

## Step 3: Create Environment File

Create `backend/.env` file:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/calorie-tracker?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Important:** 
- Replace `MONGODB_URI` with your actual MongoDB connection string
- Replace `JWT_SECRET` with a random secure string (you can generate one using: `openssl rand -base64 32`)

## Step 4: Start the Application

### Option 1: Run Both Together
```bash
npm run dev
```

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Step 5: Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health

## 🎯 First Time Usage

1. **Sign Up**: Create an account with email or mobile number
2. **Complete Onboarding**: 
   - Enter your age, weight, height
   - Set your daily calorie goal (or use the AI suggestion)
   - Optionally add doctor's recommendations
3. **Start Tracking**: 
   - Add food entries manually
   - Or upload food images for AI recognition
4. **Monitor Progress**: 
   - View daily totals with color-coded status
   - Check weekly bar charts
   - Earn monthly achievement badges

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Verify your connection string is correct
- Check if MongoDB service is running (for local setup)
- Ensure your IP is whitelisted in MongoDB Atlas

### Port Already in Use
- Change `PORT` in `backend/.env` if 5000 is taken
- Update `vite.config.js` proxy target if you change backend port

### Module Not Found Errors
- Run `npm install` in both frontend and backend directories
- Clear `node_modules` and reinstall if issues persist

### CORS Issues
- Backend CORS is configured for `localhost:3000`
- For production, update CORS settings in `backend/server.js`

## 📝 Notes

- The app uses a basic calorie estimation algorithm. For production, integrate with a proper food database API.
- Image uploads are stored locally in `backend/uploads/`. For production, use Cloudinary or similar service.
- Dark mode preference is stored in browser's localStorage.

## 🎉 You're All Set!

Start tracking your calories and achieve your health goals! 💚

