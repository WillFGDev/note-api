import { DataTypes, Model } from "sequelize";
import DB from "../../database/database";

class Role extends Model {
  public id!: number;
  public name!: string;
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: DB,
        modelName: "Role",
    }
);

export default Role;