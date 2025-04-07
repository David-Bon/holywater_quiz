type ButtonProps = {
    disabled?: boolean;
    onClick: () => void;
    text: string;
};

export const Button = ({ disabled, onClick, text }: ButtonProps) => {
    return (
        <button
            className="bg-[#E4229C] disabled:bg-[#89416e] disabled:text-[#bfbfbf] rounded-full py-4 text-[17px] lh-[24px] font-[800]"
            disabled={disabled}
            onClick={onClick}
        >
            {text}
        </button>
    );
};
