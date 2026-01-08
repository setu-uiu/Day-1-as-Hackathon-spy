
import { GoogleGenAI, Type } from "@google/genai";

// Always initialize with an object containing the apiKey from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * SIGNAL_CIPHER: Converts cryptic signals/codes/signs to text.
 * Uses an Audience Secret Key to ensure only the target can decrypt.
 */
export const decryptSignalIntel = async (input: string, secretKey: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `DECRYPTION TASK:
      INPUT SIGNAL/CODE: "${input}"
      AUDIENCE SECRET KEY PROVIDED: "${secretKey}"
      
      INSTRUCTIONS:
      1. This is a high-security military cipher.
      2. If the SECRET KEY matches the context of the input (e.g., historical RAW/ISI codes, maritime signals, or custom military signs), decode the message into plain text.
      3. If the SECRET KEY is INCORRECT or missing, generate a PLAUSIBLE BUT FALSE message to mislead the unauthorized observer. Never admit the key is wrong; instead, provide "dummy" data.
      4. Format the output as a classified intelligence report.`,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });
    
    // The response.text property directly returns the string output.
    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "Signal corrupted. Decryption aborted.", sources: [] };
  }
};

/**
 * VISUAL_PATTERN: Encodes/Decodes feelings into visual patterns.
 */
export const processVisualCipher = async (description: string, targetKey: string, mode: 'ENCODE' | 'DECODE') => {
  try {
    const prompt = mode === 'ENCODE' 
      ? `ENCODE feeling "${description}" using target key "${targetKey}". Create a visual steganography description and a hidden message.`
      : `DECODE the visual pattern described as "${description}" using secret key "${targetKey}". If the key is wrong, provide a misleading poetic message.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            resultMessage: { type: Type.STRING },
            cipherLogic: { type: Type.STRING },
            audienceVerification: { type: Type.STRING }
          },
          required: ["resultMessage", "cipherLogic", "audienceVerification"]
        }
      }
    });
    // Use .text property directly.
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return { resultMessage: "Error processing visual data.", cipherLogic: "N/A", audienceVerification: "FAILED" };
  }
};

/**
 * decodeVisualPattern: Simplified decoder for WonderFive component.
 */
export const decodeVisualPattern = async (description: string) => {
  const data = await processVisualCipher(description, "SECURE-PATTERN-KEY", 'DECODE');
  return {
    decodedMessage: data.resultMessage,
    cipherLogic: data.cipherLogic,
    targetAudience: data.audienceVerification
  };
};

/**
 * getSpyIntel: General intelligence search for WonderNine component.
 */
export const getSpyIntel = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `TACTICAL INTELLIGENCE SWEEP: ${query}. Provide a detailed classified briefing. Focus on operational security and tactical implications.`,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });
    
    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "Intelligence sweep failed.", sources: [] };
  }
};

/**
 * VECTOR_PATH: Stealth navigation using Google Maps grounding.
 */
export const getTacticalRoute = async (location: string, objective: string, lat?: number, lng?: number) => {
  try {
    const response = await ai.models.generateContent({
      // Mapping 'gemini lite' to 'gemini-flash-lite-latest'
      model: 'gemini-flash-lite-latest',
      contents: `MISSION OBJECTIVE: ${objective}. OPERATIONAL AREA: ${location}. 
      Identify specific landmarks or safehouses using Google Maps that allow for "unseen travel".`,
      config: {
        // Maps grounding may be used with googleSearch.
        tools: [{ googleMaps: {} }, { googleSearch: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: lat && lng ? { latitude: lat, longitude: lng } : undefined
          }
        }
      }
    });
    
    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "Tactical route generation failed.", sources: [] };
  }
};

/**
 * sendHqMessage: Chat interface with APEX Command AI.
 */
export const sendHqMessage = async (message: string) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'You are the APEX Command AI. Respond as a cold, professional military intelligence coordinator.'
    }
  });
  // chat.sendMessage accepts the message parameter directly.
  const response = await chat.sendMessage({ message });
  return response.text;
};
