import { useEffect, useState } from 'react';

type Option = { value: string; label: string };
type QuestionMeta = {
    title: string;
    type: string;
    options?: Option[];
};

type Props = {
    quizId: string;
    questionId?: string | number;
    question?: QuestionMeta;
};

export const useQuizAnswer = ({ quizId, questionId, question }: Props) => {
    const key = `quiz-${quizId}-answers`;
    const [selected, setSelected] = useState<string | string[] | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem(key);
        if (stored) {
            const parsed = JSON.parse(stored);
            setSelected(parsed[questionId]?.value ?? null);
        }
    }, [key, questionId]);

    const saveAnswer = (
        value: string | string[],
        customMeta?: { title?: string; type?: string; label?: string }
    ) => {
        const stored = localStorage.getItem(key);
        const parsed = stored ? JSON.parse(stored) : {};

        const getLabels = (vals: string | string[]) => {
            const lookup = (question?.options || []).reduce(
                (acc, opt) => {
                    acc[opt.value] = opt.label;
                    return acc;
                },
                {} as Record<string, string>
            );

            return Array.isArray(vals) ? vals.map(v => lookup[v] ?? v) : (lookup[vals] ?? vals);
        };

        if (question?.type === 'multiple-select' || question?.type === 'bubble') {
            const current = parsed[questionId]?.value || [];
            const updated = Array.isArray(value)
                ? value
                : current.includes(value)
                  ? current.filter((v: string) => v !== value)
                  : [...current, value];

            if (question?.type === 'bubble' && updated.length > 3) return;

            parsed[questionId] = {
                title: customMeta?.title || question?.title,
                type: customMeta?.type || question?.type,
                value: updated,
                label: customMeta?.label || getLabels(updated)
            };

            setSelected(updated);
        } else {
            parsed[questionId] = {
                title: customMeta?.title || question?.title,
                type: customMeta?.type || question?.type,
                value,
                label: customMeta?.label || getLabels(value)
            };

            setSelected(value);
        }

        localStorage.setItem(key, JSON.stringify(parsed));
    };

    return { selected, saveAnswer };
};
