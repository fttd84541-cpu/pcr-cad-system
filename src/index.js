require("dotenv").config();

const {
    Client,
    GatewayIntentBits
} = require("discord.js");

const { initDB } = require("./database/db");
const { maPristup } = require("./cad/permissions");
const { otevritMDT } = require("./cad/mdt");
const { vytvoritIncident } = require("./cad/incident");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once("ready", async () => {
    await initDB();
    console.log(`${client.user.tag} online`);
});

client.on("interactionCreate", async interaction => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "cad") {

        if (!maPristup(interaction)) {
            return interaction.reply({
                content: "Nemáš oprávnění pro CAD systém.",
                ephemeral: true
            });
        }

        const sub = interaction.options.getSubcommand();

        if (sub === "otevrit") {
            return otevritMDT(interaction);
        }

        if (sub === "incident") {
            return vytvoritIncident(interaction);
        }
    }
});

client.login(process.env.TOKEN);
