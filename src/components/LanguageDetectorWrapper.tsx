import { useEffect } from 'react';
import i18n from '../i18n.tsx';
import { Outlet, useParams } from 'react-router';

export function LanguageDetectorWrapper() {
    const { quizId, questionId } = useParams();

    //need to improve language setting process, right now we rely on first question from API, this is a bad approach. Should move language selection to the separate functionality
    useEffect(() => {
        if (!quizId) return;
        try {
            const raw = localStorage.getItem(`quiz-${quizId}-answers`);
            const parsed = JSON.parse(raw || '[]');
            const lang = parsed?.[1]?.value || 'en';
            i18n?.changeLanguage(lang);
        } catch (e) {
            i18n?.changeLanguage('en');
        }
    }, [quizId, questionId]);

    return <Outlet />;
}
