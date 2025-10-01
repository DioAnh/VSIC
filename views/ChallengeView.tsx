

import React, { useState, useMemo } from 'react';
import { TrophyIcon, CheckCircleIcon, SparklesIcon } from '../components/Icons';
import { useLanguage } from '../i18n';
import { DAILY_CHALLENGES } from '../constants';
import { Challenge } from '../types';

interface ChallengeViewProps {
    onChallengeComplete: () => void;
}

const ChallengeView: React.FC<ChallengeViewProps> = ({ onChallengeComplete }) => {
    const { t } = useLanguage();

    const todayChallenge: Challenge = useMemo(() => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        return DAILY_CHALLENGES[dayOfYear % DAILY_CHALLENGES.length];
    }, []);

    const todayDateString = new Date().toISOString().split('T')[0];
    const storageKey = `challenge_completed_${todayDateString}`;

    const [selectedOption, setSelectedOption] = useState<number | null>(() => {
        const storedAnswer = localStorage.getItem(storageKey);
        return storedAnswer ? parseInt(storedAnswer, 10) : null;
    });

    const isCompletedToday = selectedOption !== null;
    const answeredCorrectly = isCompletedToday && selectedOption === todayChallenge.correctAnswerIndex;

    const handleSelectOption = (index: number) => {
        if (isCompletedToday) return;

        setSelectedOption(index);
        localStorage.setItem(storageKey, String(index));
        
        if (index === todayChallenge.correctAnswerIndex) {
            onChallengeComplete();
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto h-full">
            <div className="w-full bg-glass-bg backdrop-blur-lg border border-glass-border rounded-2xl shadow-2xl p-6 md:p-8 text-center">
                <TrophyIcon className="w-16 h-16 text-accent-yellow mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-text-dark mb-2">{t('challenge.title')}</h1>
                <p className="text-text-muted mb-6">{isCompletedToday ? t('challenge.completed_title') : t('challenge.subtitle')}</p>
                
                <div className="bg-primary-dark/50 p-4 rounded-xl text-left">
                    <p className="font-semibold text-lg text-text-dark mb-4">{t(todayChallenge.questionKey)}</p>
                    <div className="space-y-3">
                        {todayChallenge.optionsKeys.map((optionKey, index) => {
                             const isCorrect = index === todayChallenge.correctAnswerIndex;
                             const isSelected = selectedOption === index;
                             let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ease-in-out text-text-light';

                             if (isCompletedToday) {
                                if (isCorrect) {
                                    buttonClass += ' border-green-500 bg-green-500/20';
                                } else if (isSelected) {
                                    buttonClass += ' border-red-500 bg-red-500/20';
                                } else {
                                    buttonClass += ' border-transparent bg-white/5 opacity-60';
                                }
                             } else {
                                buttonClass += ' border-glass-border bg-white/10 hover:bg-white/20 hover:border-white/30';
                             }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleSelectOption(index)}
                                    disabled={isCompletedToday}
                                    className={buttonClass}
                                >
                                    {t(optionKey)}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {isCompletedToday && (
                    <div className="mt-6 text-left p-4 bg-glass-bg border border-glass-border rounded-xl animate-fade-in">
                        {answeredCorrectly ? (
                            <div className="flex items-center gap-3 text-green-400">
                                <CheckCircleIcon className="w-6 h-6" />
                                <p className="font-bold text-lg">{t('challenge.correct_feedback')}</p>
                            </div>
                        ) : (
                            <p className="font-bold text-lg text-red-400 mb-2">{t('challenge.incorrect_feedback')}</p>
                        )}
                         <div className="mt-4">
                            <h3 className="font-bold text-accent-yellow flex items-center gap-2 mb-2">
                                <SparklesIcon className="w-5 h-5"/>
                                {t('challenge.takeaway')}
                            </h3>
                            <p className="text-text-muted">{t(todayChallenge.explanationKey)}</p>
                        </div>
                        <p className="text-center font-bold text-accent-yellow mt-6">{t('challenge.come_back_tomorrow')}</p>
                    </div>
                )}
            </div>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ChallengeView;