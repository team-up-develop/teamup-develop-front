// * ユーザー情報
export type User = {
  bio: string;
  createdAt: Date;
  deletedAt: Date | null;
  githubAccount: string | null;
  id: number;
  job: null;
  learning_start_date: Date;
  twitterAccount: string | null;
  updatedAt: Date;
  birthday: Date;
  login_name: string;
  login_password: string;
  user_name: string;
} | {};

// * 登録
export interface RegisterSessionParams {
  userName: string;
  nickName: string;
  userBirthday: string;
  learningStartDate: string;
}