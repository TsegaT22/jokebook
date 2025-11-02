"use strict";
const model = require('../models/jokebookModel');

async function fetchCategories(req, res){
    try {
        const products = await model.getCategories();
        res.json(products);
    } catch (err){
        console.error("Error in fetchCategories", err);
        res.status(500).send("Server error");
    }
}

async function fetchJokesByCategory(req, res){
    const category = req.params.category;
    if (category) {
        try {
            const joke = await model.getJokesByCategory(category);
            res.json(joke);
        } catch (err) {
            console.error("Error in fetchJokesByCategory", err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required category param!");
    }
}

async function fetchJokesRandom(req, res) {
    try {
        const result = await model.getRandomJoke();
        if(!result){
            res.status(404).send("There are no jokes in the database");
            return;
        }
        res.json(result);
    } catch (err){
        console.error("Error in fetchJokesRandom:", err);
        res.status(500).send("Server error");
    }
}

async function createJoke(req, res){
    const { category, setup, delivery } = req.body;
    if (category && setup && delivery) {
        try {
            const newJoke = await model.addJoke(category, setup, delivery);
            res.status(201).json(newJoke);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required joke fields!");
    }

}

module.exports = {
    fetchCategories,
    fetchJokesByCategory,
    fetchJokesRandom,
    createJoke
};