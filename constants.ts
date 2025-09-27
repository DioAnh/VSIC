

import { Level, EducationalLevel, AvatarItem, AvatarBodyShape, AvatarEyes, AvatarMouth, GlossaryTerm, GlossaryCategory, Story, StoryCharacter, Achievement, Tip, Poll } from './types';

export const BODY_COLORS = ['#A7F3D0', '#FDE68A', '#FECACA', '#BFDBFE', '#DDD6FE', '#FBCFE8', '#6EE7B7', '#FBBF24', '#F472B6', '#93C5FD', '#C4B5FD', '#F9A8D4'];

export const BODY_SHAPES: AvatarBodyShape[] = [
    { 
        id: 'shape_blob', nameKey: 'shape_blob_name', 
        bodyPath: 'M80,220 C30,220 25,120 80,100 C135,120 130,220 80,220 Z', 
        bellyPath: 'M80,180 C60,185 60,140 80,135 C100,140 100,185 80,180Z',
        bodyPathStage2: 'M80,225 C25,225 20,120 80,95 C140,120 135,225 80,225 Z', // Slightly taller
        bodyPathStage3: 'M80,230 C20,230 15,120 80,90 C145,120 140,230 80,230 Z', // Tallest
        animationClass: 'animate-wobble'
    },
    { 
        id: 'shape_sprout', nameKey: 'shape_sprout_name', 
        bodyPath: 'M80,220 C60,220 50,150 60,110 C70,70 90,70 100,110 C110,150 100,220 80,220 Z', 
        bellyPath: 'M80,185 C70,185 70,150 80,145 C90,150 90,185 80,185 Z',
        bodyPathStage2: 'M80,220 C60,220 50,150 60,110 C70,70 90,70 100,110 C110,150 100,220 80,220 Z M75,80 C65,60 80,65 75,80 M85,80 C95,60 80,65 85,80', // Two leaves
        bodyPathStage3: 'M80,220 C60,220 50,150 60,110 C70,70 90,70 100,110 C110,150 100,220 80,220 Z M75,80 C65,60 80,65 75,80 M85,80 C95,60 80,65 85,80 M80,70 a 5 5 0 1 1 0.01 0', // Flower bud
        animationClass: 'animate-sway'
    },
    { 
        id: 'shape_star', nameKey: 'shape_star_name', 
        bodyPath: 'M80,90 L95,140 L150,145 L110,180 L125,230 L80,200 L35,230 L50,180 L10,145 L65,140 Z', 
        bellyPath: 'M80,155 a 25 25 0 1 1 0.01 0',
        bodyPathStage2: 'M80,90 L95,140 L150,145 L110,180 L125,230 L80,200 L35,230 L50,180 L10,145 L65,140 Z M80 85 L83 95 L93 98 L85 101 L80 111 L75 101 L67 98 L77 95 Z', // Adds sparkle
        bodyPathStage3: 'M80,90 L95,140 L150,145 L110,180 L125,230 L80,200 L35,230 L50,180 L10,145 L65,140 Z M80 85 L83 95 L93 98 L85 101 L80 111 L75 101 L67 98 L77 95 Z M120 120 L122 125 L127 126 L123 127 L120 132 L117 127 L113 126 L118 125 Z', // More sparkles
        animationClass: 'animate-twinkle'
    },
    { 
        id: 'shape_crystal', nameKey: 'shape_crystal_name', 
        bodyPath: 'M80,220 L60,110 L100,110 Z', 
        bellyPath: 'M80,180 L70,150 L90,150 Z',
        bodyPathStage2: 'M80,220 L60,110 L100,110 Z M60,110 L40,120 L60,140 Z', // Side crystal
        bodyPathStage3: 'M80,220 L60,110 L100,110 Z M60,110 L40,120 L60,140 Z M100,110 L120,120 L100,140 Z', // Both side crystals
        animationClass: 'animate-shimmer'
    },
     { 
        id: 'shape_cloud', nameKey: 'shape_cloud_name', 
        bodyPath: 'M80,200 C40,200 40,140 70,140 C70,110 110,110 110,140 C140,140 140,200 80,200 Z', 
        bellyPath: 'M80,180 C65,180 65,160 80,160 C95,160 95,180 80,180 Z',
        bodyPathStage2: 'M80,200 C40,200 40,140 70,140 C70,110 110,110 110,140 C140,140 140,200 80,200 Z M50 130 C40 130 40 110 50 110 C 60 110 60 130 50 130 Z', // Small side cloud
        bodyPathStage3: 'M80,200 C40,200 40,140 70,140 C70,110 110,110 110,140 C140,140 140,200 80,200 Z M50 130 C40 130 40 110 50 110 C 60 110 60 130 50 130 Z M110 130 C100 130 100 110 110 110 C 120 110 120 130 110 130 Z', // Two side clouds
        animationClass: 'animate-float'
    },
];

