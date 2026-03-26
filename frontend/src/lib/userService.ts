import { useUserStore } from "@/stores/userStore";
import { getCurrentUser } from "@/api/user";

export const fetchCurrentUser = async () => {
    const data = await getCurrentUser();
    useUserStore.getState().setUserData(data);
}
