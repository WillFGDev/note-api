import userService from "../../src/modules/user/user.service";
import User from "../../src/modules/user/user.model";
import { hash } from "bcrypt";

jest.mock("../../src/modules/user/user.model", () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
}));

describe("userService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUser = {
    id: 1,
    name: "Test",
    email: "test@example.com",
    password: "hashed123",
    role: 2,
    update: jest.fn().mockResolvedValue({ id: 1, name: "Updated", email: "test@example.com", password: "updated123", role: 2 }),
    destroy: jest.fn(),
  };

  const newUser = {
    name: "New User",
    email: "new@example.com",
    password: "123456",
    role: 2,
  };

  describe("getAllUsers", () => {
    it("debe devolver todos los usuarios", async () => {
      (User.findAll as jest.Mock).mockResolvedValue([mockUser]);

      const result = await userService.getAllUsers();

      expect(User.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe("getUserById", () => {
    it("debe devolver el usuario si existe", async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.getUserById(1);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });

    it("debe devolver null si el usuario no existe", async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await userService.getUserById(99);

      expect(result).toBeNull();
    });
  });

  describe("getUserByEmail", () => {
    it("debe devolver el usuario si existe", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.getUserByEmail("test@example.com");

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: "test@example.com" } });
      expect(result).toEqual(mockUser);
    });

    it("debe devolver null si no existe", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const result = await userService.getUserByEmail("nope@example.com");

      expect(result).toBeNull();
    });
  });

  describe("createUser", () => {
    it("debe hashear la contraseña y crear un nuevo usuario", async () => {
      (hash as jest.Mock).mockResolvedValue("hashedPassword");
      (User.create as jest.Mock).mockResolvedValue({ id: 2, ...newUser, password: "hashedPassword" });

      const result = await userService.createUser(newUser);

      expect(hash).toHaveBeenCalledWith(newUser.password, 10);
      expect(User.create).toHaveBeenCalledWith({
        ...newUser,
        password: "hashedPassword",
      });
      expect(result).toEqual({
        id: 2,
        ...newUser,
        password: "hashedPassword",
      });
    });
  });

  describe("updateUser", () => {
    it("debe actualizar un usuario existente", async () => {
      (User.findByPk as jest.Mock).mockResolvedValue({ ...mockUser, update: mockUser.update });
      (hash as jest.Mock).mockResolvedValue("updated123");

      const updatedData = {
        name: "Updated",
        password: "newpass",
      };

      const result = await userService.updateUser(1, updatedData);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(hash).toHaveBeenCalledWith("newpass", 10);
      expect(mockUser.update).toHaveBeenCalledWith({
        name: "Updated",
        password: "updated123",
      });

      expect(result).toEqual({
        before: { ...mockUser, update: expect.any(Function), destroy: expect.any(Function) },
        after: {
          id: 1,
          name: "Updated",
          email: "test@example.com",
          password: "updated123",
          role: 2,
        },
      });
    });

    it("debe devolver null si el usuario no existe", async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await userService.updateUser(99, { name: "Doesn't matter" });

      expect(result).toBeNull();
    });
  });

  describe("deleteUser", () => {
    it("debe eliminar un usuario existente", async () => {
      const userWithDestroy = { ...mockUser, destroy: jest.fn() };
      (User.findByPk as jest.Mock).mockResolvedValue(userWithDestroy);

      const result = await userService.deleteUser(1);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(userWithDestroy.destroy).toHaveBeenCalled();
      expect(result).toEqual(userWithDestroy);
    });

    it("debe devolver null si el usuario no existe", async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await userService.deleteUser(999);

      expect(result).toBeNull();
    });
  });
});