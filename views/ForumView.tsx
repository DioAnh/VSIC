import React, { useState, useMemo } from 'react';
import { ChatBubbleOvalLeftEllipsisIcon, MagnifyingGlassIcon, PencilSquareIcon, ChatBubbleLeftRightIcon, EyeIcon } from '../components/Icons';
import { useLanguage } from '../i18n';
import { EducationalLevel } from '../types';

type ForumPost = {
    id: number;
    authorName: string;
    avatarColor: string;
    titleKey: string;
    contentSnippetKey: string;
    category: EducationalLevel | 'general';
    tags: string[];
    replies: number;
    views: number;
    timestamp: string;
};

const MOCK_POSTS: ForumPost[] = [
    {
        id: 1,
        authorName: "AnxiousAndy",
        avatarColor: "#FBBF24",
        titleKey: "forum.post2_title",
        contentSnippetKey: "forum.post2_snippet",
        category: EducationalLevel.MiddleSchool,
        tags: ["Puberty", "Anxiety", "Health"],
        replies: 15,
        views: 256,
        timestamp: "2 hours ago",
    },
    {
        id: 2,
        authorName: "FriendshipSeeker",
        avatarColor: "#A7F3D0",
        titleKey: "forum.post3_title",
        contentSnippetKey: "forum.post3_snippet",
        category: 'general',
        tags: ["Relationships", "Friends"],
        replies: 22,
        views: 412,
        timestamp: "1 day ago",
    },
    {
        id: 3,
        authorName: "Braveheart_16",
        avatarColor: "#BFDBFE",
        titleKey: "forum.post1_title",
        contentSnippetKey: "forum.post1_snippet",
        category: EducationalLevel.HighSchool,
        tags: ["Peer Pressure", "Boundaries"],
        replies: 8,
        views: 189,
        timestamp: "3 days ago",
    },
    {
        id: 4,
        authorName: "CyberSafeKid",
        avatarColor: "#F472B6",
        titleKey: "forum.post4_title",
        contentSnippetKey: "forum.post4_snippet",
        category: EducationalLevel.MiddleSchool,
        tags: ["Safety", "Internet", "Social Media"],
        replies: 31,
        views: 634,
        timestamp: "5 days ago",
    },
];

type FilterTab = 'all' | 'my_questions' | EducationalLevel;

const ForumView: React.FC = () => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<FilterTab>('all');

    const filteredPosts = useMemo(() => {
        let posts = MOCK_POSTS;

        if (activeTab !== 'all' && activeTab !== 'my_questions') {
            posts = posts.filter(p => p.category === activeTab);
        }

        if (searchTerm) {
            posts = posts.filter(p =>
                t(p.titleKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
                t(p.contentSnippetKey).toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        return posts;
    }, [searchTerm, activeTab, t]);

    return (
        <div className="p-4 sm:p-6 lg:p-8 flex flex-col h-full max-w-7xl mx-auto">
            <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-text-dark flex items-center gap-3">
                    <ChatBubbleOvalLeftEllipsisIcon className="w-10 h-10 text-accent-pink" />
                    {t('forum.title')}
                </h1>
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent-pink to-accent-yellow text-white font-bold py-3 px-5 rounded-xl shadow-lg hover:shadow-xl hover:shadow-accent-pink/40 transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
                    <PencilSquareIcon className="w-5 h-5" />
                    <span>{t('forum.new_discussion')}</span>
                </button>
            </header>

            <div className="relative mb-4">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('forum.search_placeholder')}
                    className="w-full bg-white/5 text-text-dark placeholder-text-muted/70 pl-12 pr-4 py-3 rounded-xl border-2 border-glass-border focus:border-accent-yellow focus:outline-none transition-all"
                />
            </div>
            
            <div className="border-b-2 border-glass-border mb-6 flex-shrink-0">
                <div className="flex items-center gap-4 text-sm font-semibold">
                    <button onClick={() => setActiveTab('all')} className={`py-3 px-2 border-b-2 transition-colors ${activeTab === 'all' ? 'text-accent-yellow border-accent-yellow' : 'text-text-muted border-transparent hover:text-text-dark'}`}>{t('forum.all_posts')}</button>
                    <button onClick={() => setActiveTab('my_questions')} className={`py-3 px-2 border-b-2 transition-colors ${activeTab === 'my_questions' ? 'text-accent-yellow border-accent-yellow' : 'text-text-muted border-transparent hover:text-text-dark'}`}>{t('forum.my_questions')}</button>
                    <button onClick={() => setActiveTab(EducationalLevel.MiddleSchool)} className={`py-3 px-2 border-b-2 transition-colors ${activeTab === EducationalLevel.MiddleSchool ? 'text-accent-yellow border-accent-yellow' : 'text-text-muted border-transparent hover:text-text-dark'}`}>{t('level_ms_name')}</button>
                    <button onClick={() => setActiveTab(EducationalLevel.HighSchool)} className={`py-3 px-2 border-b-2 transition-colors ${activeTab === EducationalLevel.HighSchool ? 'text-accent-yellow border-accent-yellow' : 'text-text-muted border-transparent hover:text-text-dark'}`}>{t('level_hs_name')}</button>
                </div>
            </div>

            <main className="flex-grow overflow-y-auto pr-2 -mr-2">
                 <div className="space-y-4">
                    {filteredPosts.map(post => (
                        <div key={post.id} className="bg-glass-bg border border-glass-border rounded-xl p-5 cursor-pointer hover:border-white/30 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary-light/20">
                           <div className="flex items-start gap-4">
                               <div className="w-10 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: post.avatarColor, filter: 'brightness(0.9)' }}></div>
                               <div className="flex-grow">
                                    <h3 className="font-bold text-lg text-text-light">{t(post.titleKey)}</h3>
                                    <p className="text-sm text-text-muted font-medium mb-2">
                                        by <span className="text-accent-yellow">{post.authorName}</span> &bull; {post.timestamp}
                                    </p>
                                    <p className="text-text-light/90 text-sm mb-3 line-clamp-2">{t(post.contentSnippetKey)}</p>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                                         <div className="flex items-center gap-1.5 text-text-muted">
                                            <ChatBubbleLeftRightIcon className="w-4 h-4" />
                                            <span>{post.replies} {t('forum.replies')}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-text-muted">
                                            <EyeIcon className="w-4 h-4" />
                                            <span>{post.views} {t('forum.views')}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {post.tags.map(tag => (
                                                <span key={tag} className="text-xs font-semibold bg-primary-light text-accent-pink px-2 py-1 rounded-full">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                               </div>
                           </div>
                        </div>
                    ))}
                 </div>
                 {filteredPosts.length === 0 && (
                     <div className="text-center py-16">
                         <p className="text-text-muted">{t('glossary.no_results')}</p>
                     </div>
                 )}
            </main>
        </div>
    );
};

export default ForumView;