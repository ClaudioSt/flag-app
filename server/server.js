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

// --- Models ---
// Team Schema & Model
const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    abbreviation: { type: String, required: true },
    color: { type: String, required: false },
    logo: { type: String, required: false }
});
const Team = mongoose.model('Team', teamSchema);

// Playbook Schema & Model
const playbookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    playersPerSide: {
        type: Number, required: true, validate: {
            validator: function (value) {
                return value >= 4 && value <= 9;
            },
            message: 'playersPerSide muss zwischen 4 und 9 liegen'
        }
    },
    fieldLinesOption: { type: String, enum: ["30x40", "30x50", "5yard", "none"] },
    offenseTemplate: { type: String },
    defenseTemplate: { type: String },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true }
});
const Playbook = mongoose.model('Playbook', playbookSchema);

// Play Schema & Model
const playSchema = new mongoose.Schema({
    offense: { type: Boolean, required: true },
    player: [{ type: String, required: true }],
    startPoint: { type: String, required: true },
    route: { type: String, required: true },
    endOption: { type: String, enum: ["continue", "stop"] },
    playbookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Playbook', required: true }
});
const Play = mongoose.model('Play', playSchema);

// --- Routes ---

// Teams CRUD
app.post("/api/teams", async (req, res) => {
    try {
        const newTeam = new Team(req.body);
        const savedTeam = await newTeam.save();
        res.status(201).json(savedTeam);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
app.get("/api/teams", async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
app.put("/api/teams/:id", async (req, res) => {
    try {
        const updatedTeam = await Team.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedTeam);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
app.delete("/api/teams/:id", async (req, res) => {
    try {
        await Team.findByIdAndDelete(req.params.id);
        res.json({ message: "Team gelöscht!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Playbooks CRUD
app.post("/api/teams/:teamId/playbooks", async (req, res) => {
    try {
        const newPlaybook = new Playbook({ ...req.body, teamId: req.params.teamId });
        const savedPlaybook = await newPlaybook.save();
        res.status(201).json(savedPlaybook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
app.get("/api/teams/:teamId/playbooks", async (req, res) => {
    try {
        const playbooks = await Playbook.find({ teamId: req.params.teamId });
        res.json(playbooks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// NEU: Einzelnes Playbook abrufen
app.get("/api/playbooks/:id", async (req, res) => {
    try {
        const playbook = await Playbook.findById(req.params.id);
        res.json(playbook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// NEU: Playbook aktualisieren
app.put("/api/playbooks/:id", async (req, res) => {
    try {
        const updatedPlaybook = await Playbook.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedPlaybook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// NEU: Playbook löschen
app.delete("/api/playbooks/:id", async (req, res) => {
    try {
        await Playbook.findByIdAndDelete(req.params.id);
        res.json({ message: "Playbook gelöscht!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Plays CRUD
app.post("/api/playbooks/:playbookId/plays", async (req, res) => {
    try {
        const newPlay = new Play({ ...req.body, playbookId: req.params.playbookId });
        const savedPlay = await newPlay.save();
        res.status(201).json(savedPlay);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
app.get("/api/playbooks/:playbookId/plays", async (req, res) => {
    try {
        const plays = await Play.find({ playbookId: req.params.playbookId });
        res.json(plays);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Server Start
app.listen(8080, () => {
    console.log("🚀 Server started at port 8080");
});
