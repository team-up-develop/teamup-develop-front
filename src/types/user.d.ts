export type User = {
  bio: string;
  created_at: Date;
  deleted_at: Date | null;
  id: number;
  job: null;
  learning_start_date: Date;
  twitter_account: string | null;
  github_account: string | null;
  updatedAt: Date;
  birthday: Date;
  login_name: string;
  login_password: string;
  user_name: string;
} | {};

export interface RegisterSessionParams {
  userName: string;
  nickName: string;
  userBirthday: string;
  learningStartDate: string;
}