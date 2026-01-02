import { DataTypes, Model } from "sequelize";
import DB from "../../database/database";
import User from "../user/user.model";

class Note extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public ownerId!: number;
}

Note.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            }
        }
    },
    {
        sequelize: DB,
        modelName: "Note",
    }
);

// Definir relación uno a muchos
User.belongsTo(Note, { foreignKey: "ownerId", as: "sharedNotes" });
Note.hasMany(User, { foreignKey: "ownerId" });

export default Note;