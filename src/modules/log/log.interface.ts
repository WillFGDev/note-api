export interface LogParams {
  userId: number;
  action: "CREATE" | "UPDATE" | "DELETE" | "SHARE" | "LOGIN" | "LOGOUT";
  description: string | null;
  entity: string;
  entityId: number;
  before?: object | null;
  after?: object | null;
}