import React from 'react';
import { useTranslation } from 'react-i18next';

export type BubbleOptionProps = {
    value: string;
    label: string;
    emoji: string;
    selected: boolean;
    onClick: (value: string) => void;
    index: number;
};

export const BubbleOption: React.FC<BubbleOptionProps> = ({
    value,
    label,
    emoji,
    selected,
    onClick,
    index
}) => {
    const { t } = useTranslation();

    return (
        <button
            onClick={() => onClick(value)}
            className={`flex flex-col shrink-0 items-center justify-center w-24 h-24 rounded-full text-white transition font-medium shadow
        ${selected ? 'border-2 border-pink-400' : 'border-2 border-transparent'}
        bg-[#2c0f3a] hover:border-pink-300
        ${index % 4 === 1 || index % 4 === 3 ? 'mt-4' : ''}`}
        >
            <span className="text-2xl">{emoji}</span>
            <span className="text-xs mt-1 text-center leading-tight px-1">{t(label)}</span>
        </button>
    );
};
