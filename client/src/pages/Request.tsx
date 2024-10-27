import { useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import FormCard from "../components/FormCard";
import useAPI from "../api/HealthAPI";

type QuestionType = {
    question: string;
    answers: string[];
};

type QuestionProps = {
    question: string;
    answers: string[];
    selectedAnswer: number;
    onChange: (index: number) => void;
};

function Question({
    question,
    answers,
    selectedAnswer,
    onChange,
}: QuestionProps) {
    return (
        <div className='flex flex-col'>
            <p className='py-5'>{question}</p>
            <div className='flex flex-col gap-2'>
                {answers.map((answer, index) => (
                    <div
                        key={index}
                        className='flex flex-row gap-4 items-center'
                    >
                        <input
                            type='radio'
                            id={`answer_${index}`}
                            value={answer}
                            checked={selectedAnswer === index}
                            onClick={() => onChange && onChange(index)}
                            className={`w-6 h-6 ${
                                selectedAnswer === index
                                    ? "bg-emerald-400 border-emerald-500"
                                    : "bg-white border-gray-300"
                            } text-emerald-500 border-2 rounded focus:ring-emerald-500`}
                        />
                        <label htmlFor={`answer_${index}`}>{answer}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function RequestPage() {
    const [baseSymptom, setBaseSymptom] = useState("");
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<number[]>([
        -1, -1, -1,
    ]);
    const [medication, setMedication] = useState("");
    const [loadingQuestions, setLoadingQuestions] = useState(false);

    const [currentQuestion, setCurrentQuestion] = useState(1);

    const [activity, setActivity] = useState("");
    const [waterConsumed, setWaterConsumed] = useState("");
    const [foodConsumed, setFoodConsumed] = useState("");
    const [sleep, setSleep] = useState("");

    const [step, setStep] = useState(1);

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

    function uploadAllData() {
        // Upload all data to the server
        setStep(2);
    }

    return (
        <div className='flex flex-col gap-6 px-6'>
            <div className='flex flex-row items-center gap-6'>
                <button
                    onClick={() => setStep(1)}
                    className='aspect-square flex justify-center items-center rounded-full bg-emerald-400 h-[3.5rem] w-[3.5rem]'
                >
                    <p className='text-2xl text-bold text-white font-black'>
                        1
                    </p>
                </button>
                <div
                    onClick={() => setStep(1)}
                    className="before:content-[''] bg-emerald-400 h-3 w-full rounded-full"
                ></div>
                <button
                    onClick={uploadAllData}
                    className={
                        (step === 2 ? "bg-emerald-400" : "bg-zinc-300") +
                        " aspect-square flex justify-center items-center rounded-full h-[3.5rem] w-[3.5rem]"
                    }
                >
                    <p className='text-2xl text-bold text-white font-black'>
                        2
                    </p>
                </button>
                <div
                    onClick={uploadAllData}
                    className={
                        (step === 2 ? "bg-emerald-400" : "bg-zinc-300") +
                        " before:content-[''] h-3 w-full rounded-full"
                    }
                ></div>
            </div>
            {step === 1 && (
                <>
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
                                onChange={(value) =>
                                    setBaseSymptom(value as string)
                                }
                            />

                            <div className='flex flex-row justify-between items-center py-4'>
                                <label className='text-sm font-semibold text-stone-400'>
                                    The quality of your answers will determine
                                    the accuracy of the results.
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
                                        ? "Preparing follow-up questions..."
                                        : "Please enter your symptoms in order to get follow-up questions."}
                                </div>
                            ) : (
                                <>
                                    <h3 className='text-xl font-bold text-stone-700 pb-6'>
                                        Follow-up Questions
                                    </h3>
                                    <div className='flex flex-row justify-between items-center'>
                                        <button
                                            onClick={() => {
                                                setCurrentQuestion(
                                                    currentQuestion - 1
                                                );
                                            }}
                                            disabled={currentQuestion === 0}
                                            className={
                                                "flex justify-center items-center rounded-full " +
                                                (currentQuestion === 0
                                                    ? "text-zinc-400"
                                                    : "hover:bg-zinc-200")
                                            }
                                        >
                                            <span className='material-symbols-rounded text-[2.25rem]'>
                                                navigate_before
                                            </span>
                                        </button>
                                        <p className='text-md font-medium'>
                                            Question {currentQuestion + 1} of{" "}
                                            {questions.length}
                                        </p>
                                        <button
                                            onClick={() => {
                                                setCurrentQuestion(
                                                    currentQuestion + 1
                                                );
                                            }}
                                            disabled={
                                                currentQuestion ===
                                                questions.length - 1
                                            }
                                            className={
                                                "flex justify-center items-center rounded-full " +
                                                (currentQuestion ===
                                                questions.length - 1
                                                    ? "text-zinc-400"
                                                    : "hover:bg-zinc-200")
                                            }
                                        >
                                            <span className='material-symbols-rounded text-[2.25rem]'>
                                                navigate_next
                                            </span>
                                        </button>
                                    </div>
                                    <Question
                                        selectedAnswer={
                                            selectedAnswer[currentQuestion]
                                        }
                                        question={
                                            questions[currentQuestion].question
                                        }
                                        answers={
                                            questions[currentQuestion].answers
                                        }
                                        onChange={(answerIndex) =>
                                            setSelectedAnswer((prev) => {
                                                const newAnswers = [...prev];
                                                newAnswers[currentQuestion] =
                                                    answerIndex;
                                                return newAnswers;
                                            })
                                        }
                                    />
                                </>
                            )}
                        </FormCard>

                        <div className='flex flex-col flex-1 gap-6'>
                            <FormCard title='Medication section'>
                                <Input
                                    value={medication}
                                    onChange={(value) =>
                                        setMedication(value as string)
                                    }
                                    id='medication'
                                    label='Medication'
                                    textarea
                                    rows={4}
                                />

                                <p className='text-sm font-semibold text-stone-400 pt-4'>
                                    Please enter your current medication
                                    treatment
                                </p>
                            </FormCard>

                            <FormCard title='Context'>
                                <p className='text-sm font-semibold text-stone-400 pb-5'>
                                    If possible, please provide some context to
                                    your current state.
                                </p>
                                <div className='flex flex-col gap-6'>
                                    <Input
                                        id='activity-q'
                                        label='What did you do earlier?'
                                        value={activity}
                                        onChange={(val) =>
                                            setActivity(val as string)
                                        }
                                    />
                                    <Input
                                        id='water-q'
                                        label='Have much water did you consume today?'
                                        value={waterConsumed}
                                        onChange={(val) =>
                                            setWaterConsumed(val as string)
                                        }
                                    />
                                    <Input
                                        id='food-q'
                                        label='What did you eat today/yesterday?'
                                        value={foodConsumed}
                                        onChange={(val) =>
                                            setFoodConsumed(val as string)
                                        }
                                    />
                                    <Input
                                        id='sleep-q'
                                        label='How well rested are you?'
                                        value={sleep}
                                        onChange={(val) =>
                                            setSleep(val as string)
                                        }
                                    />
                                </div>
                            </FormCard>
                        </div>
                    </div>
                </>
            )}
            {step === 2 && (
                <FormCard title='Referrals' className='h-full'>
                    <label className='text-sm font-semibold text-stone-400'>
                        We will send your referral to the following specialist.
                    </label>
                </FormCard>
            )}
        </div>
    );
}
