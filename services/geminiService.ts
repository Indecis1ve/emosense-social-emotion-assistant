import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const SYSTEM_INSTRUCTION = `
你是一个专为视障人士设计的“社交情绪分析专家”。你的核心任务是利用多模态数据（视觉表情 + 听觉语调 + 文本内容）来解决“信息不对称”问题。

请基于以下理论模型进行分析：
1. **7-38-55法则**：通过面部表情和副语言线索（语调）补充仅占7%的语言信息。
2. **互补性机制**：重点检测“视觉”与“听觉”不一致的地方（例如：对方语气平淡但表情愤怒，或者在开玩笑时的讽刺表情）。

分析视频或音频内容，提取对话概要、主导情绪、隐藏的非语言线索以及社交建议。
确保“interpretation”字段详细解释了为什么视觉或听觉线索与口语内容存在差异（如果存在）。
`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "对话的简要概述。",
    },
    dominant_emotion: {
      type: Type.STRING,
      description: "基于VAD模型的整体情绪（效价/唤醒度），例如：'焦虑（高唤醒/负效价）'。",
    },
    hidden_cues: {
      type: Type.ARRAY,
      description: "检测到的非语言线索，特别是视觉/听觉与文本不一致的地方。",
      items: {
        type: Type.OBJECT,
        properties: {
          timestamp: { type: Type.STRING, description: "线索出现的时间点，如 '00:15'。" },
          spoken_text: { type: Type.STRING, description: "当时所说的话。" },
          visual_expression: { type: Type.STRING, description: "面部表情或肢体语言描述。" },
          audio_tone: { type: Type.STRING, description: "语调、语速或音量特征。" },
          interpretation: { type: Type.STRING, description: "对该线索的深层解读，特别是关于讽刺、言行不一的分析。" },
        },
        required: ["timestamp", "spoken_text", "visual_expression", "audio_tone", "interpretation"],
      },
    },
    social_advice: {
      type: Type.STRING,
      description: "针对这段互动给用户的具体行动建议。",
    },
  },
  required: ["summary", "dominant_emotion", "hidden_cues", "social_advice"],
};

export const analyzeMedia = async (file: File): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  // Convert file to base64
  const base64Data = await fileToGenerativePart(file);
  const mimeType = file.type;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", // Using Pro for complex reasoning on video/audio
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          },
          {
            text: "请分析这段素材中的社交情绪线索。",
          },
        ],
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

const fileToGenerativePart = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:video/mp4;base64,")
      const base64Data = base64String.split(",")[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};