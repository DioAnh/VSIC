

import React, { useState, useEffect, useMemo } from 'react';
import { User, Level, Lesson, AvatarItem, Story, Poll } from '../types';
import { LockIcon, PlayIcon, CheckCircleIcon, StarIcon, CloseIcon, GiftIcon, TrophyIcon, SparklesIcon, BookOpenIcon, MapIcon, HeartIcon, QuestionMarkCircleIcon } from '../components/Icons';
import QuizView from '../components/Quiz';
import { Draggable, Droppable } from './Dnd';
import { AVATAR_REWARDS, MIDDLE_SCHOOL_STORY, TIPS_OF_THE_DAY, QUICK_POLLS, GLOSSARY_TERMS } from '../constants';
import Avatar from '../components/Avatar';
import { useLanguage } from '../i18n';

// --- WIDGETS AND SUB-COMPONENTS ---

const PointsAnimation: React.FC<{ points: number }> = ({ points }) => {
    return (
        <div key={Date.now()} className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-1 p-2 bg-gradient-to-r from-accent-pink to-accent-yellow text-white font-bold rounded-full shadow-lg animate-float-up">
            <SparklesIcon className="w-5 h-5" />
            <span>+{points}</span>
             <style>{`
                @keyframes float-up {
                    0% { transform: translate(-50%, 0) scale(0.8); opacity: 1; }
                    100% { transform: translate(-50%, -80px) scale(1.2); opacity: 0; }
                }
                .animate-float-up {
                    animation: float-up 2s ease-out forwards;
                }
            `}</style>
        </div>
    )
};

const AvatarDisplay: React.FC<{ user: User, pointsEarned: number }> = ({ user, pointsEarned }) => {
    const { t } = useLanguage();
    return (
        <Droppable id="avatar-zone">
            <div className="relative w-full h-64 mx-auto flex items-center justify-center p-4 transition-all duration-500">
                {pointsEarned > 0 && <PointsAnimation points={pointsEarned} />}
                <Avatar avatar={user.avatar} />
            </div>
            <p className="text-center font-bold text-2xl mt-2 text-white">{user.name}</p>
            <p className="text-center text-md text-text-muted">{t('learning.avatar_level', { stage: user.avatar.stage })}</p>
        </Droppable>
    );
};

const ContinueJourneyCard: React.FC<{
    nextItem: { type: 'story' | 'lesson' | 'assessment', item: any, level?: Level } | null;
    onLessonClick: (lesson: Lesson) => void;
    onStartStory: (story: Story) => void;
    onStartAssessment: (level: Level) => void;
}> = ({ nextItem, onLessonClick, onStartStory, onStartAssessment }) => {
    const { t } = useLanguage();

    if (!nextItem) {
        return (
            <div className="bg-glass-bg border border-glass-border rounded-2xl p-6 flex flex-col items-center text-center">
                 <TrophyIcon className="w-16 h-16 text-accent-yellow mb-4" />
                <h3 className="text-xl font-bold text-white">{t('dashboard.journey_complete_title')}</h3>
                <p className="text-text-muted">{t('dashboard.journey_complete_subtitle')}</p>
            </div>
        );
    }
    
    const { type, item, level } = nextItem;
    let title = '';
    let description = '';
    let progress = 0;
    let buttonText = '';
    let icon = <PlayIcon className="w-8 h-8 text-white" />;
    let handler = () => {};

    if (type === 'story') {
        title = t(item.titleKey);
        description = t(item.descriptionKey);
        buttonText = t('dashboard.start_story');
        icon = <MapIcon className="w-8 h-8 text-white" />;
        handler = () => onStartStory(item);
        // Progress for story could be implemented if needed
    } else if (type === 'lesson') {
        title = t(item.titleKey);
        description = t(item.descriptionKey);
        buttonText = t('dashboard.continue_lesson');
        handler = () => onLessonClick(item);
        const completedLessons = level?.lessons.filter(l => l.completed).length || 0;
        const totalLessons = level?.lessons.length || 1;
        progress = (completedLessons / totalLessons) * 100;

    } else if (type === 'assessment') {
        title = t('learning.final_assessment_button');
        description = t('dashboard.assessment_desc', {levelName: t(item.nameKey)});
        buttonText = t('dashboard.start_assessment');
        icon = <StarIcon className="w-8 h-8 text-white" />;
        handler = () => onStartAssessment(item);
        progress = 100;
    }

    return (
        <div className="bg-gradient-to-br from-primary-light to-primary-dark/80 border-2 border-accent-pink rounded-2xl shadow-2xl shadow-accent-pink/20 p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center bg-accent-pink">{icon}</div>
            <div className="flex-grow text-center md:text-left">
                <h3 className="text-sm font-bold text-accent-pink uppercase tracking-wider">{t('dashboard.continue_journey')}</h3>
                <h4 className="text-2xl font-bold text-white mt-1">{title}</h4>
                <p className="text-text-muted mt-1">{description}</p>
                { progress > 0 && 
                  <div className="w-full bg-primary-dark rounded-full h-2.5 mt-3">
                    <div className="bg-accent-yellow h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>
                }
            </div>
            <button onClick={handler} className="bg-accent-yellow text-primary-dark font-bold py-3 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl hover:shadow-accent-yellow/40 transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
                {buttonText}
            </button>
        </div>
    );
};

