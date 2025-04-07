import { classNames } from '../utils/classNames.ts';
import { BubbleOption } from './BubbleOption.tsx';

export const Question = ({ question, selected, saveAnswer }) => {
    const isSelected = value =>
        Array.isArray(selected) ? selected.includes(value) : selected === value;

    const renderOption = (opt, index) => {
        const { value, label, emoji, image } = opt;
        const type = question?.type;

        if (type === 'bubble') {
            return (
                <BubbleOption
                    key={value}
                    onClick={saveAnswer}
                    value={value}
                    label={label}
                    emoji={emoji}
                    index={index}
                    selected={isSelected(value)}
                />
            );
        }

        const isMultiSelect = type === 'multiple-select';
        const isImage = type === 'single-select-image';

        return (
            <div
                key={value}
                onClick={() => saveAnswer(value)}
                className={classNames(isMultiSelect && 'flex justify-between')}
                style={{
                    cursor: 'pointer',
                    fontWeight: 'normal',
                    background: isSelected(value) ? '#E4229B33' : '#36173D',
                    padding: '26px 20px',
                    borderRadius: '16px',
                    border: isSelected(value) ? '2px solid #E4229B' : '2px solid transparent',
                    fontSize: '17px',
                    lineHeight: '24px',
                    textAlign: isImage ? 'center' : undefined
                }}
            >
                {image && <img src={image} alt={label} width={80} />} {emoji} {label}
                {isMultiSelect && (
                    <div
                        className={classNames(
                            isSelected(value) ? 'bg-[#E4229B]' : 'bg-[#6D4376]',
                            'border border-solid border-[#E4229B] rounded-[6px] w-[23px] h-[23px] relative'
                        )}
                    >
                        {isSelected(value) && (
                            <svg
                                className="absolute top-[15%] left-[10%]"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 13L10 18L20 6"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div
            className={classNames(
                question?.type === 'single-select-image' ? 'flex-row justify-center' : 'flex-col',
                question?.type === 'bubble' && '!flex-row flex-wrap max-w-[500px]',
                'flex gap-3'
            )}
        >
            {question?.options?.map((opt, i) => renderOption(opt, i))}
        </div>
    );
};
