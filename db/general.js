
const Sequelize = require ('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/intervr', {
  logging: false
})


const General = db.define('general', {
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = General
