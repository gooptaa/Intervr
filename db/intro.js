
const Sequelize = require ('sequelize');
const db = require('./seed');


const Intro = db.define('intro', {
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = { Intro }