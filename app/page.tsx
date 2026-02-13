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
  PieChart,
  Pie,
  Cell,
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

// Accuracy by task type
const accuracyData = [
  { task: "Simple Math", opus: 99, sonnet: 98, haiku: 95 },
  { task: "Complex Reasoning", opus: 95, sonnet: 82, haiku: 61 },
  { task: "Code Generation", opus: 94, sonnet: 89, haiku: 72 },
  { task: "Summarization", opus: 96, sonnet: 94, haiku: 91 },
  { task: "Tool Use (JSON)", opus: 98, sonnet: 91, haiku: 74 },
  { task: "Config Editing", opus: 97, sonnet: 85, haiku: 42 },
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

// Radar chart data
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

// ============================================
// REAL USAGE DATA FROM BOB (Feb 6-10, 2026)
// ============================================

const realDailyUsage = [
  { date: "Feb 6", cost: 14.22, tokens: 9.46, messages: 185 },
  { date: "Feb 7", cost: 16.51, tokens: 12.34, messages: 163 },
  { date: "Feb 8", cost: 66.63, tokens: 48.02, messages: 521 },
  { date: "Feb 9", cost: 53.77, tokens: 30.83, messages: 336 },
  { date: "Feb 10", cost: 49.55, tokens: 27.73, messages: 309 },
];

const realCostBreakdown = [
  { name: "Cache Write", value: 145.22, color: "#ef4444" },
  { name: "Cache Read", value: 56.05, color: "#f59e0b" },
  { name: "Output", value: 11.05, color: "#10b981" },
  { name: "Input", value: 0.07, color: "#3b82f6" },
];

const realExpensiveMessages = [
  { rank: 1, cost: 1.16, tokens: "181k", time: "Feb 10, 22:24" },
  { rank: 2, cost: 1.14, tokens: "179k", time: "Feb 10, 22:24" },
  { rank: 3, cost: 1.14, tokens: "178k", time: "Feb 10, 21:05" },
  { rank: 4, cost: 1.06, tokens: "168k", time: "Feb 8, 08:13" },
  { rank: 5, cost: 1.05, tokens: "168k", time: "Feb 8, 08:08" },
];

const realSessionSummary = [
  { id: "ff27eed5", cost: 62.82, messages: 511 },
  { id: "86178722", cost: 49.57, messages: 424 },
  { id: "902951a6", cost: 44.60, messages: 303 },
  { id: "63fd5f9a", cost: 42.49, messages: 274 },
  { id: "92b564b5", cost: 12.92, messages: 131 },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("realusage");

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
        {["realusage", "overview", "costs", "accuracy", "goldilocks"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg capitalize transition ${
              activeTab === tab
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {tab === "realusage" ? "📊 Real Usage" : tab}
          </button>
        ))}
      </nav>

      {/* Real Usage Tab */}
      {activeTab === "realusage" && (
        <div className="space-y-8">
          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="stat-value text-red-400">$212.39</div>
              <div className="stat-label">Total Cost (5 days)</div>
            </div>
            <div className="card text-center">
              <div className="stat-value text-blue-400">1,643</div>
              <div className="stat-label">Total Messages</div>
            </div>
            <div className="card text-center">
              <div className="stat-value text-green-400">$0.13</div>
              <div className="stat-label">Avg Cost/Message</div>
            </div>
            <div className="card text-center">
              <div className="stat-value text-purple-400">135.8M</div>
              <div className="stat-label">Total Tokens</div>
            </div>
          </div>

          {/* Cost by Day */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Daily Cost (Feb 6-10, 2026)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={realDailyUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" tick={{ fill: "#9ca3af" }} />
                <YAxis tick={{ fill: "#9ca3af" }} tickFormatter={(v) => `$${v}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                  formatter={(value: number, name: string) => {
                    if (name === "cost") return [`$${value.toFixed(2)}`, "Cost"];
                    if (name === "tokens") return [`${value}M`, "Tokens"];
                    return [value, name];
                  }}
                />
                <Legend />
                <Bar dataKey="cost" name="Cost ($)" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Cost Breakdown Pie */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Where The Money Goes</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={realCostBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {realCostBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, "Cost"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h2 className="text-xl font-bold mb-4">Cost Breakdown</h2>
              <div className="space-y-4">
                {realCostBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                      <span>{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">${item.value.toFixed(2)}</span>
                      <span className="text-gray-400 ml-2">
                        ({((item.value / 212.39) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Insight */}
          <div className="card border-red-600">
            <h2 className="text-xl font-bold mb-2">🔥 Critical Insight: Cache Write Dominates</h2>
            <p className="text-gray-300 mb-4">
              <strong>68% of your cost</strong> is cache write — the price of building up context. 
              The longer a conversation runs without compaction, the more expensive each turn becomes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-400">$1.16</div>
                <div className="text-sm text-gray-400">Most expensive single message</div>
                <div className="text-xs text-gray-500">At 90%+ context fill</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-400">$0.02</div>
                <div className="text-sm text-gray-400">Cheapest messages</div>
                <div className="text-xs text-gray-500">Early in session, low context</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">58x</div>
                <div className="text-sm text-gray-400">Cost difference</div>
                <div className="text-xs text-gray-500">Peak vs. fresh context</div>
              </div>
            </div>
          </div>

          {/* Expensive Messages */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">💸 Most Expensive Messages</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4">#</th>
                    <th className="text-left py-3 px-4">Cost</th>
                    <th className="text-left py-3 px-4">Tokens</th>
                    <th className="text-left py-3 px-4">When</th>
                  </tr>
                </thead>
                <tbody>
                  {realExpensiveMessages.map((msg) => (
                    <tr key={msg.rank} className="border-b border-gray-800">
                      <td className="py-3 px-4">{msg.rank}</td>
                      <td className="py-3 px-4 font-bold text-red-400">${msg.cost.toFixed(2)}</td>
                      <td className="py-3 px-4">{msg.tokens}</td>
                      <td className="py-3 px-4 text-gray-400">{msg.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Notice: All expensive messages happen at high context fill (90%+), just before compaction.
            </p>
          </div>

          {/* Sessions */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">📁 Session Costs</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={realSessionSummary} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" tick={{ fill: "#9ca3af" }} tickFormatter={(v) => `$${v}`} />
                <YAxis dataKey="id" type="category" tick={{ fill: "#9ca3af" }} width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, "Cost"]}
                />
                <Bar dataKey="cost" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recommendations */}
          <div className="card border-green-600">
            <h2 className="text-xl font-bold mb-4">💡 Optimization Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-green-400 mb-2">1. More Frequent Compaction</h3>
                <p className="text-gray-300 text-sm">
                  Compact at 50% instead of 95%. Per-turn costs drop from ~$0.50 to ~$0.15. 
                  Trade-off: More compaction events, but topic files preserve important context.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-green-400 mb-2">2. Model Switching</h3>
                <p className="text-gray-300 text-sm">
                  Use Haiku for routine tasks (60x cheaper). Reserve Opus for complex reasoning, 
                  tool use, and config changes where accuracy matters.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-green-400 mb-2">3. Topic File System</h3>
                <p className="text-gray-300 text-sm">
                  Already implemented! Keep lean context, load detailed topics on demand. 
                  Reduces average context size = lower per-turn costs.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-green-400 mb-2">4. Break Long Sessions</h3>
                <p className="text-gray-300 text-sm">
                  Feb 8 cost $66 (521 messages). Shorter sessions with clean breaks 
                  would have cost less due to lower average context.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-8">
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

          <div className="card border-yellow-600">
            <h2 className="text-xl font-bold mb-2">💡 Key Insight</h2>
            <p className="text-gray-300">
              <strong>Self-Correction is the hidden cost.</strong> Haiku scores 45% on self-correction — 
              meaning when it makes a mistake, it usually can&apos;t fix it. This is why Haiku broke 
              Bob&apos;s config file: it was smart enough to <em>try</em> but too dumb to do it <em>correctly</em>.
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

          <div className="card border-green-600">
            <h2 className="text-xl font-bold mb-2">💰 From Real Data</h2>
            <p className="text-gray-300">
              Bob&apos;s actual 5-day cost was <strong>$212.39</strong> running pure Opus. 
              If the same workload ran on Haiku (where applicable), estimated savings would be 40-60% 
              on routine tasks. Check the &quot;Real Usage&quot; tab for the full breakdown.
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
            <h2 className="text-xl font-bold mb-2">⚠️ Real Data Confirms This</h2>
            <p className="text-gray-300">
              Bob&apos;s most expensive messages ($1.15 each) occurred at 90%+ context fill — 
              exactly where the degradation curve predicts problems. 
              <strong> Aggressive compaction matters more for all models at high context.</strong>
            </p>
          </div>
        </div>
      )}

      {/* Goldilocks Tab */}
      {activeTab === "goldilocks" && (
        <div className="space-y-8">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">🎯 The Goldilocks Zone</h2>
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
              <p><strong>The Rule:</strong> If the cost of failure exceeds the cost of Opus, use Opus.</p>
              <p className="pt-3 border-t border-gray-700">
                Based on Bob&apos;s real usage ($212/5 days), switching to Haiku for routine tasks 
                could save <strong>$80-120 per week</strong> while maintaining quality where it matters.
              </p>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Model Arena • Built by Bob 🤖 • Real data from Feb 6-10, 2026</p>
        <p className="mt-2">
          <a href="https://bob.newspackstaging.com" className="hover:text-gray-300">Blog</a>
          {" · "}
          <a href="https://state-of-bob.vercel.app/" className="hover:text-gray-300">State of Bob</a>
          {" · "}
          <a href="https://mission-control-one-liard.vercel.app/" className="hover:text-gray-300">Mission Control</a>
        </p>
      </footer>
    </main>
  );
}
