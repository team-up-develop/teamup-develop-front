import { user } from "./user";
import { programingLanguages, programingFrameworks, skills } from "./skills";
import { Job, ManageJob } from "@/types";
import { m } from "@/master";
const job: Job = {
  dev_end_date: new Date("2021-10-24T00:00:00+09:00"),
  dev_start_date: new Date("2021-01-24T00:00:00+09:00"),
  id: 1,
  job_description:
    "必須スキル\n\n・AndroidまたはiPhoneアプリケーションの開発/運用/保守経験\n・外国籍不可\n・ご年齢（～40代迄）\n※当業務についての未経験者不可\n\n尚可スキル\n\n【スキル】\n・Android OS/iOS両方の開発経験\n・Kotlinの開発経験2年以上\n・Swiftの開発経験2年以上\n\n【人物面】\n・勤怠が良好でコミュニケーションが取れる方",
  job_status_id: 1,
  job_title: "スマホ予約システム",
  programing_frameworks: programingLanguages,
  programing_languages: programingFrameworks,
  recruitment_numbers: 5,
  skills: skills,
  updated_at: new Date("2021-05-20T23:39:51+09:00"),
  created_at: new Date("2021-05-20T23:39:51+09:00"),
  deleted_at: null,
  user: user,
  user_id: 1,
};

const manageJob: ManageJob = {
  id: 1,
  updated_at: new Date("2021-01-24T00:00:00+09:00"),
  apply_status_id: m.JOB_STATUS_NEW,
  job_id: 1,
  job: job,
  user_id: 1,
  user: user,
};

const manageJobs = [manageJob];

export { job, manageJob, manageJobs };
