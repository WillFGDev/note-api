import logService from "../../src/modules/log/log.service";
import Log from "../../src/modules/log/log.model";

jest.mock("../../src/modules/log/log.model", () => ({
  findAll: jest.fn(),
  create: jest.fn(),
}));

describe("logService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockLogs = [
    { userId: 1, action: "CREATE", description: "Test" },
    { userId: 2, action: "SHARE", description: "Test" },
  ];

  describe("getAllLogs", () => {
    it("debe retornar todos los logs", async () => {
      (Log.findAll as jest.Mock).mockResolvedValue(mockLogs);

      const result = await logService.getAllLogs();

      expect(Log.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockLogs);
    });
  });

  describe("log", () => {
    it("debe crear un log", async () => {
      const logData = {
        userId: 1,
        action: "SHARE",
        description: "Test",
        entity: "Test",
        entityId: 1,
        before: null,
        after: null,
      };

      (Log.create as jest.Mock).mockResolvedValue(logData);

      const result = await logService.log({
        userId: 1,
        action: "SHARE",
        description: "Test",
        entity: "Test",
        entityId: 1,
        before: null,
        after: null,
      });

      expect(Log.create).toHaveBeenCalledWith(logData);
      expect(result).toEqual(logData);
    });
  });
});