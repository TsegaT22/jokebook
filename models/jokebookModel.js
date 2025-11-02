"use strict";
const pool = require('../db');

async function getCategories() {
    const queryText = "SELECT DISTINCT category FROM jokebook;";

    const result = await pool.query(queryText);
    return result.rows;
}

async function getJokesByCategory(category, limit) {
    const queryText = "SELECT setup, delivery FROM jokebook WHERE category = $1";
    const values = [category];
    if (limit){
        query += "LIMIT $2";
        values.push(limit);
    }
    const result = await pool.query(queryText, values);
    return result.rows;
}

async function getRandomJoke(){
    const queryText = "SELECT setup, delivery FROM jokebook ORDER BY RANDOM() LIMIT 1;";
    const result = await pool.query(queryText);
    return result.rows[0];

}

async function addJoke(category, setup, delivery){
    const insert = `INSERT INTO jokebook(category, setup, delivery) VALUES ($1, $2, $3) RETURNING category;`;
    await pool.query(insert, [category, setup, delivery]);

  const categoryQuery = "SELECT setup, delivery FROM jokebook WHERE category=$1";
  const categoryResult = await pool.query(categoryQuery, [category]);
  return categoryResult.rows; // return updated list
}
module.exports = {
    getCategories,
    getJokesByCategory,
    getRandomJoke,
    addJoke
};


