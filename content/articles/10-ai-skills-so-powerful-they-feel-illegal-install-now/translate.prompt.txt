你是一个翻译助手。请把下面的 Markdown 内容翻译成简体中文。
[TransCrab Translation Profile]
- mode: auto
- audience: general
- style: conversational
- auto-resolved-mode: refined
- auto-resolved-audience: general
- auto-resolved-style: conversational
- auto-reasons: 公开发布默认使用 refined 流程，优先质量与稳定性；生活叙事关键词命中较高，判定为 life
- pipeline: analyze -> translate -> review -> revise
- 执行策略：自动判断（auto）。
- 发布流程固定按 refined 质量标准执行。
- 你需要根据主题（technology/business/life）自动选择最合适的翻译风格与语气。
要求：
- 保留 Markdown 结构（标题/列表/引用/表格/链接）。
- 代码块、命令、URL、文件路径保持原样，不要翻译。
- 若正文中出现形如 @@FIGURE_SVG_001@@ 的占位符，必须原样保留（不要改写、不要删除、不要移动）。
- **必须同时翻译标题**：请先输出一行 Markdown 一级标题（以 "# " 开头），作为译文标题。
- 然后空一行，再输出译文正文（不要再重复标题）。
- 只输出翻译结果本身，不要附加解释、不要加前后缀。
---
## The complete playbook for installing, deploying, and refining the 10 most powerful AI skills on the market.

These skills work in Hermes, Codex, Claude Code, and any other AI harness you could think of.

Over the past year, I've shared dozens of AI skills on this page and I've personally spent hours researching, testing, and running 50+ agentic skills.

This article is my list of the top 10 skills that have delivered genuine value to my AI workflows.

No slop, just pure alpha, and honestly, most of these skills probably should have been paywalled.

Be sure to bookmark this now so you don't lose this list!

Shoutout to all the creators and contributors for these skills

Contents

l: How To Install Each Skill

ll: AI Skills #10-#1

lll: How to Refine These Skills

## How To Install Each Skill

Before I reveal the top 10 skills list, there are two primary methods of installation I recommend:

1. Terminal Command
Each skill includes a terminal command you can paste into your AI harness to install it instantly.

To verify installation for each, type /skill (or a similar command) depending on your AI harness.

In the skills list below, I'll include the exact command for each.

2.     Prompting

This is my personal preferred method, and the fastest way to get up and running if you're not deep in the terminal.

With each skill, you can simply tell your AI agent to install it for you by including the GitHub link to the respective skill.

Example Prompt

The agent handles the entire end-to-end installation process (super simple).

For each skill, I've attached the direct GitHub link which you can send to your agent for easy Instillation.

With that out of the way, let's dive into the 10 AI skills you should be running (updated July 2026):

## #10: /loopy

