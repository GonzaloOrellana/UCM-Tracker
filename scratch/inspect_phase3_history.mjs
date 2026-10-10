import fs from 'fs';

const transcriptPath = 'C:/Users/Gonzalo/.gemini/antigravity-ide/brain/6a4b31b3-acec-440b-8cfb-547c1955e222/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n').filter(Boolean);

for (const stepNum of [847, 853, 778, 604]) {
  const step = JSON.parse(lines[stepNum]);
  if (step.tool_calls) {
    for (const tc of step.tool_calls) {
      console.log(`=== Step ${stepNum} ${tc.name} ${tc.args.TargetFile || ''} ===`);
      const code = tc.args.CodeContent || tc.args.ReplacementContent || '';
      if (code.includes('ant-man-and-the-wasp-21') || code.includes('avengers-infinity-war-20')) {
        // Find Phase 3 snippet
        const linesCode = code.split('\n');
        for (let j = 0; j < linesCode.length; j++) {
          if (linesCode[j].includes('avengers-infinity-war') || linesCode[j].includes('ant-man-and-the-wasp') || linesCode[j].includes('black-panther')) {
            console.log(linesCode.slice(Math.max(0, j-2), Math.min(linesCode.length, j+8)).join('\n'));
            break;
          }
        }
      }
    }
  }
}
