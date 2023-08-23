// ======== IMPORTS ==========
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
// const serverless = require('serverless-http');

require("dotenv").config()

// =========== MIDDLEWARE ========
app.use(express.json({ extended: false }));
app.use(
    express.urlencoded({
        extended: true,
    })
);
// app.use(express.static('public'));
app.use(cors());

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

// ======= DEBUG ROUTES ===========
app.get("/*", (req, res, next) => {
    console.log("Routes Working 👍")
    next()
})

// ========= SEED ROUTES ===========
//TODO: Convert 3 seed routes into 1 route with params and a switch-case for each of the 3 options for [fish, insect, sea-creature]
app.get("/seed/:category", async (req, res) => {
    switch (req.params.category) {
        case "fish":
            let fishJSON = require('./mongoDBConversion/fish.json')
            try {
                await Fish.deleteMany({})
                const allFish = await Fish.create(fishJSON)
                res.json(allFish.map((fish) => fish.Name))
            } catch (error) {
                console.error('Fish Seed', error)
            }
            break;
        case "insects":
            let insectJSON = require('./mongoDBConversion/insects.json')
            try {
                await Insect.deleteMany({})
                const allInsects = await Insect.create(insectJSON)
                res.json(allInsects.map((insect) => insect.Name))
            } catch (error) {
                console.error(error)
            }
            break;
        case "sea-creatures":
            let seaCreatureJSON = require('./mongoDBConversion/sea-creatures.json')
            try {
                await SeaCreature.deleteMany({})
                const allSeaCreatures = await SeaCreature.create(seaCreatureJSON)
                res.json(allSeaCreatures.map((seaCreature) => seaCreature.Name))
            } catch (error) {
                console.error('Server Error', error)
            }
            break;
        default:
            console.error("Invalid Category for Seeding")
    }
})

// app.get("/seed/fish", async (req, res) => {
//     let fishJSON = require('./mongoDBConversion/fish.json')
//     try {
//         await Fish.deleteMany({})
//         const allFish = await Fish.create(fishJSON)
//         res.json(allFish.map((fish) => fish.Name))
//     } catch (error) {
//         console.error(error)
//     }
// })

// app.get("/seed/insects", async (req, res) => {
//     let insectJSON = require('./mongoDBConversion/insects.json')
//     try {
//         await Insect.deleteMany({})
//         const allInsects = await Insect.create(insectJSON)
//         res.json(allInsects.map((insect) => insect.Name))
//     } catch (error) {
//         console.error(error)
//     }
// })

// app.get("/seed/sea-creatures", async (req, res) => {
//     let seaCreatureJSON = require('./mongoDBConversion/sea-creatures.json')
//     try {
//         await SeaCreature.deleteMany({})
//         const allSeaCreatures = await SeaCreature.create(seaCreatureJSON)
//         res.json(allSeaCreatures.map((seaCreature) => seaCreature.Name))
//     } catch (error) {
//         console.error('Server Error', error)
//     }
// })

// ========= GET ROUTES ===========

app.get("/show", async (req, res) => {
    try {
        let seaCreatures = await SeaCreature.find({})//.map((seaCreature) => [seaCreature.Name, seaCreature.Category])
        let fish = await Fish.find({})//.map((fish) => [fish.Name, fish.Category])
        let insects = await Insect.find({})//.map((insect) => [insect.Name, insect.Category])
        res.json([...seaCreatures.map((creature) => [creature.Name, creature.Category]), ...fish.map((fish) => [fish.Name, fish.Category]), ...insects.map((insect) => [insect.Name, insect.Category])])
    } catch (error) {
        console.error(error)
    }
})

app.get("/all", async (req, res) => {
    let seaCreatures = await SeaCreature.find({})
    let fish = await Fish.find({})
    let insects = await Insect.find({})
    res.json([...seaCreatures,...fish,...insects])
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

// ========= GENERIC ROUTES ============
app.get("*", async (req, res) => {
    try {
        console.log('Generic Route 🤔')
        res.send(`
        <h1> Welcome to Critterpedia</h1>
        <h3>Use the links below to get the data for each of the the types of critters in critterpedia</h3>
        <ul>
            <li><a href="/show">Show summary of all Critters</li>
            <a href="/all">GET All Critters : /all</a></li>
            <li><a href="/fish">GET All Fish : /fish</a></li>
            <li><a href="/insects">GET All Insects : /insects</a></li>
            <li><a href="/sea-creatures">GET All Sea Creatures : /sea-creatures</a></li>
        </ul>
        `)
    }
    catch (error) {
        console.error(error)
    }
})

// ========== LISTENING ===========
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Now hosted locally at http://localhost:${PORT}`)
})

// ========== EXPORTS APP =======
// const handler = serverless(app);

module.exports = app;