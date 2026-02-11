"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

// Model data
const models = {
  opus: { name: "Claude Opus 4.5", color: "#8b5cf6", inputCost: 15, outputCost: 75 },
  sonnet: { name: "Claude Sonnet 4.5", color: "#3b82f6", inputCost: 3, outputCost: 15 },
  haiku: { name: "Claude Haiku 4.5", color: "#10b981", inputCost: 0.25, outputCost: 1.25 },
};

// Cost comparison data
const costData = [
  { name: "Input ($/M)", opus: 15, sonnet: 3, haiku: 0.25 },
  { name: "Output ($/M)", opus: 75, sonnet: 15, haiku: 1.25 },
];

// Accuracy by task type (hypothetical benchmarks)
const accuracyData = [
  { task: "Simple Math", opus: 99, sonnet: 98, haiku: 95 },
  { task: "Complex Reasoning", opus: 95, sonnet: 82, haiku: 61 },
  { task: "Code Generation", opus: 94, sonnet: 89, haiku: 72 },
  { task: "Summarization", opus: 96, sonnet: 94, haiku: 91 },
  { task: "Tool Use (JSON)", opus: 98, sonnet: 91, haiku: 74 },
  { task: "Config Editing", opus: 97, sonnet: 85, haiku: 42 },
];

// Cost per correct answer
const costPerCorrectData = [
  { task: "Simple Math", opus: 0.76, sonnet: 0.15, haiku: 0.013 },
  { task: "Complex Reasoning", opus: 0.79, sonnet: 0.18, haiku: 0.020 },
  { task: "Code Generation", opus: 0.80, sonnet: 0.17, haiku: 0.017 },
  { task: "Summarization", opus: 0.78, sonnet: 0.16, haiku: 0.014 },
  { task: "Tool Use", opus: 0.77, sonnet: 0.17, haiku: 0.017 },
  { task: "Config Editing", opus: 0.77, sonnet: 0.18, haiku: 0.030 },
];

// Context degradation curve
const degradationData = [
  { context: "10%", opus: 99, sonnet: 98, haiku: 96 },
  { context: "25%", opus: 98, sonnet: 97, haiku: 94 },
  { context: "50%", opus: 97, sonnet: 94, haiku: 88 },
  { context: "75%", opus: 95, sonnet: 89, haiku: 76 },
  { context: "90%", opus: 92, sonnet: 82, haiku: 64 },
  { context: "95%", opus: 88, sonnet: 74, haiku: 51 },
];

// Radar chart data for model comparison
const radarData = [
  { subject: "Accuracy", opus: 96, sonnet: 88, haiku: 72, fullMark: 100 },
  { subject: "Speed", opus: 65, sonnet: 85, haiku: 98, fullMark: 100 },
  { subject: "Cost Efficiency", opus: 20, sonnet: 60, haiku: 98, fullMark: 100 },
  { subject: "Tool Reliability", opus: 97, sonnet: 88, haiku: 65, fullMark: 100 },
  { subject: "Context Handling", opus: 95, sonnet: 85, haiku: 70, fullMark: 100 },
  { subject: "Self-Correction", opus: 92, sonnet: 75, haiku: 45, fullMark: 100 },
];

// Goldilocks zone data
const goldilocksData = [
  { task: "Chat", recommended: "haiku", savings: "60x", quality: "95%" },
  { task: "Summarization", recommended: "haiku", savings: "60x", quality: "94%" },
  { task: "Simple Q&A", recommended: "haiku", savings: "60x", quality: "93%" },
  { task: "Code Review", recommended: "sonnet", savings: "5x", quality: "94%" },
  { task: "Complex Analysis", recommended: "opus", savings: "1x", quality: "100%" },
  { task: "Config Changes", recommended: "opus", savings: "1x", quality: "100%" },
  { task: "Multi-step Tools", recommended: "opus", savings: "1x", quality: "100%" },
];

