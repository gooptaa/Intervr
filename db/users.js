// YP/OB: Decide if you need - if not delete dead code. Can also put this in an issue.

/* commented out until that dark day in which we need a user model... */

/*
const Sequelize = require ('sequelize')
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: true
});

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        isEmail: true,
        allowNull: false
    }
});

module.exports = { User }

*/
