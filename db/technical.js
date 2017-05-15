
const Sequelize = require ('sequelize');
const db = new Sequelize(process.env.DATABASE_URL ||'postgres://localhost:5432/intervr', {
  logging: false
})


const Technical = db.define('technical', {
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = Technical
