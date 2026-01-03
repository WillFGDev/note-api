import * as tokenUtil from "../../src/common/utils/token.util";
import jwt from "jsonwebtoken";
import { IUser } from "../../src/modules/user/user.interface";
import { DecodedUser } from "../../src/common/interfaces/token.interface";

jest.mock("jsonwebtoken");

describe("tokenUtils", () => {
  const user: IUser = {
    id: 1,
    role: 1,
    name: "Test User",
    email: "test@example.com",
    password: "hashedpassword"
  };

  const mockToken = "mock.jwt.token";
  const secretKey = "test_secret";
  const expiresIn = "1h";

  beforeAll(() => {
    process.env.JWT_SECRET_KEY = secretKey;
    process.env.JWT_TOKEN_TIME = expiresIn;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("tokenSign", () => {
    it("debe firmar un token con los datos del usuario", () => {
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      const token = tokenUtil.tokenSign(user);

      expect(jwt.sign).toHaveBeenCalledWith(
        { id: user.id, role: user.role },
        secretKey,
        { expiresIn }
      );
      expect(token).toBe(mockToken);
    });
  });

  describe("verifyToken", () => {
    it("debe verificar y decodificar un token válido", () => {
      const decoded: DecodedUser = { id: 1, email: "test@example.com" };
      (jwt.verify as jest.Mock).mockReturnValue(decoded);

      const result = tokenUtil.verifyToken(mockToken);

      expect(jwt.verify).toHaveBeenCalledWith(mockToken, secretKey);
      expect(result).toEqual(decoded);
    });

    it("debe lanzar error si el token decodificado es string", () => {
      (jwt.verify as jest.Mock).mockReturnValue("invalid_token_string");

      expect(() => tokenUtil.verifyToken(mockToken)).toThrow("Token inválido. No se puede decodificar.");
    });
  });
});
