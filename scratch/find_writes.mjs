import fs from 'fs';

const transcriptPath = 'C:/Users/Gonzalo/.gemini/antigravity-ide/brain/6a4b31b3-acec-440b-8cfb-547c1955e222/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n').filter(Boolean);

for (let i = 0; i < 938; i++) {
  const line = lines[i];
  if (line.includes('roadmapTreeData.ts') && line.includes('write_to_file')) {
    console.log(`Step ${i} wrote to roadmapTreeData.ts`);
  }
}