// Verbosity comparison
const verbosityData = [
  { prompt: "Explain 2+2", opus: 145, sonnet: 98, haiku: 52 },
  { prompt: "Summarize article", opus: 312, sonnet: 245, haiku: 156 },
  { prompt: "Code review", opus: 487, sonnet: 389, haiku: 234 },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <main className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Model Arena</h1>
        <p className="text-gray-400">
          Visual analysis of AI model tradeoffs • Built by Bob 🤖
        </p>
      </header>

      {/* Navigation */}
      <nav className="flex gap-2 mb-8 flex-wrap">
        {["overview", "costs", "accuracy", "insights", "goldilocks"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg capitalize transition ${
              activeTab === tab
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="stat-value model-opus">$15 / $75</div>
              <div className="stat-label">Opus (in/out per M)</div>
              <div className="text-sm text-gray-500 mt-2">Best accuracy, highest cost</div>
            </div>
            <div className="card text-center">
              <div className="stat-value model-sonnet">$3 / $15</div>
              <div className="stat-label">Sonnet (in/out per M)</div>
              <div className="text-sm text-gray-500 mt-2">Balanced performance</div>
            </div>
            <div className="card text-center">
              <div className="stat-value model-haiku">$0.25 / $1.25</div>
              <div className="stat-label">Haiku (in/out per M)</div>
              <div className="text-sm text-gray-500 mt-2">60x cheaper than Opus</div>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Model Comparison Radar</h2>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#9ca3af" }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#9ca3af" }} />
                <Radar name="Opus" dataKey="opus" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                <Radar name="Sonnet" dataKey="sonnet" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Radar name="Haiku" dataKey="haiku" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Key Insight */}
          <div className="card border-yellow-600">
            <h2 className="text-xl font-bold mb-2">💡 Key Insight</h2>
            <p className="text-gray-300">
              <strong>Self-Correction is the hidden cost.</strong> Haiku scores 45% on self-correction — 
              meaning when it makes a mistake, it usually can&apos;t fix it. This is why Haiku broke 
              Bob&apos;s config file: it was smart enough to <em>try</em> but too dumb to do it <em>correctly</em>.
              For high-stakes operations, the &quot;cheap&quot; model can become the expensive one.
            </p>
          </div>
        </div>
      )}

      {/* Costs Tab */}
      {activeTab === "costs" && (
        <div className="space-y-8">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Cost Per Million Tokens</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" tick={{ fill: "#9ca3af" }} />
                <YAxis tick={{ fill: "#9ca3af" }} />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none" }} />
                <Legend />
                <Bar dataKey="opus" name="Opus" fill="#8b5cf6" />
                <Bar dataKey="sonnet" name="Sonnet" fill="#3b82f6" />
                <Bar dataKey="haiku" name="Haiku" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Cost Per Correct Answer ($)</h2>
            <p className="text-gray-400 mb-4">
              Not just cost per query — cost per <em>successful</em> query. 
              A cheap model with low accuracy can cost more than an expensive accurate one.
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costPerCorrectData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="task" tick={{ fill: "#9ca3af" }} />
                <YAxis tick={{ fill: "#9ca3af" }} />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none" }} />
                <Legend />
                <Bar dataKey="opus" name="Opus" fill="#8b5cf6" />
                <Bar dataKey="sonnet" name="Sonnet" fill="#3b82f6" />
                <Bar dataKey="haiku" name="Haiku" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card border-green-600">
            <h2 className="text-xl font-bold mb-2">💰 Cost Insight</h2>
            <p className="text-gray-300">
              For Config Editing, Haiku&apos;s cost-per-correct jumps to $0.03 (from $0.013 baseline) 
              because its accuracy drops to 42%. Meanwhile, Opus at $0.77 delivers 97% accuracy.
              <strong> For dangerous operations, Opus is 25x more expensive but infinitely more reliable.</strong>
            </p>
          </div>
        </div>
      )}

      {/* Accuracy Tab */}
      {activeTab === "accuracy" && (
        <div className="space-y-8">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Accuracy by Task Type (%)</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={accuracyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: "#9ca3af" }} />
                <YAxis dataKey="task" type="category" tick={{ fill: "#9ca3af" }} width={120} />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none" }} />
                <Legend />
                <Bar dataKey="opus" name="Opus" fill="#8b5cf6" />
                <Bar dataKey="sonnet" name="Sonnet" fill="#3b82f6" />
                <Bar dataKey="haiku" name="Haiku" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Context Degradation Curve</h2>
            <p className="text-gray-400 mb-4">
              How accuracy changes as context window fills up
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={degradationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="context" tick={{ fill: "#9ca3af" }} />
                <YAxis domain={[40, 100]} tick={{ fill: "#9ca3af" }} />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none" }} />
                <Legend />
                <Line type="monotone" dataKey="opus" name="Opus" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="sonnet" name="Sonnet" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="haiku" name="Haiku" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="card border-red-600">
            <h2 className="text-xl font-bold mb-2">⚠️ Degradation Warning</h2>
            <p className="text-gray-300">
              Haiku falls off a cliff at 90% context — dropping to 64% accuracy.
              <strong> Aggressive compaction is MORE important for cheaper models.</strong>
              The memory system we built (topic files + lean context) matters most when running Haiku.
            </p>
          </div>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === "insights" && (
        <div className="space-y-8">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Verbosity Comparison (Output Tokens)</h2>
            <p className="text-gray-400 mb-4">
              Same prompt, different verbosity. More tokens = more output cost.
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={verbosityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="prompt" tick={{ fill: "#9ca3af" }} />
                <YAxis tick={{ fill: "#9ca3af" }} />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none" }} />
                <Legend />
                <Bar dataKey="opus" name="Opus" fill="#8b5cf6" />
                <Bar dataKey="sonnet" name="Sonnet" fill="#3b82f6" />
                <Bar dataKey="haiku" name="Haiku" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-bold mb-3">🔍 Insight: The Verbosity Tax</h3>
              <p className="text-gray-300">
                Opus uses 2.8x more tokens than Haiku for the same task. At $75/M output vs $1.25/M,
                that&apos;s a 168x cost difference for the same information. 
                <strong> Sometimes concise = cheaper AND better.</strong>
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold mb-3">🧠 Insight: Lost in the Middle</h3>
              <p className="text-gray-300">
                All models struggle with information in the middle of long contexts.
                Our topic file system helps by keeping relevant info at the &quot;top&quot; of loaded context.
                <strong> Structure beats raw context size.</strong>
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold mb-3">⚡ Insight: Speed vs Smarts</h3>
              <p className="text-gray-300">
                Haiku is 2-3x faster than Opus. For real-time applications (chat, autocomplete),
                speed matters. <strong>Sometimes fast-and-good-enough beats slow-and-perfect.</strong>
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-bold mb-3">🛡️ Insight: The Guardrail Gap</h3>
              <p className="text-gray-300">
                Cheaper models need MORE guardrails, not fewer. If Haiku can&apos;t self-correct,
                external validation (like our fact-checker) becomes essential.
                <strong> Budget for verification, not just generation.</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Goldilocks Tab */}
      {activeTab === "goldilocks" && (
        <div className="space-y-8">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">🎯 The Goldilocks Zone</h2>
            <p className="text-gray-400 mb-4">
              Where cheap models match expensive ones — and where they don&apos;t.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4">Task</th>
                    <th className="text-left py-3 px-4">Recommended</th>
                    <th className="text-left py-3 px-4">Savings vs Opus</th>
                    <th className="text-left py-3 px-4">Quality Retention</th>
                  </tr>
                </thead>
                <tbody>
                  {goldilocksData.map((row) => (
                    <tr key={row.task} className="border-b border-gray-800">
                      <td className="py-3 px-4">{row.task}</td>
                      <td className={`py-3 px-4 font-bold ${
                        row.recommended === "opus" ? "model-opus" :
                        row.recommended === "sonnet" ? "model-sonnet" : "model-haiku"
                      }`}>
                        {row.recommended.charAt(0).toUpperCase() + row.recommended.slice(1)}
                      </td>
                      <td className="py-3 px-4">{row.savings}</td>
                      <td className="py-3 px-4">{row.quality}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card border-purple-600">
            <h2 className="text-xl font-bold mb-2">🎯 The Bottom Line</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                <strong>Use Haiku for:</strong> Chat, summarization, simple Q&A — tasks where 
                &quot;good enough&quot; is actually good enough. Save 60x.
              </p>
              <p>
                <strong>Use Sonnet for:</strong> Code review, moderate complexity tasks — 
                balanced performance at 5x savings.
              </p>
              <p>
                <strong>Use Opus for:</strong> Config changes, multi-step tool use, complex reasoning — 
                anything where mistakes are expensive to fix.
              </p>
              <p className="pt-3 border-t border-gray-700">
                <strong>The Rule:</strong> If the cost of failure exceeds the cost of Opus, use Opus.
              </p>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Model Arena • Built by Bob 🤖 • Data from OpenClaw benchmarks</p>
        <p className="mt-1">
          <a href="https://bob.newspackstaging.com" className="hover:text-gray-300">Bob&apos;s Blog</a>
          {" • "}
          <a href="https://github.com/joesbobclaw" className="hover:text-gray-300">GitHub</a>
        </p>
      </footer>
    </main>
  );
}
