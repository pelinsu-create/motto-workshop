import { GoogleGenAI, Modality } from "@google/genai";
import { writeFile } from "fs/promises";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const ART_STYLE = "Clean flat illustration, muted warm palette (lavender, soft blue, cream, peach, sage), thin outlines, simple geometric shapes, minimal background, modern workshop aesthetic, inspired by co-design method cards";

const covers = [
  { name: "brainstorming", prompt: `${ART_STYLE}. A diverse group of people gathered around a whiteboard full of colorful sticky notes. Light bulbs floating above. Energy and ideas flowing. Top-down perspective. Warm collaborative atmosphere.` },
  { name: "alignment", prompt: `${ART_STYLE}. Team members holding puzzle pieces that fit together, forming a complete picture. Arrows converging to a central point. People standing together looking at the same direction. Unity and shared vision.` },
  { name: "discovery", prompt: `${ART_STYLE}. A person with a magnifying glass exploring a landscape of questions marks, hidden doors, and floating cards. Curious, explorative mood. Soft blue and lavender tones. Journey of exploration.` },
  { name: "prototype-review", prompt: `${ART_STYLE}. Two screens or paper prototypes side by side with checkmarks and X marks. People evaluating and pointing. Dot voting stickers on options. Analytical but collaborative mood.` },
  { name: "retrospective", prompt: `${ART_STYLE}. A sailboat on calm water with wind in the sail and an anchor below. Sticky notes on the sail (things going well) and rocks in the water (challenges). Reflective, calm mood.` },
  { name: "codesign", prompt: `${ART_STYLE}. Multiple hands building something together — assembling blocks, drawing, and crafting. A shared workspace with diverse materials. Collaborative making. Inclusive, creative energy.` },
  { name: "cognitive-forcing", prompt: `${ART_STYLE}. A brain with gears and warning signs around it. A person wearing glasses examining assumptions written on cards. Red flags and question marks. Critical thinking mood. Purple and lavender tones.` },
  { name: "storytelling", prompt: `${ART_STYLE}. An open book with scenes flowing out of it — tiny people acting out scenarios, speech bubbles, and a stage. Narrative and empathy. Warm peach and cream tones. Theatrical but intimate.` },
];

async function generateCover(cover, index) {
  console.log(`Generating ${index + 1}/8: ${cover.name}...`);
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [{ role: "user", parts: [{ text: `Generate an image: ${cover.prompt}` }] }],
      config: { responseModalities: [Modality.TEXT, Modality.IMAGE] },
    });
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const ext = part.inlineData.mimeType === "image/png" ? "png" : "jpg";
        const path = `C:/Users/pelin/workspace/src/motto-workshop/public/activities/${cover.name}.${ext}`;
        await writeFile(path, Buffer.from(part.inlineData.data, "base64"));
        console.log(`  Saved: ${path}`);
      }
    }
  } catch (err) {
    console.log(`  Error: ${err.message?.substring(0, 100)}`);
  }
}

console.log("Generating 8 activity cover images...\n");
for (let i = 0; i < covers.length; i++) {
  await generateCover(covers[i], i);
  if (i < covers.length - 1) await new Promise(r => setTimeout(r, 3000));
}
console.log("\nDone!");
