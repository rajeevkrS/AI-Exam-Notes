import Notes from "../models/Notes.js";
import UserModel from "../models/User.js";
import { generateGeminiResponse } from "../services/geminiServices.js";
import { buildPrompt } from "../utils/promptBuilder.js";

export const generateNotes = async (req, res) => {
  try {
    // Destructuring the request
    const {
      topic,
      classLevel,
      examType,
      revisionMode = false,
      includeDiagram = false,
      includeChart = false,
    } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic is required!" });
    }

    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    if (revisionMode && !user.isPremium) {
      return res.status(403).json({
        message: "Exam Revision Mode is available for premium users only",
      });
    }

    // If the user has fewer than 10 credits, it marks them as credit-unavailable, saves, and returns a 403 Forbidden
    if (user.credits < 10) {
      user.isCreditAvailable = false;
      await user.save();

      return res.status(403).json({ message: "Insufficient credits!" });
    }

    // It calls buildPrompt() to construct a structured prompt string from the user's options
    const prompt = buildPrompt({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    });

    // Calling generateGeminiResponse(prompt) to get AI-generated notes
    const aiResponse = await generateGeminiResponse(prompt);

    // Saving the notes
    const notes = await Notes.create({
      user: user._id,
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
      content: aiResponse,
    });

    // Subtracts 10 credits from the user, and if credits hit zero or below, marks isCreditAvailable as false
    user.credits -= 10;
    if (user.credits <= 0) user.isCreditAvailable = false;

    // Checking and creating notes array
    if (!Array.isArray(user.notes)) {
      user.notes = [];
    }

    // Pushing the user's notes into an array with user ID
    user.notes.push(notes._id);

    await user.save();

    return res.status(200).json({
      data: aiResponse,
      noteId: notes._id,
      creditsLeft: user.credits,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error in generating notes: " + error.message });
  }
};
