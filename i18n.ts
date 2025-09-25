
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { en } from './locales/en';
import { vi } from './locales/vi';

type Language = 'en' | 'vi';
type Translations = typeof en;

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string, replacements?: { [key: string]: string | number }) => string;
}

const translations = { en, vi };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getNestedValue = (obj: any, path: string): string | undefined => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const savedLang = localStorage.getItem('appLanguage');
        return (savedLang === 'vi' || savedLang === 'en') ? savedLang : 'en';
    });

    const setLanguage = (lang: Language) => {
        localStorage.setItem('appLanguage', lang);
        setLanguageState(lang);
    };

    const t = (key: string, replacements?: { [key: string]: string | number }): string => {
        let text = getNestedValue(translations[language], key);
        
        if (!text) {
             console.warn(`Translation key "${key}" not found for language "${language}".`);
             text = getNestedValue(translations.en, key) || key; // Fallback to English
        }

        if (replacements) {
            Object.entries(replacements).forEach(([rKey, value]) => {
                text = text.replace(new RegExp(`{${rKey}}`, 'g'), String(value));
            });
        }
        
        return text;
    };


    // FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
    return React.createElement(LanguageContext.Provider, { value: { language, setLanguage, t } }, children);
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
