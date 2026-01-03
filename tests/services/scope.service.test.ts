import scopeService from "../../src/modules/scope/scope.service";
import Scope from "../../src/modules/scope/scope.model";

jest.mock("../../src/modules/scope/scope.model");

describe("scopeService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockScopes = [
        { id: 1, name: "Admin" },
        { id: 2, name: "Read" }
    ];

    describe("getAllScopes", () => {
        it("debe retornar todos los scopes", async () => {     
            (Scope.findAll as jest.Mock).mockResolvedValue(mockScopes);
            
            const result = await scopeService.getAllScopes();
            
            expect(Scope.findAll).toHaveBeenCalled();
            expect(result).toEqual(mockScopes);
        });
    });
});