export const EYES: AvatarEyes[] = [
    { id: 'eyes_normal', nameKey: 'eyes_normal_name', path: 'M-15,0 a 8 8 0 1 1 1,0 M15,0 a 8 8 0 1 1 1,0 M-12,2 a 4 4 0 1 1 1,0 M18,2 a 4 4 0 1 1 1,0' },
    { id: 'eyes_wink', nameKey: 'eyes_wink_name', path: 'M-15,0 a 8 8 0 1 1 1,0 M-12,2 a 4 4 0 1 1 1,0 M10,1 Q15,5 20,1' },
    { id: 'eyes_happy', nameKey: 'eyes_happy_name', path: 'M-20,1 C-15,5 -10,1 -20,1 M10,1 C15,5 20,1 10,1' },
    { id: 'eyes_shades', nameKey: 'eyes_shades_name', path: 'M-25,0 L-5,0 L-5,-10 L-25,-10 Z M5,0 L25,0 L25,-10 L5,-10 Z M-5,0 L5,0' },
];

export const MOUTHS: AvatarMouth[] = [
    { id: 'mouth_smile', nameKey: 'mouth_smile_name', path: 'M-10 0 Q 0,5 10,0' },
    { id: 'mouth_open', nameKey: 'mouth_open_name', path: 'M-8 0 a 8 8 0 1 0 16 0' },
    { id: 'mouth_simple', nameKey: 'mouth_simple_name', path: 'M-8 0 L 8 0' },
    { id: 'mouth_tongue', nameKey: 'mouth_tongue_name', path: 'M-10,0 Q0,5 10,0 M-2,2 a 5 5 90 1 0 4 0' },
];

export const TOPPERS: AvatarItem[] = [
    { id: 'topper_leaf', nameKey: 'item_topper_leaf', type: 'topper', assetUrl: '', path: 'M0,0 C-15,-25 15,-25 0,0 M0,-18 C-8,-35 8,-35 0,-18', color: '#84CC16' },
    { id: 'topper_antennae', nameKey: 'item_topper_antennae', type: 'topper', assetUrl: '', path: 'M-8,0 C-18,-30 -12,-35 -8,-30 L-8,0 Z M8,0 C18,-30 12,-35 8,-30 L8,0 Z', color: '#60A5FA' },
    { id: 'topper_flame', nameKey: 'item_topper_flame', type: 'topper', assetUrl: '', path: 'M0-35 C-10-25 -5 0 0 0 C5 0 10 -25 0 -35 Z', color: '#F97316' },
    { id: 'topper_horn', nameKey: 'item_topper_horn', type: 'topper', assetUrl: '', path: 'M0,0 C-10,-30 10,-30 0,-30 Z', color: '#FBBF24' },
];


export const AVATAR_REWARDS: { [key in EducationalLevel]: AvatarItem[] } = {
    [EducationalLevel.PreschoolElementary]: [
        { id: 'outfit_pe1', nameKey: 'item_outfit_bee', type: 'outfit', assetUrl: '', path: 'M45,140 Q80,130 115,140 L110,155 Q80,145 50,155 Z M45,165 Q80,155 115,165 L110,180 Q80,170 50,180 Z' },
        { id: 'accessory_pe1', nameKey: 'item_accessory_bow', type: 'accessory', assetUrl: '', path: 'M0,0 C-10,-10 -10,10 0,0 C10,10 10,-10 0,0 Z', color: '#F472B6' },
        { id: 'accessory_pe2', nameKey: 'item_accessory_scarf', type: 'accessory', assetUrl: '', path: 'M55,180 C60,190 100,190 105,180 L115,210 L45,210 Z', color: '#3B82F6' },
        { id: 'effect_pe1', nameKey: 'item_effect_sparkles', type: 'effect', assetUrl: '', path: 'M-30 0 L-25 5 L-20 0 L-25 -5 Z M20 20 L22 25 L24 20 L22 15 Z M30 -10 L33 -5 L36 -10 L33 -15 Z' },
    ],
    [EducationalLevel.MiddleSchool]: [
        { id: 'outfit_ms1', nameKey: 'item_outfit_cape', type: 'outfit', assetUrl: '', path: 'M 60,120 C 20,200 140,200 100,120 Z' },
        { id: 'accessory_ms1', nameKey: 'item_headphones', type: 'accessory', assetUrl: '', path: 'M-35,-15 a 30 30 0 0 1 70 0 v15 a 5 5 0 0 1 -10 0 v-10 a 20 20 0 0 0 -50 0 v10 a 5 5 0 0 1 -10 0 Z' },
        { id: 'accessory_ms2', nameKey: 'item_accessory_backpack', type: 'accessory', assetUrl: '', path: 'M60,130 L100,130 L105,180 L55,180 Z M70,120 L90,120 L90,130 L70,130 Z', color: '#10B981' },
    ],
    [EducationalLevel.HighSchool]: [
        { id: 'outfit_hs1', nameKey: 'item_outfit_star', type: 'outfit', assetUrl: '', path: 'M80,150 L85,165 L100,165 L90,175 L95,190 L80,180 L65,190 L70,175 L60,165 L75,165 Z' },
        { id: 'accessory_hs1', nameKey: 'item_glasses', type: 'accessory', assetUrl: '', path: 'M-30,0 a 15 15 0 1 0 30 0 a 15 15 0 1 0 -30 0 Z M5,0 H -5 M30,0 a 15 15 0 1 0 -30 0 a 15 15 0 1 0 30 0 Z' },
        { id: 'accessory_hs2', nameKey: 'item_accessory_crown', type: 'accessory', assetUrl: '', path: 'M-25,0 L-15,-20 L0,-10 L15,-20 L25,0 Z', color: '#FBBF24' },
        { id: 'effect_hs1', nameKey: 'item_effect_aura', type: 'effect', assetUrl: '', path: 'M0,0 a 60 80 0 1 0 0.1 0 Z' },
    ],
};

