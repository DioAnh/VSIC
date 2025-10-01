

import React, { useState, useEffect } from 'react';
import { GameState, User, EducationalLevel, AvatarItem, AvatarBodyShape, AvatarEyes, AvatarMouth } from '../types';
import { BODY_COLORS, TOPPERS, BODY_SHAPES, EYES, MOUTHS } from '../constants';
import { CheckCircleIcon, RefreshIcon } from '../components/Icons';
import Avatar from '../components/Avatar';
import { useLanguage } from '../i18n';

interface OnboardingViewProps {
    gameState: GameState;
    user: User;
    onProfileSubmit: (name: string, level: EducationalLevel) => void;
    onAvatarCreated: (avatar: User['avatar']) => void;
}

const ProfileCreationScreen: React.FC<{ onProfileSubmit: (name: string, level: EducationalLevel) => void }> = ({ onProfileSubmit }) => {
    const { t } = useLanguage();
    const [name, setName] = useState('');
    const [selectedLevel, setSelectedLevel] = useState<EducationalLevel | null>(null);

    const canSubmit = name.trim().length > 2 && selectedLevel !== null;

    return (
        <div className="p-8 w-full max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-2 text-text-dark">{t('onboarding.profile_title')}</h1>
            <p className="text-lg text-center text-text-muted mb-12">{t('onboarding.profile_subtitle')}</p>

            <div className="bg-glass-bg backdrop-blur-lg border border-glass-border p-8 rounded-2xl shadow-lg">
                <div className="mb-8">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('onboarding.name_placeholder')}
                        className="w-full bg-white/10 text-text-dark placeholder-text-muted/70 text-lg p-4 rounded-xl border-2 border-transparent focus:border-accent-yellow focus:outline-none transition-all"
                    />
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-center mb-6 text-text-dark">{t('onboarding.level_selection_title')}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                         <div onClick={() => setSelectedLevel(EducationalLevel.PreschoolElementary)} className={`relative bg-glass-bg backdrop-blur-lg border-2 p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl hover:-translate-y-2 hover:shadow-accent-yellow/40 transition-all duration-300 ease-in-out text-center ${selectedLevel === EducationalLevel.PreschoolElementary ? 'border-accent-yellow' : 'border-glass-border'}`}>
                             <h3 className="text-xl font-bold text-text-dark">{t('level_preschool_name')}</h3>
                         </div>
                         <div onClick={() => setSelectedLevel(EducationalLevel.MiddleSchool)} className={`relative bg-glass-bg backdrop-blur-lg border-2 p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl hover:-translate-y-2 hover:shadow-accent-yellow/40 transition-all duration-300 ease-in-out text-center ${selectedLevel === EducationalLevel.MiddleSchool ? 'border-accent-yellow' : 'border-glass-border'}`}>
                             {<div className="absolute top-0 right-0 bg-gradient-to-br from-accent-pink to-accent-yellow text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">{t('onboarding.recommended')}</div>}
                             <h3 className="text-xl font-bold text-text-dark">{t('level_ms_name')}</h3>
                         </div>
                          <div onClick={() => setSelectedLevel(EducationalLevel.HighSchool)} className={`relative bg-glass-bg backdrop-blur-lg border-2 p-6 rounded-2xl shadow-lg cursor-pointer hover:shadow-2xl hover:-translate-y-2 hover:shadow-accent-yellow/40 transition-all duration-300 ease-in-out text-center ${selectedLevel === EducationalLevel.HighSchool ? 'border-accent-yellow' : 'border-glass-border'}`}>
                             <h3 className="text-xl font-bold text-text-dark">{t('level_hs_name')}</h3>
                         </div>
                    </div>
                </div>
            </div>

             <button onClick={() => canSubmit && onProfileSubmit(name, selectedLevel!)} disabled={!canSubmit} className="mt-12 mx-auto block bg-gradient-to-r from-accent-pink to-accent-yellow text-white font-bold py-3 px-12 rounded-xl text-lg shadow-lg hover:shadow-xl hover:shadow-accent-pink/40 transform hover:-translate-y-1 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
                {t('quiz.continue')}
            </button>
        </div>
    );
};


