import { DataTypes, Model } from "sequelize";
import DB from "../../database/database";

class Log extends Model {
    public id!: number;
    public userId!: number;
    public action!: string;
    public entity!: string;
    public entityId!: number;
    public before?: object;
    public after?: object;
}

Log.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        entity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        entityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        before: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        after: {
            type: DataTypes.JSON,
            allowNull: true,
        },
    },
    {
        sequelize: DB,
        modelName: "Log",
        timestamps: true,
        updatedAt: false,
    }
);

export default Log;