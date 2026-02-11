# Model Arena

Visual analysis of AI model tradeoffs: cost, accuracy, speed, context.

## Live
https://model-arena.vercel.app (pending deployment)

## Metrics Tracked

### Standard (What you asked for)
- **Cost** — $/million tokens (input & output), cost per task
- **Accuracy** — Correctness on benchmark tasks
- **Speed** — Time to first token, total response time
- **Context size** — Max tokens, effective utilization

### Insights (What you didn't ask for)

1. **Token Efficiency**
   - Verbosity ratio: How many tokens to say the same thing?
   - Some models are 2x more verbose = 2x output cost for same info

2. **Cost Per Correct Answer**
   - Not just cost per query — cost per *successful* query
   - A $0.10 model with 50% accuracy costs more than $0.50 model with 100%

3. **Degradation Curves**
   - How does accuracy change as context fills up?
   - Some models fall off a cliff at 80% context

4. **The Goldilocks Zone**
   - Task categories where cheap models match expensive ones
   - Where you're overpaying for Opus when Haiku would do

5. **Error Recovery**
   - When wrong, can the model correct itself?
   - Cheaper models often can't recognize their mistakes

6. **Tool Reliability**
   - JSON formatting accuracy
   - Parameter correctness
   - The Haiku-breaks-config phenomenon

7. **Context Utilization**
   - Does the model actually USE all its context?
   - Or does it "forget" stuff in the middle? (lost in the middle problem)

8. **Break-Even Analysis**
   - At what accuracy threshold is Opus worth 50x Haiku?
   - Task-specific ROI calculations

## Tech Stack
- Next.js 14
- Tailwind CSS
- Recharts for visualization
- Vercel deployment

## Data Sources
- Live API benchmarks (run from dashboard)
- Historical logs from OpenClaw sessions
- Synthetic test suites
