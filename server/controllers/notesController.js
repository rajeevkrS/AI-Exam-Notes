import Notes from "../models/Notes.js";

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
    return res.status(404).json({ message: `getMyNotes error: ${error}` });
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
    return res.status(404).json({ message: `getSingleNotes error: ${error}` });
  }
};
