const { getDB } = require("../database/db");

async function vytvoritIncident(interaction) {

    const db = getDB();

    const nazev = interaction.options.getString("nazev");
    const popis = interaction.options.getString("popis");
    const lokace = interaction.options.getString("lokace") || "Neuvedeno";

    const result = await db.run(
        `INSERT INTO incidenty (nazev, popis, lokace, vytvoril)
         VALUES (?, ?, ?, ?)`,
        nazev,
        popis,
        lokace,
        interaction.user.id
    );

    return interaction.reply({
        content: `Incident vytvořen: #${result.lastID}`,
        ephemeral: true
    });
}

module.exports = { vytvoritIncident };
