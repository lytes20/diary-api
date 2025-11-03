import express from "express";
import diaryController from "../controllers/diary";

const router = express.Router();
router.get("/", diaryController.getDiaryEntries);
router.post("/", diaryController.postDiaryEntry);
router.get("/:diaryId", diaryController.getDiaryEntry);
router.put("/:diaryId", diaryController.updateDiaryEntry);
router.delete("/:diaryId", diaryController.deleteDiaryEntry);
router.post("/:diaryId/summarize", diaryController.summarizeDiaryEntry);

export default router;
