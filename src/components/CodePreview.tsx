'use client';
import { Terminal, Copy } from 'lucide-react';
import { useState, useEffect } from 'react';

const RAW_CODE = [
  "import { VexiClient } from '@vexi/node';",
  "",
  "const vexi = new VexiClient({",
  "  token: process.env.VEXI_KEY",
  "});",
  "",
  "const session = await vexi.tokens.create({",
  "  policy: 'pol_aws_deployment_only',",
  "  max_spend: 25000,",
  "  expires_in: '1h',",
  "  agent_id: 'ag_deployer_01'",
  "});"
];

const parseColor = (word: string, wholeLine: string) => {
  // We use direct tailwind hexes that work decently decoupled from light/dark for syntax highlights,
  // but let's map them to generalized variables if possible, or keep as standard code editor colors
  if (['import', 'from', 'const', 'new', 'await'].includes(word)) return 'text-[#FF7B72] dark:text-[#FF7B72]'; // keywords
  if (word.startsWith("'") && word.endsWith("'")) return 'text-[#0550AE] dark:text-[#A5F3FC]'; // strings (darker blue in light mode)
  if (!Number.isNaN(Number(word.replace(',', ''))) && word !== '') return 'text-[#D97706] dark:text-[#FCD34D]'; // numbers
  if (word === '{' || word === '}' || word === '});' || word.includes('();')) return 'text-primary'; // brackets
  
  // Variables logic fallback
  if (wholeLine.includes('vexi') && word === 'vexi') return 'text-[#0969DA] dark:text-[#A5D6FF]';
  if (wholeLine.includes('session') && word === 'session') return 'text-[#0969DA] dark:text-[#A5D6FF]';
  if (word.includes('VexiClient')) return 'text-[#0969DA] dark:text-[#A5D6FF]';
  if (word.includes('process.env.VEXI_KEY')) return 'text-[#0969DA] dark:text-[#A5D6FF]';
  
  if (word.includes(':') && !word.startsWith("'")) {
    const key = word.replace(':', '');
    return <><span className="text-[#0969DA] dark:text-[#A5D6FF]">{key}</span><span className="text-primary">:</span></>;
  }

  // Dots
  if (word.includes('.')) {
    const parts = word.split('.');
    return parts.map((part, i) => (
      <span key={i}>
        {i > 0 && <span className="text-primary">.</span>}
        <span className={part === 'create' || part === 'tokens' || part === 'env' || part === 'process' || part === 'VEXI_KEY' ? 'text-[#0969DA] dark:text-[#A5D6FF]' : 'text-primary'}>{part}</span>
      </span>
    ));
  }

  return 'text-primary'; 
};

export function CodePreview() {
  const [copied, setCopied] = useState(false);
  const [typedLines, setTypedLines] = useState<string[]>(['']);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let isTypingLine = true;
    let timeoutId: NodeJS.Timeout;

    const typeChar = () => {
      if (currentLine >= RAW_CODE.length) return; // Done typing

      const line = RAW_CODE[currentLine];
      
      if (isTypingLine) {
        if (currentChar <= line.length) {
          setTypedLines(prev => {
            const next = [...prev];
            next[currentLine] = line.slice(0, currentChar);
            return next;
          });
          currentChar++;
          timeoutId = setTimeout(typeChar, 25);
        } else {
          isTypingLine = false;
          timeoutId = setTimeout(typeChar, 400); // pause between lines
        }
      } else {
        currentLine++;
        currentChar = 0;
        isTypingLine = true;
        if (currentLine < RAW_CODE.length) {
          setTypedLines(prev => [...prev, '']);
        }
        typeChar(); // immediately start next line loop
      }
    };

    typeChar();
    return () => clearTimeout(timeoutId);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(RAW_CODE.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 30;
    const y = (e.clientY - rect.top - rect.height / 2) / 30;
    setMousePos({ x, y });
  };

  return (
    <div 
      className="w-full rounded-[6px] overflow-hidden bg-background shadow-2xl relative group p-[1px] transition-colors duration-300"
      onMouseMove={handleMouseMove}
      style={{
        transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* Subtle Gradient Border wrapper */}
      <div className="absolute inset-0 bg-gradient-to-br from-border via-transparent to-border opacity-50 group-hover:opacity-100 transition-opacity z-0"></div>

      <div className="relative z-10 w-full h-full bg-panel rounded-[5px] overflow-hidden transition-colors duration-300">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-background border-b border-border transition-colors duration-300">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-muted" />
            <span className="text-[11px] font-mono text-muted uppercase tracking-widest">agent.ts</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 flex items-center h-5 rounded-[3px] border border-accent/20">TypeScript</span>
            <button onClick={handleCopy} className="text-muted hover:text-primary transition-colors flex items-center justify-center w-5 h-5">
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        
        {/* Code Body */}
        <div className="p-4 sm:p-5 overflow-x-auto text-[13px] font-mono relative leading-tight min-h-[280px]">
          <div className="absolute left-0 top-0 bottom-0 w-10 border-r border-border/50 bg-background/30 flex flex-col items-center pt-4 sm:pt-5 pb-5 text-muted text-[11px] select-none space-y-[1px]">
            {Array.from({ length: 12 }).map((_, i) => <span key={i} className="h-5 flex items-center">{i+1}</span>)}
          </div>
          
          <div className="pl-10 text-primary">
            {typedLines.map((line, i) => {
              let content: React.ReactNode = line;
              
              if (line.includes('//')) {
                content = <span className="text-muted">{line}</span>;
              } else {
                const words = line.split(/( |{|}|;|,|\(|\)|')/g).filter(w => w !== '');
                
                content = words.map((w, j) => {
                  if (w === ' ' || w === '') return ' ';
                  const style = parseColor(w, line);
                  if (typeof style !== 'string') return <span key={j}>{style}</span>;
                  return <span key={j} className={style}>{w}</span>;
                });
              }

              const isLastLine = i === typedLines.length - 1;
              const CodeCursor = () => <span className="w-2 h-4 bg-accent animate-cursor-blink inline-block align-middle ml-[1px]"></span>;

              return (
                <div key={i} className="h-5 flex items-center whitespace-pre">
                  {content}
                  {isLastLine && <CodeCursor />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
