import { LogParams } from "./log.interface";
import Log from "./log.model";

const logService = {
    log: async ({
        userId,
        action,
        description = null,
        entity,
        entityId,
        before = null,
        after = null,
    }: LogParams): Promise<void> => {
        try 
        {
            await Log.create({
                userId,
                action,
                description,
                entity,
                entityId,
                before,
                after,
            });
        } 
        catch (error) 
        {
            console.error("Error guardando auditoría:", error);
        }
    },

    getAllLogs: async () => {
        return await Log.findAll();
    }
};

export default logService;