// import { useContext } from "react";
// import UserContext from "../store/UserContext.tsx";

const BACKEND_URL = "https://docmed.ccrolabs.com";

const useAPI = () => {
    // const { axiosAPI } = useContext(UserContext);

    // const postQuestions1 = async (symptoms: string) => {
    //     try {
    //         const response = await axiosAPI.post(
    //             `${BACKEND_URL}/api/prompting/questions`,
    //             {
    //                 symptoms: symptoms,
    //             },
    //             {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );
    //         return response.data;
    //     } catch (error) {
    //         console.error("Error fetching health status:", error);
    //         throw error;
    //     }
    // };

    const postQuestions = async (symptoms: string) => {
        const response = await fetch(`${BACKEND_URL}/api/prompting/questions`, {
            method: "POST",
            body: JSON.stringify({ symptoms: symptoms }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        console.log(data);
        return data;
    };

    return {
        postQuestions,
    };
};

export default useAPI;
