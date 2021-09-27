const sequelize = require('../../src/models');

module.exports = () => {
  return Promise.all(Object.keys(sequelize).map(key => {
    return sequelize[key].destroy({ truncate: true, force: true });
  })
  )
}

