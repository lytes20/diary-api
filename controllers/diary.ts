import { DiaryModel } from "../model/Diary";
import { summarizeText } from "../utils/openai";

const getDiaryEntries = async (req, res, next) => {
  try {
    const page = +req.query.page || 1;
    const results = await DiaryModel.find({ userId: req.user?._id })
      .skip((page - 1) * 10)
      .limit(10);
    res.json({ success: true, data: results });
  } catch (err) {
    next(err);
  }
};

const postDiaryEntry = async (req, res, next) => {
  try {
    const results = await DiaryModel.create({
      ...req.body,
      userId: req.user?._id,
    });
    res.json({ success: true, data: results });
  } catch (err) {
    next(err);
  }
};

const getDiaryEntry = async (req, res, next) => {
  try {
    const { diaryId } = req.params;
    const results = await DiaryModel.findOne({
      _id: diaryId,
      userId: req.user?._id,
    });
    res.json({ success: true, data: results });
  } catch (err) {
    next(err);
  }
};

const updateDiaryEntry = async (req, res, next) => {
  try {
    const { diaryId } = req.params;
    const results = await DiaryModel.updateOne(
      { _id: diaryId, userId: req.user?._id },
      { $set: req.body }
    );
    res.status(200).json({ success: true, data: results.modifiedCount });
  } catch (err) {
    next(err);
  }
};

const deleteDiaryEntry = async (req, res, next) => {
  try {
    const { diaryId } = req.params;
    const results = await DiaryModel.deleteOne({
      _id: diaryId,
      userId: req.user?._id,
    });
    res.status(200).json({ success: true, data: results.deletedCount });
  } catch (err) {
    next(err);
  }
};

const summarizeDiaryEntry = async (req, res, next) => {
  try {
    const { diaryId } = req.params;
    const diary = await DiaryModel.findOne({
      _id: diaryId,
      userId: req.user?._id,
    });

    if (!diary) {
      return res
        .status(404)
        .json({ success: false, message: "Diary entry not found" });
    }

    const summary = await summarizeText(diary.content);

    const updatedDiary = await DiaryModel.findByIdAndUpdate(diaryId, {
      $set: { summary },
    });

    res.json({ success: true, data: updatedDiary });
  } catch (err) {
    next(err);
  }
};

export default {
  getDiaryEntries,
  postDiaryEntry,
  getDiaryEntry,
  updateDiaryEntry,
  deleteDiaryEntry,
  summarizeDiaryEntry,
};
