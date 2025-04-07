import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const CircularLoader = ({ duration = 5000 }) => {
    const [progress, setProgress] = useState(0);
    const { t } = useTranslation();

    useEffect(() => {
        const start = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const percent = Math.min(100, Math.round((elapsed / duration) * 100));
            setProgress(percent);
            if (percent === 100) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const radius = 60;
    const stroke = 10;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <svg height={radius * 2} width={radius * 2}>
                <circle
                    stroke="#ddd"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke="#E4229C"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    transform={`rotate(-90 ${radius} ${radius})`}
                />
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    className="fill-white text-[20px] font-bold"
                >
                    {progress}%
                </text>
            </svg>
            <p className="text-white text-sm mt-6">{t('Finding collections for you...')}</p>
        </div>
    );
};

export default CircularLoader;
