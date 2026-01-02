import User from "./user.model";
import { ICreateUser, IUpdateUser } from "./user.interface";
import { hash } from "bcrypt";

const userService = {
    getAllUsers: async () => {
        const users = await User.findAll();
        return users;
    },

    getUserById: async (id: number) => {
        const user = await User.findByPk(id);
        if (!user) return null;
        return user;
    },

    getUserByEmail: async (email: string) => {
        return await User.findOne({ where: { email } });
    },

    createUser: async (userData: ICreateUser) => {
        const hashedPassword = await hash(userData.password, 10);
        const user = await User.create({ ...userData, password: hashedPassword });
        return user;
    },

    updateUser: async (id: number, userData: IUpdateUser) => {
        const user = await User.findByPk(id);
        if (!user) return null;
        
        const updates: Partial<IUpdateUser & { password: string }> = { ...userData };

        if (userData.password) {
            updates.password = await hash(userData.password, 10);
        } else {
            delete updates.password;
        }
        
        const updatedUser = await user.update(updates);
        return { before: user, after: updatedUser };
    },

    deleteUser: async (id: number) => {
        const user = await User.findByPk(id);
        if (!user) return null;
        await user.destroy();
        return user;
    },
};

export default userService;
