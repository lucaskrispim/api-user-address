const {Model,DataTypes} = require('sequelize')
const { STRING, BOOLEAN } = require('sequelize')

class User extends Model{
    static init(connection){
        super.init({
            id:{ type:DataTypes.UUIDV4, primaryKey:true, field:'id', defaultValue:DataTypes.UUIDV4 },
            name:DataTypes.STRING,
            email:DataTypes.STRING,
            phone_number:DataTypes.STRING,
            password:DataTypes.STRING,
            salt:DataTypes.STRING,
            createdAt: { type: DataTypes.DATE, field: 'created_at', defaultValue: DataTypes.NOW},
            updatedAt: { type: DataTypes.DATE, field: 'updated_at', defaultValue: DataTypes.NOW},
        },{
            tableName: 'user', 
            freezeTableName: true,
            sequelize:connection,
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        })
    }
    static associate(models){
        this.hasMany(models.Address,{foreignKey:'user_id', as: 'addresses'})
    }
}

module.exports = User