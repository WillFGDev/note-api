import { DataTypes, Model } from "sequelize";
import DB from "../database";
import Role from "../../modules/role/role.model";
import Scope from "../../modules/scope/scope.model";

class RoleScope extends Model {
  public role!: number;
  public scope!: number;
}

RoleScope.init(
  {
    role: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: "id",
      },
    },
    scope: {
      type: DataTypes.INTEGER,
      references: {
        model: Scope,
        key: "id",
      },
    },
  },
  {
    sequelize: DB,
    modelName: "RoleScope",
    timestamps: false
  }
);

Role.belongsToMany(Scope, { through: RoleScope, foreignKey: "role", otherKey: "scope" });
Scope.belongsToMany(Role, { through: RoleScope, foreignKey: "scope", otherKey: "role" });

export default RoleScope;
