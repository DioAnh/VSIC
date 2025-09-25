

import React from 'react';
import { EducationalLevel, Level, User } from '../types';
import { CertificateIcon, CloseIcon, TrophyIcon } from '../components/Icons';
import { useLanguage } from '../i18n';
import { ALL_ACHIEVEMENTS } from '../constants';

interface AchievementsViewProps {
    user: User;
    levels: Level[];
    onBack: () => void;
}

const CertificateCard: React.FC<{ levelNameKey: string; date: string }> = ({ levelNameKey, date }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-glass-bg border border-glass-border rounded-xl shadow-lg p-6 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-400/30 transition-all duration-300 ease-in-out">
            <div className="flex items-center gap-4">
                <CertificateIcon className="w-12 h-12 text-green-400" />
                <div>
                    <h3 className="text-xl font-bold text-white">{t(levelNameKey)}</h3>
                    <p className="text-sm text-text-muted">{t('achievements.completed_on')} {date}</p>
                </div>
            </div>
        </div>
    );
};

const StoryAchievementCard: React.FC<{ achievementId: string }> = ({ achievementId }) => {
    const { t } = useLanguage();
    const achievement = ALL_ACHIEVEMENTS.find(a => a.id === achievementId);
    if (!achievement) return null;

    return (
        <div className="bg-glass-bg border border-glass-border rounded-xl shadow-lg p-6 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-yellow/30 transition-all duration-300 ease-in-out">
            <div className="flex items-center gap-4">
                <TrophyIcon className="w-12 h-12 text-accent-yellow" />
                <div>
                    <h3 className="text-xl font-bold text-white">{t(achievement.nameKey)}</h3>
                    <p className="text-sm text-text-muted">{t(achievement.descriptionKey)}</p>
                </div>
            </div>
        </div>
    );
};


const AchievementsView: React.FC<AchievementsViewProps> = ({ user, levels, onBack }) => {
    const { t } = useLanguage();
    const { completedLevels, storyProgress } = user;

    const unlockedStoryAchievements = Object.values(storyProgress || {}).flatMap(p => p.unlockedAchievements);

    const getLevelNameKey = (levelId: EducationalLevel) => {
        return levels.find(l => l.id === levelId)?.nameKey || 'Unknown Level';
    };

    const MOCK_DATES = ["August 1, 2024", "September 15, 2024", "October 20, 2024"];

    return (
        <div className="fixed inset-0 bg-primary-dark/80 backdrop-blur-sm z-50 p-4 sm:p-8 animate-fade-in overflow-y-auto">
            <div className="w-full max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-white">{t('achievements.title')}</h1>
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10 transition-colors transform hover:scale-110">
                        <CloseIcon className="w-8 h-8 text-text-muted" />
                    </button>
                </div>

                <p className="text-lg text-text-muted mb-10">
                    {t('achievements.subtitle', { name: user.name })}
                </p>

                {completedLevels.length > 0 && (
                    <div className="mb-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {completedLevels.map((levelId, index) => (
                                <CertificateCard key={levelId} levelNameKey={getLevelNameKey(levelId)} date={MOCK_DATES[index] || new Date().toLocaleDateString()} />
                            ))}
                        </div>
                    </div>
                )}

                {unlockedStoryAchievements.length > 0 && (
                     <div className="mb-10">
                        <h2 className="text-2xl font-bold text-white mb-4">{t('achievements.story_achievements_title')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {unlockedStoryAchievements.map((achieveId) => (
                                <StoryAchievementCard key={achieveId} achievementId={achieveId} />
                            ))}
                        </div>
                    </div>
                )}


                {completedLevels.length === 0 && unlockedStoryAchievements.length === 0 && (
                    <div className="text-center bg-glass-bg border border-glass-border rounded-xl p-12">
                        <h3 className="text-2xl font-bold text-white">{t('achievements.empty_title')}</h3>
                        <p className="text-text-muted mt-2">{t('achievements.empty_subtitle')}</p>
                    </div>
                )}
            </div>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default AchievementsView;