import roleService from "../../src/modules/role/role.service";
import Role from "../../src/modules/role/role.model";
import Scope from "../../src/modules/scope/scope.model";
import RoleScope from "../../src/database/relations/roleScope.model";

jest.mock("../../src/modules/role/role.model", () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
}));
jest.mock("../../src/modules/scope/scope.model");
jest.mock("../../src/database/relations/roleScope.model", () => ({
  bulkCreate: jest.fn(),
  destroy: jest.fn(),
}));

describe("roleService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getAllRoles", () => {
        it("debe retornar todos los roles", async () => {
            const roles = [{ id: 1, name: "Admin" }];
            (Role.findAll as jest.Mock).mockResolvedValue(roles);

            const result = await roleService.getAllRoles();

            expect(Role.findAll).toHaveBeenCalled();
            expect(result).toEqual(roles);
        });
    });

    describe("getAllRoleScopes", () => {
        it("debe retornar IDs de los scopes del rol", async () => {
            const roleId = 1;
            const roleMock = {
                Scopes: [{ id: 2 }, { id: 3 }]
            };
            (Role.findByPk as jest.Mock).mockResolvedValue(roleMock);

            const result = await roleService.getAllRoleScopes(roleId);

            expect(Role.findByPk).toHaveBeenCalledWith(roleId, {
                include: [{ model: Scope }]
            });
            expect(result).toEqual([2, 3]);
        });

        it("debe retornar arreglo vacío si no encuentra el rol", async () => {
            (Role.findByPk as jest.Mock).mockResolvedValue(null);

            const result = await roleService.getAllRoleScopes(1);

            expect(result).toEqual([]);
        });
    });

    describe("getRoleById", () => {
        it("debe retornar un rol con sus scopes en forma de IDs", async () => {
            const roleId = 1;
            const roleMock = {
                get: () => ({
                id: roleId,
                name: "Editor",
                Scopes: [{ id: 2 }, { id: 4 }]
                })
            };
            (Role.findByPk as jest.Mock).mockResolvedValue(roleMock);

            const result = await roleService.getRoleById(roleId);

            expect(result).toEqual({
                id: roleId,
                name: "Editor",
                Scopes: [2, 4]
            });
        });

        it("debe retornar null si no encuentra el rol", async () => {
            (Role.findByPk as jest.Mock).mockResolvedValue(null);

            const result = await roleService.getRoleById(99);

            expect(result).toBeNull();
        });
    });

    describe("createRole", () => {
        it("debe crear un rol y sus scopes", async () => {
            const roleName = "Guest";
            const createdRole = { id: 1, name: roleName, dataValues: { id: 1, name: roleName } };

            (Role.create as jest.Mock).mockResolvedValue(createdRole);
            (RoleScope.bulkCreate as jest.Mock).mockResolvedValue(undefined);

            const result = await roleService.createRole(roleName);

            expect(Role.create).toHaveBeenCalledWith({ name: roleName });
            expect(RoleScope.bulkCreate).toHaveBeenCalledWith([
                { role: 1, scope: 2 },
                { role: 1, scope: 3 },
                { role: 1, scope: 4 }
            ]);
            expect(result).toEqual({ id: 1, name: roleName, Scopes: [2, 3, 4] });
        });
    });

    describe("updateRole", () => {
        it("debe actualizar los scopes de un rol existente", async () => {
            const roleId = 1;
            const scopes = [3, 4, 5];
            const mockRole = {
                set: jest.fn(),
                save: jest.fn(),
                get: () => ({ id: roleId, name: "Admin" })
            };

            (Role.findByPk as jest.Mock).mockResolvedValue(mockRole);
            (RoleScope.destroy as jest.Mock).mockResolvedValue(undefined);
            (RoleScope.bulkCreate as jest.Mock).mockResolvedValue(undefined);

            const result = await roleService.updateRole(roleId, scopes);

            expect(RoleScope.destroy).toHaveBeenCalledWith({ where: { role: roleId } });
            expect(RoleScope.bulkCreate).toHaveBeenCalledWith([
                { role: roleId, scope: 3 },
                { role: roleId, scope: 4 },
                { role: roleId, scope: 5 }
            ]);
            expect(mockRole.set).toHaveBeenCalledWith("updatedAt", expect.any(Date));
            expect(mockRole.save).toHaveBeenCalled();
            expect(result).toEqual({
                id: roleId,
                name: "Admin",
                Scopes: scopes
            });
        });

        it("debe retornar null si el rol no existe", async () => {
            (Role.findByPk as jest.Mock).mockResolvedValue(null);

            const result = await roleService.updateRole(123, [1]);

            expect(result).toBeNull();
        });
    });

    describe("deleteRole", () => {
        it("debe eliminar un rol y sus scopes", async () => {
            const mockRole = { destroy: jest.fn() };
            (Role.findByPk as jest.Mock).mockResolvedValue(mockRole);
            (RoleScope.destroy as jest.Mock).mockResolvedValue(undefined);

            const result = await roleService.deleteRole(1);

            expect(RoleScope.destroy).toHaveBeenCalledWith({ where: { role: 1 } });
            expect(mockRole.destroy).toHaveBeenCalled();
            expect(result).toEqual(mockRole);
        });

        it("debe retornar null si no encuentra el rol", async () => {
            (Role.findByPk as jest.Mock).mockResolvedValue(null);

            const result = await roleService.deleteRole(1);

            expect(result).toBeNull();
        });
    });
});
