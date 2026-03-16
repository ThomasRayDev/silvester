import api from "./client";

export const loginRequest = async (username: string, password: string) => {
    const params = new URLSearchParams();

    params.append("username", username);
    params.append("password", password);

    const { data } = await api.post("/auth/login", params, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    return data;
}