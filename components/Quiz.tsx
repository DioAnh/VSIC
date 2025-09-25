import React, { useState, useEffect } from 'react';
import { Quiz } from '../types';
import { useLanguage } from '../i18n';
import Confetti from 'react-confetti';

const CorrectAnswerAnimation: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
            <Confetti recycle={false} numberOfPieces={200} gravity={0.2} initialVelocityY={-20} tweenDuration={4000} />
            <div className="text-center animate-pop-in-out">
                <h2 className="text-6xl font-black text-green-400" style={{ textShadow: '0 0 15px rgba(134, 239, 172, 0.7)' }}>
                    {t('quiz.correct_feedback')}
                </h2>
                <p className="text-3xl font-bold text-accent-yellow mt-2" style={{ textShadow: '0 0 10px rgba(255, 216, 114, 0.7)'}}>
                    +50 {t('learning.smart_points')}
                </p>
            </div>
            <style>{`
                @keyframes pop-in-out {
                    0% { transform: scale(0.5); opacity: 0; }
                    20% { transform: scale(1.1); opacity: 1; }
                    80% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(0.8); opacity: 0; }
                }
                .animate-pop-in-out { animation: pop-in-out 2s ease-out forwards; }
                .animate-pulse { animation: pulse 1.5s infinite; }
                 @keyframes pulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7); }
                    50% { box-shadow: 0 0 0 10px rgba(52, 211, 153, 0); }
                }
            `}</style>
        </div>
    );
};

interface QuizViewProps {
    quiz: Quiz;
    onComplete: (score: number) => void;
}

const QuizView: React.FC<QuizViewProps> = ({ quiz, onComplete }) => {
    const { t } = useLanguage();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(quiz.questions.length).fill(null));
    const [isFinished, setIsFinished] = useState(false);
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

    const handleAnswerSelect = (optionIndex: number) => {
        if (feedback) return;

        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestionIndex] = optionIndex;
        setSelectedAnswers(newAnswers);

        const isCorrect = quiz.questions[currentQuestionIndex].correctAnswerIndex === optionIndex;
        setFeedback(isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            setTimeout(() => {
                handleNext();
            }, 2000);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setFeedback(null);
        } else {
            setIsFinished(true);
        }
    };
    
    const calculateScore = () => {
        const correctCount = quiz.questions.reduce((count, question, index) => {
            return selectedAnswers[index] === question.correctAnswerIndex ? count + 1 : count;
        }, 0);
        return Math.round((correctCount / quiz.questions.length) * 100);
    }
    
    if(isFinished) {
        const score = calculateScore();
        return (
            <div className="text-center p-8 text-text-light">
                <h3 className="text-2xl font-bold mb-4 text-white">{t('quiz.complete_title')}</h3>
                <p className="text-5xl font-black mb-2" style={{color: score === 100 ? '#6BCB77' : '#FF6B6B'}}>{score}%</p>
                <p className="text-text-muted mb-6">{score === 100 ? t('quiz.passed') : t('quiz.failed')}</p>
                <button onClick={() => onComplete(score)} className="bg-gradient-to-r from-accent-pink to-accent-yellow text-white font-bold py-2 px-8 rounded-lg shadow-lg transform hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-pink/40 transition-all duration-300 ease-in-out">
                    {score === 100 ? t('quiz.claim_reward') : t('quiz.continue')}
                </button>
            </div>
        )
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const selectedAnswerForCurrent = selectedAnswers[currentQuestionIndex];

    return (
        <div className="relative">
            {feedback === 'correct' && <CorrectAnswerAnimation />}
            <div className="mb-4">
                <p className="text-sm text-text-muted">{t('quiz.question_progress', { current: currentQuestionIndex + 1, total: quiz.questions.length })}</p>
                <h3 className="text-xl font-semibold mt-1 text-white">{t(currentQuestion.questionKey)}</h3>
            </div>
            <div className="space-y-3 mb-6">
                {currentQuestion.optionsKeys.map((optionKey, index) => {
                    let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ease-in-out text-text-light transform hover:-translate-y-1';
                    const isThisTheCorrectAnswer = index === currentQuestion.correctAnswerIndex;

                    if (feedback) {
                        if (isThisTheCorrectAnswer) {
                            buttonClass += ' border-green-500 bg-green-500/20 animate-pulse';
                        } else if (selectedAnswerForCurrent === index) {
                            buttonClass += ' border-red-500 bg-red-500/20';
                        } else {
                            buttonClass += ' border-glass-border bg-white/5 opacity-60';
                        }
                    } else {
                         buttonClass += ' border-glass-border bg-white/5 hover:bg-white/10 hover:border-white/20';
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={!!feedback}
                            className={buttonClass}
                        >
                            {t(optionKey)}
                        </button>
                    );
                })}
            </div>
            <button
                onClick={handleNext}
                disabled={selectedAnswerForCurrent === null || feedback === 'correct'}
                className={`w-full bg-gradient-to-r from-accent-pink to-accent-yellow text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-pink/40 ${feedback === 'correct' ? 'opacity-0' : 'opacity-100'} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                {currentQuestionIndex < quiz.questions.length - 1 ? t('quiz.next') : t('quiz.finish')}
            </button>
        </div>
    );
};

export default QuizView;