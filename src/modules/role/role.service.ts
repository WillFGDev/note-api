import Role from "./role.model";
import Scope from "../../modules/scope/scope.model";
import RoleScope from "../../database/relations/roleScope.model";

const roleService = {
    getAllRoles: async () => {
        return await Role.findAll();
    },

    getAllRoleScopes: async (id: number) => {
        const role = await Role.findByPk(id, {
            include: [{ model: Scope }]
        }) as Role & { Scopes: Scope[] };
        return role?.Scopes.map(s => s.id) ?? [];
    },

    getRoleById: async (id: number) => {
        const role = await Role.findByPk(id, {
            include: [{ model: Scope }]
        }) as Role & { Scopes: Scope[] };
        if (!role) return null;
        const roleData = role.get({ plain: true });
        return {
            ...roleData,
            Scopes: roleData.Scopes.map((s: { id: number }) => s.id)
        };
    },

    createRole: async (name: string) => {
        const role = await Role.create({ name });
        const scopes = [2, 3, 4]
        const roleScopes = scopes.map(index => ({
            role: role.id,
            scope: index
        }));
        await RoleScope.bulkCreate(roleScopes);
        return { ...role.dataValues, Scopes: scopes }
    },

    updateRole: async (id: number, scopes: number[]) => {
        const role = await Role.findByPk(id);
        if (!role) return null;
        await RoleScope.destroy({ where: { role: id }});
        const roleScopes = scopes.map(index => ({
            role: id,
            scope: index
        }));
        await RoleScope.bulkCreate(roleScopes);
        role.set('updatedAt', new Date());
        await role.save();
        const roleData = role.get({ plain: true });
        return {
            ...roleData,
            Scopes: scopes
        };
    },

    deleteRole: async (id: number) => {
        const role = await Role.findByPk(id);
        if (!role) return null;
        await RoleScope.destroy({ where: { role: id }});
        await role.destroy();
        return role;
    }
};

export default roleService;
