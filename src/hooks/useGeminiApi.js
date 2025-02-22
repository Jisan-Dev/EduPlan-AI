import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

export const useGeminiApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateLessonPlan = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      const genAi = new GoogleGenerativeAI(API_KEY);
      const model = genAi.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `
        Create a detailed lesson plan on the topic "${data.topic}" for grade level "${data.gradeLevel}".
        
        Main concept: ${data.mainConcept}
        Subtopics: ${data.subtopics.join(", ")}
        
        Format the response as a JSON object with the following structure:
        {
          "topic": "${data.topic}",
          "gradeLevel": "${data.gradeLevel}",
          "mainConcept": "${data.mainConcept}",
          "subtopics": [List of subtopics],
          "materialsNeeded": [List of 5-7 specific materials],
          "learningObjectives": [List of 3-5 specific learning objectives following Bloom's taxonomy],
          "lessonOutline": [
            {
              "duration": "Time in minutes",
              "activity": "Detailed description of activity",
              "remarks": "Teaching notes or reminders"
            },
            ... (at least 5 different activities)
          ],
          "assessmentQuestions": [List of 3-5 assessment questions]
        }
      `;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse JSON from the response
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*}/);
      const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text;

      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Error generating lesson plan:", error);
      setError("Failed to generate lesson plan. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generateLessonPlan, loading, error };
};