![](https://pbs.twimg.com/media/HNMoo59aMAEDKk2.jpg)

Most prompts ask an agent to do something once. Loopy gives your agent the ability to learn from the result and take the next useful step, turning a one-shot instruction into a repeatable, self-improving workflow.

It's two things in one: a public library of ready-made agent loops you can browse and copy, and an installable skill that gives your agent guided access to that library.

What it does:

- Discover: Scans your codebase or coding history for repeated work and turns the strongest candidates into loops
- Find: Recommends published loops that fit your task
- Loop Doctor: Audits existing loops
- Adapt: Tailors any published loop to your personal workflows
(and much more)

Install:

Claude Code:

Codex:

Example prompts:

/loopy Find a loop for [what you want to do]
/loopy Interview me and help me craft a loop for [goal]
/loopy Audit this loop and repair only material problems: [paste loop]

## #9: Claude-Video

![](https://pbs.twimg.com/media/HNMoo6BbQAAMs2F.jpg)

Even with this skill in my #9 spot, it's one of my top picks, and it only recently came on my radar.

This skill enables Claude Code to "watch" videos.

How It Works

→ Downloads from YouTube, Instagram, X, Vimeo, TikTok, Loom, and 1,800+ other sites via yt-dlp

→ Extracts frames intelligently based on video length:

→ Pulls a timestamped transcript from native captions for free

→ Handles blurry, flipped, or noisy frames using bash and crop tools automatically

→ Cleans up temp files when you're done

Install

Claude Code (manual):

Codex:

## #8: /last30days

![](https://pbs.twimg.com/media/HNMoo6BacAA06R3.jpg)

This skill is for all marketers, social media managers, and even those trying to grow their own social media presence.

This AI skill searches trending social platforms (Reddit, X, YouTube, Hacker News, Polymarket, GitHub, TikTok, Instagram) and the broader web simultaneously, ranks everything by upvotes, likes, and real money, and synthesizes them into a single grounded brief.

What makes it different from web search:

TL;DR: Find out what's trending on the web in seconds

Install:

All harnesses (Codex, Cursor, Gemini CLI, and 50+ others):

Use case examples

- /last30days What is the current sentiment on physical AI and robotics stocks?
- /last30days what are people saying about Claude Fable 5 right now?
- /last30days what content formats are performing best on X this month?
## #7: Kill AI Slop

![](https://pbs.twimg.com/media/HNMoo58bYAAwRAb.png)

This skill kills all signs of AI slop in text.

The 8 categories it targets:

- Banned phrases
- Structural clichés
- Passive voice
- Wh- sentence starters
- Em dashes
- Vague declaratives
- Narrator-from-a-distance voice
- Rhythm patterns
All harnesses:

Prompting this skill:

"Apply stop-slop rules to this text: [paste text]."

## #6: GOG (Google Workspace CLI)

![](https://pbs.twimg.com/media/HNMoo5-aUAAiQ-u.jpg)

A skill that installs Google Workspace CLI in OpenClaw.

What it covers

- Gmail
- Calendar
- Drive
- Sheets
- Docs
- Contacts
OpenClaw Command

## #5: Unslop UI

![](https://pbs.twimg.com/media/HNMoo6MbMAA51lA.jpg)

This skill is trained on thousands of "AI slop" datapoints.

Comments from real Redditors, social media comments & more.

![](https://pbs.twimg.com/media/HNMoo6HagAA4qZ-.jpg)

It removes slop by targeting the typical AI slop patterns - purple/colorful icons, blocky logos, etc.

It has two modes

Build mode: You write what the design should be before any code gets generated.

Audit mode: Runs the standalone scanner against an existing codebase.

Claude Code Command

## #4: Shannon Pentester

![](https://pbs.twimg.com/media/HNMoo6WbsAAc5SU.jpg)

Every single vibe-coder should install this.

Shannon is a fully autonomous, white-box AI pentester for web apps and APIs. It actively probes your codebases for possible security vulnerabilities, attack vectors and security threats.

Installation is extremely easy

## #3: Security Unbroker

![](https://pbs.twimg.com/media/HNMoo6ZbkAAwRHT.jpg)

Unbroker is a Hermes-native skill that automates the entire process of removing your personal identifiable information from the web.

It scans the broker registry, identifies where your data appears, submits opt-out requests, verifies the removals, schedules re-checks, and reports back.

The parts that require a human, hard CAPTCHAs, government ID verification, or phone calls, get escalated to a human task queue. Everything else runs hands-off.

What it does:

- Scans data brokers and people-search sites in parallel
- Submits opt-out requests autonomously
- Prioritizes cluster-parent deletions
- Schedules re-checks automatically
- Produces a full removal ledger and audit report
- Manages multiple people independently (so you can run it for family members or clients, each isolated)
Hermes install

## #2: /improve

![](https://pbs.twimg.com/media/HNMoo6faEAA0itI.jpg)

/improve reads your entire codebase, identifies the highest-value improvements, and writes plans to improve your projects.

The four commands:

- /improve: full codebase audit, writes all plans
- /improve execute <plan>: dispatches a cheaper model to implement
- /improve branch: scoped audit
- /improve reconcile: verifies what landed
Install:

Claude Code:

All harnesses:

## #1: Taste Skill

![](https://pbs.twimg.com/media/HNMoo6yasAA8DUS.jpg)

This "Taste" skill is an anti-slop AI frontend framework.

Feed it to your Hermes agent, Claude Code, or Codex to get rid of generic AI slop.

Works for: Design skills, image generation, web/mobile app UI/UX & more.

It comes with seven variants:

- design-taste-frontend: the core skill, covers everything
- redesign-audit: upgrading existing projects
- soft-ui: glass effects
- minimalist: Notion and Linear-style interfaces
- brutalist: Swiss typography, raw structure, sharper contrast
- no-lazy: blocks placeholder comments, skipped sections, half-finished outputs
- image-to-code: generates reference frames first, analyzes them, then implements
Install for all harnesses:

## How To Refine These Skills

Installing a skill is step one.

The real value comes from refining it over time until it fits exactly how you work. Here's how to do that (general frameworks):

Iteration loops

Every skill gets better through the same cycle:

Run it → give feedback → update the file → run it again

After any skill run that produces output you're not happy with, you should open the SKILL.md file and add a rule.

Example

"Hermes, I need you to update my taste skill with no blue color palettes - it looks like slop."

There are two primary ways that I like to refine my skills:

1. Use /skill creator (Claude Code)

The fastest way to improve an existing skill. Open a Claude Code session after a run you want to improve and type:

/skill creator

Then, give it the skill file and your feedback.

2. Run a dedicated refinement loop

For skills you use constantly, set up a loop that improves the skill automatically based on your feedback:

/loop after every run of [skill name], ask me for feedback, update the SKILL.md with any new rules I give, and keep a changelog of every change made to the file.

Now every time you use the skill and flag something, the improvement is written in permanently instead of getting lost.

Note: It's also a good strategy to edit your skill files manually or attach them in a tool like Cowork to easily access them & update them at anytime.

## Closing Thoughts

I hope you found my list of the top 10 AI skills valuable.

If you did, be sure to follow me here @aiedge_ - every single week I post AI articles to help you get the edge in AI.

If you enjoy written content about AI, feel free to subscribe to my free newsletter. We send you weekly breakdowns of the latest AI news, practical guides, tips & more:

https://newsletter.aiedgehq.co/

![](https://pbs.twimg.com/media/HNMoo7LagAAtvHD.jpg)

100% free, no spam ever & unsub anytime!

Thanks for reading💙
