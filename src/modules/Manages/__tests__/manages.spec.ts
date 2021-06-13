import { m } from "@/master";
import { doneParticipate, doneReject } from "@/modules/Manages/manages";

describe("manage.ts", () => {
  describe("doneParticipate", () => {
    it("既に参加済みであれば、正常に表示ができること", () => {
      const statusId = m.APPLY_STATUS_PARTICIPATE;
      const result = doneParticipate(statusId);

      expect(result).toBe(true);
    });

    it("参加済み以外のステータスだったら、false", () => {
      const statusId = m.APPLY_STATUS_APPLY;
      const result = doneParticipate(statusId);

      expect(result).toBe(false);
    });
  });

  describe("doneReject", () => {
    it("既に拒否済みであれば、正常に表示ができること", () => {
      const statusId = m.APPLY_STATUS_REJECT;
      const result = doneReject(statusId);

      expect(result).toBe(true);
    });

    it("拒否済み以外のステータスだったら、false", () => {
      const statusId = m.APPLY_STATUS_APPLY;
      const result = doneReject(statusId);

      expect(result).toBe(false);
    });
  });
});
