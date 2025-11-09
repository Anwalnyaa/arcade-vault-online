# 🎮 Retro Arcade Vault

A neon-themed retro gaming hub built with **React** (Lovable frontend) + **Node.js** backend + **MongoDB Atlas**.  
Play arcade games, save high scores, unlock badges, and compete in global leaderboards.

![Arcade Theme](https://img.shields.io/badge/Theme-Retro%20Neon-ff00ff?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-In%20Development-00ffff?style=for-the-badge)

---

## ⚡ Features

| Feature | Status |
|---------|--------|
| 🎨 Retro Neon UI Arcade Frontend | ✅ Done |
| 🐍 Snake Game (Play + Score Tracking) | ✅ Done |
| 🚀 Node.js + Express Backend | ✅ Done |
| 🗄️ MongoDB Atlas Database Connection | ✅ Done |
| 🏆 Leaderboard Page (CRT Style) | ✅ Done |
| 💎 Score Rewards (badges + gems system) | 🚧 In Progress |
| 🔐 Authentication for Players | ⏳ Next |
| 🎯 More Games (Flappy Bird, Pong, etc.) | 📋 Planned |

---

## 🧩 Tech Stack

### **Frontend**
- ⚛️ **React 18** + **TypeScript**
- ⚡ **Vite** (Fast build tool)
- 🎨 **Tailwind CSS** (Neon retro design system)
- 🧩 **Shadcn UI** (Component library)
- 🛣️ **React Router** (Navigation)
- 🎮 **Canvas API** (Game rendering)

### **Backend**
- 🟢 **Node.js** + **Express.js**
- 🍃 **MongoDB Atlas** (Cloud database)
- 📦 **Mongoose** (ODM for MongoDB)
- 🔑 **JWT** (Authentication - coming soon)
- 🔒 **Bcrypt** (Password hashing - coming soon)

---

## 📁 Project Structure

```
retro-arcade-vault/
├── backend/                   # Node.js + Express backend
│   ├── models/               # Mongoose schemas
│   │   ├── score.js         # Score model
│   │   └── user.js          # User model (planned)
│   ├── routes/              # API routes
│   │   ├── scoreRoutes.js   # Score & leaderboard endpoints
│   │   └── auth.js          # Auth routes (planned)
│   ├── index.js             # Express server entry point
│   ├── .env                 # Environment variables (MongoDB URI)
│   └── package.json         # Backend dependencies
│
├── src/                      # React frontend
│   ├── components/
│   │   ├── ArcadeHeader.tsx        # Neon header component
│   │   ├── GameCard.tsx            # Game selection cards
│   │   ├── GameGrid.tsx            # Grid layout for games
│   │   ├── games/
│   │   │   └── SnakeGame.tsx       # Snake game logic
│   │   ├── leaderboard/
│   │   │   └── LeaderboardCRT.tsx  # CRT-styled leaderboard
│   │   └── ui/                     # Shadcn UI components
│   ├── pages/
│   │   ├── Index.tsx               # Homepage
│   │   └── NotFound.tsx            # 404 page
│   ├── index.css                   # Global styles + design tokens
│   ├── main.tsx                    # React entry point
│   └── App.tsx                     # App router
│
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── vite.config.ts            # Vite configuration
└── README.md                 # This file
```

---

## 🚀 Getting Started

### **Prerequisites**
- **Node.js** (v18 or higher)
- **npm** or **bun**
- **MongoDB Atlas** account (or local MongoDB)

### **Installation**

#### 1️⃣ Clone the repository
```bash
git clone <YOUR_GIT_URL>
cd retro-arcade-vault
```

#### 2️⃣ Install frontend dependencies
```bash
npm install
```

#### 3️⃣ Install backend dependencies
```bash
cd backend
npm install
```

#### 4️⃣ Configure MongoDB
Create a `backend/.env` file:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/retro-arcade
PORT=5000
```

#### 5️⃣ Run the backend server
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

#### 6️⃣ Run the frontend (in a new terminal)
```bash
npm run dev
# Frontend runs on http://localhost:8080
```

---

## 🎯 API Endpoints

### **Scores**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/score` | Submit a new score |
| `GET` | `/api/leaderboard/:game` | Get top 10 scores for a game |

#### Example: Submit Score
```bash
POST http://localhost:5000/api/score
Content-Type: application/json

{
  "username": "Player1",
  "game": "snake",
  "score": 1250
}
```

#### Example: Get Leaderboard
```bash
GET http://localhost:5000/api/leaderboard/snake
```

---

## 🎮 Games

### ✅ **Snake** (Playable)
- Classic snake gameplay
- Arrow key controls
- Score increases per food eaten
- Game over on collision
- Scores saved to MongoDB

### 📋 **Coming Soon**
- 🐦 Flappy Bird
- 🏓 Pong
- 🧱 Tetris
- 👾 Space Invaders
- 🕹️ Breakout

---

## 🎨 Design System

The project uses a **neon retro arcade theme** with:
- 🔵 **Neon Cyan** (`--neon-cyan`)
- 🟣 **Neon Magenta** (`--neon-magenta`)
- 🟡 **Neon Yellow** (`--neon-yellow`)
- ⚡ **CRT Monitor Effects** (scanlines, glow)
- 🎯 **Pixel Fonts** (`Press Start 2P`, `Orbitron`)
- ✨ **Glow Animations** (text-glow, hover effects)

All colors are defined in `src/index.css` using HSL tokens for easy theming.

---

## 🔮 Roadmap

### Phase 1: Core Features ✅
- [x] Frontend arcade UI
- [x] Snake game
- [x] Backend API
- [x] MongoDB integration
- [x] Leaderboard display

### Phase 2: User System 🚧
- [ ] User registration & login
- [ ] JWT authentication
- [ ] User profiles
- [ ] Avatar system

### Phase 3: Gamification 📋
- [ ] Badge system
- [ ] Achievements
- [ ] Virtual gems/coins
- [ ] Daily challenges

### Phase 4: More Games 🎮
- [ ] Flappy Bird
- [ ] Pong
- [ ] Tetris
- [ ] Breakout

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-game`)
3. Commit your changes (`git commit -m 'Add Tetris game'`)
4. Push to the branch (`git push origin feature/new-game`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🎓 Built With Lovable

This project was created using [Lovable](https://lovable.dev) - an AI-powered web development platform.

**Project URL**: https://lovable.dev/projects/f1f7f0da-ff49-4da8-977d-d05ba2af420f

---

## 📞 Support

- 📧 Email: support@example.com
- 💬 Discord: [Join our community](https://discord.gg/lovable)
- 📚 Docs: [Lovable Documentation](https://docs.lovable.dev)

---

<p align="center">
  Made with 💜 and ⚡ by Lovable + MongoDB
</p>
