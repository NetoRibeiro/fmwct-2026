import { GoogleGenAI } from "@google/genai";
import type { Match } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateMatchHighlight = async (match: Match): Promise<string> => {
  if (!API_KEY) return "Gemini API key not configured.";
  
  const prompt = `Generate a fictional, exciting, short (2-3 sentences) match highlight for a FIFA World Cup game between ${match.teamA.name} and ${match.teamB.name}. The final score was ${match.teamA.name} ${match.scoreA} - ${match.scoreB} ${match.teamB.name}.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating match highlight:", error);
    return "Could not generate highlight. Please try again later.";
  }
};

export const generateMatchPreview = async (match: Match): Promise<string> => {
  if (!API_KEY) return "Gemini API key not configured.";

  const prompt = `Generate a fictional, insightful, short (2-3 sentences) statistical preview for an upcoming FIFA World Cup match between ${match.teamA.name} and ${match.teamB.name}. Mention a key player or team strength for each.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating match preview:", error);
    return "Could not generate preview. Please try again later.";
  }
};

export const generateVenuePreview = async (match: Match): Promise<string> => {
  if (!API_KEY) return "Gemini API key not configured.";

  const prompt = `Generate an exciting, short (2-3 sentences) preview of a FIFA World Cup match being held at ${match.stadium} in ${match.city}. Focus on the atmosphere and significance of the city/stadium for a major football match. The teams are not yet known.`;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating venue preview:", error);
    return "Could not generate preview. Please try again later.";
  }
};
