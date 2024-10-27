import { useContext } from "react";
import UserContext from "../store/UserContext.tsx";

const BACKEND_URL = "https://docmed.ccrolabs.com";

const useAPI = () => {
    const { axiosAPI } = useContext(UserContext);

    const postQuestions = async (symptoms: string) => {
        try {
            const response = await axiosAPI.post(
                `${BACKEND_URL}/api/prompting/questions`,
                {
                    symptoms: symptoms,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching health status:", error);
            throw error;
        }
    };

    return {
        postQuestions,
    };
};

export default useAPI;