export const getMockLevels = (t: (key: string) => string): Level[] => [
    {
        id: EducationalLevel.PreschoolElementary,
        nameKey: "level_preschool_name",
        unlocked: true,
        lessons: [
            { id: 'pe_l1', titleKey: "lesson_pe_l1_title", descriptionKey: "lesson_pe_l1_desc", videoUrl: 'https://youtu.be/vJS7nlfLXso?si=OVl9mA3grqjBBntc', completed: false, quiz: { questions: [
                { questionKey: "quiz_pe_l1_q1", optionsKeys: ["quiz_pe_l1_q1_o1", "quiz_pe_l1_q1_o2", "quiz_pe_l1_q1_o3"], correctAnswerIndex: 1 },
                { questionKey: "quiz_pe_l1_q2", optionsKeys: ["quiz_pe_l1_q2_o1", "quiz_pe_l1_q2_o2", "quiz_pe_l1_q2_o3"], correctAnswerIndex: 0 },
                { questionKey: "quiz_pe_l1_q3", optionsKeys: ["quiz_pe_l1_q3_o1", "quiz_pe_l1_q3_o2", "quiz_pe_l1_q3_o3"], correctAnswerIndex: 2 }
            ] } },
            { id: 'pe_l2', titleKey: "lesson_pe_l2_title", descriptionKey: "lesson_pe_l2_desc", videoUrl: 'https://www.youtube.com/embed/hG933dwK-Is', completed: false, quiz: { questions: [
                { questionKey: "quiz_pe_l2_q1", optionsKeys: ["quiz_pe_l2_q1_o1", "quiz_pe_l2_q1_o2", "quiz_pe_l2_q1_o3"], correctAnswerIndex: 1 },
                { questionKey: "quiz_pe_l2_q2", optionsKeys: ["quiz_pe_l2_q2_o1", "quiz_pe_l2_q2_o2", "quiz_pe_l2_q2_o3"], correctAnswerIndex: 2 },
                { questionKey: "quiz_pe_l2_q3", optionsKeys: ["quiz_pe_l2_q3_o1", "quiz_pe_l2_q3_o2", "quiz_pe_l2_q3_o3"], correctAnswerIndex: 0 }
            ] } },
            { id: 'pe_l3', titleKey: "lesson_pe_l3_title", descriptionKey: "lesson_pe_l3_desc", videoUrl: 'https://www.youtube.com/embed/S-g2Xe7y7I4', completed: false, quiz: { questions: [
                { questionKey: "quiz_pe_l3_q1", optionsKeys: ["quiz_pe_l3_q1_o1", "quiz_pe_l3_q1_o2", "quiz_pe_l3_q1_o3"], correctAnswerIndex: 1 },
                { questionKey: "quiz_pe_l3_q2", optionsKeys: ["quiz_pe_l3_q2_o1", "quiz_pe_l3_q2_o2", "quiz_pe_l3_q2_o3"], correctAnswerIndex: 2 }
            ] } },
            { id: 'pe_l4', titleKey: "lesson_pe_l4_title", descriptionKey: "lesson_pe_l4_desc", videoUrl: 'https://www.youtube.com/embed/rI0_a-T4mI8', completed: false, quiz: { questions: [
                { questionKey: "quiz_pe_l4_q1", optionsKeys: ["quiz_pe_l4_q1_o1", "quiz_pe_l4_q1_o2", "quiz_pe_l4_q1_o3"], correctAnswerIndex: 2 },
                { questionKey: "quiz_pe_l4_q2", optionsKeys: ["quiz_pe_l4_q2_o1", "quiz_pe_l4_q2_o2", "quiz_pe_l4_q2_o3"], correctAnswerIndex: 0 }
            ] } },
            { id: 'pe_l5', titleKey: "lesson_pe_l5_title", descriptionKey: "lesson_pe_l5_desc", videoUrl: 'https://www.youtube.com/embed/uh82k4gH7oM', completed: false, quiz: { questions: [
                { questionKey: "quiz_pe_l5_q1", optionsKeys: ["quiz_pe_l5_q1_o1", "quiz_pe_l5_q1_o2", "quiz_pe_l5_q1_o3"], correctAnswerIndex: 1 }
            ] } },
        ],
        finalAssessment: { questions: [
            { questionKey: "quiz_pe_final_q1", optionsKeys: ["quiz_pe_final_q1_o1", "quiz_pe_final_q1_o2", "quiz_pe_final_q1_o3"], correctAnswerIndex: 0 },
            { questionKey: "quiz_pe_final_q2", optionsKeys: ["quiz_pe_final_q2_o1", "quiz_pe_final_q2_o2", "quiz_pe_final_q2_o3"], correctAnswerIndex: 2 },
            { questionKey: "quiz_pe_final_q3", optionsKeys: ["quiz_pe_final_q3_o1", "quiz_pe_final_q3_o2", "quiz_pe_final_q3_o3"], correctAnswerIndex: 0 }
        ] },
    },
    {
        id: EducationalLevel.MiddleSchool,
        nameKey: "level_ms_name",
        unlocked: false,
        lessons: [
            { id: 'ms_l1', titleKey: "lesson_ms_l1_title", descriptionKey: "lesson_ms_l1_desc", videoUrl: 'https://www.youtube.com/embed/TxtwlOqeg5w', completed: false, quiz: { questions: [
                { questionKey: "quiz_ms_l1_q1", optionsKeys: ["quiz_ms_l1_q1_o1", "quiz_ms_l1_q1_o2", "quiz_ms_l1_q1_o3", "quiz_ms_l1_q1_o4"], correctAnswerIndex: 1 },
                { questionKey: "quiz_ms_l1_q2", optionsKeys: ["quiz_ms_l1_q2_o1", "quiz_ms_l1_q2_o2", "quiz_ms_l1_q2_o3", "quiz_ms_l1_q2_o4"], correctAnswerIndex: 2 },
                { questionKey: "quiz_ms_l1_q3", optionsKeys: ["quiz_ms_l1_q3_o1", "quiz_ms_l1_q3_o2", "quiz_ms_l1_q3_o3", "quiz_ms_l1_q3_o4"], correctAnswerIndex: 2 },
                { questionKey: "quiz_ms_l1_q4", optionsKeys: ["quiz_ms_l1_q4_o1", "quiz_ms_l1_q4_o2", "quiz_ms_l1_q4_o3", "quiz_ms_l1_q4_o4"], correctAnswerIndex: 1 },
                { questionKey: "quiz_ms_l1_q5", optionsKeys: ["quiz_ms_l1_q5_o1", "quiz_ms_l1_q5_o2", "quiz_ms_l1_q5_o3", "quiz_ms_l1_q5_o4"], correctAnswerIndex: 1 }
            ] } },
            { id: 'ms_l2', titleKey: "lesson_ms_l2_title", descriptionKey: "lesson_ms_l2_desc", videoUrl: 'https://www.youtube.com/embed/c0IJlApsckw', completed: false, quiz: { questions: [
                { questionKey: "quiz_ms_l2_q1", optionsKeys: ["quiz_ms_l2_q1_o1", "quiz_ms_l2_q1_o2", "quiz_ms_l2_q1_o3", "quiz_ms_l2_q1_o4"], correctAnswerIndex: 2 },
                { questionKey: "quiz_ms_l2_q2", optionsKeys: ["quiz_ms_l2_q2_o1", "quiz_ms_l2_q2_o2", "quiz_ms_l2_q2_o3", "quiz_ms_l2_q2_o4"], correctAnswerIndex: 1 },
                { questionKey: "quiz_ms_l2_q3", optionsKeys: ["quiz_ms_l2_q3_o1", "quiz_ms_l2_q3_o2", "quiz_ms_l2_q3_o3", "quiz_ms_l2_q3_o4"], correctAnswerIndex: 2 },
                { questionKey: "quiz_ms_l2_q4", optionsKeys: ["quiz_ms_l2_q4_o1", "quiz_ms_l2_q4_o2", "quiz_ms_l2_q4_o3", "quiz_ms_l2_q4_o4"], correctAnswerIndex: 2 },
                { questionKey: "quiz_ms_l2_q5", optionsKeys: ["quiz_ms_l2_q5_o1", "quiz_ms_l2_q5_o2", "quiz_ms_l2_q5_o3", "quiz_ms_l2_q5_o4"], correctAnswerIndex: 2 }
            ] } },

            { id: 'ms_l3', titleKey: "lesson_ms_l3_title", descriptionKey: "lesson_ms_l3_desc", videoUrl: 'https://www.youtube.com/embed/HuD9wstvO1s', completed: false, quiz: { questions: [
                { questionKey: "quiz_ms_l3_q1", optionsKeys: ["quiz_ms_l3_q1_o1", "quiz_ms_l3_q1_o2", "quiz_ms_l3_q1_o3", "quiz_ms_l3_q1_o4"], correctAnswerIndex: 2 },
                { questionKey: "quiz_ms_l3_q2", optionsKeys: ["quiz_ms_l3_q2_o1", "quiz_ms_l3_q2_o2", "quiz_ms_l3_q2_o3", "quiz_ms_l3_q2_o4"], correctAnswerIndex: 0 },
                { questionKey: "quiz_ms_l3_q3", optionsKeys: ["quiz_ms_l3_q3_o1", "quiz_ms_l3_q3_o2", "quiz_ms_l3_q3_o3", "quiz_ms_l3_q3_o4"], correctAnswerIndex: 3 },
                { questionKey: "quiz_ms_l3_q4", optionsKeys: ["quiz_ms_l3_q4_o1", "quiz_ms_l3_q4_o2", "quiz_ms_l3_q4_o3", "quiz_ms_l3_q4_o4"], correctAnswerIndex: 1 },
                { questionKey: "quiz_ms_l3_q5", optionsKeys: ["quiz_ms_l3_q5_o1", "quiz_ms_l3_q5_o2", "quiz_ms_l3_q5_o3", "quiz_ms_l3_q5_o4"], correctAnswerIndex: 0 }
            ] } },
            { id: 'ms_l4', titleKey: "lesson_ms_l4_title", descriptionKey: "lesson_ms_l4_desc", videoUrl: 'https://www.youtube.com/embed/6hmHLJfOiXs', completed: false, quiz: { questions: [
                { questionKey: "quiz_ms_l4_q1", optionsKeys: ["quiz_ms_l4_q1_o1", "quiz_ms_l4_q1_o2", "quiz_ms_l4_q1_o3", "quiz_ms_l4_q1_o4"], correctAnswerIndex: 2 },
                { questionKey: "quiz_ms_l4_q2", optionsKeys: ["quiz_ms_l4_q2_o1", "quiz_ms_l4_q2_o2", "quiz_ms_l4_q2_o3", "quiz_ms_l4_q2_o4"], correctAnswerIndex: 1 },
                { questionKey: "quiz_ms_l4_q3", optionsKeys: ["quiz_ms_l4_q3_o1", "quiz_ms_l4_q3_o2", "quiz_ms_l4_q3_o3", "quiz_ms_l4_q3_o4"], correctAnswerIndex: 1 },
                { questionKey: "quiz_ms_l4_q4", optionsKeys: ["quiz_ms_l4_q4_o1", "quiz_ms_l4_q4_o2", "quiz_ms_l4_q4_o3", "quiz_ms_l4_q4_o4"], correctAnswerIndex: 2 },
                { questionKey: "quiz_ms_l4_q5", optionsKeys: ["quiz_ms_l4_q5_o1", "quiz_ms_l4_q5_o2", "quiz_ms_l4_q5_o3", "quiz_ms_l4_q5_o4"], correctAnswerIndex: 0 }
            ] } },
            { id: 'ms_l5', titleKey: "lesson_ms_l5_title", descriptionKey: "lesson_ms_l5_desc", videoUrl: 'https://www.youtube.com/embed/44qhTShiiXk', completed: false, quiz: { questions: [
                { questionKey: "quiz_ms_l5_q1", optionsKeys: ["quiz_ms_l5_q1_o1", "quiz_ms_l5_q1_o2", "quiz_ms_l5_q1_o3", "quiz_ms_l5_q1_o4"], correctAnswerIndex: 2 },
                { questionKey: "quiz_ms_l5_q2", optionsKeys: ["quiz_ms_l5_q2_o1", "quiz_ms_l5_q2_o2", "quiz_ms_l5_q2_o3", "quiz_ms_l5_q2_o4"], correctAnswerIndex: 1 },
                { questionKey: "quiz_ms_l5_q3", optionsKeys: ["quiz_ms_l5_q3_o1", "quiz_ms_l5_q3_o2", "quiz_ms_l5_q3_o3", "quiz_ms_l5_q3_o4"], correctAnswerIndex: 2 },
                { questionKey: "quiz_ms_l5_q4", optionsKeys: ["quiz_ms_l5_q4_o1", "quiz_ms_l5_q4_o2", "quiz_ms_l5_q4_o3", "quiz_ms_l5_q4_o4"], correctAnswerIndex: 2 },
                { questionKey: "quiz_ms_l5_q5", optionsKeys: ["quiz_ms_l5_q5_o1", "quiz_ms_l5_q5_o2", "quiz_ms_l5_q5_o3", "quiz_ms_l5_q5_o4"], correctAnswerIndex: 1 }
            ] } },
        ],
        finalAssessment: { questions: [
            { questionKey: "quiz_ms_final_q1", optionsKeys: ["quiz_ms_final_q1_o1", "quiz_ms_final_q1_o2", "quiz_ms_final_q1_o3"], correctAnswerIndex: 1 },
            { questionKey: "quiz_ms_final_q2", optionsKeys: ["quiz_ms_final_q2_o1", "quiz_ms_final_q2_o2", "quiz_ms_final_q2_o3"], correctAnswerIndex: 0 },
            { questionKey: "quiz_ms_final_q3", optionsKeys: ["quiz_ms_final_q3_o1", "quiz_ms_final_q3_o2", "quiz_ms_final_q3_o3"], correctAnswerIndex: 2 }
        ] },
    },
    {
        id: EducationalLevel.HighSchool,
        nameKey: "level_hs_name",
        unlocked: false,
        lessons: [
            { id: 'hs_l1', titleKey: "lesson_hs_l1_title", descriptionKey: "lesson_hs_l1_desc", videoUrl: 'https://www.youtube.com/embed/9_1Q6gL8z4o', completed: false, quiz: { questions: [
                { questionKey: "quiz_hs_l1_q1", optionsKeys: ["quiz_hs_l1_q1_o1", "quiz_hs_l1_q1_o2", "quiz_hs_l1_q1_o3"], correctAnswerIndex: 1 },
                { questionKey: "quiz_hs_l1_q2", optionsKeys: ["quiz_hs_l1_q2_o1", "quiz_hs_l1_q2_o2", "quiz_hs_l1_q2_o3"], correctAnswerIndex: 2 },
                { questionKey: "quiz_hs_l1_q3", optionsKeys: ["quiz_hs_l1_q3_o1", "quiz_hs_l1_q3_o2", "quiz_hs_l1_q3_o3"], correctAnswerIndex: 0 }
            ] } },
            { id: 'hs_l2', titleKey: "lesson_hs_l2_title", descriptionKey: "lesson_hs_l2_desc", videoUrl: 'https://www.youtube.com/embed/cMckoPvClJA', completed: false, quiz: { questions: [
                { questionKey: "quiz_hs_l2_q1", optionsKeys: ["quiz_hs_l2_q1_o1", "quiz_hs_l2_q1_o2", "quiz_hs_l2_q1_o3"], correctAnswerIndex: 1 },
                { questionKey: "quiz_hs_l2_q2", optionsKeys: ["quiz_hs_l2_q2_o1", "quiz_hs_l2_q2_o2", "quiz_hs_l2_q2_o3"], correctAnswerIndex: 0 },
                { questionKey: "quiz_hs_l2_q3", optionsKeys: ["quiz_hs_l2_q3_o1", "quiz_hs_l2_q3_o2", "quiz_hs_l2_q3_o3"], correctAnswerIndex: 1 }
            ] } },
            { id: 'hs_l3', titleKey: "lesson_hs_l3_title", descriptionKey: "lesson_hs_l3_desc", videoUrl: 'https://www.youtube.com/embed/5-b6I41F0-A', completed: false, quiz: { questions: [
                { questionKey: "quiz_hs_l3_q1", optionsKeys: ["quiz_hs_l3_q1_o1", "quiz_hs_l3_q1_o2", "quiz_hs_l3_q1_o3"], correctAnswerIndex: 1 },
                { questionKey: "quiz_hs_l3_q2", optionsKeys: ["quiz_hs_l3_q2_o1", "quiz_hs_l3_q2_o2", "quiz_hs_l3_q2_o3"], correctAnswerIndex: 0 }
            ] } },
            { id: 'hs_l4', titleKey: "lesson_hs_l4_title", descriptionKey: "lesson_hs_l4_desc", videoUrl: 'https://www.youtube.com/embed/D0CATy2N-jQ', completed: false, quiz: { questions: [
                { questionKey: "quiz_hs_l4_q1", optionsKeys: ["quiz_hs_l4_q1_o1", "quiz_hs_l4_q1_o2", "quiz_hs_l4_q1_o3"], correctAnswerIndex: 2 },
                { questionKey: "quiz_hs_l4_q2", optionsKeys: ["quiz_hs_l4_q2_o1", "quiz_hs_l4_q2_o2", "quiz_hs_l4_q2_o3"], correctAnswerIndex: 2 }
            ] } },
             { id: 'hs_l5', titleKey: "lesson_hs_l5_title", descriptionKey: "lesson_hs_l5_desc", videoUrl: 'https://www.youtube.com/embed/AZkca6-U8gE', completed: false, quiz: { questions: [
                { questionKey: "quiz_hs_l5_q1", optionsKeys: ["quiz_hs_l5_q1_o1", "quiz_hs_l5_q1_o2", "quiz_hs_l5_q1_o3"], correctAnswerIndex: 1 }
            ] } },
        ],
        finalAssessment: { questions: [
            { questionKey: "quiz_hs_final_q1", optionsKeys: ["quiz_hs_final_q1_o1", "quiz_hs_final_q1_o2", "quiz_hs_final_q1_o3"], correctAnswerIndex: 1 },
            { questionKey: "quiz_hs_final_q2", optionsKeys: ["quiz_hs_final_q2_o1", "quiz_hs_final_q2_o2", "quiz_hs_final_q2_o3"], correctAnswerIndex: 0 },
            { questionKey: "quiz_hs_final_q3", optionsKeys: ["quiz_hs_final_q3_o1", "quiz_hs_final_q3_o2", "quiz_hs_final_q3_o3"], correctAnswerIndex: 2 }
        ] },
    }
];

