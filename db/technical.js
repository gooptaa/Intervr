
const Sequelize = require ('sequelize');
const db = require('./seed');


const Technical = db.define('technical', {
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = { Technical }