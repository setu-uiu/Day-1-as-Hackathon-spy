
import { GoogleGenAI, Type, Chat } from "@google/genai";

// Always initialize with an object containing the apiKey from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Persistent chat instance for HQ communication to maintain context
let hqChatInstance: Chat | null = null;

/**
 * SIGNAL_CIPHER: Converts cryptic signals/codes/signs to text.
 * Uses an Audience Secret Key to ensure only the target can decrypt.
 * Upgraded to gemini-3-pro-preview for advanced reasoning requirements.
 */
export const decryptSignalIntel = async (input: string, secretKey: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
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
 * Upgraded to gemini-3-pro-preview for high-quality reasoning and structured output.
 */
export const processVisualCipher = async (description: string, targetKey: string, mode: 'ENCODE' | 'DECODE') => {
  try {
    const prompt = mode === 'ENCODE' 
      ? `ENCODE feeling "${description}" using target key "${targetKey}". Create a visual steganography description and a hidden message.`
      : `DECODE the visual pattern described as "${description}" using secret key "${targetKey}". If the key is wrong, provide a misleading poetic message.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
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
          required: ["resultMessage", "cipherLogic", "audienceVerification"],
          propertyOrdering: ["resultMessage", "cipherLogic", "audienceVerification"]
        }
      }
    });
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
 * Upgraded to gemini-3-pro-preview for complex tactical analysis.
 */
export const getSpyIntel = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
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
 * Maps grounding is specifically supported in Gemini 2.5 series models.
 */
export const getTacticalRoute = async (location: string, objective: string, lat?: number, lng?: number) => {
  try {
    const response = await ai.models.generateContent({
      // Maps grounding is only supported in Gemini 2.5 series models.
      model: 'gemini-2.5-flash',
      contents: `MISSION OBJECTIVE: ${objective}. OPERATIONAL AREA: ${location}. 
      Identify specific landmarks or safehouses using Google Maps that allow for "unseen travel" or covert deployment. 
      Explain why these locations are tactically significant for a spy operation.`,
      config: {
        // Maps grounding may be used with googleSearch.
        tools: [{ googleMaps: {} }, { googleSearch: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: (lat !== undefined && lng !== undefined) ? {
              latitude: lat,
              longitude: lng
            } : undefined
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
    return { text: "Tactical route generation failed due to system constraint.", sources: [] };
  }
};

/**
 * sendHqMessage: Chat interface with APEX Command AI.
 * Uses a persistent chat session to maintain history across messages.
 */
export const sendHqMessage = async (message: string) => {
  // Initialize chat instance if not already created to support conversational history
  if (!hqChatInstance) {
    hqChatInstance = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: 'You are the APEX Command AI. Respond as a cold, professional military intelligence coordinator. Use jargon like "Signal Intercepted," "Affirmative Agent," and "Package Secure." Keep responses brief and tactical.'
      }
    });
  }
  const response = await hqChatInstance.sendMessage({ message });
  return response.text;
};
