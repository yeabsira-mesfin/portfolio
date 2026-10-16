const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
const failures = [];
const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /gh[pousr]_[A-Za-z0-9]{30,}/,
  /github_pat_[A-Za-z0-9_]{40,}/,
  /AKIA[0-9A-Z]{16}/,
];
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  if (/(^|\/)\.env(?:\.|$)/.test(file) && !file.endsWith('.env.example')) failures.push(`${file}: environment file`);
  if (/\.(pem|key|p12|pfx|pdf)$/i.test(file)) failures.push(`${file}: private key or personal document requires review`);
  if (!/\.(js|jsx|json|html|md|yml|yaml|txt)$/.test(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  if (secretPatterns.some(pattern => pattern.test(content))) failures.push(`${file}: possible credential`);
  if (/^(src|public)\//.test(file) && /[\w.+-]+@(?:gmail\.com|gwmail\.gwu\.edu)|mailto:|tel:\+?\d/.test(content)) failures.push(`${file}: personal contact detail`);
}
function checkBuild(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) checkBuild(file);
    else if (/\.(map|pdf)$/.test(file)) failures.push(`${file}: source map or personal document`);
    else if (/\.(js|html)$/.test(file) && /[\w.+-]+@(?:gmail\.com|gwmail\.gwu\.edu)|mailto:|tel:\+?\d/.test(fs.readFileSync(file, 'utf8'))) failures.push(`${file}: personal contact detail`);
  }
}
if (fs.existsSync('build')) checkBuild('build');
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log('Security checks passed: no flagged credentials, private files, personal contact details, or production source maps.');
