import fs from 'fs';

const transcriptPath = 'C:/Users/Gonzalo/.gemini/antigravity-ide/brain/6a4b31b3-acec-440b-8cfb-547c1955e222/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n').filter(Boolean);

const step938 = JSON.parse(lines[938]);
if (step938.tool_calls) {
  for (const tc of step938.tool_calls) {
    console.log(tc.name, tc.args.TargetFile);
    if (tc.args.CodeContent) {
      console.log(tc.args.CodeContent.slice(0, 1000));
    }
  }
}
