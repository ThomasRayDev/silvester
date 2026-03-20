import api from "./client";

export const getCurrentUser = async () => {
    const response = await api.get("/users/me");
    return response.data;
}

export const createNewUser = async (userData: any) => {
    const { data } = await api.post('/users/', userData);
    return data;
}

export const getAllUsers = async () => {
    const { data } = await api.get("/users/");
    return data;
}

export const updateUser = async (userData: any) => {
    const { data } = await api.put(`/users/${userData.id}`, {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        role: userData.role,
    });
    return data;
}