// Real usage data from Bob's sessions (Feb 6-10, 2026)
// Generated from OpenClaw session logs

export const usageSummary = {
  totalCost: 212.39,
  totalMessages: 1643,
  totalTokens: 135788426,
  avgCostPerMessage: 0.13,
  avgTokensPerMessage: 82676,
  dateRange: "Feb 6-10, 2026",
};

export const costBreakdown = [
  { category: "Cache Write", cost: 145.22, percent: 68.4 },
  { category: "Cache Read", cost: 56.05, percent: 26.4 },
  { category: "Output", cost: 11.05, percent: 5.2 },
  { category: "Input", cost: 0.07, percent: 0.0 },
];

export const dailyUsage = [
  { date: "Feb 6", cost: 14.22, tokens: 9456025, messages: 185 },
  { date: "Feb 7", cost: 16.51, tokens: 12338176, messages: 163 },
  { date: "Feb 8", cost: 66.63, tokens: 48022279, messages: 521 },
  { date: "Feb 9", cost: 53.77, tokens: 30833742, messages: 336 },
  { date: "Feb 10", cost: 49.55, tokens: 27726054, messages: 309 },
];

export const expensiveMessages = [
  { rank: 1, cost: 1.16, tokens: 181222, time: "Feb 10, 22:24" },
  { rank: 2, cost: 1.14, tokens: 179363, time: "Feb 10, 22:24" },
  { rank: 3, cost: 1.14, tokens: 177673, time: "Feb 10, 21:05" },
  { rank: 4, cost: 1.06, tokens: 168490, time: "Feb 8, 08:13" },
  { rank: 5, cost: 1.05, tokens: 168018, time: "Feb 8, 08:08" },
  { rank: 6, cost: 1.00, tokens: 158694, time: "Feb 8, 07:54" },
  { rank: 7, cost: 0.98, tokens: 155228, time: "Feb 8, 07:48" },
  { rank: 8, cost: 0.96, tokens: 154026, time: "Feb 8, 07:41" },
  { rank: 9, cost: 0.96, tokens: 152107, time: "Feb 8, 07:34" },
  { rank: 10, cost: 0.95, tokens: 150347, time: "Feb 10, 19:17" },
];

export const sessionSummary = [
  { id: "ff27eed5", cost: 62.82, messages: 511, tokens: 48201644 },
  { id: "86178722", cost: 49.57, messages: 424, tokens: 33760445 },
  { id: "902951a6", cost: 44.60, messages: 303, tokens: 25256299 },
  { id: "63fd5f9a", cost: 42.49, messages: 274, tokens: 23398290 },
  { id: "92b564b5", cost: 12.92, messages: 131, tokens: 5171748 },
];

// Insights derived from data
export const insights = {
  cacheWriteDominates: {
    title: "Cache Write is 68% of Cost",
    description: "Building up context (cache write) is the dominant cost. The longer the conversation without compaction, the more expensive each turn becomes.",
    recommendation: "More frequent compaction reduces per-turn costs significantly.",
  },
  peakContextExpensive: {
    title: "Peak Context = Peak Cost",
    description: "The most expensive messages ($1.15 each) happen at 90%+ context fill. These are 10x more expensive than messages early in a session.",
    recommendation: "The topic file system attacks this directly: lean context, load on demand.",
  },
  feb8Spike: {
    title: "Feb 8 Cost Spike ($66)",
    description: "Long overnight building session with sustained high context. 521 messages in one day, many at high context levels.",
    recommendation: "Break long sessions into shorter ones, or increase heartbeat compaction frequency.",
  },
};
