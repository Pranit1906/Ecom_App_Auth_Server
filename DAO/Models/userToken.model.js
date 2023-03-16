exports.tokenCreation = (conn, DataTypes)=>{
    const userToken = conn.define('userToken',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        refreshToken:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
       /* ,
        expiryTime:{
            type: DataTypes.TIMESTAMP,
            allowNull:false
        }
        */
    });
    return userToken;
}