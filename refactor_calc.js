import fs from 'fs';

const calcCode = `import React, { useState } from 'react';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('');

  const errorStates = ['Error', 'Syntax Error', 'Div by Zero', 'Domain Error', 'Invalid Input'];

  const appendToDisplay = (value: string) => {
    setDisplay(prev => {
      if (errorStates.includes(prev)) return value;
      return prev + value;
    });
  };

  const clearCalc = () => setDisplay('');

  const deleteChar = () => {
    setDisplay(prev => {
      if (errorStates.includes(prev)) return '';
      return prev.slice(0, -1);
    });
  };

  const calculate = () => {
    try {
      if (!display) return;
      let expression = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/sin\\(/g, 'Math.sin(')
        .replace(/cos\\(/g, 'Math.cos(')
        .replace(/tan\\(/g, 'Math.tan(')
        .replace(/log\\(/g, 'Math.log10(')
        .replace(/ln\\(/g, 'Math.log(')
        .replace(/√\\(/g, 'Math.sqrt(')
        .replace(/\\^/g, '**')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E');

      // eslint-disable-next-line no-new-func
      const result = new Function(\`return \${expression}\`)();
      
      if (result === Infinity || result === -Infinity) setDisplay('Div by Zero');
      else if (Number.isNaN(result)) setDisplay('Domain Error');
      else if (typeof result !== 'number') setDisplay('Syntax Error');
      else {
        const rounded = Math.round(result * 100000000) / 100000000;
        setDisplay(String(rounded));
      }
    } catch (e: any) {
      if (e instanceof SyntaxError) setDisplay('Syntax Error');
      else if (e instanceof ReferenceError) setDisplay('Invalid Input');
      else setDisplay('Error');
    }
  };

  const btnClass = "h-[3.25rem] sm:h-12 flex items-center justify-center bg-white/70 backdrop-blur-md rounded-xl text-slate-800 font-medium text-lg sm:text-xl hover:bg-white hover:text-teal-700 shadow-[0_2px_8px_rgb(0,0,0,0.04)] hover:shadow-md transition-all active:scale-95 border border-white/80 focus:outline-none focus:ring-2 focus:ring-teal-400/50";
  const opClass = "h-[3.25rem] sm:h-12 flex items-center justify-center bg-teal-50/80 backdrop-blur-md rounded-xl text-teal-700 font-medium text-xl hover:bg-teal-100/80 shadow-[0_2px_8px_rgb(20,184,166,0.06)] hover:shadow-md transition-all active:scale-95 border border-teal-200/50 focus:outline-none focus:ring-2 focus:ring-teal-500/50";
  const sciClass = "h-[2.5rem] sm:h-10 flex items-center justify-center bg-white/40 backdrop-blur-md rounded-xl text-slate-700 font-medium text-sm hover:bg-white/80 hover:text-teal-700 shadow-[0_2px_6px_rgb(0,0,0,0.03)] hover:shadow-sm transition-all active:scale-95 border border-white/60 focus:outline-none focus:ring-2 focus:ring-teal-500/50";
  const topClass = "h-[3.25rem] sm:h-12 flex items-center justify-center bg-slate-200/40 backdrop-blur-md rounded-xl text-slate-700 font-medium text-lg hover:bg-slate-200/80 shadow-[0_2px_8px_rgb(0,0,0,0.04)] hover:shadow-md transition-all border border-white/60 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-400/50";

  return (
    <div className="p-4 sm:p-5 flex flex-col h-full bg-transparent max-w-[360px] sm:max-w-[400px] mx-auto w-full">
      
      <div className="flex-grow flex flex-col mt-0 sm:mt-1 p-2 bg-slate-100/50 backdrop-blur-sm rounded-[1.5rem] border border-white/40 shadow-inner">
        <div className="bg-white border border-slate-200/60 shadow-sm rounded-xl p-4 mb-3 h-24 flex flex-col justify-end overflow-hidden relative group">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-teal-400 to-teal-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute top-3 left-4 text-slate-400 text-xs font-bold tracking-widest uppercase">Deg</div>
          <div className="text-3xl sm:text-4xl font-light tracking-tight truncate w-full text-right transition-all text-slate-800" dir="ltr">
            {display || '0'}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 flex-grow">
          {/* Row Sci 1 */}
          <button onClick={() => appendToDisplay('sin(')} className={sciClass}>sin</button>
          <button onClick={() => appendToDisplay('cos(')} className={sciClass}>cos</button>
          <button onClick={() => appendToDisplay('tan(')} className={sciClass}>tan</button>
          <button onClick={() => appendToDisplay('^')} className={sciClass}>xⁿ</button>

          {/* Row Sci 2 */}
          <button onClick={() => appendToDisplay('log(')} className={sciClass}>log</button>
          <button onClick={() => appendToDisplay('ln(')} className={sciClass}>ln</button>
          <button onClick={() => appendToDisplay('√(')} className={sciClass}>√</button>
          <button onClick={() => appendToDisplay('π')} className={sciClass}>π</button>

          {/* Row 1 */}
          <button onClick={clearCalc} className={\`\${topClass} text-red-600 hover:text-red-700 hover:bg-red-50/80\`}>C</button>
          <button onClick={deleteChar} className={topClass}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"/><line x1="18" x2="12" y1="9" y2="15"/><line x1="12" x2="18" y1="9" y2="15"/></svg>
          </button>
          <button onClick={() => appendToDisplay('(')} className={topClass}>(</button>
          <button onClick={() => appendToDisplay(')')} className={topClass}>)</button>

          {/* Row 2 */}
          <button onClick={() => appendToDisplay('7')} className={btnClass}>7</button>
          <button onClick={() => appendToDisplay('8')} className={btnClass}>8</button>
          <button onClick={() => appendToDisplay('9')} className={btnClass}>9</button>
          <button onClick={() => appendToDisplay('÷')} className={opClass}>÷</button>

          {/* Row 3 */}
          <button onClick={() => appendToDisplay('4')} className={btnClass}>4</button>
          <button onClick={() => appendToDisplay('5')} className={btnClass}>5</button>
          <button onClick={() => appendToDisplay('6')} className={btnClass}>6</button>
          <button onClick={() => appendToDisplay('×')} className={opClass}>×</button>

          {/* Row 4 */}
          <button onClick={() => appendToDisplay('1')} className={btnClass}>1</button>
          <button onClick={() => appendToDisplay('2')} className={btnClass}>2</button>
          <button onClick={() => appendToDisplay('3')} className={btnClass}>3</button>
          <button onClick={() => appendToDisplay('-')} className={opClass}>-</button>

          {/* Row 5 */}
          <button onClick={() => appendToDisplay('0')} className={btnClass}>0</button>
          <button onClick={() => appendToDisplay('.')} className={btnClass}>.</button>
          <button onClick={calculate} className="h-[3.25rem] sm:h-12 flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl text-white font-medium text-xl hover:from-teal-400 hover:to-teal-500 shadow-[0_4px_12px_rgba(20,184,166,0.3)] hover:shadow-lg transition-all active:scale-95 border border-teal-400/50 focus:outline-none focus:ring-2 focus:ring-teal-500/50">=</button>
          <button onClick={() => appendToDisplay('+')} className={opClass}>+</button>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/components/ScientificCalculator.tsx', calcCode);
