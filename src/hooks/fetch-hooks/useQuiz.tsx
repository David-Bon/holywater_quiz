import { useState } from 'react';
import { useParams } from 'react-router';
import man from '../../assets/man.png';
import woman from '../../assets/woman.png';
import winking_face from '../../assets/winking_face.png';
import cinema from '../../assets/cinema.png';
import house from '../../assets/house.png';
import man_walking from '../../assets/man_walking.png';
export type QuestionType = 'single-select' | 'single-select-image' | 'multiple-select' | 'bubble';

export type BaseOption = {
    value: string;
    label: string;
};

export type ImageOption = BaseOption & {
    image: string;
};

export type BubbleOption = BaseOption & {
    emoji: string;
    groups: string[];
};

export type QuizQuestion =
    | {
          id: number;
          title: string;
          subtitle?: string;
          type: 'single-select' | 'multiple-select';
          options: BaseOption[];
      }
    | {
          id: number;
          title: string;
          subtitle?: string;
          type: 'single-select-image';
          options: ImageOption[];
      }
    | {
          id: number;
          title: string;
          subtitle?: string;
          type: 'bubble';
          options: BubbleOption[];
      };

type QuizData = {
    quizId: string;
    results: QuizQuestion[];
};

const mockData: QuizData[] = [
    {
        quizId: 'books',
        results: [
            {
                id: 1,
                title: 'What is your preferred language?',
                subtitle: 'Choose language',
                type: 'single-select',
                options: [
                    { value: 'en', label: 'English' },
                    { value: 'fr', label: 'French' },
                    { value: 'gr', label: 'German' },
                    { value: 'sp', label: 'Spanish' }
                ]
            },
            {
                id: 2,
                title: 'What gender do you identify with?',
                subtitle: 'Please share how do you identify yourself',
                type: 'single-select-image',
                options: [
                    { value: 'female', label: 'Female', image: woman },
                    { value: 'male', label: 'Male', image: man },
                    { value: 'other', label: 'Other', image: winking_face }
                ]
            },
            {
                id: 3,
                title: 'What is your age?',
                subtitle: '',
                type: 'single-select',
                options: [
                    { value: 'young_adult', label: '18-29 years' },
                    { value: 'adult', label: '30-39 years' },
                    { value: 'other', label: '40-49 years' },
                    { value: 'senior', label: '50+' }
                ]
            },
            {
                id: 4,
                title: 'What do you hate the most in a book?',
                subtitle: '',
                type: 'multiple-select',
                options: [
                    { value: 'logic_lack', label: 'Lack of logic' },
                    { value: 'slow_speed', label: 'A slow speed' },
                    { value: 'humor_lack', label: 'Lack of humor' },
                    { value: 'generic_ending', label: 'Way too generic ending' }
                ]
            },
            {
                id: 5,
                title: 'What are your favorite topics?',
                subtitle: 'Choose up to 3 topics you like',
                type: 'bubble',
                options: [
                    {
                        value: 'romance',
                        label: 'Romance',
                        emoji: '❤️',
                        groups: ['young_adult', 'adult', 'woman', 'other']
                    },
                    {
                        value: 'fantasy',
                        label: 'Fantasy',
                        emoji: '🐉',
                        groups: ['young_adult', 'man', 'woman', 'other']
                    },
                    {
                        value: 'self_improvement',
                        label: 'Self-Improvement',
                        emoji: '🧠',
                        groups: ['young_adult', 'adult', 'man', 'woman', 'other']
                    },
                    {
                        value: 'science_fiction',
                        label: 'Science Fiction',
                        emoji: '🚀',
                        groups: ['young_adult', 'adult', 'man', 'other']
                    },
                    {
                        value: 'mystery',
                        label: 'Mystery',
                        emoji: '🕵️‍♂️',
                        groups: ['adult', 'other', 'woman']
                    },
                    {
                        value: 'business',
                        label: 'Business',
                        emoji: '💼',
                        groups: ['adult', 'man', 'woman']
                    },
                    {
                        value: 'finance',
                        label: 'Finance',
                        emoji: '💰',
                        groups: ['adult', 'man']
                    },
                    {
                        value: 'technology',
                        label: 'Technology',
                        emoji: '💻',
                        groups: ['young_adult', 'adult', 'man', 'other']
                    },
                    {
                        value: 'biography',
                        label: 'Biography',
                        emoji: '👤',
                        groups: ['adult', 'senior', 'man', 'woman']
                    },
                    {
                        value: 'history',
                        label: 'History',
                        emoji: '📜',
                        groups: ['other', 'senior', 'man', 'woman']
                    },
                    {
                        value: 'philosophy',
                        label: 'Philosophy',
                        emoji: '🧘',
                        groups: ['adult', 'other']
                    },
                    {
                        value: 'psychology',
                        label: 'Psychology',
                        emoji: '🧩',
                        groups: ['young_adult', 'adult', 'other', 'man', 'woman']
                    },
                    {
                        value: 'health_fitness',
                        label: 'Health & Fitness',
                        emoji: '🏋️‍♂️',
                        groups: ['adult', 'man', 'woman']
                    },
                    {
                        value: 'spirituality',
                        label: 'Spirituality',
                        emoji: '🔮',
                        groups: ['other', 'senior', 'woman']
                    },
                    {
                        value: 'cooking',
                        label: 'Cooking',
                        emoji: '🍳',
                        groups: ['senior', 'woman', 'man']
                    },
                    {
                        value: 'travel',
                        label: 'Travel',
                        emoji: '🌍',
                        groups: ['young_adult', 'adult', 'woman', 'other']
                    },
                    {
                        value: 'art',
                        label: 'Art',
                        emoji: '🎨',
                        groups: ['other', 'senior', 'woman']
                    },
                    {
                        value: 'poetry',
                        label: 'Poetry',
                        emoji: '✒️',
                        groups: ['senior', 'woman']
                    },
                    {
                        value: 'parenting',
                        label: 'Parenting',
                        emoji: '👶',
                        groups: ['senior', 'woman', 'man']
                    },
                    {
                        value: 'education',
                        label: 'Education',
                        emoji: '📚',
                        groups: ['other', 'senior', 'woman', 'man']
                    },
                    {
                        value: 'environmental',
                        label: 'Environmental',
                        emoji: '🌱',
                        groups: ['other']
                    }
                ]
            }
        ]
    },
    {
        quizId: 'movies',
        results: [
            {
                id: 1,
                title: 'What type of movies do you usually watch?',
                subtitle: 'Pick one that fits your taste best',
                type: 'single-select',
                options: [
                    { value: 'blockbuster', label: 'Blockbusters' },
                    { value: 'indie', label: 'Indie Films' },
                    { value: 'documentary', label: 'Documentaries' },
                    { value: 'classic', label: 'Classics' }
                ]
            },
            {
                id: 2,
                title: 'How do you usually watch movies?',
                subtitle: 'Choose your favorite environment',
                type: 'single-select-image',
                options: [
                    { value: 'cinema', label: 'Cinema', image: cinema },
                    { value: 'home', label: 'At Home', image: house },
                    { value: 'mobile', label: 'On the Go', image: man_walking }
                ]
            },
            {
                id: 3,
                title: 'Who do you usually watch movies with?',
                subtitle: '',
                type: 'single-select',
                options: [
                    { value: 'alone', label: 'Alone' },
                    { value: 'partner', label: 'Partner' },
                    { value: 'family', label: 'Family' },
                    { value: 'friends', label: 'Friends' }
                ]
            },
            {
                id: 4,
                title: 'What do you dislike the most in a movie?',
                subtitle: '',
                type: 'multiple-select',
                options: [
                    { value: 'predictable', label: 'Predictable plot' },
                    { value: 'bad_acting', label: 'Bad acting' },
                    { value: 'overlong', label: 'Too long' },
                    { value: 'poor_visuals', label: 'Poor visuals' }
                ]
            },
            {
                id: 5,
                title: 'Pick up to 3 of your favorite genres',
                subtitle: 'Your selection helps us recommend better movies',
                type: 'bubble',
                options: [
                    {
                        value: 'action',
                        label: 'Action',
                        emoji: '🔥',
                        groups: ['blockbuster', 'cinema']
                    },
                    { value: 'comedy', label: 'Comedy', emoji: '😂', groups: ['home', 'friends'] },
                    { value: 'drama', label: 'Drama', emoji: '🎭', groups: ['classic', 'partner'] },
                    { value: 'horror', label: 'Horror', emoji: '👻', groups: ['alone', 'home'] },
                    { value: 'romance', label: 'Romance', emoji: '💘', groups: ['partner'] },
                    {
                        value: 'sci_fi',
                        label: 'Sci-Fi',
                        emoji: '🚀',
                        groups: ['blockbuster', 'home']
                    },
                    {
                        value: 'thriller',
                        label: 'Thriller',
                        emoji: '🔪',
                        groups: ['alone', 'cinema']
                    },
                    {
                        value: 'animation',
                        label: 'Animation',
                        emoji: '🐭',
                        groups: ['family', 'home']
                    },
                    { value: 'fantasy', label: 'Fantasy', emoji: '🧙‍♂️', groups: ['indie'] },
                    { value: 'musical', label: 'Musical', emoji: '🎶', groups: ['classic'] },
                    {
                        value: 'historical',
                        label: 'Historical',
                        emoji: '🏰',
                        groups: ['documentary']
                    },
                    {
                        value: 'documentary',
                        label: 'Documentary',
                        emoji: '🎬',
                        groups: ['documentary', 'indie']
                    }
                ]
            }
        ]
    }
];

export const useQuiz = () => {
    const { quizId } = useParams();
    const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const getQuizData = async () => {
        try {
            setIsLoading(true);
            const data: QuizData[] = await new Promise(resolve => {
                setTimeout(() => {
                    resolve(mockData);
                }, 300);
            });

            setQuizData(data?.find(el => el?.quizId === quizId)?.results as QuizQuestion[]);
        } catch (error) {
            console.error('Failed to load quiz data', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        getQuizData,
        quizData,
        isLoading
    };
};
