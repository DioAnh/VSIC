

import React from 'react';
import { HomeIcon, UserIcon, ChatBubbleOvalLeftEllipsisIcon, BookOpenIcon, TrophyIcon } from './Icons';
import { useLanguage } from '../i18n';

type Tab = 'home' | 'profile' | 'forum' | 'glossary' | 'challenge';

interface BottomNavBarProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

const NavItem: React.FC<{
    tab: Tab;
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ tab, label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center gap-1 w-full pt-2 pb-1 transition-colors duration-200 ease-in-out ${isActive ? 'text-accent-yellow' : 'text-text-muted hover:text-text-light'}`}
        aria-label={label}
        aria-current={isActive ? 'page' : undefined}
    >
        {icon}
        <span className="text-xs font-medium">{label}</span>
    </button>
);

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
    const { t } = useLanguage();

    const navItems: { tab: Tab; labelKey: string; icon: React.ReactNode }[] = [
        { tab: 'home', labelKey: 'navbar.courses', icon: <HomeIcon className="w-6 h-6" /> },
        { tab: 'profile', labelKey: 'navbar.profile', icon: <UserIcon className="w-6 h-6" /> },
        { tab: 'forum', labelKey: 'navbar.forum', icon: <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" /> },
        { tab: 'glossary', labelKey: 'navbar.glossary', icon: <BookOpenIcon className="w-6 h-6" /> },
        { tab: 'challenge', labelKey: 'navbar.challenge', icon: <TrophyIcon className="w-6 h-6" /> },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-20 bg-glass-bg backdrop-blur-lg border-t border-glass-border z-40 md:hidden">
            <div className="flex justify-around items-center h-full max-w-md mx-auto">
                {navItems.map(item => (
                    <NavItem
                        key={item.tab}
                        tab={item.tab}
                        label={t(item.labelKey)}
                        icon={item.icon}
                        isActive={activeTab === item.tab}
                        onClick={() => onTabChange(item.tab)}
                    />
                ))}
            </div>
        </nav>
    );
};

export default BottomNavBar;
