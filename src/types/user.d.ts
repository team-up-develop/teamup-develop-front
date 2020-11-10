// * ユーザー情報
export interface User {
  bio: string;
  createdAt: Date;
  deletedAt: Date | null;
  githubAccount: string | null;
  id: number;
  job: null
  learningStartDate: Date;
  twitterAccount: string | null;
  updatedAt: Date;
  userBirthday: Date;
  userName: string;
}