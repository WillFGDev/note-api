import { DataTypes, Model } from "sequelize";
import DB from "../../database/database";
import Role from "../role/role.model";
import Note from "../note/note.model";

class User extends Model {
    public id!: number;
    public role!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    
    public Notes?: Note[];

    toJSON() {
        const values = { ...this.get() };
        delete values.password;
        return values;
    }
}


User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Role,
                key: "id",
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize: DB,
        modelName: "User",
    }
);

// Definir relación uno a muchos
User.belongsTo(Role, { foreignKey: "role" });
Role.hasMany(User, { foreignKey: "role" });

export default User;