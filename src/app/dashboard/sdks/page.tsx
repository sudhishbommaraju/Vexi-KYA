'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

const sdks = [
  {
    name: 'Node.js',
    pkg: '@vexi/node',
    install: 'npm install @vexi/node',
    snippet: `import { VexiClient } from '@vexi/node';

const vexi = new VexiClient({
  token: process.env.VEXI_KEY,
});

const session = await vexi.tokens.create({
  policy: 'pol_aws_deploy',
  max_spend: 5000,
  expires_in: '1h',
});`,
  },
  {
    name: 'Python',
    pkg: 'vexi-python',
    install: 'pip install vexi-python',
    snippet: `from vexi import VexiClient

vexi = VexiClient(token=os.environ["VEXI_KEY"])

session = vexi.tokens.create(
    policy="pol_aws_deploy",
    max_spend=5000,
    expires_in="1h",
)`,
  },
  {
    name: 'Go',
    pkg: 'github.com/vexi-dev/vexi-go',
    install: 'go get github.com/vexi-dev/vexi-go',
    snippet: `import "github.com/vexi-dev/vexi-go"

client := vexi.NewClient(os.Getenv("VEXI_KEY"))

session, err := client.Tokens.Create(&vexi.TokenParams{
    Policy:    "pol_aws_deploy",
    MaxSpend:  5000,
    ExpiresIn: "1h",
})`,
  },
  {
    name: 'cURL',
    pkg: 'REST API',
    install: '',
    snippet: `curl -X POST https://api.vexi.dev/v1/tokens/create \\
  -H "Authorization: Bearer $VEXI_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "policy": "pol_aws_deploy",
    "max_spend": 5000,
    "expires_in": "1h"
  }'`,
  },
];

export default function SdksPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="max-w-[900px]">
      <div className="mb-8">
        <h1 className="text-[22px] font-bold text-textPrimary font-sans">SDKs</h1>
        <p className="text-[13px] text-textMuted mt-1">Official client libraries for integrating with Vexi.</p>
      </div>

      <div className="space-y-4">
        {sdks.map(sdk => (
          <div key={sdk.name} className="bg-surface border border-border rounded-[8px] overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center justify-between">
              <div>
                <span className="text-[14px] font-semibold text-textPrimary">{sdk.name}</span>
                <span className="text-[12px] text-textMuted ml-2 font-mono">{sdk.pkg}</span>
              </div>
              {sdk.install && (
                <button onClick={() => handleCopy(sdk.install, `install-${sdk.name}`)} className="flex items-center gap-1.5 h-[28px] px-2.5 rounded-[5px] bg-surface2 border border-border text-textMuted hover:text-textPrimary text-[11px] font-mono transition-colors">
                  {copied === `install-${sdk.name}` ? <Check className="w-3 h-3 text-[#22C55E]" /> : <Copy className="w-3 h-3" />}
                  {sdk.install}
                </button>
              )}
            </div>
            <div className="relative">
              <pre className="p-4 bg-[#0A0D12] text-[12px] text-textSecondary font-mono leading-relaxed overflow-auto"><code>{sdk.snippet}</code></pre>
              <button onClick={() => handleCopy(sdk.snippet, `code-${sdk.name}`)} className="absolute top-3 right-3 p-1.5 rounded-[4px] bg-surface2/80 border border-border text-textMuted hover:text-textPrimary transition-colors">
                {copied === `code-${sdk.name}` ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
