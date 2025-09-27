
import React from 'react';
import { SparklesIcon } from '../components/Icons';
import { useLanguage } from '../i18n';
import YourLogo from '../assets/GENDUCATION.png';

interface AuthViewProps {
    onLogin: () => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md text-center bg-glass-bg backdrop-blur-lg border border-glass-border rounded-3xl shadow-2xl p-8 md:p-12 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-pink/20">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-gradient-to-br from-accent-pink to-accent-yellow rounded-full shadow-lg">
                        <img src={YourLogo} alt="Genducation Logo" className="w-16 h-16" />
                    </div>
                </div>
                    <div className="flex justify-center">
                        <h1 className="text-5xl md:text-5xl font-black text-white mb-2 tracking-tighter">GENDUCATION</h1>
                            </div>
                <h2 className="text-lg text-text-muted font-medium mb-8">{t('auth.subtitle')}</h2>
                <p className="text-text-light mb-10">
                    {t('auth.welcome')}
                </p>
                
                <div className="space-y-4">
                    <button
                        onClick={onLogin}
                        className="w-full bg-gradient-to-r from-accent-pink to-accent-yellow text-white font-bold py-4 px-6 rounded-xl text-lg shadow-lg hover:shadow-xl hover:shadow-accent-pink/40 transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
                    >
                        {t('auth.start_button')}
                    </button>
                    <button
                        className="w-full bg-white/10 text-text-light font-bold py-4 px-6 rounded-xl text-lg hover:bg-white/20 transform hover:-translate-y-1 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-white/10"
                    >
                        {t('auth.parent_button')}
                    </button>
                </div>
                <p className="text-xs text-text-muted/50 mt-8">{t('auth.terms')}</p>
            </div>
        </div>
    );
};

export default AuthView;
