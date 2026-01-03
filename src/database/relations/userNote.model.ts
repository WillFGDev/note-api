import { DataTypes, Model } from "sequelize";
import DB from "../database";
import User from "../../modules/user/user.model";
import Note from "../../modules/note/note.model";

class UserNote extends Model {
  public user!: number;
  public note!: number;
}

UserNote.init(
  {
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    note: {
      type: DataTypes.INTEGER,
      references: {
        model: Note,
        key: "id",
      },
    },
  },
  {
    sequelize: DB,
    modelName: "UserNote",
    timestamps: false
  }
);

User.belongsToMany(Note, { through: UserNote, foreignKey: "user", otherKey: "note", as: "SharedNotes" });
Note.belongsToMany(User, { through: UserNote, foreignKey: "note", otherKey: "user", as: "SharedWith" });

export default UserNote;
