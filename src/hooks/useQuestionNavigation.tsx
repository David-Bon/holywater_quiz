import { useParams, useNavigate } from 'react-router';

export const useQuestionNavigation = (questions: { id: number }[]) => {
    const { questionId, quizId } = useParams();
    const navigate = useNavigate();

    const currentQuestionId = parseInt(questionId || '1', 10);
    const currentIndex = questions.findIndex(q => q.id === currentQuestionId);

    const nextQuestion = questions[currentIndex + 1];
    const previousQuestion = questions[currentIndex - 1];

    const goNext = () => {
        if (nextQuestion) navigate(`/quiz/${quizId}/${nextQuestion.id}`);
        else navigate(`/quiz/${quizId}/email`);
    };

    const goBack = () => {
        if (previousQuestion) navigate(`/quiz/${quizId}/${previousQuestion.id}`);
    };

    return {
        currentQuestionId,
        quizId,
        currentIndex,
        nextId: nextQuestion?.id,
        prevId: previousQuestion?.id,
        goNext,
        goBack
    };
};
