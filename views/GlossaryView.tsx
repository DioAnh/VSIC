import React, { useState, useMemo } from 'react';
import { Level, GlossaryTerm, GlossaryCategory } from '../types';
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES } from '../constants';
import { CloseIcon, BookOpenIcon, PlayIcon } from '../components/Icons';
import { useLanguage } from '../i18n';

interface GlossaryViewProps {
    levels: Level[];
    onBack: () => void;
    initialSearch?: string;
}

const TermDetailModal: React.FC<{ term: GlossaryTerm; levels: Level[]; onClose: () => void; }> = ({ term, levels, onClose }) => {
    const { t } = useLanguage();

    const relatedLessons = useMemo(() => {
        return levels.flatMap(level => level.lessons)
            .filter(lesson => term.relatedLessonIds.includes(lesson.id));
    }, [levels, term]);

    return (
        <div className="fixed inset-0 bg-primary-dark/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-glass-bg border border-glass-border rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 relative text-text-light shadow-2xl animate-fade-in" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-text-muted hover:text-white z-10"><CloseIcon /></button>
                <h2 className="text-3xl font-bold text-accent-yellow mb-4">{t(term.termKey)}</h2>
                
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-lg mb-2 text-text-muted">{t('glossary.definition')}</h3>
                        <p>{t(term.definitionKey)}</p>
                    </div>
                     <div>
                        <h3 className="font-semibold text-lg mb-2 text-text-muted">{t('glossary.example')}</h3>
                        <p className="italic bg-white/5 p-3 rounded-lg border-l-4 border-accent-pink">{t(term.exampleKey)}</p>
                    </div>
                    {relatedLessons.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-lg mb-2 text-text-muted">{t('glossary.related_lessons')}</h3>
                            <ul className="space-y-2">
                                {relatedLessons.map(lesson => (
                                    <li key={lesson.id} className="flex items-center gap-2 p-2 bg-white/5 rounded-md">
                                        <PlayIcon className="w-5 h-5 text-accent-yellow" />
                                        <span>{t(lesson.titleKey)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


const GlossaryView: React.FC<GlossaryViewProps> = ({ levels, onBack, initialSearch = '' }) => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [activeFilter, setActiveFilter] = useState<GlossaryCategory | 'all' | { type: 'alpha', letter: string }>('all');
    const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

    const filteredTerms = useMemo(() => {
        let terms = [...GLOSSARY_TERMS].sort((a, b) => t(a.termKey).localeCompare(t(b.termKey)));
        
        if (searchTerm) {
            terms = terms.filter(term => t(term.termKey).toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (typeof activeFilter === 'string' && activeFilter !== 'all') {
            terms = terms.filter(term => term.category === activeFilter);
        } else if (typeof activeFilter === 'object' && activeFilter.type === 'alpha') {
            terms = terms.filter(term => t(term.termKey).toUpperCase().startsWith(activeFilter.letter));
        }

        return terms;
    }, [searchTerm, activeFilter, t]);

    const handleFilterClick = (filter: GlossaryCategory | 'all' | { type: 'alpha', letter: string }) => {
         setActiveFilter(prev => JSON.stringify(prev) === JSON.stringify(filter) ? 'all' : filter);
    };

    return (
        <>
            {selectedTerm && <TermDetailModal term={selectedTerm} levels={levels} onClose={() => setSelectedTerm(null)} />}
            <div className="fixed inset-0 bg-primary-dark/90 backdrop-blur-md z-50 p-4 sm:p-8 animate-fade-in flex flex-col">
                <div className="w-full max-w-5xl mx-auto flex-shrink-0">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                            <BookOpenIcon className="w-10 h-10 text-accent-yellow" />
                            {t('glossary.title')}
                        </h1>
                        <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10 transition-colors transform hover:scale-110">
                            <CloseIcon className="w-8 h-8 text-text-muted" />
                        </button>
                    </div>

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={t('glossary.search_placeholder')}
                        className="w-full bg-white/10 text-white placeholder-text-muted/70 text-lg p-4 rounded-xl border-2 border-glass-border focus:border-accent-yellow focus:outline-none transition-all mb-4"
                    />

                    <div className="mb-4">
                        <p className="text-sm font-semibold text-text-muted mb-2">Filter by Category</p>
                        <div className="flex flex-wrap gap-2">
                             <button onClick={() => handleFilterClick('all')} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeFilter === 'all' ? 'bg-accent-yellow text-primary-dark' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                                {t('glossary.all_categories')}
                            </button>
                            {GLOSSARY_CATEGORIES.map(cat => (
                                <button key={cat.id} onClick={() => handleFilterClick(cat.id)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeFilter === cat.id ? 'bg-accent-yellow text-primary-dark' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                                    {t(cat.nameKey)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="text-sm font-semibold text-text-muted mb-2">Filter by Alphabet</p>
                         <div className="flex flex-wrap gap-1">
                            {alphabet.map(letter => {
                                const filter = { type: 'alpha' as const, letter };
                                return (
                                <button key={letter} onClick={() => handleFilterClick(filter)} className={`w-8 h-8 rounded-md text-xs font-bold transition-colors ${JSON.stringify(activeFilter) === JSON.stringify(filter) ? 'bg-accent-yellow text-primary-dark' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                                    {letter}
                                </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex-grow w-full max-w-5xl mx-auto overflow-y-auto pr-2">
                    {filteredTerms.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredTerms.map(term => (
                                <div key={term.id} onClick={() => setSelectedTerm(term)} className="bg-glass-bg border border-glass-border rounded-lg p-4 cursor-pointer hover:bg-white/10 hover:border-accent-yellow transition-all transform hover:-translate-y-1">
                                    <h3 className="font-bold text-white">{t(term.termKey)}</h3>
                                </div>
                            ))}
                        </div>
                    ) : (
                         <div className="text-center text-text-muted mt-10">
                             <p>{t('glossary.no_results')}</p>
                        </div>
                    )}
                </div>

                <style>{`
                    @keyframes fade-in {
                        from { opacity: 0; transform: scale(0.98); }
                        to { opacity: 1; transform: scale(1); }
                    }
                    .animate-fade-in {
                        animation: fade-in 0.3s ease-out forwards;
                    }
                `}</style>
            </div>
        </>
    );
};

export default GlossaryView;