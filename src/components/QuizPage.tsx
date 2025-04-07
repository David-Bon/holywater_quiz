import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { QuizQuestion, useQuiz } from '../hooks/fetch-hooks/useQuiz.tsx';
import { useQuestionNavigation } from '../hooks/useQuestionNavigation.tsx';
import { Question } from './Question.tsx';
import { classNames } from '../utils/classNames.ts';
import { useQuizAnswer } from '../hooks/useQuizAnswer.tsx';
import { ProgressBar } from './ProgressBar.tsx';
import { Button } from './common/Button.tsx';

export const QuizPage = () => {
    const { quizData, getQuizData, isLoading } = useQuiz();
    const { t } = useTranslation();

    const { currentQuestionId, currentIndex, goNext, goBack, quizId } =
        useQuestionNavigation(quizData);

    const question: QuizQuestion = useMemo(() => {
        return quizData?.find(q => q.id === currentQuestionId) as QuizQuestion;
    }, [currentQuestionId, quizData]);

    const { selected, saveAnswer, allAnswers } = useQuizAnswer({
        quizId,
        questionId: currentQuestionId,
        question
    });

    useEffect(() => {
        getQuizData();
    }, []);

    return isLoading ? (
        <div className="flex justify-center items-center h-full">Loading...</div>
    ) : (
        <div className="flex flex-col w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[800px] justify-between h-full m-auto">
            <div>
                <div className="relative mb-11">
                    <button
                        disabled={currentQuestionId === 1}
                        onClick={goBack}
                        className="absolute cursor-pointer"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <polyline
                                points="15 6 9 12 15 18"
                                stroke="white"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <ProgressBar currentIndex={currentIndex} total={quizData?.length} />
                </div>
                <div className="mb-6">
                    <h2
                        className={classNames(
                            `text-[28px] lh-[34px] font-[700] text-center mb-4`,
                            question?.subtitle ? 'text-[#F2F3F5]' : 'text-white'
                        )}
                    >
                        {t(question?.title)}
                    </h2>
                    <p className="text-center text-[17px] lh-[24px] text-[#C4C8CC]">
                        {t(question?.subtitle as string)}
                    </p>
                </div>

                <div className="mb-6">
                    {/* Render custom input per type */}
                    <Question
                        question={question}
                        selected={selected}
                        saveAnswer={saveAnswer}
                        allAnswers={allAnswers}
                    />
                </div>
            </div>
            <Button onClick={goNext} disabled={!selected} text={t('Next')} />
        </div>
    );
};
