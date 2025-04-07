import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { QuizPage } from './components/QuizPage.tsx';
import { EmailPage } from './components/EmailPage.tsx';
import { ThanksPage } from './components/ThanksPage.tsx';
import { LanguageDetectorWrapper } from './components/LanguageDetectorWrapper.tsx';
import { NotFoundPage } from './components/common/NotFoundPage.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/quiz/books/1" replace />
    },
    {
        path: '/quiz/:quizId',
        element: <LanguageDetectorWrapper />,
        children: [
            {
                path: ':questionId',
                element: <QuizPage />
            },
            {
                path: 'email',
                element: <EmailPage />
            },
            {
                path: 'thanks',
                element: <ThanksPage />
            }
        ]
    },
    {
        path: '*',
        element: <NotFoundPage />
    }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
