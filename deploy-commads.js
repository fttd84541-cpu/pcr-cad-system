require("dotenv").config();

const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [

    new SlashCommandBuilder()
        .setName("cad")
        .setDescription("PČR CAD systém")
        .addSubcommand(s =>
            s.setName("otevrit")
             .setDescription("Otevře MDT")
        )
        .addSubcommand(s =>
            s.setName("incident")
             .setDescription("Vytvoří incident")
             .addStringOption(o =>
                o.setName("nazev").setRequired(true))
             .addStringOption(o =>
                o.setName("popis").setRequired(true))
             .addStringOption(o =>
                o.setName("lokace").setRequired(false))
        )

].map(c => c.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands }
    );

    console.log("Commands ready");
})();
