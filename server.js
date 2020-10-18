"use strict";

const express = require("express");
const fs = require("fs");
const util = require("util");
const glob = require("glob");
const mysql = require("promise-mysql");
const multer = require("multer");
const app = express();

const globPromise = util.promisify(glob);
const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());
app.use(express.static("public"));

const PARAM_ERROR = 400;
const FILE_ERROR = 500;

// return all the courses in the database
app.get("/courses", async function(req, res) {
  try {
    // courses is an array of object, need to extract context out
    let courses = await makeQuery("SELECT course_num FROM courses;");
    let result = courses[0]["course_num"];
    for (let i = 1; i < courses.length; i++) {
      result += "\n" + courses[i]["course_num"];
    }
    res.type("text");
    res.send(result);
    // res.type("json");
    // res.send(courses);
  } catch (err) {
    res.type("text");
    res.status(FILE_ERROR).send(err);
  }
});


/**
 * Returns the products from the database as an array of objects.
 * @param {string} query - The MySQL query to send to the database.
 * @return {array} - The menu items.
 */
async function makeQuery(query) {
  let db;
  try {
    db = await getDB();
    let data = await db.query(query);
    db.end();
    return data;
  } catch (err) {
    if (db) {
      db.end();
    }
    throw err;
  }
}

/**
 * Establishes a database connection and returns the database object.
 * @returns {Object} - The database object for the connection.
 */
async function getDB() {
  let database = await mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "root",
    database: "rmc"
  });
  return database;
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
