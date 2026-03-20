import api from "./client";

export const getCurrentUser = async () => {
    const response = await api.get("/users/me");
    return response.data;
}

export const createNewUser = async (userData: any) => {
    const { data } = await api.post('/users/', userData);
    return data;
}