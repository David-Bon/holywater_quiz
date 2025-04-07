import React from 'react';

type Props = {
    currentIndex: number; // 0-based
    total: number;
};

export const ProgressBar: React.FC<Props> = ({ currentIndex, total }) => {
    const percentage = ((currentIndex + 1) / total) * 100;

    return (
        <div className="mb-4 text-[#E8EAF2]">
            <div className="mb-3 text-sm text-center text-[18px] font-[800] lh-[20px]">
                <span className="text-[#E4229C]">{currentIndex + 1}</span>/{total}
            </div>
            <div className="w-full h-[4px] bg-[#E8EAF2] rounded-full">
                <div
                    className="h-full bg-[#E4229C] rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};
