const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();
app.use(express.json());

// CORS
const corsOptions = {
    origin: ["http://localhost:5173"]
};
app.use(cors(corsOptions));

// MongoDB Connection
main().catch(err => console.log('❌ MongoDB Connection Error:', err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/footballDB');
  console.log('✅ MongoDB connected!');
}

// Player Schema & Model
const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true }
});

const Player = mongoose.model('Player', playerSchema);

// === ROUTES ===

// Test Route
app.get("/api", (req, res) => {
    res.json({ "offense": ["X", "Y", "Z", "C", "QB"] });
});

// 1️⃣ CREATE - Neuen Spieler hinzufügen
app.post("/api/players", async (req, res) => {
    const newPlayer = new Player({
        name: req.body.name,
        position: req.body.position
    });

    try {
        const savedPlayer = await newPlayer.save();
        res.status(201).json(savedPlayer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 2️⃣ READ - Alle Spieler abrufen
app.get("/api/players", async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3️⃣ UPDATE - Spieler updaten
app.put("/api/players/:id", async (req, res) => {
    try {
        const updatedPlayer = await Player.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, position: req.body.position },
            { new: true } // Rückgabe der aktualisierten Version
        );
        res.json(updatedPlayer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 4️⃣ DELETE - Spieler löschen
app.delete("/api/players/:id", async (req, res) => {
    try {
        await Player.findByIdAndDelete(req.params.id);
        res.json({ message: "Spieler gelöscht!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Server Start
app.listen(8080, () => {
    console.log("🚀 Server started at port 8080");
});