export const GLOSSARY_CATEGORIES: { id: GlossaryCategory, nameKey: string }[] = [
    { id: GlossaryCategory.Anatomy, nameKey: 'glossary.category_anatomy' },
    { id: GlossaryCategory.Feelings, nameKey: 'glossary.category_feelings' },
    { id: GlossaryCategory.LGBTQ, nameKey: 'glossary.category_lgbtq' },
    { id: GlossaryCategory.Relationships, nameKey: 'glossary.category_relationships' },
    { id: GlossaryCategory.Safety, nameKey: 'glossary.category_safety' },
];


export const GLOSSARY_TERMS: GlossaryTerm[] = [
    {
        id: 'term_consent',
        termKey: 'glossary.term_consent',
        definitionKey: 'glossary.def_consent',
        exampleKey: 'glossary.ex_consent',
        category: GlossaryCategory.Safety,
        relatedLessonIds: ['ms_l2'],
    },
    {
        id: 'term_puberty',
        termKey: 'glossary.term_puberty',
        definitionKey: 'glossary.def_puberty',
        exampleKey: 'glossary.ex_puberty',
        category: GlossaryCategory.Anatomy,
        relatedLessonIds: ['ms_l1'],
    },
    {
        id: 'term_boundaries',
        termKey: 'glossary.term_boundaries',
        definitionKey: 'glossary.def_boundaries',
        exampleKey: 'glossary.ex_boundaries',
        category: GlossaryCategory.Relationships,
        relatedLessonIds: ['pe_l1', 'hs_l1'],
    },
    {
        id: 'term_lgbtq',
        termKey: 'glossary.term_lgbtq',
        definitionKey: 'glossary.def_lgbtq',
        exampleKey: 'glossary.ex_lgbtq',
        category: GlossaryCategory.LGBTQ,
        relatedLessonIds: ['hs_l4'],
    },
    {
        id: 'term_empathy',
        termKey: 'glossary.term_empathy',
        definitionKey: 'glossary.def_empathy',
        exampleKey: 'glossary.ex_empathy',
        category: GlossaryCategory.Feelings,
        relatedLessonIds: ['hs_l1', 'pe_l3'],
    },
     {
        id: 'term_sti',
        termKey: 'glossary.term_sti',
        definitionKey: 'glossary.def_sti',
        exampleKey: 'glossary.ex_sti',
        category: GlossaryCategory.Safety,
        relatedLessonIds: ['hs_l2'],
    },
];

