import Scope from "./scope.model";

const scopeService = {
    getAllScopes: async () => {
        return await Scope.findAll();
    }
};

export default scopeService;
