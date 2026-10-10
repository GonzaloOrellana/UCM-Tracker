import fs from 'fs';

const transcriptPath = 'C:/Users/Gonzalo/.gemini/antigravity-ide/brain/6a4b31b3-acec-440b-8cfb-547c1955e222/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n').filter(Boolean);

for (let i = 850; i < lines.length; i++) {
  const obj = JSON.parse(lines[i]);
  if (obj.source === 'USER_EXPLICIT' || obj.type === 'USER_INPUT') {
    console.log(`Step ${i}: ${obj.content ? obj.content.slice(0, 150) : ''}`);
  }
}
