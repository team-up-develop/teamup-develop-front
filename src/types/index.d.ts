// * 開発言語
export interface Language {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  programingLanguageName: string;
}

// * フレームワーク
export interface Framework {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  programingFrameworkName: string;
}

// * その他スキル
export interface Skill {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  skillName: string;
}