const mongoose = require('mongoose');

const insectSchema = new mongoose.Schema({
    Category: { type: String, required: true, default: 'insect' },

    "#": {
        "type": "Number"
    },
    "Name": {
        "type": "String"
    },
    "Icon Image": {
        "type": "String"
    },
    "Critterpedia Image": {
        "type": "String"
    },
    "Furniture Image": {
        "type": "String"
    },
    "Sell": {
        "type": "Number"
    },
    "Where/How": {
        "type": "String"
    },
    "Shadow": {
        "type": "String"
    },
    "Catch Difficulty": {
        "type": "String"
    },
    "Vision": {
        "type": "String"
    },
    "Total Catches to Unlock": {
        "type": "Number"
    },
    "Spawn Rates": {
        "type": "String"
    },
    "NH Jan": {
        "type": "String"
    },
    "NH Feb": {
        "type": "String"
    },
    "NH Mar": {
        "type": "String"
    },
    "NH Apr": {
        "type": "String"
    },
    "NH May": {
        "type": "String"
    },
    "NH Jun": {
        "type": "String"
    },
    "NH Jul": {
        "type": "String"
    },
    "NH Aug": {
        "type": "String"
    },
    "NH Sep": {
        "type": "String"
    },
    "NH Oct": {
        "type": "String"
    },
    "NH Nov": {
        "type": "String"
    },
    "NH Dec": {
        "type": "String"
    },
    "SH Jan": {
        "type": "String"
    },
    "SH Feb": {
        "type": "String"
    },
    "SH Mar": {
        "type": "String"
    },
    "SH Apr": {
        "type": "String"
    },
    "SH May": {
        "type": "String"
    },
    "SH Jun": {
        "type": "String"
    },
    "SH Jul": {
        "type": "String"
    },
    "SH Aug": {
        "type": "String"
    },
    "SH Sep": {
        "type": "String"
    },
    "SH Oct": {
        "type": "String"
    },
    "SH Nov": {
        "type": "String"
    },
    "SH Dec": {
        "type": "String"
    },
    "Size": {
        "type": "String"
    },
    "Surface": {
        "type": "String"
    },
    "Description": {
        "type": "String"
    },
    "Catch phrase": {
        "type": "String"
    },
    "HHA Base Points": {
        "type": "Number"
    },
    "HHA Category": {
        "type": "String"
    },
    "Color 1": {
        "type": "String"
    },
    "Color 2": {
        "type": "String"
    },
    "Lighting Type": {
        "type": "String"
    },
    "Icon Filename": {
        "type": "String"
    },
    "Critterpedia Filename": {
        "type": "String"
    },
    "Furniture Filename": {
        "type": "String"
    },
    "Internal ID": {
        "type": "Number"
    },
    "Unique Entry ID": {
        "type": "String",
        unique: true
    }

}, { strict: false })

const Insect = mongoose.model('insect', insectSchema);

module.exports = Insect;