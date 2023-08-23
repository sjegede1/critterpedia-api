// ======== IMPORTS ==========
const express = require('express')
const app = express()
const mongoose = require('mongoose')

require("dotenv").config()

// =========== MIDDLEWARE ========
app.use(express.json({ extended: false }));
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.static("public"));

// ======== MONGODB AND MODELS ===========
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
    console.log("Connected to MONGODB 🍃");
});

const Fish = require("./models/fish");
const Insect = require("./models/insect");
const SeaCreature = require("./models/sea-creature");


// ========= ROUTES ============
app.get("/", (req, res) => {
    res.render("index")
})

// ========= SEED ROUTES ===========
app.get("/seed/fish", async (req, res) => {
    let fishJSON = require('./mongoDBConversion/fish.json')
    try {
        await Fish.deleteMany({})
        const allFish = await Fish.create(fishJSON)
        res.json(allFish.map((fish) => fish.Name))
    } catch (error) {
        console.error(error)
    }
})

app.get("/seed/insects", async (req, res) => {
    let insectJSON = require('./mongoDBConversion/insects.json')
    try {
        await Insect.deleteMany({})
        const allInsects = await Insect.create(insectJSON)
        res.json(allInsects.map((insect) => insect.Name))
    } catch (error) {
        console.error(error)
    }
})

app.get("/seed/sea-creatures", async (req, res) => {
    let seaCreatureJSON = require('./mongoDBConversion/sea-creatures.json')
    try {
        await SeaCreature.deleteMany({})
        const allSeaCreatures = await SeaCreature.create(seaCreatureJSON)
        res.json(allSeaCreatures.map((seaCreature) => seaCreature.Name))
    } catch (error) {
        console.error('Server Error', error)
    }
})

// ========= GET ROUTES ===========

app.get("/all", async (req, res) => {
    let seaCreature = await SeaCreature.find({})
    let fish = await Fish.find({})
    let insects = await Insect.find({})
    res.json({
        seaCreatures: seaCreature,
        fish: fish,
        insects: insects
    })
})

app.get("/fish", async (req, res) => {
    try {
        const fish = await Fish.find({})
        res.json(fish)
    } catch (error) {
        console.error(error)
    }
})

app.get("/insects", async (req, res) => {
    try {
        const insects = await Insect.find({})
        res.json(insects)
    } catch (error) {
        console.error(error)
    }
});

app.get("/sea-creatures", async (req, res) => {
    try {
        const seaCreatures = await SeaCreature.find({})
        res.json(seaCreatures)

    } catch (error) {
        console.error(error)
    }
})

// ========== LISTENING ===========
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Now hosted locally at http://localhost:${PORT}`)
})