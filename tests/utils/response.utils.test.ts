import { sendSuccessResponse, sendErrorResponse } from "../../src/common/utils/response.util";
import { Response } from "express";

describe("responseUtils", () => {
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe("sendSuccessResponse", () => {
    it("debe enviar una respuesta exitosa con la estructura correcta", () => {
      const data = { id: 1, name: "Test" };

      sendSuccessResponse(mockRes as Response, 200, "Operación exitosa", data);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
        status: 200,
        message: "Operación exitosa",
        data,
        timestamp: expect.any(String)
      }));
    });
  });

  describe("sendErrorResponse", () => {
    it("debe enviar una respuesta de error con detalles", () => {
      const errorDetails = { message: "Algo salió mal" };

      sendErrorResponse(mockRes as Response, 500, "Error interno", errorDetails);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
        status: 500,
        message: "Error interno",
        errorDetails,
        timestamp: expect.any(String)
      }));
    });

    it("debe enviar una respuesta de error con errorDetails vacío si no se proporciona", () => {
      sendErrorResponse(mockRes as Response, 400, "Petición inválida");

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
        status: 400,
        message: "Petición inválida",
        errorDetails: {},
        timestamp: expect.any(String)
      }));
    });
  });
});
