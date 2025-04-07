import { Button } from './common/Button.tsx';
import { useNavigate, useParams } from 'react-router';
import { classNames } from '../utils/classNames.ts';
import thanksImage from '../assets/thanksImage.png';
import { DownloadButton } from './common/DownloadButton.tsx';
import { useTranslation } from 'react-i18next';

export const ThanksPage = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const answersKey = `quiz-${quizId}-answers`;

    const handleRetakeQuiz = () => {
        localStorage.removeItem(answersKey);
        navigate(`/quiz/${quizId}/1`);
    };

    return (
        <div className="flex flex-col w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[800px] justify-between h-full m-auto">
            <div>
                <div className="mb-[62px] mt-[92px]">
                    <h2
                        className={classNames(
                            'text-[28px] lh-[34px] font-[700] text-center mb-4',
                            'text-[#F2F3F5]'
                        )}
                    >
                        {t('Thank you!')}
                    </h2>
                    <p className="text-center text-[17px] lh-[24px] text-[#C4C8CC]">
                        {t('for supporting us and passing quiz')}
                    </p>
                </div>
                <div className="flex justify-center items-center">
                    <img src={thanksImage} alt="Thank you" />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <DownloadButton />
                <Button text={t('Retake quiz')} onClick={handleRetakeQuiz} />
            </div>
        </div>
    );
};
