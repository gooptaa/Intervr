
const Sequelize = require ('sequelize');
const db = require('./seed');


const General = db.define('general', {
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = { General }

