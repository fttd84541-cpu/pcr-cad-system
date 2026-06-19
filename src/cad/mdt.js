const { EmbedBuilder } = require("discord.js");
const { getDB } = require("../database/db");

async function otevritMDT(interaction) {

    const db = getDB();

    const pripady = await db.all(
        "SELECT * FROM pripady ORDER BY id DESC LIMIT 5"
    );

    const incidenty = await db.all(
        "SELECT * FROM incidenty ORDER BY id DESC LIMIT 5"
    );

    const embed = new EmbedBuilder()
        .setTitle("PČR CAD - MDT")
        .setDescription("Přehled systému")
        .addFields(
            {
                name: "Případy",
                value: pripady.length
                    ? pripady.map(p =>
                        `#${p.id} ${p.nazev} (${p.oddeleni})`
                    ).join("\n")
                    : "Žádné případy"
            },
            {
                name: "Incidenty",
                value: incidenty.length
                    ? incidenty.map(i =>
                        `#${i.id} ${i.nazev} [${i.stav}]`
                    ).join("\n")
                    : "Žádné incidenty"
            }
        );

    return interaction.reply({
        embeds: [embed],
        ephemeral: true
    });
}

module.exports = { otevritMDT };