// --- DASHBOARD WIDGET CONSTANTS ---

export const TIPS_OF_THE_DAY: Tip[] = [
    { id: 'tip1', textKey: 'tips.tip1' },
    { id: 'tip2', textKey: 'tips.tip2' },
    { id: 'tip3', textKey: 'tips.tip3' },
    { id: 'tip4', textKey: 'tips.tip4' },
    { id: 'tip5', textKey: 'tips.tip5' },
];

export const QUICK_POLLS: Poll[] = [
    {
        id: 'poll1',
        questionKey: 'polls.poll1_question',
        optionsKeys: ['polls.poll1_op1', 'polls.poll1_op2', 'polls.poll1_op3'],
        results: [45, 38, 17]
    },
    {
        id: 'poll2',
        questionKey: 'polls.poll2_question',
        optionsKeys: ['polls.poll2_op1', 'polls.poll2_op2', 'polls.poll2_op3'],
        results: [62, 25, 13]
    }
];

// --- INTERACTIVE STORY CONSTANTS ---

export const STORY_CHARACTERS: StoryCharacter[] = [
    {
        id: 'an',
        nameKey: 'story.char_an',
        avatar: { stage: 2, bodyShape: BODY_SHAPES[1], bodyColor: '#FECACA', bellyColor: '#FBCFE8', topper: TOPPERS[2], eyes: EYES[2], mouth: MOUTHS[3] }
    },
    {
        id: 'mai',
        nameKey: 'story.char_mai',
        avatar: { stage: 2, bodyShape: BODY_SHAPES[2], bodyColor: '#BFDBFE', bellyColor: '#DDD6FE', topper: TOPPERS[0], eyes: EYES[0], mouth: MOUTHS[0] }
    },
    {
        id: 'co_lan',
        nameKey: 'story.char_co_lan',
        avatar: { stage: 3, bodyShape: BODY_SHAPES[0], bodyColor: '#A7F3D0', bellyColor: '#FDE68A', topper: TOPPERS[1], eyes: EYES[3], mouth: MOUTHS[0] }
    }
];

