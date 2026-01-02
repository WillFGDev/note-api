import { DataTypes, Model } from "sequelize";
import DB from "../../database/database";

class Scope extends Model {
  public id!: number;
  public description!: string;
}

Scope.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: DB,
        modelName: "Scope",
        timestamps: false
    }
);

export default Scope;