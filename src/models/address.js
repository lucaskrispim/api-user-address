const { Model, DataTypes } = require('sequelize')
const { STRING, FLOAT, UUIDV4, BOOLEAN, DATE } = require('sequelize')

class Address extends Model {
    static init(connection) {
        super.init({
            id: { type: DataTypes.UUIDV4, primaryKey: true, field: 'id', defaultValue: DataTypes.UUIDV4 },
            user_id: DataTypes.UUIDV4,
            street: DataTypes.STRING,
            number: DataTypes.INTEGER,
            zip_code:DataTypes.STRING,
            createdAt: { type: DataTypes.DATE, field: 'created_at', defaultValue: DataTypes.NOW },
            updatedAt: { type: DataTypes.DATE, field: 'updated_at', defaultValue: DataTypes.NOW },
        }, {
            tableName: 'address',
            freezeTableName: true,
            sequelize: connection,
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        })
    }
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    }
}

module.exports = Address