import api from "./client";

export const getRolesEnum = async () => {
    const response = await api.get("/enums/roles");
    return response.data;
}
