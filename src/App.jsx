import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Code2, Cpu, Terminal, AlertCircle, CheckCircle, 
  BookOpen, Layers, Braces, Binary, FileText, Database, GitBranch,
  ChevronRight, RefreshCw, GraduationCap, Layout, Info, Tag, Hash, Quote, List,
  AlertTriangle, Server, ArrowDown, ArrowUp, Calculator, Scale, ToggleLeft, 
  ArrowRightLeft, ChevronsUp, HelpCircle, Star, Zap, Activity, Network, Circle, Square, Hexagon,
  Plus, Trash2, ChevronUp, ChevronDown, PlayCircle, StopCircle, Award, ExternalLink
} from 'lucide-react';

// --- CUSTOM ICONS ---
const LockIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const UnlockIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>;


// --- CURRICULUM DATA ---
const TOPICS = [
  "Introduction To C Language", "Datatype, Constant & Variable", 
  "Operator & Expression", "Control Structure",
  "Looping", "Looping With Pattern", "Array In Detail", "String In Details",
  "User Define Function", "Pointer", "Structure, Union & Enumeration", "File Handling"
];

// --- DYNAMIC CODE SNIPPETS PER MODULE ---
const TOPIC_DEFAULTS = {
  "Introduction To C Language": `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    printf("Welcome to C Programming!\\n");\n    return 0;\n}`,
  "Datatype, Constant & Variable": `#include <stdio.h>\n\nint main() {\n    int age = 25;\n    float pi = 3.14;\n    char grade = 'A';\n    \n    printf("Age: %d\\n", age);\n    printf("Pi: %.2f\\n", pi);\n    printf("Grade: %c\\n", grade);\n    return 0;\n}`,
  "Operator & Expression": `#include <stdio.h>\n\nint main() {\n    int a = 15;\n    int b = 4;\n    \n    printf("Addition: %d\\n", a + b);\n    printf("Division: %d\\n", a / b); // Integer division!\n    printf("Modulo: %d\\n", a % b);\n    return 0;\n}`,
  "Pointer": `#include <stdio.h>\n\nint main() {\n    int target = 42;\n    int *ptr = &target;\n    \n    printf("Value of target: %d\\n", target);\n    printf("Memory Address: %p\\n", (void*)ptr);\n    printf("Dereferenced Value: %d\\n", *ptr);\n    return 0;\n}`,
  "Control Structure": `#include <stdio.h>\n\nint main() {\n    int marks = 85;\n    \n    if (marks >= 90) {\n        printf("Grade: A\\n");\n    } else if (marks >= 75) {\n        printf("Grade: B\\n");\n    } else if (marks >= 50) {\n        printf("Grade: C\\n");\n    } else {\n        printf("Fail\\n");\n    }\n    return 0;\n}`,
  "default": `#include <stdio.h>\n\nint main() {\n    // Write your code here\n    printf("Code executed successfully.\\n");\n    return 0;\n}`
};

