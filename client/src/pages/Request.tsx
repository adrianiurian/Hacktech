import { useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import FormCard from "../components/FormCard";
import useAPI from "../api/HealthAPI";

type QuestionType = {
    question: string;
    answers: string[];
};

export default function RequestPage() {
    const [baseSymptom, setBaseSymptom] = useState("");
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [medication, setMedication] = useState("");
    const [loadingQuestions, setLoadingQuestions] = useState(false);

    const { postQuestions } = useAPI();

    function postSymptoms(symptoms: string) {
        setLoadingQuestions(true);
        postQuestions(symptoms)
            .then((data) => {
                console.log(data);
                setLoadingQuestions(false);
                setQuestions(data.questions_to_ask);
            })
            .catch((error) => {
                console.error(error);
                setLoadingQuestions(false);
            });
    }

    return (
        <div className='flex flex-col gap-6 px-6'>
            <FormCard title='Document section'>File input</FormCard>

            <div className='flex flex-row gap-6'>
                <FormCard
                    title='Symptoms section'
                    className='flex-1 flex flex-col'
                >
                    <Input
                        id='base-symptom'
                        label='What are your symptoms?'
                        value={baseSymptom}
                        onChange={(value) => setBaseSymptom(value as string)}
                    />

                    <div className='flex flex-row justify-between items-center py-4'>
                        <label className='text-sm font-semibold text-stone-400'>
                            The quality of your answers will determine the
                            accuracy of the results.
                        </label>
                        <Button
                            onClick={() => {
                                postSymptoms(baseSymptom);
                            }}
                            outlined
                            styleType='success'
                        >
                            Send
                        </Button>
                    </div>

                    {questions.length === 0 ? (
                        <div className='border border-stone-400 text-stone-400 rounded-lg flex justify-center items-center flex-1'>
                            {loadingQuestions
                                ? "Preparing follow-up questions"
                                : "Please enter your symptoms in order to get follow-up questions."}
                        </div>
                    ) : (
                        <div>
                            <h3 className='text-xl font-bold text-stone-700 pb-6'>
                                Follow-up Questions
                            </h3>
                            <form>
                                <p>{questions[0].question}</p>
                                <input
                                    type='checkbox'
                                    id='first_answer'
                                    value={questions[0].answers[0]}
                                />
                                <label htmlFor='first_answer'>
                                    {questions[0].answers[0]}
                                </label>
                                <input
                                    type='checkbox'
                                    id='first_answer'
                                    value={questions[0].answers[1]}
                                />
                                <label htmlFor='first_answer'>
                                    {questions[0].answers[1]}
                                </label>
                                <input
                                    type='checkbox'
                                    id='first_answer'
                                    value={questions[0].answers[2]}
                                />
                                <label htmlFor='first_answer'>
                                    {questions[0].answers[2]}
                                </label>
                            </form>
                        </div>
                    )}
                </FormCard>

                <div className='flex flex-col flex-1 gap-6'>
                    <FormCard title='Medication section'>
                        <Input
                            value={medication}
                            onChange={(value) => setMedication(value as string)}
                            id='medication'
                            label='Medication'
                            textarea
                            rows={4}
                        />

                        <label className='text-sm font-semibold text-stone-400'>
                            Please enter your current medication treatment
                        </label>
                    </FormCard>

                    <FormCard title='Context'>Context</FormCard>
                </div>
            </div>
        </div>
    );
}