const AvatarCreationScreen: React.FC<{ user: User; onAvatarCreated: (avatar: User['avatar']) => void }> = ({ user, onAvatarCreated }) => {
    const { t } = useLanguage();
    const [bodyShape, setBodyShape] = useState(user.avatar.bodyShape);
    const [bodyColor, setBodyColor] = useState(user.avatar.bodyColor);
    const [bellyColor, setBellyColor] = useState(user.avatar.bellyColor);
    const [topper, setTopper] = useState(user.avatar.topper);
    const [eyes, setEyes] = useState(user.avatar.eyes);
    const [mouth, setMouth] = useState(user.avatar.mouth);

    const tempAvatar: User['avatar'] = {
        ...user.avatar,
        bodyShape,
        bodyColor,
        bellyColor,
        topper,
        eyes,
        mouth,
    };
    
    const handleRandomize = () => {
        setBodyShape(BODY_SHAPES[Math.floor(Math.random() * BODY_SHAPES.length)]);
        setBodyColor(BODY_COLORS[Math.floor(Math.random() * BODY_COLORS.length)]);
        setBellyColor(BODY_COLORS[Math.floor(Math.random() * BODY_COLORS.length)]);
        setTopper(TOPPERS[Math.floor(Math.random() * TOPPERS.length)]);
        setEyes(EYES[Math.floor(Math.random() * EYES.length)]);
        setMouth(MOUTHS[Math.floor(Math.random() * MOUTHS.length)]);
    };

    const handleSubmit = () => {
        onAvatarCreated(tempAvatar);
    };

    return (
        <div className="p-4 sm:p-8 flex flex-col items-center max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-2 text-text-dark">{t('onboarding.avatar_title')}</h1>
            <p className="text-lg text-center text-text-muted mb-8">{t('onboarding.avatar_subtitle')}</p>

            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 w-full flex flex-col items-center justify-center p-4 bg-glass-bg backdrop-blur-lg border border-glass-border rounded-2xl">
                   <div className="w-64 h-80 flex items-center justify-center">
                       <Avatar avatar={tempAvatar} />
                   </div>
                   <button onClick={handleRandomize} className="mt-4 flex items-center gap-2 bg-white/10 text-text-light font-bold py-2 px-6 rounded-xl text-md shadow-md border-2 border-transparent hover:bg-white/20 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-in-out">
                        <RefreshIcon className="w-5 h-5" />
                        {t('onboarding.randomize')}
                    </button>
                </div>

                <div className="lg:col-span-2 space-y-4 p-6 bg-glass-bg backdrop-blur-lg border border-glass-border rounded-2xl max-h-[60vh] overflow-y-auto">
                    {/* Body Shape */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-text-light">{t('onboarding.body_shape')}</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                            {BODY_SHAPES.map(shapeOption => (
                                <button key={shapeOption.id} onClick={() => setBodyShape(shapeOption)} title={t(shapeOption.nameKey)} className={`aspect-square rounded-lg flex items-center justify-center p-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md hover:shadow-accent-yellow/20 ${bodyShape.id === shapeOption.id ? 'bg-accent-yellow/20 border-2 border-accent-yellow' : 'bg-white/10 hover:bg-white/20'}`}>
                                    <svg viewBox="0 0 160 240" className="w-full h-full">
                                        <path d={shapeOption.bodyPath} fill="#a3dbcf" />
                                        <path d={shapeOption.bellyPath} fill="#82b3a9" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Body Color */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-text-light">{t('onboarding.body_color')}</h3>
                        <div className="flex gap-3 flex-wrap">
                            {BODY_COLORS.map(color => (
                                <button key={color} onClick={() => setBodyColor(color)} className={`w-10 h-10 rounded-full border-2 transform hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-in-out ${bodyColor === color ? 'border-accent-yellow' : 'border-transparent'}`} style={{ backgroundColor: color }}></button>
                            ))}
                        </div>
                    </div>
                    {/* Belly Color */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-text-light">{t('onboarding.belly_color')}</h3>
                        <div className="flex gap-3 flex-wrap">
                            {BODY_COLORS.map(color => (
                                <button key={color} onClick={() => setBellyColor(color)} className={`w-10 h-10 rounded-full border-2 transform hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-in-out ${bellyColor === color ? 'border-accent-yellow' : 'border-transparent'}`} style={{ backgroundColor: color }}></button>
                            ))}
                        </div>
                    </div>
                    {/* Topper */}
                     <div>
                        <h3 className="text-lg font-semibold mb-3 text-text-light">{t('onboarding.topper')}</h3>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                            {TOPPERS.map(topperOption => (
                                <button key={topperOption.id} onClick={() => setTopper(topperOption)} title={t(topperOption.nameKey)} className={`aspect-square rounded-lg flex items-center justify-center p-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md hover:shadow-accent-yellow/20 ${topper.id === topperOption.id ? 'bg-accent-yellow/20 border-2 border-accent-yellow' : 'bg-white/10 hover:bg-white/20'}`}>
                                    <svg viewBox="-20 -40 40 40" className="w-full h-full">
                                        <path d={topperOption.path} fill={topperOption.color} />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                     {/* Eyes */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-text-light">{t('onboarding.eyes')}</h3>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                            {EYES.map(eyeOption => (
                                <button key={eyeOption.id} onClick={() => setEyes(eyeOption)} title={t(eyeOption.nameKey)} className={`aspect-square rounded-lg flex items-center justify-center p-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md hover:shadow-accent-yellow/20 ${eyes.id === eyeOption.id ? 'bg-accent-yellow/20 border-2 border-accent-yellow' : 'bg-white/10 hover:bg-white/20'}`}>
                                    <svg viewBox="-30 -15 60 30" className="w-full h-full">
                                        <path d={eyeOption.path} stroke="#5D4037" strokeWidth="2" fill="none" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                     {/* Mouth */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-text-light">{t('onboarding.mouth')}</h3>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                            {MOUTHS.map(mouthOption => (
                                <button key={mouthOption.id} onClick={() => setMouth(mouthOption)} title={t(mouthOption.nameKey)} className={`aspect-square rounded-lg flex items-center justify-center p-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md hover:shadow-accent-yellow/20 ${mouth.id === mouthOption.id ? 'bg-accent-yellow/20 border-2 border-accent-yellow' : 'bg-white/10 hover:bg-white/20'}`}>
                                    <svg viewBox="-15 -10 30 20" className="w-full h-full">
                                         <path d={mouthOption.path} stroke="#5D4037" strokeWidth="2" fill="none" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
             <button onClick={handleSubmit} className="mt-12 bg-gradient-to-r from-accent-pink to-accent-yellow text-white font-bold py-3 px-12 rounded-xl text-lg shadow-lg hover:shadow-xl hover:shadow-accent-pink/40 transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
                {t('onboarding.go_button')}
            </button>
        </div>
    );
};


const OnboardingView: React.FC<OnboardingViewProps> = ({ gameState, user, onProfileSubmit, onAvatarCreated }) => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            {gameState === GameState.OnboardingProfile && <ProfileCreationScreen onProfileSubmit={onProfileSubmit} />}
            {gameState === GameState.OnboardingAvatar && <AvatarCreationScreen user={user} onAvatarCreated={onAvatarCreated} />}
        </div>
    );
};

export default OnboardingView;