const TipOfTheDayCard: React.FC = () => {
    const { t } = useLanguage();
    const dayOfYear = useMemo(() => Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)), []);
    const tip = TIPS_OF_THE_DAY[dayOfYear % TIPS_OF_THE_DAY.length];

    return (
        <div className="bg-glass-bg border border-glass-border rounded-2xl p-6 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-3">
                <SparklesIcon className="w-6 h-6 text-accent-yellow" />
                <h3 className="text-lg font-bold text-white">{t('dashboard.tip_of_the_day')}</h3>
            </div>
            <p className="text-text-muted flex-grow">{t(tip.textKey)}</p>
        </div>
    );
};

const HotTopicCard: React.FC<{ onShowGlossary: (term: string) => void }> = ({ onShowGlossary }) => {
    const { t } = useLanguage();
    const weekNumber = useMemo(() => {
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);
        return Math.ceil(((Date.now() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);
    }, []);
    const term = GLOSSARY_TERMS[weekNumber % GLOSSARY_TERMS.length];

    return (
        <div className="bg-glass-bg border border-glass-border rounded-2xl p-6 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-3">
                <BookOpenIcon className="w-6 h-6 text-accent-pink" />
                <h3 className="text-lg font-bold text-white">{t('dashboard.hot_topic')}</h3>
            </div>
            <div className="flex-grow">
                <h4 className="font-semibold text-accent-yellow">{t(term.termKey)}</h4>
                <p className="text-text-muted text-sm line-clamp-2 mt-1">{t(term.definitionKey)}</p>
            </div>
            <button onClick={() => onShowGlossary(t(term.termKey))} className="mt-4 w-full text-center bg-white/10 text-text-light font-semibold py-2 px-4 rounded-lg text-sm hover:bg-white/20 transition-all duration-300">
                {t('dashboard.view_term')}
            </button>
        </div>
    );
};

const PollCard: React.FC = () => {
    const { t } = useLanguage();
    const poll: Poll = useMemo(() => QUICK_POLLS[0], []); // Use the first poll for now
    const [voted, setVoted] = useState<number | null>(() => {
        const storedVote = localStorage.getItem(`poll_vote_${poll.id}`);
        return storedVote ? parseInt(storedVote, 10) : null;
    });

    const handleVote = (optionIndex: number) => {
        localStorage.setItem(`poll_vote_${poll.id}`, String(optionIndex));
        setVoted(optionIndex);
    };

    return (
        <div className="bg-glass-bg border border-glass-border rounded-2xl p-6 h-full flex flex-col">
            <h3 className="text-lg font-bold text-white mb-3">{t('dashboard.quick_challenge')}</h3>
            <p className="text-text-muted mb-4">{t(poll.questionKey)}</p>
            <div className="space-y-2 flex-grow">
                {poll.optionsKeys.map((optionKey, index) => (
                    voted !== null ? (
                        <div key={index} className="relative w-full text-left p-2 rounded-lg bg-primary-dark/50 text-text-light text-sm">
                            <div className="absolute top-0 left-0 h-full bg-accent-yellow/30 rounded-lg" style={{ width: `${poll.results[index]}%` }}></div>
                            <div className="relative flex justify-between">
                                <span>{t(optionKey)}</span>
                                <span className="font-bold">{poll.results[index]}%</span>
                            </div>
                        </div>
                    ) : (
                        <button key={index} onClick={() => handleVote(index)} className="w-full text-left p-2 rounded-lg bg-white/10 hover:bg-white/20 text-text-light text-sm transition-colors">
                            {t(optionKey)}
                        </button>
                    )
                ))}
            </div>
        </div>
    );
};

const ToolsShortcut: React.FC<{ onShowGlossary: () => void }> = ({ onShowGlossary }) => {
    const { t } = useLanguage();
    const tools = [
        { id: 'glossary', icon: BookOpenIcon, label: t('learning.glossary_button'), action: onShowGlossary, enabled: true },
        { id: 'qa', icon: QuestionMarkCircleIcon, label: t('dashboard.q_and_a'), action: () => {}, enabled: false },
        { id: 'family', icon: HeartIcon, label: t('dashboard.family_corner'), action: () => {}, enabled: false },
    ];
    return (
        <div>
            <h3 className="text-lg font-bold text-white mb-3">{t('dashboard.tools_shortcut')}</h3>
            <div className="grid grid-cols-3 gap-4">
                {tools.map(tool => (
                    <div key={tool.id} onClick={tool.enabled ? tool.action : undefined}
                         className={`relative bg-glass-bg border border-glass-border rounded-xl p-4 text-center cursor-pointer hover:border-white/30 hover:-translate-y-1 transition-all duration-300 ${!tool.enabled && 'opacity-50 cursor-not-allowed'}`}>
                        <tool.icon className="w-10 h-10 mx-auto text-accent-yellow" />
                        <p className="font-semibold text-sm mt-2">{tool.label}</p>
                        {!tool.enabled && <div className="absolute top-1 right-1 text-xs bg-accent-pink text-white font-bold px-2 py-0.5 rounded-full">{t('dashboard.coming_soon')}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- MAIN LEARNING VIEW ---

const LessonCard: React.FC<{ lesson: Lesson; onLessonClick: (lesson: Lesson) => void; }> = ({ lesson, onLessonClick }) => {
    const { t } = useLanguage();
    return (
        <div onClick={() => onLessonClick(lesson)} className="bg-glass-bg border border-glass-border p-4 rounded-xl shadow-md flex items-center gap-4 cursor-pointer hover:shadow-lg hover:border-white/30 hover:-translate-y-1 hover:shadow-accent-yellow/30 transition-all duration-300 ease-in-out">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${lesson.completed ? 'bg-green-500/80' : 'bg-gradient-to-br from-accent-pink to-accent-yellow'}`}>
                {lesson.completed ? <CheckCircleIcon className="w-8 h-8 text-white" /> : <PlayIcon className="w-8 h-8 text-white" />}
            </div>
            <div>
                <h4 className="font-bold text-text-light">{t(lesson.titleKey)}</h4>
                <p className="text-sm text-text-muted">{t(lesson.descriptionKey)}</p>
            </div>
        </div>
    );
};

const AdventureCard: React.FC<{ story: Story; onStart: (story: Story) => void }> = ({ story, onStart }) => {
    const { t } = useLanguage();
    return (
        <div onClick={() => onStart(story)} className="bg-gradient-to-br from-primary-light to-primary-dark/70 border-2 border-accent-pink p-4 rounded-xl shadow-lg flex items-center gap-4 cursor-pointer hover:shadow-2xl hover:border-accent-pink hover:-translate-y-1 hover:shadow-accent-pink/30 transition-all duration-300 ease-in-out">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent-pink">
                <MapIcon className="w-8 h-8 text-white" />
            </div>
            <div>
                <h4 className="font-bold text-text-light">{t(story.titleKey)}</h4>
                <p className="text-sm text-text-muted">{t(story.descriptionKey)}</p>
            </div>
        </div>
    );
};

const LevelTab: React.FC<{ level: Level; isActive: boolean; onClick: () => void }> = ({ level, isActive, onClick }) => {
    const { t } = useLanguage();
    return (
        <button onClick={level.unlocked ? onClick : undefined} className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-semibold transition-all duration-300 ease-in-out outline-none ${isActive ? 'bg-glass-bg border-b-2 border-accent-yellow text-white' : 'bg-transparent text-text-muted'} ${level.unlocked ? 'cursor-pointer hover:bg-white/5 hover:text-white' : 'cursor-not-allowed opacity-50'}`}>
            {!level.unlocked && <LockIcon className="w-4 h-4" />}
            <span>{t(level.nameKey)}</span>
        </button>
    );
};

const FinalAssessmentButton: React.FC<{ level: Level; onStart: () => void }> = ({ level, onStart }) => {
    const { t } = useLanguage();
    const allLessonsCompleted = level.lessons.every(l => l.completed);
    return (
        <button
            onClick={allLessonsCompleted ? onStart : undefined}
            disabled={!allLessonsCompleted}
            className="w-full mt-4 flex items-center justify-center gap-3 bg-gradient-to-r from-accent-pink to-accent-yellow text-white font-bold py-3 px-6 rounded-xl text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 hover:shadow-accent-pink/40 transition-all duration-300 ease-in-out"
        >
            <StarIcon className="w-6 h-6" />
            {t('learning.final_assessment_button')}
        </button>
    );
};


const LessonModal: React.FC<{ lesson: Lesson; onQuizComplete: (lesson: Lesson, score: number) => void; onClose: () => void; }> = ({ lesson, onQuizComplete, onClose }) => {
    const { t } = useLanguage();
    const [showQuiz, setShowQuiz] = useState(false);
    return (
        <div className="fixed inset-0 bg-primary-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-glass-bg border border-glass-border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative text-text-light shadow-2xl">
                <button onClick={onClose} className="absolute top-4 right-4 text-text-muted hover:text-white z-10"><CloseIcon /></button>
                <h2 className="text-3xl font-bold mb-4 text-white">{t(lesson.titleKey)}</h2>
                {!showQuiz ? (
                    <div>
                        <div className="w-full aspect-video rounded-lg mb-4 bg-black/50 overflow-hidden">
                           <iframe
                                className="w-full h-full"
                                src={lesson.videoUrl}
                                title={t(lesson.titleKey)}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <p className="text-text-muted mb-6">{t(lesson.descriptionKey)}</p>
                        <button onClick={() => setShowQuiz(true)} className="w-full bg-gradient-to-r from-accent-pink to-accent-yellow text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">{t('learning.start_quiz_button')}</button>
                    </div>
                ) : (
                    <QuizView quiz={lesson.quiz} onComplete={(score) => onQuizComplete(lesson, score)} />
                )}
            </div>
        </div>
    );
};

const RewardModal: React.FC<{ item: AvatarItem; onClose: () => void }> = ({ item, onClose }) => {
    const { t } = useLanguage();
    return (
        <div className="fixed inset-0 bg-primary-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-glass-bg border border-glass-border rounded-2xl p-8 text-center shadow-2xl animate-pulse text-white" style={{ animationIterationCount: 1, animationDuration: '0.5s' }}>
                <GiftIcon className="w-16 h-16 mx-auto text-accent-yellow mb-4" />
                <h2 className="text-2xl font-bold">{t('learning.reward_title')}</h2>
                <p className="text-text-muted mt-2 mb-6">{t('learning.reward_subtitle')} <span className="font-bold text-text-light">{t(item.nameKey)}</span></p>
                <button onClick={onClose} className="bg-gradient-to-r from-accent-pink to-accent-yellow font-bold py-2 px-8 rounded-lg">{t('learning.reward_button')}</button>
            </div>
        </div>
    )
};


const LearningView: React.FC<{
    user: User;
    levels: Level[];
    onLessonClick: (lesson: Lesson) => void;
    activeLesson: Lesson | null;
    onQuizComplete: (lesson: Lesson, score: number) => void;
    onFinalTestComplete: (level: Level, score: number) => void;
    lastReward: AvatarItem | null;
    clearLastReward: () => void;
    onShowAchievements: () => void;
    onShowGlossary: (term?: string) => void;
    onStartStory: (story: Story) => void;
}> = ({ user, levels, onLessonClick, activeLesson, onQuizComplete, onFinalTestComplete, lastReward, clearLastReward, onShowAchievements, onShowGlossary, onStartStory }) => {
    const { t } = useLanguage();
    const [activeLevelId, setActiveLevelId] = useState(user.levelId);
    const [takingFinalTest, setTakingFinalTest] = useState<Level | null>(null);
    const [pointsEarned, setPointsEarned] = useState(0);

    const prevPoints = useMemo(() => user.points, []);
    useEffect(() => {
        const diff = user.points - prevPoints;
        if(diff > 0) {
            setPointsEarned(diff);
            setTimeout(() => setPointsEarned(0), 2000); // Animation duration
        }
    }, [user.points]);

    useEffect(() => {
        setActiveLevelId(user.levelId);
    }, [user.levelId]);

    const activeLevel = levels.find(l => l.id === activeLevelId)!;

    const inventory = useMemo(() => 
        [...user.avatar.outfit, ...Object.values(AVATAR_REWARDS).flat()].filter((v: AvatarItem, i, a) => a.findIndex((t: AvatarItem) => (t.id === v.id)) === i),
        [user.avatar.outfit]
    );
    
    const storyForLevel = useMemo(() => {
        if (activeLevel.id === MIDDLE_SCHOOL_STORY.levelId) {
            return MIDDLE_SCHOOL_STORY;
        }
        return null;
    }, [activeLevel.id]);

    const nextJourneyItem = useMemo(() => {
        const activeStoryProgress = user.storyProgress?.[MIDDLE_SCHOOL_STORY.id];
        if (activeStoryProgress && activeStoryProgress.currentNodeId !== 'end') {
            return { type: 'story' as const, item: MIDDLE_SCHOOL_STORY, level: undefined };
        }
        
        const currentLevel = levels.find(l => l.id === user.levelId);
        if (!currentLevel) return null;
        
        const nextLesson = currentLevel.lessons.find(l => !l.completed);
        if (nextLesson) {
            return { type: 'lesson' as const, item: nextLesson, level: currentLevel };
        }
        
        if (!user.completedLevels.includes(currentLevel.id)) {
            return { type: 'assessment' as const, item: currentLevel, level: undefined };
        }

        return null;
      }, [user, levels]);
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-4 sm:p-8 max-w-7xl mx-auto">
            {activeLesson && <LessonModal lesson={activeLesson} onQuizComplete={onQuizComplete} onClose={() => onLessonClick(null!)} />}
            {takingFinalTest && (
                <div className="fixed inset-0 bg-primary-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-glass-bg border border-glass-border rounded-2xl w-full max-w-3xl p-6 relative shadow-2xl">
                         <button onClick={() => setTakingFinalTest(null)} className="absolute top-4 right-4 text-text-muted hover:text-white"><CloseIcon /></button>
                         <h2 className="text-3xl font-bold mb-4 text-center text-white">{t('learning.final_assessment_title')}: {t(takingFinalTest.nameKey)}</h2>
                         <QuizView quiz={takingFinalTest.finalAssessment} onComplete={(score) => {
                            onFinalTestComplete(takingFinalTest, score);
                            setTakingFinalTest(null);
                         }} />
                    </div>
                </div>
            )}
            {lastReward && <RewardModal item={lastReward} onClose={clearLastReward} />}

            {/* --- Left Sidebar: Avatar & Wardrobe --- */}
            <div className="md:col-span-4 lg:col-span-3 space-y-6">
                <div className="bg-glass-bg backdrop-blur-lg border border-glass-border rounded-2xl p-6 shadow-xl">
                    <AvatarDisplay user={user} pointsEarned={pointsEarned} />
                    <div className="mt-6 flex items-center justify-center gap-2 bg-accent-yellow/10 border-2 border-accent-yellow rounded-lg p-2">
                        <StarIcon className="w-6 h-6 text-accent-yellow" />
                        <span className="font-bold text-lg text-accent-yellow">{user.points} {t('learning.smart_points')}</span>
                    </div>
                </div>
                 <div className="bg-glass-bg backdrop-blur-lg border border-glass-border rounded-2xl p-6 shadow-xl">
                    <h3 className="font-bold text-xl mb-4 text-white">{t('learning.wardrobe_title')}</h3>
                     <div className="grid grid-cols-4 gap-3 h-32 overflow-y-auto pr-2">
                         {inventory.map((item) => (
                            <Draggable key={item.id} id={item.id}>
                                <div title={t(item.nameKey)} className="bg-primary-dark/50 aspect-square rounded-lg flex items-center justify-center p-2 cursor-grab active:cursor-grabbing transform hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-yellow/50 transition-all duration-300 ease-in-out">
                                    <span className="text-xs text-center text-text-muted truncate">{t(item.nameKey)}</span>
                                </div>
                            </Draggable>
                         ))}
                     </div>
                </div>
                 <button onClick={onShowAchievements} className="w-full flex items-center justify-center gap-3 bg-white/10 text-text-light font-bold py-3 px-6 rounded-xl text-lg shadow-md border-2 border-transparent hover:bg-white/20 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-light/50 transition-all duration-300 ease-in-out">
                    <TrophyIcon className="w-6 h-6" />
                    {t('learning.achievements_button')}
                </button>
            </div>

            {/* --- Main Content Area --- */}
            <div className="md:col-span-8 lg:col-span-9 space-y-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-white">{t('dashboard.welcome_back', {name: user.name})}</h1>
                <ContinueJourneyCard nextItem={nextJourneyItem} onLessonClick={onLessonClick} onStartStory={onStartStory} onStartAssessment={setTakingFinalTest} />
                <ToolsShortcut onShowGlossary={onShowGlossary} />
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <TipOfTheDayCard />
                    <HotTopicCard onShowGlossary={onShowGlossary} />
                    <PollCard />
                </div>
                <div>
                     <h2 className="text-2xl font-bold text-white mb-4">{t('dashboard.view_learning_path')}</h2>
                     <div className="border-b-2 border-glass-border">
                        {levels.map(level => (
                            <LevelTab key={level.id} level={level} isActive={level.id === activeLevelId} onClick={() => setActiveLevelId(level.id)} />
                        ))}
                    </div>
                    <div className="bg-glass-bg backdrop-blur-lg border border-glass-border p-6 rounded-b-2xl shadow-xl">
                        <div className="space-y-4">
                            {storyForLevel && <AdventureCard story={storyForLevel} onStart={onStartStory} />}
                            {activeLevel.lessons.map(lesson => (
                               <LessonCard key={lesson.id} lesson={lesson} onLessonClick={onLessonClick} />
                            ))}
                        </div>
                         <FinalAssessmentButton level={activeLevel} onStart={() => setTakingFinalTest(activeLevel)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningView;