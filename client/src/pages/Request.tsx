import { useEffect, useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import FormCard from "../components/FormCard";
import useAPI from "../api/HealthAPI";

type QuestionType = {
    question: string;
    answers: AnswerType[];
};

type AnswerType = {
    answer: string;
};

function Question({ question }: { question: QuestionType }) {
    console.log(question);
    return <div>Question</div>;
}

export default function RequestPage() {
    const [baseSymptom, setBaseSymptom] = useState("");
    const [questions, setQuestions] = useState([]);
    const [medication, setMedication] = useState("");

    useEffect(() => {
        setQuestions([]);
    }, []);

    const { postQuestions } = useAPI();

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
                                postQuestions(baseSymptom);
                            }}
                            outlined
                            styleType='success'
                        >
                            Send
                        </Button>
                    </div>

                    {questions.length === 0 ? (
                        <div className='border border-stone-400 text-stone-400 rounded-lg flex justify-center items-center flex-1'>
                            Please enter your symptoms in order to get follow-up
                            questions.
                        </div>
                    ) : (
                        <div>
                            {questions.map((question, index) => (
                                <Question key={index} question={question} />
                            ))}
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
