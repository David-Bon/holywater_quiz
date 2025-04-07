import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { QuizPage } from './components/QuizPage.tsx';
import { EmailPage } from './components/EmailPage.tsx';
import { ThanksPage } from './components/ThanksPage.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/quiz/books/1" replace />} />
                <Route path="/quiz/:quizId/:questionId" element={<QuizPage />} />
                <Route path="/quiz/:quizId/email" element={<EmailPage />} />
                <Route path="/quiz/:quizId/thanks" element={<ThanksPage />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
