import { classNames } from '../utils/classNames.ts';
import { useState } from 'react';
import { Button } from './common/Button.tsx';
import { useQuizAnswer } from '../hooks/useQuizAnswer.tsx';
import { useNavigate, useParams } from 'react-router';

// RFC 5322-compliant email regex
const emailRegex =
    // eslint-disable-next-line no-control-regex
    /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:[0-9]{1,3}\.){3}[0-9]{1,3}\]))$/;

export const EmailPage = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [touched, setTouched] = useState(false);
    const { saveAnswer } = useQuizAnswer({ quizId, questionId: 'email' });
    const isValid = emailRegex.test(email);
    const showError = touched && email.length > 0 && !isValid;

    const handleClick = () => {
        if (!isValid) return;
        saveAnswer(email, { title: 'Email', type: 'email', label: email });
        navigate(`/quiz/${quizId}/thanks`);
    };

    return (
        <div className="flex flex-col w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[800px] justify-between h-full m-auto">
            <div>
                <div className="mb-[56px] mt-[92px]">
                    <h2
                        className={classNames(
                            'text-[28px] lh-[34px] font-[700] text-center mb-4',
                            'text-[#F2F3F5]'
                        )}
                    >
                        Email
                    </h2>
                    <p className="text-center text-[17px] lh-[24px] text-[#C4C8CC]">
                        Enter your email to get full access
                    </p>
                </div>

                <div className="mb-4">
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onBlur={() => setTouched(true)}
                        placeholder="Your email"
                        className={classNames(
                            'w-full py-[26px] px-[20px] text-[17px] rounded-[16px] outline-none border-[2px]',
                            isValid
                                ? 'border-[#36173D] bg-[#36173D]'
                                : 'border-[#E4229B] bg-[#36173D] focus:border-[#D0006E]'
                        )}
                    />
                </div>

                {showError && (
                    <div className="mb-6 text-[14px] text-[#E4229B] text-center">
                        Please enter a valid email address.
                    </div>
                )}

                <div className="mb-6 text-[12px] lh-[18px] text-center text-[#B6B8C3]">
                    By continuing I agree with Privacy policy and Terms of use.
                </div>
            </div>

            <Button onClick={handleClick} disabled={!isValid} text={'Next'} />
        </div>
    );
};
