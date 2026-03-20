import type { UserData } from "@/stores/userStore";
import api from "./client";

export const getCurrentUser = async () => {
    const response = await api.get("/users/me");
    // const { data } = await api.post("/users/me");
    return response.data;
}