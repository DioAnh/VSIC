

import React, { useState } from 'react';
import { User } from '../types';

interface AvatarProps {
    avatar: User['avatar'];
    enableTapAnimation?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ avatar, enableTapAnimation = false }) => {
    const { stage, bodyShape, bodyColor, bellyColor, topper, eyes, mouth, outfit } = avatar;
    const [isBouncing, setIsBouncing] = useState(false);

    let bodyPath = bodyShape.bodyPath;
    if (stage === 2 && bodyShape.bodyPathStage2) {
        bodyPath = bodyShape.bodyPathStage2;
    } else if (stage >= 3 && bodyShape.bodyPathStage3) {
        bodyPath = bodyShape.bodyPathStage3;
    }

    const outfitItem = outfit.find(item => item.type === 'outfit');
    const accessoryItem = outfit.find(item => item.type === 'accessory');
    const effectItem = outfit.find(item => item.type === 'effect');

    const getAccessoryYPosition = (id: string) => {
        switch (id) {
            case 'accessory_pe1': return 80;  // Bow, high on head
            case 'accessory_ms1': return 115; // Headphones, over ears
            case 'accessory_hs1': return 130; // Glasses, on face
            case 'accessory_hs2': return 95; // Crown
            case 'accessory_pe2': return 170; // Scarf
            case 'accessory_ms2': return 130; // Backpack (will be mostly covered)
            default: return 130;
        }
    };
    
    const handleTap = () => {
        if (!enableTapAnimation) return;
        setIsBouncing(true);
        setTimeout(() => setIsBouncing(false), 300);
    };

    return (
        <div 
            className={`relative w-full h-full flex items-center justify-center ${bodyShape.animationClass} ${isBouncing ? 'animate-bounce-short' : ''}`}
            onClick={handleTap}
        >
            <style>{`
                @keyframes wobble { 0%, 100% { transform: rotate(-1deg); } 50% { transform: rotate(1deg); } }
                .animate-wobble { animation: wobble 3s ease-in-out infinite; }

                @keyframes sway { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
                .animate-sway { animation: sway 4s ease-in-out infinite; }
                
                @keyframes twinkle { 0%, 100% { opacity: 0.95; } 50% { opacity: 1; } }
                .animate-twinkle { animation: twinkle 1.5s ease-in-out infinite; }
                
                @keyframes shimmer { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.05); } }
                .animate-shimmer { animation: shimmer 2.5s ease-in-out infinite; }
                
                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
                .animate-float { animation: float 5s ease-in-out infinite; }
                
                @keyframes bounce-short {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-15px); }
                }
                .animate-bounce-short { animation: bounce-short 0.3s ease-out; }

                @keyframes spin-sparkle { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animate-spin-sparkle { animation: spin-sparkle 20s linear infinite; }
            `}</style>

            <svg viewBox="0 0 160 240" className="w-full h-full" style={{ transformOrigin: 'bottom center' }}>
                 {/* Layer 0: Effects (Aura, sparkles) */}
                 {effectItem?.type === 'effect' && (
                     <g transform="translate(80, 150)">
                        {effectItem.id === 'effect_hs1' && <path d={effectItem.path} fill="rgba(255, 216, 114, 0.2)" />}
                        {effectItem.id === 'effect_pe1' && <path d={effectItem.path} fill="#F4BAA5" className="animate-spin-sparkle" />}
                     </g>
                 )}
                 
                 <g style={{ transition: 'transform 0.5s ease-in-out', transformOrigin: 'bottom center' }}>
                    {/* Layer 1: Behind body (e.g., capes, backpacks) */}
                    {outfitItem?.id === 'outfit_ms1' && <path d="M 60,120 C 20,200 140,200 100,120 Z" fill="#36c9d1" stroke="#2b9fa5" strokeWidth="2" />}
                    {accessoryItem?.id === 'accessory_ms2' && <path d={accessoryItem.path} fill={accessoryItem.color} />}
                    
                    {/* Layer 2: Body */}
                    <path d={bodyPath} fill={bodyColor} stroke={bodyColor} strokeWidth="2" strokeLinejoin="round" />
                    
                    {/* Layer 3: Belly Patch */}
                    <path d={bodyShape.bellyPath} fill={bellyColor} />

                    {/* Layer 4: Body pattern (e.g., stripes) */}
                    {outfitItem?.id === 'outfit_pe1' && <path d="M45,140 Q80,130 115,140 L110,155 Q80,145 50,155 Z M45,165 Q80,155 115,165 L110,180 Q80,170 50,180 Z" fill="#4B5563" />}
                    {outfitItem?.id === 'outfit_hs1' && <path d="M80,150 L85,165 L100,165 L90,175 L95,190 L80,180 L65,190 L70,175 L60,165 L75,165 Z" fill="#FBBF24" />}


                    {/* Layer 5: Face details */}
                    <g transform="translate(80, 130)">
                        <path d={eyes.path} stroke="#5D4037" strokeWidth={eyes.id === 'eyes_shades' ? '3' : '2'} fill={eyes.id === 'eyes_shades' ? '#5D4037' : 'none'} strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                     <g transform="translate(80, 152)">
                        <path d={mouth.path} stroke="#5D4037" strokeWidth="2" fill={mouth.id === 'mouth_tongue' ? '#F472B6' : 'none'} strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    
                     {/* Layer 6: Face accessories (e.g., glasses, scarves) */}
                    {accessoryItem && (
                        <g transform={`translate(80, ${getAccessoryYPosition(accessoryItem.id)})`}>
                            <path d={accessoryItem.path} fill={accessoryItem.color || '#333'} stroke="#fff" strokeWidth="0.5" />
                        </g>
                    )}

                    {/* Layer 7: Head accessories */}
                    <g transform="translate(80, 95)">
                         {topper.path && <path d={topper.path} fill={topper.color || '#84CC16'} />}
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default Avatar;