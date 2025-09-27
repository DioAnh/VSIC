
import React from 'react';
import { CertificateIcon } from '../components/Icons';
import { useLanguage } from '../i18n';

interface CertificateViewProps {
    levelNameKey: string;
    userName: string;
    onBack: () => void;
}

const CertificateView: React.FC<CertificateViewProps> = ({ levelNameKey, userName, onBack }) => {
    const { t } = useLanguage();

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center">
             <style>{`
                @media print {
                    body {
                        background: white !important;
                    }
                    body * {
                        visibility: hidden;
                    }
                    #certificate-section, #certificate-section * {
                        visibility: visible;
                        color: #1D2B64 !important;
                    }
                    #certificate-section {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        background: white !important;
                        border: 10px solid #FFD872 !important;
                    }
                     .no-print {
                        display: none;
                    }
                }
            `}</style>
            <div id="certificate-section" className="w-full max-w-4xl bg-glass-bg backdrop-blur-lg border-4 border-accent-yellow rounded-2xl shadow-2xl p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute -top-16 -left-16 w-48 h-48 bg-primary-light/50 rounded-full"></div>
                <div className="absolute -bottom-24 -right-12 w-64 h-64 bg-accent-pink/50 rounded-full"></div>

                <div className="relative z-10">
                    <CertificateIcon className="w-20 h-20 text-green-400 mx-auto mb-4" />
                    <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">{t('certificate.title')}</h1>
                    <p className="text-lg text-text-muted mb-8">{t('certificate.presented_to')}</p>

                    <p className="text-3xl sm:text-4xl font-bold text-accent-yellow underline decoration-wavy decoration-accent-pink underline-offset-8 mb-8">
                        {userName}
                    </p>

                    <p className="text-lg text-text-muted mb-4">{t('certificate.for_completing')}</p>
                    <p className="text-2xl font-bold text-white mb-10">{t(levelNameKey)}</p>

                    <div className="flex justify-between items-center text-sm text-text-muted">
                        <div className="text-left">
                            <p className="font-bold border-b-2 border-text-muted/50 pb-1 text-text-light">GENDUCATION Program</p>
                            <p>{t('certificate.issuing_authority')}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold border-b-2 border-text-muted/50 pb-1 text-text-light">{new Date().toLocaleDateString()}</p>
                            <p>{t('certificate.date_of_completion')}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mt-8 no-print">
                 <button onClick={onBack} className="bg-white/10 text-text-light font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-white/20 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 ease-in-out">
                    {t('certificate.back_button')}
                </button>
                 <button onClick={handlePrint} className="bg-gradient-to-r from-accent-pink to-accent-yellow text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-pink/40 transition-all duration-300 ease-in-out">
                    {t('certificate.print_button')}
                </button>
            </div>
        </div>
    );
}

export default CertificateView;
