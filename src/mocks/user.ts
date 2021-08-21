import { programingLanguages, programingFrameworks, skills } from "./skills";
import { job } from "./jobs";

const user = {
  id: 1,
  bio: "自己紹介文のテスト",
  created_at: new Date("2021-1-1T00:00:00+09:00"),
  deleted_at: null,
  updated_at: new Date("2021-2-1T00:00:00+09:00"),
  email: "test@test.com",
  job: job,
  learning_start_date: new Date("2020-1-1T00:00:00+09:00"),
  twitter_account: "twitter.com",
  github_account: "github.com",
  birthday: new Date("1995-11-30T00:00:00+09:00"),
  user_name: "testUser;",
  user_image_id: 1,
  user_image: null,
  first_name: "テスト",
  last_name: "太郎",
  login_password: "password",
  programing_languages: programingLanguages,
  programing_frameworks: programingFrameworks,
  skills: skills,
};

export { user };