export const ALL_ACHIEVEMENTS: Achievement[] = [
    { id: 'story_ms_peacemaker', nameKey: 'story.achieve_peacemaker_name', descriptionKey: 'story.achieve_peacemaker_desc', type: 'story' }
];

export const MIDDLE_SCHOOL_STORY: Story = {
    id: 'ms_story_1',
    titleKey: 'story.ms_story_1_title',
    descriptionKey: 'story.ms_story_1_desc',
    levelId: EducationalLevel.MiddleSchool,
    startNodeId: 'start',
    characters: STORY_CHARACTERS,
    nodes: [
        { id: 'start', characterId: 'narrator', dialogueKey: 'story.ms_story_1.1', background: 'school_hallway', nextNodeId: '2' },
        { id: '2', characterId: 'an', dialogueKey: 'story.ms_story_1.2', background: 'school_hallway', nextNodeId: '3' },
        { id: '3', characterId: 'user', dialogueKey: 'story.ms_story_1.3', background: 'school_hallway', nextNodeId: '4' },
        { id: '4', characterId: 'mai', dialogueKey: 'story.ms_story_1.4', background: 'school_hallway', nextNodeId: '5' },
        { id: '5', characterId: 'narrator', dialogueKey: 'story.ms_story_1.5', background: 'school_hallway', nextNodeId: 'decision_1' },
        {
            id: 'decision_1',
            characterId: 'user',
            dialogueKey: 'story.ms_story_1.6',
            background: 'school_hallway',
            choices: [
                { textKey: 'story.ms_story_1.choice_A', nextNodeId: 'path_A1', statEffects: { confidence: 1 } },
                { textKey: 'story.ms_story_1.choice_B', nextNodeId: 'path_B1', statEffects: { responsibility: 1 }, achievementId: 'story_ms_peacemaker' },
                { textKey: 'story.ms_story_1.choice_C', nextNodeId: 'path_C1' }
            ]
        },
        // Path A (Confront)
        { id: 'path_A1', characterId: 'user', dialogueKey: 'story.ms_story_1.A1', background: 'school_hallway', nextNodeId: 'path_A2' },
        { id: 'path_A2', characterId: 'an', dialogueKey: 'story.ms_story_1.A2', background: 'school_hallway', nextNodeId: 'lesson_1' },
        // Path B (Talk to Mai)
        { id: 'path_B1', characterId: 'user', dialogueKey: 'story.ms_story_1.B1', background: 'school_hallway', nextNodeId: 'path_B2' },
        { id: 'path_B2', characterId: 'mai', dialogueKey: 'story.ms_story_1.B2', background: 'school_hallway', nextNodeId: 'path_B3' },
        { id: 'path_B3', characterId: 'user', dialogueKey: 'story.ms_story_1.B3', background: 'school_hallway', nextNodeId: 'lesson_1' },
        // Path C (Ignore)
        { id: 'path_C1', characterId: 'narrator', dialogueKey: 'story.ms_story_1.C1', background: 'school_hallway', nextNodeId: 'lesson_1' },
        // Lesson Moment
        { id: 'lesson_1', characterId: 'narrator', dialogueKey: 'story.ms_story_1.L1', background: 'classroom', nextNodeId: 'lesson_2' },
        { id: 'lesson_2', characterId: 'co_lan', dialogueKey: 'story.ms_story_1.L2', background: 'classroom', nextNodeId: 'lesson_3' },
        { id: 'lesson_3', characterId: 'co_lan', dialogueKey: 'story.ms_story_1.L3', background: 'classroom', nextNodeId: 'end' },
        { id: 'end', characterId: 'narrator', dialogueKey: 'story.ms_story_1.end', background: 'classroom' },
    ],
};