const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let db;

async function initDB() {

    db = await open({
        filename: "./src/database/db.sqlite",
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS pripady (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nazev TEXT,
            oddeleni TEXT,
            vytvoril TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS incidenty (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nazev TEXT,
            popis TEXT,
            lokace TEXT,
            stav TEXT DEFAULT 'OTEVŘENÝ',
            vytvoril TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    console.log("DB ready");
}

function getDB() {
    return db;
}

module.exports = { initDB, getDB };
