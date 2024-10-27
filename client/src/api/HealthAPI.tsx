import { useContext } from "react";
import UserContext from "../store/UserContext.tsx";

const BACKEND_URL =
    "https://hacktech-backend-296479925771.europe-west4.run.app";

const useAPI = () => {
    const { axiosAPI } = useContext(UserContext);

    const postQuestions = async (symptoms: string) => {
        try {
            const response = await axiosAPI.post(
                `${BACKEND_URL}/api/prompting/questions`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        symptoms: symptoms,
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