// --- INTERACTIVE SUB-COMPONENTS ---
const InteractiveOperatorSimulator = () => {
  const [category, setCategory] = useState('Arithmetic');
  const [operator, setOperator] = useState('+');
  const [opA, setOpA] = useState(10);
  const [opB, setOpB] = useState(3);

  const categories = ['Arithmetic', 'Relational', 'Logical', 'Bitwise'];
  
  const operatorGroups = {
    'Arithmetic': ['+', '-', '*', '/', '%'],
    'Relational': ['==', '!=', '>', '<', '>=', '<='],
    'Logical': ['&&', '||', '!'],
    'Bitwise': ['&', '|', '^', '~', '<<', '>>']
  };

  useEffect(() => {
    if (category === 'Arithmetic') setOperator('+');
    if (category === 'Relational') setOperator('>');
    if (category === 'Logical') setOperator('&&');
    if (category === 'Bitwise') setOperator('&');
  }, [category]);

  const isUnary = operator === '!' || operator === '~';

  let result = 0;
  let explanation = "";

  try {
    const a = Number(opA);
    const b = Number(opB);

    switch (operator) {
      case '+': result = a + b; explanation = "Standard addition."; break;
      case '-': result = a - b; explanation = "Standard subtraction."; break;
      case '*': result = a * b; explanation = "Standard multiplication."; break;
      case '/': result = b !== 0 ? Math.trunc(a / b) : "Error (Div by 0)"; explanation = "Integer division truncates the decimal part in C."; break;
      case '%': result = b !== 0 ? a % b : "Error (Div by 0)"; explanation = "Modulo returns the integer remainder of the division."; break;
      case '==': result = a === b ? 1 : 0; explanation = "Returns 1 (True) if equal, 0 (False) otherwise."; break;
      case '!=': result = a !== b ? 1 : 0; explanation = "Returns 1 (True) if not equal, 0 otherwise."; break;
      case '>': result = a > b ? 1 : 0; explanation = "Returns 1 (True) if A is strictly greater than B."; break;
      case '<': result = a < b ? 1 : 0; explanation = "Returns 1 (True) if A is strictly less than B."; break;
      case '>=': result = a >= b ? 1 : 0; explanation = "Returns 1 (True) if A is greater than or equal to B."; break;
      case '<=': result = a <= b ? 1 : 0; explanation = "Returns 1 (True) if A is less than or equal to B."; break;
      case '&&': result = (a !== 0 && b !== 0) ? 1 : 0; explanation = "Returns 1 (True) only if BOTH A and B are non-zero."; break;
      case '||': result = (a !== 0 || b !== 0) ? 1 : 0; explanation = "Returns 1 (True) if EITHER A or B is non-zero."; break;
      case '!': result = (a === 0) ? 1 : 0; explanation = "Returns 1 (True) if A is 0, otherwise returns 0."; break;
      case '&': result = a & b; explanation = "Bitwise AND: 1 if both bits are 1."; break;
      case '|': result = a | b; explanation = "Bitwise OR: 1 if either bit is 1."; break;
      case '^': result = a ^ b; explanation = "Bitwise XOR: 1 if bits are different."; break;
      case '~': result = ~a; explanation = "Bitwise NOT: Flips all bits of A (Two's complement)."; break;
      case '<<': result = a << b; explanation = `Left Shift: Multiplies A by 2^${b}.`; break;
      case '>>': result = a >> b; explanation = `Right Shift: Divides A by 2^${b}.`; break;
      default: break;
    }
  } catch (e) {
    result = "Error";
  }

  const toBinary = (num) => (num >>> 0).toString(2).padStart(8, '0').slice(-8);

  return (
    <div className="bg-slate-900 rounded-xl shadow-xl border border-slate-800 text-slate-200 font-sans my-8 relative overflow-hidden flex flex-col">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="p-6 border-b border-slate-800 relative z-10">
        <h4 className="font-bold text-cyan-400 mb-4 flex items-center gap-2 text-lg">
          <Activity className="w-5 h-5" /> Live Operator Simulator
        </h4>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border
                ${category === cat ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50' : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-slate-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 flex flex-col md:flex-row gap-6 items-center justify-center z-10 relative bg-slate-950/30">
        <div className="flex flex-col items-center gap-2">
          <label className="text-xs text-slate-500 font-sans uppercase tracking-wider font-bold">Operand A</label>
          <input 
            type="number" 
            value={opA} 
            onChange={(e) => setOpA(Number(e.target.value))}
            className="w-24 bg-slate-800 border border-slate-600 rounded-lg p-3 text-center text-xl focus:border-cyan-500 outline-none font-mono shadow-inner text-white"
          />
          {category === 'Bitwise' && <div className="text-cyan-500/60 font-mono text-xs tracking-widest mt-1">{toBinary(opA)}</div>}
        </div>

        <div className="flex flex-col items-center gap-2">
          <select 
            value={operator} 
            onChange={(e) => setOperator(e.target.value)}
            className="appearance-none bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-lg px-6 py-3 text-2xl font-bold font-mono outline-none cursor-pointer text-center hover:bg-cyan-500/20 transition-colors shadow-lg"
          >
            {operatorGroups[category].map(op => (
              <option key={op} value={op} className="bg-slate-800 text-white">{op}</option>
            ))}
          </select>
        </div>

        {!isUnary && (
          <div className="flex flex-col items-center gap-2 animate-in fade-in zoom-in duration-200">
            <label className="text-xs text-slate-500 font-sans uppercase tracking-wider font-bold">Operand B</label>
            <input 
              type="number" 
              value={opB} 
              onChange={(e) => setOpB(Number(e.target.value))}
              className="w-24 bg-slate-800 border border-slate-600 rounded-lg p-3 text-center text-xl focus:border-cyan-500 outline-none font-mono shadow-inner text-white"
            />
            {category === 'Bitwise' && <div className="text-cyan-500/60 font-mono text-xs tracking-widest mt-1">{toBinary(opB)}</div>}
          </div>
        )}

        <div className="text-3xl text-slate-600 font-sans mx-2">=</div>

        <div className="flex flex-col items-center gap-2 bg-slate-800/80 p-5 rounded-xl border border-slate-600 shadow-inner min-w-[120px]">
          <label className="text-xs text-emerald-400 font-sans uppercase tracking-wider font-bold">Result</label>
          <div className="text-4xl text-white font-mono font-bold">{result}</div>
          {category === 'Bitwise' && typeof result === 'number' && (
            <div className="text-emerald-400 font-mono text-xs tracking-widest mt-1">{toBinary(result)}</div>
          )}
        </div>
      </div>

      <div className="p-4 bg-slate-900 border-t border-slate-800 text-sm text-slate-400 flex items-start gap-3 z-10 relative">
        <Info className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
        <p><strong>Under the hood:</strong> {explanation}</p>
      </div>
    </div>
  );
};

const InteractiveControlFlowSimulator = () => {
  const [marks, setMarks] = useState(82);

  let activeBlock = 0;
  if (marks >= 90) activeBlock = 1;
  else if (marks >= 75) activeBlock = 2;
  else if (marks >= 50) activeBlock = 3;
  else activeBlock = 4;

  const Block = ({ id, condition, result, isActive }) => (
    <div className={`p-4 rounded-lg border-2 transition-all duration-300 font-mono text-sm shadow-sm
      ${isActive 
        ? 'bg-blue-50 border-blue-500 shadow-blue-200 shadow-md scale-[1.02] z-10' 
        : 'bg-white border-slate-200 text-slate-400 grayscale-[0.5] scale-100 opacity-60'}`}
    >
      <div className={isActive ? 'text-blue-800 font-bold' : 'text-slate-500'}>
        {id === 1 ? `if (${condition}) {` : id === 4 ? `else {` : `else if (${condition}) {`}
      </div>
      <div className={`ml-4 my-2 px-3 py-1.5 rounded inline-block
        ${isActive ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}
      >
        printf("{result}");
      </div>
      <div className={isActive ? 'text-blue-800 font-bold' : 'text-slate-500'}>{"}"}</div>
    </div>
  );

  return (
    <div className="bg-slate-50 rounded-xl p-6 shadow-md border border-slate-200 font-sans my-8">
      <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2 text-lg">
        <Network className="w-5 h-5" /> Live Control Flow Simulator
      </h4>
      <p className="text-sm text-slate-600 mb-6">Drag the slider to change the marks and watch how the C program sequentially evaluates conditions until it finds one that is <strong>True</strong>.</p>
      
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Input Controls */}
        <div className="w-full md:w-1/3 bg-white p-5 rounded-xl border border-slate-200 shadow-sm sticky top-4">
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Student Marks: <span className="text-blue-600 text-xl">{marks}</span></label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={marks} 
            onChange={(e) => setMarks(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
            <span>0</span>
            <span>100</span>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="text-xs uppercase text-slate-500 font-bold mb-2">Final Output:</div>
            <div className="bg-slate-900 text-emerald-400 p-3 rounded font-mono text-center font-bold text-lg shadow-inner">
              {activeBlock === 1 ? 'Grade A' : activeBlock === 2 ? 'Grade B' : activeBlock === 3 ? 'Grade C' : 'Fail'}
            </div>
          </div>
        </div>

        {/* Code Ladder */}
        <div className="w-full md:w-2/3 flex flex-col gap-2 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 top-4 bottom-4 w-1 bg-slate-200 -z-10 rounded-full"></div>
          
          <Block id={1} condition="marks >= 90" result="Grade A" isActive={activeBlock === 1} />
          <Block id={2} condition="marks >= 75" result="Grade B" isActive={activeBlock === 2} />
          <Block id={3} condition="marks >= 50" result="Grade C" isActive={activeBlock === 3} />
          <Block id={4} condition="" result="Fail" isActive={activeBlock === 4} />
        </div>
      </div>
    </div>
  );
};

const InteractiveFlowchartBuilder = () => {
  const [nodes, setNodes] = useState([
    { id: 1, type: 'start', text: 'Start' },
    { id: 2, type: 'io', text: 'Input marks' },
    { 
      id: 3, 
      type: 'decision', 
      text: 'marks >= 50?', 
      trueActions: ['Print "Pass"'], 
      falseActions: ['Print "Fail"'] 
    },
    { id: 4, type: 'end', text: 'End' }
  ]);

  const addNode = (type) => {
    const newId = nodes.length > 0 ? Math.max(...nodes.map(n => n.id)) + 1 : 1;
    let defaultText = '';
    let trueActions = [];
    let falseActions = [];

    if (type === 'start') defaultText = 'Start';
    if (type === 'end') defaultText = 'End';
    if (type === 'process') defaultText = 'Action';
    if (type === 'io') defaultText = 'Input / Output';
    if (type === 'decision') {
      defaultText = 'Condition?';
      trueActions = ['Action'];
      falseActions = ['Action'];
    }

    const newNode = { id: newId, type, text: defaultText };
    if (type === 'decision') {
      newNode.trueActions = trueActions;
      newNode.falseActions = falseActions;
    }

    setNodes([...nodes, newNode]);
  };

  const updateNodeField = (id, field, value) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, [field]: value } : n));
  };

  const removeNode = (id) => {
    setNodes(nodes.filter(n => n.id !== id));
  };

  const moveNode = (index, direction) => {
    const newNodes = [...nodes];
    if (direction === 'up' && index > 0) {
      [newNodes[index - 1], newNodes[index]] = [newNodes[index], newNodes[index - 1]];
    } else if (direction === 'down' && index < newNodes.length - 1) {
      [newNodes[index + 1], newNodes[index]] = [newNodes[index], newNodes[index + 1]];
    }
    setNodes(newNodes);
  };

  // Functions to handle multiple steps inside the True/False branches
  const addBranchAction = (nodeId, branch) => {
    setNodes(nodes.map(n => {
      if (n.id === nodeId) {
        return { ...n, [branch]: [...(n[branch] || []), ''] };
      }
      return n;
    }));
  };

  const updateBranchAction = (nodeId, branch, index, value) => {
    setNodes(nodes.map(n => {
      if (n.id === nodeId) {
        const newBranch = [...n[branch]];
        newBranch[index] = value;
        return { ...n, [branch]: newBranch };
      }
      return n;
    }));
  };

  const removeBranchAction = (nodeId, branch, index) => {
    setNodes(nodes.map(n => {
      if (n.id === nodeId) {
        const newBranch = [...n[branch]];
        newBranch.splice(index, 1);
        return { ...n, [branch]: newBranch };
      }
      return n;
    }));
  };

  const renderNodeShape = (node, index) => {
    
    // --- SPECIAL RENDERING FOR DECISION NODE ---
    if (node.type === 'decision') {
      return (
        <div className="relative group flex flex-col items-center w-full">
          {/* Action buttons (Move/Delete) that show on hover */}
          <div className="absolute left-0 lg:left-[5%] top-0 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <button onClick={() => moveNode(index, 'up')} className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-800 bg-white shadow-sm border border-slate-200"><ChevronUp className="w-4 h-4"/></button>
            <button onClick={() => moveNode(index, 'down')} className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-800 bg-white shadow-sm border border-slate-200"><ChevronDown className="w-4 h-4"/></button>
            <button onClick={() => removeNode(node.id)} className="p-1 hover:bg-red-100 rounded text-red-500 hover:text-red-700 bg-white shadow-sm border border-red-200 mt-1"><Trash2 className="w-4 h-4"/></button>
          </div>

          {/* Diamond shape */}
          <div className="bg-amber-100 border-2 border-amber-400 text-amber-900 rounded-lg px-4 py-3 w-48 text-center flex justify-center z-10 relative shadow-sm">
            <Hexagon className="w-4 h-4 mr-2 text-amber-600 shrink-0 mt-0.5" />
            <input 
              type="text" 
              value={node.text}
              onChange={(e) => updateNodeField(node.id, 'text', e.target.value)}
              className="bg-transparent text-center w-full outline-none placeholder-slate-400 font-bold text-sm"
              placeholder="Condition?"
            />
          </div>

          {/* Stem down to the split */}
          <div className="w-[2px] h-6 bg-slate-300"></div>

          {/* The Split Container (Yes/No Branches) */}
          <div className="flex w-full max-w-[440px] relative items-stretch">
             {/* Top Horizontal Line spanning between the two vertical lines */}
             <div className="absolute top-0 left-[25%] right-[25%] h-[2px] bg-slate-300"></div>

             {/* Left Side (True) */}
             <div className="w-1/2 flex flex-col items-center relative">
                <div className="w-[2px] h-6 bg-slate-300 relative">
                   <span className="absolute -top-3 right-2 bg-slate-50 px-1 text-[10px] font-bold text-emerald-600 z-10 uppercase tracking-wider">Yes</span>
                </div>
                
                {node.trueActions && node.trueActions.map((action, i) => (
                    <div key={i} className="flex flex-col items-center w-full group/action">
                        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-md p-2 w-11/12 z-10 shadow-sm relative">
                            <button onClick={() => removeBranchAction(node.id, 'trueActions', i)} className="absolute -right-2 -top-2 bg-red-100 text-red-600 rounded-full p-1 opacity-0 group-hover/action:opacity-100 transition-opacity border border-red-200 hover:bg-red-200 z-20">
                                <Trash2 className="w-3 h-3"/>
                            </button>
                            <input 
                                type="text" 
                                value={action}
                                onChange={(e) => updateBranchAction(node.id, 'trueActions', i, e.target.value)}
                                className="bg-transparent text-center w-full outline-none text-xs text-emerald-800 font-medium placeholder-emerald-300"
                                placeholder="Action"
                            />
                        </div>
                        <div className="w-[2px] h-6 bg-slate-300"></div>
                    </div>
                ))}
                
                <button onClick={() => addBranchAction(node.id, 'trueActions')} className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center hover:bg-emerald-200 z-10 mb-4 transition-transform hover:scale-110" title="Add step to Yes flow">
                    <Plus className="w-3 h-3"/>
                </button>
                
                {/* Flex-1 line stretches to meet the bottom merge line perfectly */}
                <div className="w-[2px] flex-1 bg-slate-300"></div>
             </div>

             {/* Right Side (False) */}
             <div className="w-1/2 flex flex-col items-center relative">
                <div className="w-[2px] h-6 bg-slate-300 relative">
                   <span className="absolute -top-3 left-2 bg-slate-50 px-1 text-[10px] font-bold text-red-600 z-10 uppercase tracking-wider">No</span>
                </div>
                
                {node.falseActions && node.falseActions.map((action, i) => (
                    <div key={i} className="flex flex-col items-center w-full group/action">
                        <div className="bg-red-50 border-2 border-red-300 rounded-md p-2 w-11/12 z-10 shadow-sm relative">
                            <button onClick={() => removeBranchAction(node.id, 'falseActions', i)} className="absolute -right-2 -top-2 bg-red-100 text-red-600 rounded-full p-1 opacity-0 group-hover/action:opacity-100 transition-opacity border border-red-200 hover:bg-red-200 z-20">
                                <Trash2 className="w-3 h-3"/>
                            </button>
                            <input 
                                type="text" 
                                value={action}
                                onChange={(e) => updateBranchAction(node.id, 'falseActions', i, e.target.value)}
                                className="bg-transparent text-center w-full outline-none text-xs text-red-800 font-medium placeholder-red-300"
                                placeholder="Action"
                            />
                        </div>
                        <div className="w-[2px] h-6 bg-slate-300"></div>
                    </div>
                ))}
                
                <button onClick={() => addBranchAction(node.id, 'falseActions')} className="w-5 h-5 rounded-full bg-red-100 text-red-600 border border-red-300 flex items-center justify-center hover:bg-red-200 z-10 mb-4 transition-transform hover:scale-110" title="Add step to No flow">
                    <Plus className="w-3 h-3"/>
                </button>

                <div className="w-[2px] flex-1 bg-slate-300"></div>
             </div>

             {/* Bottom Horizontal Line merging back */}
             <div className="absolute bottom-0 left-[25%] right-[25%] h-[2px] bg-slate-300"></div>
          </div>
          
          {/* Stem below the merge */}
          <div className="w-[2px] h-6 bg-slate-300 relative z-0"></div>
        </div>
      );
    }

    // --- STANDARD RENDERING FOR OTHER NODES ---
    let containerClass = "w-48 p-3 text-center font-bold text-sm outline-none transition-all flex items-center justify-center shadow-sm z-10 relative ";
    let wrapperClass = "relative flex justify-center w-full group ";
    
    if (node.type === 'start' || node.type === 'end') {
      containerClass += "bg-blue-100 border-2 border-blue-400 text-blue-900 rounded-full";
    } else if (node.type === 'process') {
      containerClass += "bg-emerald-100 border-2 border-emerald-400 text-emerald-900 rounded-md";
    } else if (node.type === 'io') {
      containerClass += "bg-purple-100 border-2 border-purple-400 text-purple-900 skew-x-[-12deg]";
    }

    return (
      <div className={wrapperClass}>
        {/* Action buttons (Move/Delete) that show on hover */}
        <div className="absolute left-0 lg:left-[10%] top-0 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button onClick={() => moveNode(index, 'up')} className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-800 bg-white shadow-sm border border-slate-200"><ChevronUp className="w-4 h-4"/></button>
          <button onClick={() => moveNode(index, 'down')} className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-800 bg-white shadow-sm border border-slate-200"><ChevronDown className="w-4 h-4"/></button>
          <button onClick={() => removeNode(node.id)} className="p-1 hover:bg-red-100 rounded text-red-500 hover:text-red-700 bg-white shadow-sm border border-red-200 mt-1"><Trash2 className="w-4 h-4"/></button>
        </div>

        {/* The Actual Shape */}
        <div className={containerClass}>
          <input 
            type="text" 
            value={node.text}
            onChange={(e) => updateNodeField(node.id, 'text', e.target.value)}
            className={`bg-transparent text-center w-full outline-none placeholder-slate-400 font-medium ${node.type === 'io' ? 'skew-x-[12deg]' : ''}`}
            placeholder="Enter logic..."
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 font-sans my-8 flex flex-col md:flex-row gap-8">
      
      {/* Left Toolbox */}
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <div>
          <h4 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
            <Network className="w-5 h-5 text-indigo-500" />
            Flowchart Builder
          </h4>
          <p className="text-xs text-slate-500 mt-2">Construct your program's logic visually before coding it. Click to add nodes, drag logic, and delete mistakes.</p>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <button onClick={() => addNode('start')} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm text-slate-700 font-medium">
            <div className="w-6 h-6 rounded-full bg-blue-100 border border-blue-400 flex items-center justify-center"><PlayCircle className="w-4 h-4 text-blue-600"/></div>
            Add Start / End
          </button>
          <button onClick={() => addNode('process')} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors text-sm text-slate-700 font-medium">
            <div className="w-6 h-6 rounded bg-emerald-100 border border-emerald-400 flex items-center justify-center"><Square className="w-4 h-4 text-emerald-600"/></div>
            Add Process
          </button>
          <button onClick={() => addNode('decision')} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-amber-300 hover:bg-amber-50 transition-colors text-sm text-slate-700 font-medium">
            <div className="w-6 h-6 rounded bg-amber-100 border border-amber-400 flex items-center justify-center"><Hexagon className="w-4 h-4 text-amber-600"/></div>
            Add Decision (Yes/No)
          </button>
          <button onClick={() => addNode('io')} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-colors text-sm text-slate-700 font-medium">
            <div className="w-6 h-6 skew-x-[-12deg] bg-purple-100 border border-purple-400 flex items-center justify-center"><FileText className="w-3 h-3 text-purple-600 skew-x-[12deg]"/></div>
            Add Input / Output
          </button>
        </div>
        
        <div className="mt-auto pt-4 border-t border-slate-100">
          <button onClick={() => setNodes([])} className="w-full flex items-center justify-center gap-2 p-2 rounded-lg text-red-600 hover:bg-red-50 text-xs font-bold transition-colors border border-transparent hover:border-red-200">
            <Trash2 className="w-4 h-4" /> Clear Canvas
          </button>
        </div>
      </div>

      {/* Right Canvas Area */}
      <div className="w-full md:w-2/3 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 p-8 flex flex-col items-center min-h-[450px] overflow-y-auto custom-scrollbar relative">
        {nodes.length === 0 ? (
          <div className="m-auto text-slate-400 text-sm flex flex-col items-center gap-3">
            <Plus className="w-8 h-8 text-slate-300" />
            Canvas is empty. Add a node from the toolbox.
          </div>
        ) : (
          nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              {renderNodeShape(node, index)}
              {/* Draw arrow to next node if not the last one */}
              {index < nodes.length - 1 && (
                <div className="h-6 flex items-center justify-center text-slate-300 relative z-0">
                  <div className="absolute top-0 bottom-0 w-[2px] bg-slate-300"></div>
                  <ArrowDown className="w-4 h-4 absolute bottom-[-6px] bg-slate-50 rounded-full" />
                </div>
              )}
            </React.Fragment>
          ))
        )}
      </div>

    </div>
  );
};


// --- RICH THEORY CONTENT (JSX COMPONENTS) ---
const MODULE_CONTENT = {
  "Introduction To C Language": () => (
    <div className="space-y-6 text-slate-700 text-lg leading-relaxed font-sans">
      <p>
        C is a foundational, general-purpose programming language created by <strong>Dennis Ritchie</strong> at Bell Labs in 1972. Originally developed to write the UNIX operating system, it has since become one of the most widely used programming languages of all time.
      </p>
      
      <div className="flex flex-col md:flex-row gap-6 items-start my-8">
        <figure className="shrink-0">
          <img 
            src="/Data/Images/Dennis_Ritchie.jpeg" 
            alt="Dennis Ritchie" 
            className="w-full max-w-[250px] rounded-xl shadow-md border border-slate-200"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "https://upload.wikimedia.org/wikipedia/commons/2/23/Dennis_Ritchie_2011.jpg";
            }}
          />
          <figcaption className="text-xs text-slate-500 mt-2 text-center italic">Dennis Ritchie (1941 - 2011)</figcaption>
        </figure>
        <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl text-base">
          <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-2">
            <Info className="w-5 h-5" /> Why C Matters in Data Science & Full-Stack
          </h4>
          <p className="text-blue-900/80 mb-2">
            Even if you primarily write Python or JavaScript today, C is the engine running under the hood. 
          </p>
          <ul className="list-disc pl-5 space-y-1 text-blue-900/80">
            <li>Python's core (CPython) is written entirely in C.</li>
            <li>Data science libraries like <strong>Pandas</strong> and <strong>NumPy</strong> use C extensions to achieve lightning-fast matrix computations.</li>
            <li>JavaScript engines (like V8 in Node.js) are written in C++.</li>
          </ul>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mt-8">Anatomy of a C Program</h3>
      <p>Every C program consists of a few standard elements. Let's break down the classic "Hello World":</p>
      
      <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-4 overflow-x-auto shadow-inner font-mono text-sm">
        <span className="text-purple-600">#include</span> <span className="text-emerald-600">&lt;stdio.h&gt;</span><br/><br/>
        <span className="text-blue-600">int</span> <span className="text-amber-600">main</span>() {'{\n'}
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-600">printf</span>(<span className="text-emerald-600">"Hello, World!\n"</span>);<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-600">return</span> <span className="text-blue-600">0</span>;<br/>
        {'}'}
      </div>
      
      <ul className="list-disc pl-6 space-y-3 mt-4">
        <li><code>#include &lt;stdio.h&gt;</code>: A preprocessor command telling the compiler to include standard input/output functions.</li>
        <li><code>int main()</code>: The entry point of every C program. The OS calls this function when you run the app.</li>
        <li><code>printf()</code>: A built-in function to print text to the terminal.</li>
        <li><code>return 0;</code>: Signals to the Operating System that the program terminated successfully.</li>
      </ul>
    </div>
  ),

  "Datatype, Constant & Variable": () => (
    <div className="space-y-6 text-slate-700 text-lg leading-relaxed font-sans">
      <div className="bg-purple-50 border border-purple-100 p-5 rounded-xl text-base mb-6">
        <h4 className="font-bold text-purple-800 flex items-center gap-2 mb-2">
          <Database className="w-5 h-5" /> The Memory Constraint
        </h4>
        <p className="text-purple-900/80">
          Unlike Python or JavaScript where variables dynamically resize, C requires you to explicitly declare exactly how much memory a variable needs before you use it. This is why C is called a <strong>Statically Typed</strong> language.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2">Variables & Memory Allocation</h3>
      <p>When you declare a variable in C, you are asking the operating system to reserve a specific block of RAM. Data types define the size of these blocks.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="font-mono font-bold text-blue-600 mb-2 border-b border-slate-100 pb-2 flex justify-between">
            <span>int</span> <span className="text-slate-400 text-xs mt-1">4 bytes</span>
          </div>
          <p className="text-sm">Stores whole numbers. <br/><span className="text-slate-500 font-mono text-xs mt-2 block bg-slate-50 p-1 rounded">int age = 25;</span></p>
        </div>
        <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="font-mono font-bold text-purple-600 mb-2 border-b border-slate-100 pb-2 flex justify-between">
            <span>float</span> <span className="text-slate-400 text-xs mt-1">4 bytes</span>
          </div>
          <p className="text-sm">Stores numbers with fractional parts. <br/><span className="text-slate-500 font-mono text-xs mt-2 block bg-slate-50 p-1 rounded">float pi = 3.14;</span></p>
        </div>
        <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="font-mono font-bold text-emerald-600 mb-2 border-b border-slate-100 pb-2 flex justify-between">
            <span>char</span> <span className="text-slate-400 text-xs mt-1">1 byte</span>
          </div>
          <p className="text-sm">Stores a single character (ASCII value). <br/><span className="text-slate-500 font-mono text-xs mt-2 block bg-slate-50 p-1 rounded">char grade = 'A';</span></p>
        </div>
        <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="font-mono font-bold text-amber-600 mb-2 border-b border-slate-100 pb-2 flex justify-between">
            <span>double</span> <span className="text-slate-400 text-xs mt-1">8 bytes</span>
          </div>
          <p className="text-sm">Double precision floating point. <br/><span className="text-slate-500 font-mono text-xs mt-2 block bg-slate-50 p-1 rounded">double exact = 3.14159;</span></p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mt-10">Variable Classes & Scope</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="border-l-4 border-blue-500 bg-white p-4 rounded-r-xl shadow-sm">
          <h4 className="font-bold text-slate-800 mb-1">Local Variables</h4>
          <p className="text-sm text-slate-600">Declared inside functions. Stored in <strong>stack memory</strong>. Automatically created when the function is called and destroyed when it exits.</p>
        </div>
        <div className="border-l-4 border-emerald-500 bg-white p-4 rounded-r-xl shadow-sm">
          <h4 className="font-bold text-slate-800 mb-1">Global Variables</h4>
          <p className="text-sm text-slate-600">Declared outside functions. Stored in the <strong>data segment</strong>. Accessible throughout the program and persist until termination.</p>
        </div>
        <div className="border-l-4 border-purple-500 bg-white p-4 rounded-r-xl shadow-sm">
          <h4 className="font-bold text-slate-800 mb-1">Static Variables</h4>
          <p className="text-sm text-slate-600">Declared with the <code>static</code> keyword. Stored in the <strong>data segment</strong>. Retain their value across multiple function calls without being destroyed.</p>
        </div>
        <div className="border-l-4 border-amber-500 bg-white p-4 rounded-r-xl shadow-sm">
          <h4 className="font-bold text-slate-800 mb-1">Dynamic Variables</h4>
          <p className="text-sm text-slate-600">Created at runtime using <code>malloc()</code> or <code>calloc()</code>. Stored in <strong>heap memory</strong>. Must be manually freed using <code>free()</code>.</p>
        </div>
      </div>

      {/* Visual Memory Layout */}
      <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mt-10">Memory Layout in C Programs</h3>
      <p className="mb-6">A typical C program divides RAM into the following visual segments during execution:</p>
      
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center bg-slate-50 p-6 rounded-xl border border-slate-200">
        {/* The Stack/Heap Diagram */}
        <div className="flex flex-col w-64 border-2 border-slate-700 rounded-lg overflow-hidden font-mono text-sm text-center shadow-lg bg-white shrink-0">
          <div className="bg-slate-200 p-2 text-xs font-bold text-slate-500 border-b border-slate-300">High Address (0xFFFF...)</div>
          
          <div className="bg-blue-100 p-5 border-b border-blue-200 relative group">
            <span className="font-bold text-blue-800 text-base">Stack</span>
            <br/><span className="text-[10px] text-blue-600 uppercase tracking-wider">Local Vars / Functions</span>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-full p-0.5 shadow-sm border border-slate-200 z-10 text-blue-500">
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
          
          <div className="bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#f1f5f9_10px,#f1f5f9_20px)] p-6 border-b border-slate-200 flex items-center justify-center">
            <span className="bg-white/80 px-2 py-1 rounded text-xs text-slate-500 font-bold backdrop-blur-sm shadow-sm border border-slate-200">Free Memory</span>
          </div>
          
          <div className="bg-purple-100 p-5 border-b border-purple-200 relative group">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white rounded-full p-0.5 shadow-sm border border-slate-200 z-10 text-purple-500">
              <ArrowUp className="w-4 h-4" />
            </div>
            <span className="font-bold text-purple-800 text-base">Heap</span>
            <br/><span className="text-[10px] text-purple-600 uppercase tracking-wider">Dynamic (malloc/free)</span>
          </div>

          <div className="bg-amber-100 p-4 border-b border-amber-200">
            <span className="font-bold text-amber-800">Data Segment</span>
            <br/><span className="text-[10px] text-amber-600 uppercase tracking-wider">Global / Static Vars</span>
          </div>
          
          <div className="bg-emerald-100 p-4 border-b border-emerald-200">
            <span className="font-bold text-emerald-800">Code / Text</span>
            <br/><span className="text-[10px] text-emerald-600 uppercase tracking-wider">Compiled Instructions</span>
          </div>
          
          <div className="bg-slate-200 p-2 text-xs font-bold text-slate-500">Low Address (0x0000...)</div>
        </div>

        {/* Legend / Info */}
        <div className="flex-1 space-y-3 w-full">
          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex gap-3 items-start">
            <div className="bg-emerald-100 p-1.5 rounded text-emerald-600 shrink-0"><Code2 className="w-4 h-4"/></div>
            <div><strong className="text-sm block text-slate-800">Code/Text Segment</strong><span className="text-xs text-slate-500">Stores compiled binary instructions. Read-only to prevent accidental modification.</span></div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex gap-3 items-start">
            <div className="bg-amber-100 p-1.5 rounded text-amber-600 shrink-0"><Database className="w-4 h-4"/></div>
            <div><strong className="text-sm block text-slate-800">Data Segment</strong><span className="text-xs text-slate-500">Stores global and static variables. Example: <code>static int x = 5;</code></span></div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex gap-3 items-start">
            <div className="bg-blue-100 p-1.5 rounded text-blue-600 shrink-0"><Layers className="w-4 h-4"/></div>
            <div><strong className="text-sm block text-slate-800">Stack Segment</strong><span className="text-xs text-slate-500">Fast, LIFO structure for local variables and function call management. Exceeding it causes a <em>Stack Overflow</em>.</span></div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex gap-3 items-start">
            <div className="bg-purple-100 p-1.5 rounded text-purple-600 shrink-0"><Server className="w-4 h-4"/></div>
            <div><strong className="text-sm block text-slate-800">Heap Segment</strong><span className="text-xs text-slate-500">Large pool of memory for dynamic allocation via pointers. If not freed, causes <em>Memory Leaks</em>.</span></div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mt-10">Types of Memory Allocation</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2 text-lg">
            <LockIcon className="w-5 h-5 text-slate-400" /> Static (Compile-Time)
          </h4>
          <p className="text-sm text-slate-600 mb-3">Memory is reserved before program execution begins. The size must be known exactly.</p>
          <div className="bg-slate-50 border border-slate-200 rounded p-3 font-mono text-sm mb-3 text-slate-700">
            int arr[20]; <span className="text-slate-400">// fixed size array</span>
          </div>
          <p className="text-sm text-amber-600 font-medium bg-amber-50 p-2 rounded"><strong>Limitation:</strong> Wastes memory if not fully used, and cannot be resized later.</p>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2 text-lg">
            <UnlockIcon className="w-5 h-5 text-purple-500" /> Dynamic (Run-Time)
          </h4>
          <p className="text-sm text-slate-600 mb-3">Memory is allocated manually during program execution via <code>malloc()</code> or <code>calloc()</code>.</p>
          <div className="bg-slate-50 border border-slate-200 rounded p-3 font-mono text-sm mb-3 text-slate-700">
            int *arr = malloc(20 * sizeof(int));
          </div>
          <p className="text-sm text-emerald-600 font-medium bg-emerald-50 p-2 rounded"><strong>Advantage:</strong> Highly flexible. Memory can be resized (<code>realloc</code>) and efficiently used.</p>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 p-5 rounded-xl text-base mt-8 shadow-sm">
        <h4 className="font-bold text-red-800 flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5" /> Risks & Best Practices
        </h4>
        <ul className="list-disc pl-5 space-y-2 text-red-900/80 text-sm">
          <li><strong>Memory Leaks:</strong> Always use <code>free()</code> on dynamically allocated memory when done to return it to the Heap.</li>
          <li><strong>Buffer Overflows:</strong> Always use bounds checking when working with arrays (especially Strings) to prevent writing into restricted memory.</li>
          <li><strong>Stack Overflow:</strong> Stack memory is fast but limited in size. For massive datasets, use Heap allocation instead of Stack.</li>
          <li><strong>Modularity:</strong> Prefer Local variables over Global variables to keep your code clean and prevent unexpected state changes.</li>
        </ul>
      </div>
    </div>
  ),

  "Operator & Expression": () => (
    <div className="space-y-6 text-slate-700 text-lg leading-relaxed font-sans">
      <p>
        Operators are symbols that perform operations on operands (variables, constants, or expressions). An expression is a combination of variables, constants, and operators that evaluates to a single value.
      </p>

      <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mt-8">The 8 Categories of C Operators</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {/* 1. Arithmetic */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3"><Calculator className="w-5 h-5 text-emerald-500"/> 1. Arithmetic</h4>
          <p className="text-sm text-slate-600 mb-3">Standard mathematical operations.</p>
          <div className="flex gap-2 flex-wrap mb-3">
            {['+', '-', '*', '/', '%'].map(op => <span key={op} className="bg-slate-100 px-2 py-1 rounded font-mono text-emerald-700 font-bold">{op}</span>)}
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded p-2 font-mono text-xs text-slate-700">
            int a = 10, b = 3;<br/>
            printf("%d", a % b); <span className="text-slate-400">// Output: 1</span>
          </div>
        </div>

        {/* 2. Relational */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3"><Scale className="w-5 h-5 text-blue-500"/> 2. Relational</h4>
          <p className="text-sm text-slate-600 mb-3">Compares values. Returns true (1) or false (0).</p>
          <div className="flex gap-2 flex-wrap mb-3">
            {['==', '!=', '>', '<', '>=', '<='].map(op => <span key={op} className="bg-slate-100 px-2 py-1 rounded font-mono text-blue-700 font-bold">{op}</span>)}
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded p-2 font-mono text-xs text-slate-700">
            if (a &gt; b) {'{\n    printf("a is greater");\n}'}
          </div>
        </div>

        {/* 3. Logical */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3"><ToggleLeft className="w-5 h-5 text-purple-500"/> 3. Logical</h4>
          <p className="text-sm text-slate-600 mb-3">Combines multiple conditions.</p>
          <div className="flex gap-2 flex-wrap mb-3">
            <span className="bg-slate-100 px-2 py-1 rounded font-mono text-purple-700 font-bold">&& (AND)</span>
            <span className="bg-slate-100 px-2 py-1 rounded font-mono text-purple-700 font-bold">|| (OR)</span>
            <span className="bg-slate-100 px-2 py-1 rounded font-mono text-purple-700 font-bold">! (NOT)</span>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded p-2 font-mono text-xs text-slate-700">
            if (a &gt; 0 && b &gt; 0) {'{\n    printf("Both positive");\n}'}
          </div>
        </div>

        {/* 4. Assignment */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3"><ArrowRightLeft className="w-5 h-5 text-pink-500"/> 4. Assignment</h4>
          <p className="text-sm text-slate-600 mb-3">Assigns values, often compounded.</p>
          <div className="flex gap-2 flex-wrap mb-3">
            {['=', '+=', '-=', '*=', '/=', '%='].map(op => <span key={op} className="bg-slate-100 px-2 py-1 rounded font-mono text-pink-700 font-bold">{op}</span>)}
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded p-2 font-mono text-xs text-slate-700">
            x += 5; <span className="text-slate-400">// Same as: x = x + 5;</span>
          </div>
        </div>

        {/* 5. Increment/Decrement */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3"><ChevronsUp className="w-5 h-5 text-indigo-500"/> 5. Increment / Decrement</h4>
          <p className="text-sm text-slate-600 mb-3">Adds or subtracts 1 from a variable.</p>
          <div className="flex gap-2 flex-wrap mb-3">
            <span className="bg-slate-100 px-2 py-1 rounded font-mono text-indigo-700 font-bold">++</span>
            <span className="bg-slate-100 px-2 py-1 rounded font-mono text-indigo-700 font-bold">--</span>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded p-2 font-mono text-xs text-slate-700">
            i++; <span className="text-slate-400">// post-increment</span><br/>
            ++i; <span className="text-slate-400">// pre-increment</span>
          </div>
        </div>

        {/* 6. Ternary */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3"><HelpCircle className="w-5 h-5 text-teal-500"/> 6. Conditional (Ternary)</h4>
          <p className="text-sm text-slate-600 mb-3">A rapid shorthand for an if-else statement.</p>
          <div className="flex gap-2 flex-wrap mb-3">
            <span className="bg-slate-100 px-2 py-1 rounded font-mono text-teal-700 font-bold">? :</span>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded p-2 font-mono text-xs text-slate-700">
            int min = (a &lt; b) ? a : b;
          </div>
        </div>

        {/* 7. Bitwise */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3"><Binary className="w-5 h-5 text-amber-500"/> 7. Bitwise</h4>
          <p className="text-sm text-slate-600 mb-3">Operates directly at the binary (0s and 1s) level.</p>
          <div className="flex gap-2 flex-wrap mb-3">
            {['&', '|', '^', '~', '<<', '>>'].map(op => <span key={op} className="bg-slate-100 px-2 py-1 rounded font-mono text-amber-700 font-bold">{op}</span>)}
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded p-2 font-mono text-xs text-slate-700">
            int result = a & b;
          </div>
        </div>

        {/* 8. Special */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3"><Star className="w-5 h-5 text-cyan-500"/> 8. Special Operators</h4>
          <p className="text-sm text-slate-600 mb-3">Specific memory and structure operators.</p>
          <div className="flex gap-2 flex-wrap mb-3">
            <span className="bg-slate-100 px-2 py-1 rounded font-mono text-cyan-700 font-bold" title="size of datatype">sizeof</span>
            <span className="bg-slate-100 px-2 py-1 rounded font-mono text-cyan-700 font-bold" title="address of variable">&</span>
            <span className="bg-slate-100 px-2 py-1 rounded font-mono text-cyan-700 font-bold" title="pointer dereference">*</span>
            <span className="bg-slate-100 px-2 py-1 rounded font-mono text-cyan-700 font-bold" title="access structure member">-&gt;</span>
          </div>
        </div>
      </div>

      <InteractiveOperatorSimulator />

      <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mt-10">Expressions & Precedence</h3>
      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 my-6 shadow-sm">
        <p className="mb-4 text-sm text-slate-700">An <strong>expression</strong> is a combination of variables, constants, and operators that evaluates to a value. Common types include:</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <li className="bg-white p-3 rounded shadow-sm border border-slate-100"><span className="text-xs text-slate-500 block uppercase font-bold">Arithmetic</span><code className="text-emerald-600 font-bold text-sm">x + y * z</code></li>
          <li className="bg-white p-3 rounded shadow-sm border border-slate-100"><span className="text-xs text-slate-500 block uppercase font-bold">Relational</span><code className="text-blue-600 font-bold text-sm">a &gt; b</code></li>
          <li className="bg-white p-3 rounded shadow-sm border border-slate-100"><span className="text-xs text-slate-500 block uppercase font-bold">Logical</span><code className="text-purple-600 font-bold text-sm">(x &gt; 0 && y &lt; 10)</code></li>
          <li className="bg-white p-3 rounded shadow-sm border border-slate-100"><span className="text-xs text-slate-500 block uppercase font-bold">Assignment</span><code className="text-pink-600 font-bold text-sm">sum = a + b</code></li>
        </ul>

        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r text-sm text-indigo-900">
          <strong className="block mb-1 text-base font-bold">Precedence & Associativity</strong>
          When multiple operators appear in a single expression, <strong>Precedence</strong> dictates which operator executes first (e.g., multiplication before addition). If precedence is the same, <strong>Associativity</strong> dictates the direction (usually Left-to-Right).
        </div>
      </div>
      
      <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl text-base mt-8 shadow-sm">
        <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5" /> Best Practices
        </h4>
        <ul className="list-disc pl-5 space-y-2 text-amber-900/80 text-sm">
          <li><strong>Use Parentheses:</strong> Always use <code>()</code> to make complex expressions explicit and clear. Never rely entirely on memorized precedence tables.</li>
          <li><strong>Keep it Readable:</strong> Avoid writing overly complex, nested expressions on a single line. Break them apart into readable variables.</li>
          <li><strong>Bitwise Caution:</strong> Be extremely careful with bitwise operators—they are powerful for low-level optimizations but are notorious for introducing tricky logical bugs if misused.</li>
        </ul>
      </div>
    </div>
  ),

  "Control Structure": () => (
    <div className="space-y-6 text-slate-700 text-lg leading-relaxed font-sans">
      <p>
        Control structures determine the flow of execution in a program. Without them, a program would strictly run line-by-line from top to bottom. They allow for decision-making, branching, and logic.
      </p>

      {/* FLOWCHARTS */}
      <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mt-8">Visualizing Logic: Flowcharts</h3>
      <p className="text-base text-slate-600 mb-4">Flowcharts visually represent the logic of a program before you write code. This ensures clarity and reduces logical errors.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col items-center text-center hover:border-blue-300 transition-colors">
          <div className="w-16 h-8 bg-blue-100 border-2 border-blue-400 rounded-[50%] flex items-center justify-center mb-3"></div>
          <strong className="text-slate-800">Oval (Terminator)</strong>
          <span className="text-xs text-slate-500 mt-1">Start / End of program.</span>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col items-center text-center hover:border-emerald-300 transition-colors">
          <div className="w-16 h-10 bg-emerald-100 border-2 border-emerald-400 rounded-sm flex items-center justify-center mb-3"></div>
          <strong className="text-slate-800">Rectangle (Process)</strong>
          <span className="text-xs text-slate-500 mt-1">A computation or action.</span>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col items-center text-center hover:border-amber-300 transition-colors">
          <div className="w-10 h-10 bg-amber-100 border-2 border-amber-400 rotate-45 flex items-center justify-center mb-3 mt-1"></div>
          <strong className="text-slate-800 mt-2">Diamond (Decision)</strong>
          <span className="text-xs text-slate-500 mt-1">Conditions (True/False).</span>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col items-center text-center hover:border-purple-300 transition-colors">
          <div className="w-16 h-10 bg-purple-100 border-2 border-purple-400 -skew-x-12 flex items-center justify-center mb-3"></div>
          <strong className="text-slate-800">Parallelogram (I/O)</strong>
          <span className="text-xs text-slate-500 mt-1">Input / Output.</span>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl shadow-sm text-sm">
        <strong className="text-blue-800 block mb-1">Nested Flowcharts</strong>
        <p className="text-blue-900/80 mb-2">A nested flowchart occurs when a decision (diamond) contains another decision inside its True or False branch. Example: Checking if a number is positive, then further checking if it's even.</p>
        <div className="flex gap-2 flex-wrap">
          <span className="bg-blue-200 text-blue-900 px-2 py-1 rounded text-xs font-bold">Lab Work: Draw a flowchart to find the largest of three numbers.</span>
          <span className="bg-purple-200 text-purple-900 px-2 py-1 rounded text-xs font-bold">Self Exercise: Flowchart for a login system (username, then password).</span>
        </div>
      </div>

      {/* Interactive Flowchart Builder */}
      <InteractiveFlowchartBuilder />

      {/* IF STATEMENTS */}
      <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mt-10">🔀 If Statements in C</h3>
      
      <div className="space-y-6 mt-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-sm">1</span> Simple If</h4>
          <div className="bg-slate-50 border border-slate-100 rounded p-3 font-mono text-sm text-slate-700">
            <span className="text-blue-600">if</span> (condition) {'{\n'}
            <span className="text-slate-400">    // code executes if condition is true</span>
            {'\n}'}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-sm">2</span> If...Else</h4>
          <div className="bg-slate-50 border border-slate-100 rounded p-3 font-mono text-sm text-slate-700">
            <span className="text-blue-600">if</span> (marks &gt;= 40) {'{\n'}
            {'    '}printf("Pass");{'\n'}
            {'}'} <span className="text-blue-600">else</span> {'{\n'}
            {'    '}printf("Fail");{'\n'}
            {'}'}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-sm">3</span> If-Else Ladder</h4>
          <p className="text-sm text-slate-600 mb-3">Used when multiple conditions are checked sequentially. Execution stops at the first true condition.</p>
          <div className="flex gap-2 flex-wrap mb-4">
            <span className="bg-blue-100 text-blue-800 border border-blue-200 px-2 py-1 rounded text-xs font-bold">Lab Work: Classify a student's grade.</span>
            <span className="bg-purple-100 text-purple-800 border border-purple-200 px-2 py-1 rounded text-xs font-bold">Self Exercise: Check if a number is positive, negative, or zero.</span>
          </div>
          <InteractiveControlFlowSimulator />
        </div>
      </div>

      {/* TERNARY OPERATOR */}
      <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mt-10">🎯 Ternary Operator</h3>
      <p className="text-base text-slate-600">A compact, one-line form of if-else.</p>
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mt-4">
        <div className="bg-slate-50 border border-slate-100 rounded p-3 font-mono text-sm text-slate-700 mb-4">
          <span className="text-slate-400">{'// Syntax'}</span><br/>
          result = (condition) ? value_if_true : value_if_false;<br/><br/>
          <span className="text-slate-400">{'// Example'}</span><br/>
          <span className="text-blue-600">int</span> num = 10;<br/>
          printf("%s", (num % 2 == 0) ? "Even" : "Odd");
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="bg-blue-100 text-blue-800 border border-blue-200 px-2 py-1 rounded text-xs font-bold">Lab Work: Check if number is even/odd using ternary.</span>
          <span className="bg-purple-100 text-purple-800 border border-purple-200 px-2 py-1 rounded text-xs font-bold">Self Exercise: Find max of two numbers using ternary.</span>
        </div>
      </div>

      {/* SWITCH CASE */}
      <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mt-10">🔄 Switch Case</h3>
      <p className="text-base text-slate-600">Used when multiple discrete values are checked against a single variable. It is generally faster than a long if-else ladder.</p>
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mt-4">
        <div className="bg-slate-50 border border-slate-100 rounded p-3 font-mono text-sm text-slate-700 mb-4">
          <span className="text-blue-600">switch</span> (choice) {'{\n'}
          {'    '}<span className="text-blue-600">case</span> 1: printf("Addition"); <span className="text-purple-600">break</span>;{'\n'}
          {'    '}<span className="text-blue-600">case</span> 2: printf("Subtraction"); <span className="text-purple-600">break</span>;{'\n'}
          {'    '}<span className="text-blue-600">case</span> 3: printf("Multiplication"); <span className="text-purple-600">break</span>;{'\n'}
          {'    '}<span className="text-blue-600">default</span>: printf("Invalid choice");{'\n'}
          {'}'}
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="bg-blue-100 text-blue-800 border border-blue-200 px-2 py-1 rounded text-xs font-bold">Lab Work: Menu-driven calculator.</span>
          <span className="bg-purple-100 text-purple-800 border border-purple-200 px-2 py-1 rounded text-xs font-bold">Self Exercise: Print day of the week based on input (1-7).</span>
        </div>
      </div>

      {/* SUMMARY TABLE */}
      <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2 mt-10">📌 Summary Table</h3>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 text-sm">
              <th className="py-3 px-4 font-bold">Concept</th>
              <th className="py-3 px-4 font-bold">Syntax Example</th>
              <th className="py-3 px-4 font-bold">Best Use Case</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-slate-100 hover:bg-slate-50">
              <td className="py-3 px-4 font-bold text-slate-800">If</td>
              <td className="py-3 px-4 font-mono text-blue-600">if (x &gt; 0)</td>
              <td className="py-3 px-4 text-slate-600">Single condition</td>
            </tr>
            <tr className="border-b border-slate-100 hover:bg-slate-50">
              <td className="py-3 px-4 font-bold text-slate-800">If-Else</td>
              <td className="py-3 px-4 font-mono text-blue-600">if...else</td>
              <td className="py-3 px-4 text-slate-600">Two-way decision</td>
            </tr>
            <tr className="border-b border-slate-100 hover:bg-slate-50">
              <td className="py-3 px-4 font-bold text-slate-800">If-Else Ladder</td>
              <td className="py-3 px-4 font-mono text-blue-600">else if</td>
              <td className="py-3 px-4 text-slate-600">Multiple ranges / cascading logic</td>
            </tr>
            <tr className="border-b border-slate-100 hover:bg-slate-50">
              <td className="py-3 px-4 font-bold text-slate-800">Ternary Operator</td>
              <td className="py-3 px-4 font-mono text-purple-600">(cond) ? a : b</td>
              <td className="py-3 px-4 text-slate-600">Short, inline decisions</td>
            </tr>
            <tr className="border-b border-slate-100 hover:bg-slate-50">
              <td className="py-3 px-4 font-bold text-slate-800">Switch Case</td>
              <td className="py-3 px-4 font-mono text-blue-600">switch(var)</td>
              <td className="py-3 px-4 text-slate-600">Multiple discrete values (menus)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl text-base mt-8 shadow-sm">
        <h4 className="font-bold text-emerald-800 flex items-center gap-2 mb-2">
          <CheckCircle className="w-5 h-5" /> Tip for Practice
        </h4>
        <p className="text-emerald-900/80 text-sm">
          Always start with a <strong>Flowchart</strong> <span className="mx-1">→</span> then write <strong>Pseudocode</strong> <span className="mx-1">→</span> finally implement in <strong>C</strong>. This mental workflow ensures clarity and drastically reduces logical errors.
        </p>
      </div>

    </div>
  ),

  "Pointer": () => (
    <div className="space-y-6 text-slate-700 text-lg leading-relaxed font-sans">
      <p>
        Pointers are often considered the most difficult, yet most powerful, feature of the C language. A pointer is simply a variable that stores the <strong>memory address</strong> of another variable.
      </p>

      <div className="bg-slate-800 text-slate-200 p-6 rounded-xl shadow-lg my-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <h4 className="font-bold text-white mb-4 flex items-center gap-2 z-10 relative">
          <Cpu className="w-5 h-5 text-blue-400" /> Mental Model: Pointers as GPS Coordinates
        </h4>
        <p className="text-slate-300 text-sm z-10 relative">
          Imagine your computer's RAM as a giant neighborhood. Every variable is a house with data inside it. 
          A standard variable gives you the data inside the house. A <strong>pointer</strong> gives you the GPS coordinate (address) of the house itself.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2">The Two Core Operators</h3>
      <ul className="space-y-4 mt-4">
        <li className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
          <strong className="text-blue-600 font-mono text-xl mr-2">&</strong> <strong className="text-slate-800">Address-of Operator</strong>
          <p className="text-sm mt-1">Returns the exact memory address of a variable. <br/><code className="bg-slate-50 border border-slate-100 mt-2 block p-2 text-slate-600 font-mono text-xs rounded">int x = 5; printf("%p", &x); // Prints e.g., 0x7ffeefbff5a8</code></p>
        </li>
        <li className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
          <strong className="text-purple-600 font-mono text-xl mr-2">*</strong> <strong className="text-slate-800">Dereference Operator</strong>
          <p className="text-sm mt-1">Goes to the memory address stored in the pointer, and gets the actual value living there.<br/><code className="bg-slate-50 border border-slate-100 mt-2 block p-2 text-slate-600 font-mono text-xs rounded">int* ptr = &x; printf("%d", *ptr); // Prints 5</code></p>
        </li>
      </ul>
      <p className="text-sm text-slate-500 italic mt-8">
        Click the "Code Playground" tab above to run mock pointer experiments.
      </p>
    </div>
  )
};

const getModuleContent = (topic) => {
  if (MODULE_CONTENT[topic]) return MODULE_CONTENT[topic]();
  
  return (
    <div className="space-y-6 text-slate-700 text-lg leading-relaxed font-sans">
      <p>
        Detailed interactive curriculum content for <strong>"{topic}"</strong> is currently being developed. 
      </p>
      <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl text-base">
        <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-blue-500" /> Learning Objectives
        </h4>
        <ul className="list-disc pl-5 space-y-2 text-slate-600">
          <li>Understand the fundamental theory and memory mechanics behind this concept.</li>
          <li>Learn the exact C99/C11 syntax required by standard compilers.</li>
          <li>Identify common compilation warnings, errors, and runtime segmentation faults.</li>
          <li>Use the Code Playground to simulate memory states and AST generation.</li>
        </ul>
      </div>
      <p className="text-sm text-slate-500 italic mt-8">
        Click the "Code Playground" tab above to run mock experiments for this module.
      </p>
    </div>
  );
};

// Mock Runtime Evaluator for realistic terminal output
const extractOutput = (sourceCode) => {
  if (sourceCode === TOPIC_DEFAULTS["Introduction To C Language"]) return "Hello, World!\nWelcome to C Programming!\n";
  if (sourceCode === TOPIC_DEFAULTS["Datatype, Constant & Variable"]) return "Age: 25\nPi: 3.14\nGrade: A\n";
  if (sourceCode === TOPIC_DEFAULTS["Operator & Expression"]) return "Addition: 19\nDivision: 3\nModulo: 3\n";
  if (sourceCode === TOPIC_DEFAULTS["Pointer"]) return "Value of target: 42\nMemory Address: 0x7ffeeb42a1b8\nDereferenced Value: 42\n";
  if (sourceCode === TOPIC_DEFAULTS["Control Structure"]) return "Grade: B\n";

  let out = "";
  const printfRegex = /printf\s*\(\s*"([^"]*)"/g;
  let match;
  let found = false;
  
  while ((match = printfRegex.exec(sourceCode)) !== null) {
      found = true;
      let text = match[1].replace(/\\n/g, '\n').replace(/\\t/g, '\t');
      text = text.replace(/%[dfcspxX.0-9]+/g, '[val]'); 
      out += text;
  }
  
  if (found) return out;
  return "[No standard output generated by program]";
};

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [activeTopic, setActiveTopic] = useState(TOPICS[0]);
  const [activeTab, setActiveTab] = useState('theory'); // 'theory' | 'playground'
  const [code, setCode] = useState(TOPIC_DEFAULTS[TOPICS[0]]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [simState, setSimState] = useState({
    stage: 0, 
    tokens: [],
    symbols: [],
    ir: [],
    output: "",
    error: null, 
  });

  const textareaRef = useRef(null);

  const handleTopicChange = (topic) => {
    setActiveTopic(topic);
    setActiveTab('theory'); 
    
    const defaultCode = TOPIC_DEFAULTS[topic] || TOPIC_DEFAULTS["default"];
    setCode(defaultCode);
    
    resetSimulation();
  };

  const resetSimulation = () => {
    setSimState({ stage: 0, tokens: [], symbols: [], ir: [], output: "", error: null });
    setIsCompiling(false);
  };

  const runSimulation = async () => {
    if (isCompiling) return;
    resetSimulation();
    setIsCompiling(true);
    
    const lines = code.split('\n');
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    
    await delay(400);

    const tokenRegex = /(int|float|char|const|return|#include|<stdio\.h>|printf|if|else|switch)|([a-zA-Z_]\w*)|(\d+(\.\d+)?)|([+\-*/=%&|<>!]+)|([{};(),"])/g;
    let extractedTokens = [];
    
    lines.forEach((line, i) => {
      let match;
      while ((match = tokenRegex.exec(line)) !== null) {
        let type = 'unknown';
        if (match[1]) type = 'keyword';
        else if (match[2]) type = 'identifier';
        else if (match[3]) type = 'literal';
        else if (match[5]) type = 'operator';
        else if (match[6]) type = 'punctuation';
        
        extractedTokens.push({ text: match[0], type, line: i + 1 });
      }
    });

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if ((line.startsWith('int ') || line.startsWith('float ') || line.startsWith('char ') || line.startsWith('return ')) && !line.endsWith(';') && !line.includes('main()')) {
        setSimState(s => ({ 
          ...s, 
          stage: 2, 
          error: { message: `Syntax Error: Missing semicolon (;) at end of statement.`, line: i + 1 } 
        }));
        setIsCompiling(false);
        return;
      }
    }

    let symbols = [];
    let declaredVars = new Set();
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.match(/^(int|float|char)\s+\w+/)) {
        const parts = line.split(/[ =;]+/);
        const varName = parts[1];
        declaredVars.add(varName);
        symbols.push({ name: varName, type: parts[0], scope: 'main()', mem: `0x${Math.floor(Math.random()*10000).toString(16).toUpperCase()}` });
      }
      
      if (line.includes('=') && (line.includes('+') || line.includes('-') || line.includes('*'))) {
        const rhs = line.split('=')[1].trim().replace(';', '');
        const operands = rhs.split(/[+\-*/]/).map(op => op.trim());
        for (let op of operands) {
          if (op && isNaN(op) && !op.includes('"') && !declaredVars.has(op)) {
            setSimState(s => ({ 
              ...s, 
              stage: 3, 
              error: { message: `Semantic Error: Variable '${op}' is undeclared in this scope.`, line: i + 1 } 
            }));
            setIsCompiling(false);
            return;
          }
        }
      }
    }

    const generatedIR = [
      "; Function: main",
      "LOAD_CONST 5, R1",
      "STORE R1, [a]",
      "LOAD_CONST 10, R2",
      "STORE R2, [b]",
      "LOAD [a], R3",
      "LOAD [b], R4",
      "ADD R3, R4, R5",
      "STORE R5, [sum]",
      "CALL printf, [sum]",
      "RET 0"
    ];
    
    const simulatedOutputText = extractOutput(code);

    setSimState({ 
      stage: 5, 
      tokens: extractedTokens, 
      symbols, 
      ir: generatedIR, 
      output: simulatedOutputText, 
      error: null 
    });
    setIsCompiling(false);
  };

  const renderTokens = () => (
    <div className="flex flex-wrap gap-2 p-5 h-full overflow-y-auto content-start bg-slate-50/50">
      {simState.tokens.map((t, i) => (
        <span key={i} className={`px-2.5 py-1 text-xs font-mono rounded-md border shadow-sm transition-all hover:-translate-y-0.5
          ${t.type === 'keyword' ? 'bg-blue-50 border-blue-200 text-blue-700' : 
            t.type === 'identifier' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
            t.type === 'operator' ? 'bg-amber-50 border-amber-200 text-amber-700' :
            t.type === 'literal' ? 'bg-purple-50 border-purple-200 text-purple-700' :
            'bg-white border-slate-200 text-slate-600'}`}
          title={`Line: ${t.line} | Type: ${t.type}`}
        >
          {t.text}
        </span>
      ))}
    </div>
  );

  const renderAST = () => (
    <div className="p-5 flex flex-col items-center w-full h-full overflow-y-auto bg-slate-50/50">
      <div className="bg-white border-2 border-slate-300 px-5 py-2.5 rounded-xl font-mono text-sm shadow-md mb-4 text-slate-800 font-bold z-10">Program Node</div>
      <div className="w-0.5 h-6 bg-slate-300 -mt-4 z-0"></div>
      <div className="bg-indigo-50 border-2 border-indigo-200 px-5 py-2.5 rounded-xl font-mono text-sm shadow-md mb-4 text-indigo-800 font-bold z-10">FunctionDef: main()</div>
      
      <div className="flex w-full max-w-md justify-between relative mt-4">
        <div className="absolute top-[-16px] left-[15%] right-[15%] h-0.5 bg-slate-300"></div>
        <div className="absolute top-[-16px] left-[15%] w-0.5 h-4 bg-slate-300"></div>
        <div className="absolute top-[-16px] left-[50%] w-0.5 h-4 bg-slate-300"></div>
        <div className="absolute top-[-16px] right-[15%] w-0.5 h-4 bg-slate-300"></div>

        <div className="flex flex-col items-center w-1/3 px-1 relative">
          <div className="bg-blue-50 border-2 border-blue-200 px-3 py-2 rounded-lg text-xs font-mono text-center w-full shadow-sm text-blue-800 font-bold break-words">VarDecl</div>
        </div>
        <div className="flex flex-col items-center w-1/3 px-1 relative">
          <div className="bg-amber-50 border-2 border-amber-200 px-3 py-2 rounded-lg text-xs font-mono text-center w-full shadow-sm text-amber-800 font-bold break-words">BinaryExpr</div>
        </div>
        <div className="flex flex-col items-center w-1/3 px-1 relative">
          <div className="bg-purple-50 border-2 border-purple-200 px-3 py-2 rounded-lg text-xs font-mono text-center w-full shadow-sm text-purple-800 font-bold break-words">ReturnStmt</div>
        </div>
      </div>
    </div>
  );

  const renderSymbols = () => (
    <div className="p-5 h-full overflow-y-auto bg-slate-50/50">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider">
              <th className="py-3 px-4 font-bold">Identifier</th>
              <th className="py-3 px-4 font-bold">Type</th>
              <th className="py-3 px-4 font-bold">Scope</th>
              <th className="py-3 px-4 font-bold">Memory Address</th>
            </tr>
          </thead>
          <tbody>
            {simState.symbols.map((sym, i) => (
              <tr key={i} className="border-b border-slate-100 font-mono text-sm hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 text-emerald-600 font-bold"><i className="lucide-tag inline w-3 h-3 mr-1"></i>{sym.name}</td>
                <td className="py-3 px-4"><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">{sym.type}</span></td>
                <td className="py-3 px-4 text-slate-500">{sym.scope}</td>
                <td className="py-3 px-4 text-purple-600 bg-purple-50/50 font-bold">{sym.mem}</td>
              </tr>
            ))}
            {simState.symbols.length === 0 && (
              <tr>
                <td colSpan="4" className="py-6 text-center text-slate-400 text-sm italic">No variables declared in the current AST.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderIR = () => (
    <div className="p-5 h-full bg-[#f8fafc] font-mono text-sm overflow-y-auto custom-scrollbar shadow-inner border-t border-slate-200">
      {simState.ir.map((line, i) => (
        <div key={i} className="flex mb-1 hover:bg-white rounded px-2 py-0.5 transition-colors">
          <span className="text-slate-400 w-8 text-right pr-4 select-none border-r border-slate-200 mr-4 py-0.5">{i+1}</span>
          <span className={`${line.startsWith(';') ? 'text-emerald-600/70 italic' : 'text-slate-700'} py-0.5`}>
            <span dangerouslySetInnerHTML={{
              __html: line
                .replace(/^;.*$/, match => `<span class="text-emerald-600/70 italic">${match}</span>`)
                .replace(/^([A-Z_]+)/, match => `<span class="text-blue-600 font-bold">${match}</span>`)
                .replace(/R\d/, match => `<span class="text-purple-600 font-bold">${match}</span>`)
                .replace(/\[\w+\]/, match => `<span class="text-amber-600 font-bold">${match}</span>`)
            }} />
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-slate-100 text-slate-800 overflow-hidden font-sans">
      
      {/* LEFT PANE: Sidebar Curriculum */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col z-20 shadow-sm flex-shrink-0">
        <div className="p-5 flex items-center gap-3 border-b border-slate-100 bg-slate-50">
          <div className="bg-blue-100 p-2 rounded-lg border border-blue-200 shadow-sm">
            <GraduationCap className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-900 leading-tight tracking-tight">C-Mastery</h1>
            <p className="text-xs text-slate-500 font-medium">Interactive CS Pedagogy</p>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">Curriculum Modules</div>
          {TOPICS.map((topic, idx) => {
            const isActive = activeTopic === topic;
            return (
              <button
                key={idx}
                onClick={() => handleTopicChange(topic)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all duration-200 group
                  ${isActive ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-100 shadow-sm' : 'text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200'}`}
              >
                <span className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs border transition-colors shadow-sm
                  ${isActive ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-slate-500 border-slate-200 group-hover:text-blue-600'}`}>
                  {idx + 1}
                </span>
                <span className="truncate">{topic}</span>
              </button>
            );
          })}
        </div>

        {/* NEW EXAM SECTION */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <button
            onClick={() => window.open('https://raw.githack.com/RudraX-Github/C_Language/main/Data/HTML%20pages/Exam.html', '_blank')}
            className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Final Exam Portal</span>
            </div>
            <ExternalLink className="w-4 h-4 opacity-70" />
          </button>
        </div>
      </aside>

      {/* MIDDLE PANE: Theory & Editor */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 relative z-10">
        
        {/* Header & Tabs */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white shadow-sm z-10">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-indigo-50 rounded-md border border-indigo-100">
                <BookOpen className="w-4 h-4 text-indigo-500" />
            </div>
            <h2 className="font-bold text-slate-800 text-lg">{activeTopic}</h2>
          </div>
          
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 shadow-inner">
            <button 
              onClick={() => setActiveTab('theory')}
              className={`flex items-center gap-2 px-5 py-1.5 rounded-md text-sm font-semibold transition-all ${activeTab === 'theory' ? 'bg-white text-blue-600 shadow border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <FileText className="w-4 h-4" /> Theory
            </button>
            <button 
              onClick={() => setActiveTab('playground')}
              className={`flex items-center gap-2 px-5 py-1.5 rounded-md text-sm font-semibold transition-all ${activeTab === 'playground' ? 'bg-white text-emerald-600 shadow border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Code2 className="w-4 h-4" /> Code Playground
            </button>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 relative flex flex-col overflow-hidden">
          
          {/* VIEW 1: THEORY */}
          {activeTab === 'theory' && (
            <div className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar animate-in fade-in duration-300 bg-slate-50">
              <div className="max-w-3xl mx-auto">
                <div className="mb-8 flex items-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-xl">
                        <Layers className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{activeTopic}</h1>
                </div>
                
                {/* Render the specific content block */}
                {getModuleContent(activeTopic)}

                {/* CTA */}
                <div className="mt-12 pt-8 border-t border-slate-200 flex justify-center">
                  <button 
                    onClick={() => setActiveTab('playground')}
                    className="flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Code2 className="w-5 h-5" /> Launch Interactive Playground
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: CODE PLAYGROUND */}
          {activeTab === 'playground' && (
            <div className="flex-1 flex flex-col h-full animate-in fade-in duration-300 bg-white">
              {/* Editor Toolbar */}
              <div className="h-12 bg-slate-50 border-b border-slate-200 flex items-center justify-between px-4">
                <span className="text-sm font-mono font-bold text-slate-600 flex items-center gap-2 bg-white px-3 py-1 rounded border border-slate-200 shadow-sm">
                  <Layout className="w-4 h-4 text-blue-500" /> main.c
                </span>
              </div>

              {/* Code Area */}
              <div className="flex-1 relative flex bg-[#fafafa]">
                <div className="w-14 bg-slate-100 border-r border-slate-200 text-right py-4 font-mono text-sm text-slate-400 select-none flex flex-col shadow-inner">
                  {code.split('\n').map((_, i) => (
                    <div key={i} className={`px-3 h-[26px] flex items-center justify-end
                      ${simState.error?.line === i + 1 ? 'bg-red-100 text-red-600 font-bold border-l-4 border-red-500' : ''}
                    `}>
                      {i + 1}
                    </div>
                  ))}
                </div>
                
                <div className="flex-1 relative">
                  {simState.error && (
                    <div 
                      className="absolute left-0 right-0 bg-red-50 border-y border-red-200 pointer-events-none transition-all z-0"
                      style={{ top: `${(simState.error.line - 1) * 26 + 16}px`, height: '26px' }}
                    />
                  )}
                  
                  <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    disabled={isCompiling}
                    spellCheck="false"
                    className="w-full h-full bg-transparent text-slate-800 font-mono text-[14px] p-4 resize-none outline-none custom-scrollbar disabled:opacity-50 relative z-10 font-medium"
                    style={{ lineHeight: '26px' }}
                  />
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
                <div className="text-sm font-mono text-slate-500 flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                  <Cpu className="w-4 h-4 text-purple-500" />
                  <span>Target: x86_64 Architecture</span>
                </div>
                <button
                  onClick={runSimulation}
                  disabled={isCompiling}
                  className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-bold transition-all transform active:scale-95 shadow-md
                    ${isCompiling 
                      ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300' 
                      : simState.error 
                        ? 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 shadow-red-100'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-200'}`}
                >
                  {isCompiling ? (
                    <><RefreshCw className="w-4 h-4 animate-spin" /> Compiling...</>
                  ) : simState.error ? (
                    <><AlertCircle className="w-4 h-4" /> Reset & Execute</>
                  ) : (
                    <><Play className="w-4 h-4" /> Execute Compilation</>
                  )}
                </button>
              </div>

              {/* Terminal Output Area */}
              <div className="h-56 bg-slate-900 border-t-4 border-slate-800 font-mono text-sm relative overflow-y-auto flex flex-col">
                <div className="sticky top-0 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800 p-2 px-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <Terminal className="w-4 h-4" /> Output Terminal
                  </div>
                </div>
                <div className="p-4 flex-1">
                  {isCompiling ? (
                    <div className="text-slate-500 animate-pulse flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" /> Running compilation in background...
                    </div>
                  ) : simState.error ? (
                    <div>
                      <div className="text-red-400 font-bold">Compilation Error (Stage {simState.stage})</div>
                      <div className="text-red-300/80 mt-1 whitespace-pre-wrap">{simState.error.message}</div>
                    </div>
                  ) : simState.output ? (
                    <div>
                      <div className="text-emerald-400 font-bold whitespace-pre-wrap text-base">{simState.output}</div>
                    </div>
                  ) : (
                    <div className="text-slate-600 italic">No output yet. Click 'Execute Compilation' to run the code.</div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
        }
        
        .font-mono {
            font-family: 'Fira Code', monospace !important;
        }

        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
    </div>
  );
}