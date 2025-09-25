
import React, { useState, useEffect, useMemo } from 'react';
import { Story, User, StoryNode, StoryProgress, StoryChoice } from '../types';
import { CloseIcon, StarIcon, TrophyIcon } from '../components/Icons';
import Avatar from '../components/Avatar';
import { useLanguage } from '../i18n';

const useTypingEffect = (text: string, speed = 30) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        setDisplayedText('');
        if (text) {
            let i = 0;
            const intervalId = setInterval(() => {
                setDisplayedText(prev => prev + text.charAt(i));
                i++;
                if (i > text.length) {
                    clearInterval(intervalId);
                }
            }, speed);
            return () => clearInterval(intervalId);
        }
    }, [text, speed]);
    
    const isFinished = displayedText.length === text.length;

    return { displayedText, isFinished };
};

const StoryView: React.FC<{
    story: Story;
    user: User;
    onProgress: (storyId: string, progress: StoryProgress[string]) => void;
    onClose: () => void;
}> = ({ story, user, onProgress, onClose }) => {
    const { t } = useLanguage();
    
    const initialProgress = useMemo(() => {
        return user.storyProgress?.[story.id] || {
            currentNodeId: story.startNodeId,
            stats: { confidence: 0, responsibility: 0, empathy: 0 },
            unlockedAchievements: []
        };
    }, [story.id, story.startNodeId, user.storyProgress]);

    const [currentProgress, setCurrentProgress] = useState(initialProgress);
    const [lastAchievement, setLastAchievement] = useState<string | null>(null);

    const currentNode = useMemo(() => {
        return story.nodes.find(n => n.id === currentProgress.currentNodeId)!;
    }, [story.nodes, currentProgress.currentNodeId]);

    const character = useMemo(() => {
        if (currentNode.characterId === 'user') return { name: user.name, avatar: user.avatar };
        if (currentNode.characterId === 'narrator') return { name: t('story.narrator'), avatar: null };
        const charData = story.characters.find(c => c.id === currentNode.characterId);
        return charData ? { name: t(charData.nameKey), avatar: charData.avatar } : null;
    }, [currentNode.characterId, story.characters, user, t]);

    const dialogueText = t(currentNode.dialogueKey, { name: user.name });
    const { displayedText, isFinished: typingFinished } = useTypingEffect(dialogueText);
    
    const handleChoice = (choice: StoryChoice) => {
        if (!typingFinished) return;

        const newStats = { ...currentProgress.stats };
        if (choice.statEffects) {
            for (const key in choice.statEffects) {
                const statKey = key as keyof typeof newStats;
                newStats[statKey] += choice.statEffects[statKey] || 0;
            }
        }
        
        const newAchievements = [...currentProgress.unlockedAchievements];
        if (choice.achievementId && !newAchievements.includes(choice.achievementId)) {
            newAchievements.push(choice.achievementId);
            setLastAchievement(choice.achievementId);
            setTimeout(() => setLastAchievement(null), 4000);
        }

        const newProgress = {
            currentNodeId: choice.nextNodeId,
            stats: newStats,
            unlockedAchievements: newAchievements,
        };

        setCurrentProgress(newProgress);
        onProgress(story.id, newProgress);
    };

    const handleAdvance = () => {
        if (!typingFinished || currentNode.choices || !currentNode.nextNodeId) return;
        const newProgress = { ...currentProgress, currentNodeId: currentNode.nextNodeId };
        setCurrentProgress(newProgress);
        onProgress(story.id, newProgress);
    };

    const getCharacterPosition = (characterId: string) => {
        const positions = ['-left-8', 'right-8'];
        const index = story.characters.findIndex(c => c.id === characterId);
        if (characterId === 'user') return 'left-8';
        return positions[index % 2];
    }

    const backgroundImages = {
        school_hallway: 'bg-[url(https://i.imgur.com/8db55m7.png)]',
        classroom: 'bg-[url(https://i.imgur.com/L7p4mJT.png)]',
        home: 'bg-[url(https://i.imgur.com/L7p4mJT.png)]',
    }

    return (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-end text-white bg-cover bg-center transition-all duration-500 ${backgroundImages[currentNode.background]}`}>
            <div className="absolute inset-0 bg-primary-dark/30"></div>
             <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors">
                <CloseIcon className="w-8 h-8"/>
            </button>
            
            {lastAchievement && (
                 <div key={lastAchievement} className="absolute top-16 left-1/2 -translate-x-1/2 z-20 p-4 rounded-xl bg-gradient-to-r from-accent-pink to-accent-yellow shadow-lg flex flex-col items-center gap-2 text-center animate-fade-in-out">
                    <TrophyIcon className="w-10 h-10" />
                    <p className="font-bold">{t('story.achievement_unlocked')}</p>
                    <p className="font-semibold text-sm">{t(story.nodes.flatMap(n => n.choices ?? []).find(c => c.achievementId === lastAchievement)?.textKey ?? '')}</p>
                </div>
            )}
            
            {/* Characters */}
            <div className="absolute inset-0">
                {character?.avatar && (
                     <div className={`absolute bottom-0 w-64 h-96 transition-all duration-500 ease-in-out ${getCharacterPosition(currentNode.characterId)} ${character.name === user.name ? 'transform scale-x-[-1]' : ''}`}>
                        <Avatar avatar={character.avatar as User['avatar']} />
                    </div>
                )}
            </div>

            {/* Dialogue Box */}
            <div className="relative z-10 w-full p-4" onClick={handleAdvance}>
                <div className="w-full max-w-4xl mx-auto bg-primary-dark/80 backdrop-blur-md border-2 border-glass-border rounded-2xl p-6 shadow-2xl">
                    {character && <h3 className="text-2xl font-bold mb-4 text-accent-yellow">{character.name}</h3>}
                    <p className="text-lg min-h-[5rem]">{displayedText}{!typingFinished && <span className="animate-ping">|</span>}</p>
                    
                    {typingFinished && currentNode.choices && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            {currentNode.choices.map((choice, index) => (
                                <button key={index} onClick={() => handleChoice(choice)} className="p-4 bg-white/10 rounded-lg text-left hover:bg-white/20 hover:border-accent-pink border-2 border-transparent transition-all transform hover:scale-105">
                                    {t(choice.textKey)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
             <style>{`
                @keyframes fade-in-out {
                    0% { opacity: 0; transform: translate(-50%, -20px); }
                    20% { opacity: 1; transform: translate(-50%, 0); }
                    80% { opacity: 1; transform: translate(-50%, 0); }
                    100% { opacity: 0; transform: translate(-50%, 20px); }
                }
                .animate-fade-in-out {
                    animation: fade-in-out 4s ease-in-out forwards;
                }
            `}</style>
        </div>
    );
};

export default StoryView;
