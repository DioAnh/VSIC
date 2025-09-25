

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { User, Level, GameState, EducationalLevel, AvatarItem, Lesson, Quiz, QuizQuestion, Story, StoryProgress } from './types';
import { getMockLevels, AVATAR_REWARDS, TOPPERS, BODY_SHAPES, EYES, MOUTHS } from './constants';
import AuthView from './views/AuthView';
import OnboardingView from './views/OnboardingView';
import LearningView from './views/LearningView';
import CertificateView from './views/CertificateView';
import AchievementsView from './views/AchievementsView';
import GlossaryView from './views/GlossaryView';
import StoryView from './views/StoryView';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import Confetti from 'react-confetti';
import { useLanguage } from './i18n';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'vi' : 'en');
    };

    return (
        <button
            onClick={toggleLanguage}
            className="fixed top-4 right-4 z-50 bg-glass-bg backdrop-blur-lg border border-glass-border text-white font-bold py-2 px-4 rounded-full text-sm shadow-lg hover:bg-white/20 transition-all"
        >
            {language.toUpperCase()}
        </button>
    );
};

const App: React.FC = () => {
    const { t, language } = useLanguage();
    const [gameState, setGameState] = useState<GameState>(GameState.Authentication);
    const [user, setUser] = useState<User | null>(null);
    const [levels, setLevels] = useState<Level[]>(() => getMockLevels(t));
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const [showCertificate, setShowCertificate] = useState<{ levelNameKey: string; userName: string; } | null>(null);
    const [lastReward, setLastReward] = useState<AvatarItem | null>(null);
    const [showAchievements, setShowAchievements] = useState(false);
    const [showGlossary, setShowGlossary] = useState(false);
    const [initialGlossarySearch, setInitialGlossarySearch] = useState('');
    const [activeStory, setActiveStory] = useState<Story | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        setLevels(getMockLevels(t));
    }, [language, t]);

    const handleLogin = useCallback(() => {
        const storedUser = localStorage.getItem('abcde_user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setLevels(prevLevels => prevLevels.map(level => ({
                ...level,
                lessons: level.lessons.map(lesson => ({
                    ...lesson,
                    completed: !!parsedUser.progress[lesson.id]
                })),
                unlocked: level.id <= parsedUser.levelId || parsedUser.completedLevels.includes(level.id),
            })));
            setGameState(GameState.Learning);
        } else {
             const mockUser: User = {
                name: "",
                levelId: EducationalLevel.PreschoolElementary,
                avatar: {
                    stage: 1,
                    bodyShape: BODY_SHAPES[0],
                    bodyColor: '#A7F3D0',
                    bellyColor: '#FDE68A', 
                    topper: TOPPERS[0],
                    eyes: EYES[0],
                    mouth: MOUTHS[0],
                    outfit: [],
                },
                progress: {},
                points: 0,
                completedLevels: [],
                storyProgress: {},
            };
            setUser(mockUser);
            setGameState(GameState.OnboardingProfile);
        }
    }, []);

    const handleProfileSubmit = useCallback((name: string, level: EducationalLevel) => {
        setUser(prev => prev ? { ...prev, name, levelId: level } : null);
        setLevels(prevLevels => prevLevels.map(l => ({...l, unlocked: l.id === level})));
        setGameState(GameState.OnboardingAvatar);
    }, []);

    const handleAvatarCreated = useCallback((avatar: User['avatar']) => {
        setUser(prev => {
            if (!prev) return null;
            const updatedUser = { ...prev, avatar };
            localStorage.setItem('abcde_user', JSON.stringify(updatedUser));
            return updatedUser;
        });
        setGameState(GameState.Learning);
    }, []);

    const handleLessonClick = useCallback((lesson: Lesson) => {
        setActiveLesson(lesson);
    }, []);

    const handleQuizComplete = useCallback((lesson: Lesson, score: number) => {
        if (score === 100) {
            setUser(prevUser => {
                if (!prevUser) return null;
                const updatedProgress = { ...prevUser.progress, [lesson.id]: true };
                
                const rewardOptions = AVATAR_REWARDS[prevUser.levelId];
                const newReward = rewardOptions[Math.floor(Math.random() * rewardOptions.length)];
                setLastReward(newReward);
                
                const updatedOutfit = [...prevUser.avatar.outfit, newReward];
                const updatedUser = { 
                    ...prevUser, 
                    progress: updatedProgress, 
                    avatar: { ...prevUser.avatar, outfit: updatedOutfit },
                    points: prevUser.points + 50 
                };
                
                localStorage.setItem('abcde_user', JSON.stringify(updatedUser));
                return updatedUser;
            });
            setLevels(prevLevels => prevLevels.map(level => ({
                ...level,
                lessons: level.lessons.map(l => l.id === lesson.id ? { ...l, completed: true } : l)
            })));
        }
        setActiveLesson(null);
    }, []);

    const handleFinalTestComplete = useCallback((level: Level, score: number) => {
        if (score === 100 && user) {
            const currentLevelIndex = levels.findIndex(l => l.id === level.id);
            const nextLevel = levels[currentLevelIndex + 1];

            setShowCertificate({ levelNameKey: level.nameKey, userName: user.name });
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000); // Confetti for 5 seconds

            setUser(prevUser => {
                if (!prevUser) return null;
                const updatedUser = { 
                    ...prevUser,
                    levelId: nextLevel ? nextLevel.id : prevUser.levelId,
                    avatar: { ...prevUser.avatar, stage: prevUser.avatar.stage + 1 },
                    points: prevUser.points + 100,
                    completedLevels: [...prevUser.completedLevels, level.id]
                };
                localStorage.setItem('abcde_user', JSON.stringify(updatedUser));
                return updatedUser;
            });

            if (nextLevel) {
                setLevels(prevLevels => prevLevels.map((l, index) => ({
                    ...l,
                    unlocked: index <= currentLevelIndex + 1
                })));
            }
        }
    }, [user, levels]);
    
    const handleStartStory = useCallback((story: Story) => {
        setActiveStory(story);
    }, []);

    const handleCloseStory = useCallback(() => {
        setActiveStory(null);
    }, []);

    const handleStoryProgress = useCallback((storyId: string, progress: StoryProgress[string]) => {
        setUser(prevUser => {
            if (!prevUser) return null;
            const updatedProgress = {
                ...prevUser.storyProgress,
                [storyId]: progress
            };
            const updatedUser = { ...prevUser, storyProgress: updatedProgress };
            localStorage.setItem('abcde_user', JSON.stringify(updatedUser));
            return updatedUser;
        });
    }, []);


    const handleCloseCertificate = () => {
        setShowCertificate(null);
    };
    
    const handleShowGlossary = (searchTerm: string = '') => {
        setInitialGlossarySearch(searchTerm);
        setShowGlossary(true);
    };

    const handleCloseGlossary = () => {
        setShowGlossary(false);
        setInitialGlossarySearch(''); // Reset on close
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id && user) {
             const allInventoryItems = [...user.avatar.outfit, ...Object.values(AVATAR_REWARDS).flat()];
             const uniqueInventory = allInventoryItems.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)
             const activeItem = uniqueInventory.find(item => item.id === active.id);
            
            if (!activeItem || activeItem.type === 'topper') return;

            setUser(prevUser => {
                if (!prevUser) return null;
                
                // This logic equips one item per type (e.g., one outfit, one accessory), replacing any existing one.
                const newOutfit = prevUser.avatar.outfit.filter(item => item.type !== activeItem.type);
                newOutfit.push(activeItem);
                
                const updatedUser = { ...prevUser, avatar: { ...prevUser.avatar, outfit: newOutfit }};
                localStorage.setItem('abcde_user', JSON.stringify(updatedUser));
                return updatedUser;
            });
        }
    };


    const renderContent = () => {
        if (activeStory && user) {
            return <StoryView story={activeStory} user={user} onProgress={handleStoryProgress} onClose={handleCloseStory} />;
        }
        if (showGlossary) {
            return <GlossaryView levels={levels} onBack={handleCloseGlossary} initialSearch={initialGlossarySearch} />;
        }
        if (showAchievements && user) {
            return <AchievementsView user={user} levels={levels} onBack={() => setShowAchievements(false)} />;
        }
        if (showCertificate) {
            return <CertificateView levelNameKey={showCertificate.levelNameKey} userName={showCertificate.userName} onBack={handleCloseCertificate} />;
        }

        switch (gameState) {
            case GameState.Authentication:
                return <AuthView onLogin={handleLogin} />;
            case GameState.OnboardingProfile:
            case GameState.OnboardingAvatar:
                return <OnboardingView 
                            gameState={gameState} 
                            onProfileSubmit={handleProfileSubmit} 
                            onAvatarCreated={handleAvatarCreated} 
                            user={user!} />;
            case GameState.Learning:
                if (user) {
                     return (
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <LearningView
                                user={user}
                                levels={levels}
                                onLessonClick={handleLessonClick}
                                activeLesson={activeLesson}
                                onQuizComplete={handleQuizComplete}
                                onFinalTestComplete={handleFinalTestComplete}
                                lastReward={lastReward}
                                clearLastReward={() => setLastReward(null)}
                                onShowAchievements={() => setShowAchievements(true)}
                                onShowGlossary={handleShowGlossary}
                                onStartStory={handleStartStory}
                            />
                        </DndContext>
                    );
                }
                return <AuthView onLogin={handleLogin} />; // fallback
            default:
                return <AuthView onLogin={handleLogin} />;
        }
    };

    return (
        <div className="min-h-screen font-sans text-text-light bg-gradient-to-br from-primary-dark to-primary-light relative overflow-hidden">
            <LanguageSwitcher />
            <div className="absolute top-0 left-0 w-72 h-72 bg-accent-pink/50 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-accent-yellow/50 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-primary-light/50 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
            <div className="relative z-10">
                 {renderContent()}
            </div>
            {showConfetti && <Confetti recycle={false} numberOfPieces={400} />}
             <style>{`
                @keyframes blob {
	                0% { transform: translate(0px, 0px) scale(1); }
	                33% { transform: translate(30px, -50px) scale(1.1); }
	                66% { transform: translate(-20px, 20px) scale(0.9); }
	                100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
            `}</style>
        </div>
    );
};

export default App;