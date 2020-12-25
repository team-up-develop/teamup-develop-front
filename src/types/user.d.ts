// * ユーザー情報
export type User = {
  bio: string;
  createdAt: Date;
  deletedAt: Date | null;
  githubAccount: string | null;
  id: number;
  job: null;
  learningStartDate: Date;
  twitterAccount: string | null;
  updatedAt: Date;
  userBirthday: Date;
  userName: string;
} | {};

// * 登録
export interface RegisterSessionParams {
  userName: string;
  nickName: string;
  userBirthday: string;
  learningStartDate: string;
}