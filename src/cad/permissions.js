const ROLE_ID = "1516170529516683322";

function maPristup(interaction) {
    return interaction.member.roles.cache.has(1516170529516683320);
}

module.exports = { maPristup };
