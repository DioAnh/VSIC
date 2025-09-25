

export enum GameState {
    Authentication,
    OnboardingProfile,
    OnboardingAvatar,
    Learning,
}

export enum EducationalLevel {
    PreschoolElementary = 'preschool_elementary',
    MiddleSchool = 'middle_school',
    HighSchool = 'high_school',
}

export interface AvatarFeature {
    id: string;
    nameKey: string;
    path: string;
}

export type AvatarEyes = AvatarFeature;
export type AvatarMouth = AvatarFeature;

export interface AvatarItem {
    id: string;
    nameKey: string;
    type: 'topper' | 'outfit' | 'accessory' | 'effect';
    assetUrl: string; // Kept for potential future image assets
    path?: string; // For inline SVG rendering
    color?: string; // Optional color for the item path
}

export interface AvatarBodyShape {
    id: string;
    nameKey: string;
    bodyPath: string; // Stage 1
    bellyPath: string;
    bodyPathStage2?: string; // Stage 2
    bodyPathStage3?: string; // Stage 3
    animationClass: string; // For idle animation
}

// Interactive Story Types
export interface StoryCharacter {
    id: string;
    nameKey: string;
    // We can use the avatar system to define character appearance
    avatar: Omit<User['avatar'], 'outfit'>;
}

export interface StoryChoice {
    textKey: string;
    nextNodeId: string;
    statEffects?: Partial<StoryStats>;
    achievementId?: string;
}

export interface StoryNode {
    id: string;
    characterId: string | 'user' | 'narrator';
    dialogueKey: string;
    background: 'school_hallway' | 'classroom' | 'home';
    choices?: StoryChoice[];
    nextNodeId?: string;
}

export interface Story {
    id: string;
    titleKey: string;
    descriptionKey: string;
    levelId: EducationalLevel;
    startNodeId: string;
    nodes: StoryNode[];
    characters: StoryCharacter[];
}

export interface StoryStats {
    confidence: number;
    responsibility: number;
    empathy: number;
}

export interface StoryProgress {
    [storyId: string]: {
        currentNodeId: string;
        stats: StoryStats;
        unlockedAchievements: string[];
    }
}

export interface User {
    name: string;
    levelId: EducationalLevel;
    avatar: {
        stage: number; // 1 for child, 2 for teen, 3 for young adult
        bodyShape: AvatarBodyShape;
        bodyColor: string;
        bellyColor: string;
        topper: AvatarItem;
        eyes: AvatarEyes;
        mouth: AvatarMouth;
        outfit: AvatarItem[];
    };
    progress: { [lessonId: string]: boolean };
    points: number;
    completedLevels: EducationalLevel[];
    storyProgress?: StoryProgress;
}

export interface QuizQuestion {
    questionKey: string;
    optionsKeys: string[];
    correctAnswerIndex: number;
}

export interface Quiz {
    questions: QuizQuestion[];
}

export interface Lesson {
    id: string;
    titleKey: string;
    descriptionKey: string;
    videoUrl: string; 
    quiz: Quiz;
    completed: boolean;
}

export interface Level {
    id: EducationalLevel;
    nameKey: string;
    lessons: Lesson[];
    finalAssessment: Quiz;
    unlocked: boolean;
}

export enum GlossaryCategory {
    Anatomy = 'anatomy',
    Feelings = 'feelings',
    LGBTQ = 'lgbtq',
    Relationships = 'relationships',
    Safety = 'safety',
}

export interface GlossaryTerm {
    id: string;
    termKey: string;
    definitionKey: string;
    exampleKey: string;
    category: GlossaryCategory;
    relatedLessonIds: string[];
}

export interface Achievement {
    id: string;
    nameKey: string;
    descriptionKey: string;
    type: 'level' | 'story';
}

export interface Tip {
    id: string;
    textKey: string;
}

export interface Poll {
    id: string;
    questionKey: string;
    optionsKeys: string[];
    // Mock results for display
    results: number[];
}