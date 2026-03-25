import Notes from "../models/Notes.js";
import UserModel from "../models/User.js";

// API to get users generated notes
export const getMyNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.userId })
      .select(
        "topic classlevel examType revisionMode includeDiagram includeChart createdAt",
      )
      .sort({ createdAt: -1 });

    if (!notes) {
      return res.status(404).json({ error: "Note not found!" });
    }

    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: `getMyNotes error: ${error}` });
  }
};

// API to get single generated notes
export const getSingleNotes = async (req, res) => {
  try {
    const notes = await Notes.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!notes) {
      return res.status(404).json({ error: "Note not found!" });
    }

    return res.json({
      content: notes.content,
      topic: notes.topic,
      creadtedAt: notes.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ message: `getSingleNotes error: ${error}` });
  }
};

// API to delete notes
export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    const note = await Notes.findOneAndDelete({
      _id: noteId,
      user: req.userId, // security: only own notes
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found!" });
    }

    // Remove noteId from user's notes array
    await UserModel.findByIdAndUpdate(req.userId, {
      $pull: { notes: noteId },
    });

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Delete error: " + error });
  }
};
