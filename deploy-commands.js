require("dotenv").config();

const {
    REST,
    Routes,
    SlashCommandBuilder
} = require("discord.js");

const commands = [

    new SlashCommandBuilder()
        .setName("cad")
        .setDescription("PČR CAD systém")
        .addSubcommand(sub =>
            sub
                .setName("otevrit")
                .setDescription("Otevře MDT")
        )
        .addSubcommand(sub =>
            sub
                .setName("incident")
                .setDescription("Vytvoří incident")
                .addStringOption(option =>
                    option
                        .setName("nazev")
                        .setDescription("Název incidentu")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName("popis")
                        .setDescription("Popis incidentu")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName("lokace")
                        .setDescription("Lokace")
                )
        )

].map(command => command.toJSON());

const rest = new REST({
    version: "10"
}).setToken(process.env.TOKEN);

(async () => {
    try {

        console.log("Nahrávám slash příkazy...");

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            {
                body: commands
            }
        );

        console.log("Slash příkazy nahrány.");

    } catch (error) {
        console.error(error);
    }
})();
