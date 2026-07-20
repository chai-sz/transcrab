---
title: 'SwiftUI Is One Graph, Over 40+ Years of Engineering'
date: '2026-07-20T14:28:16.967Z'
sourceUrl: 'https://aleahim.com/blog/swiftui-is-one-graph/'
lang: source
---
I wanted to know what SwiftUI really is, not what the tutorials say it is. So I came at it from two directions that cannot collude. I measured the real framework’s behavior until it was predictable, the way you probe any black box, and I read Apple’s own patent on it, line by line. The shipping framework is the oracle. The granted patent is Apple describing its own machine. When the two agree, you are no longer guessing.


@@FIGURE_SVG_001@@


There is one more piece that matters for performance. If a recomputed value comes out equal to what it was before, propagation stops there. An unchanged value never disturbs anything downstream, so a state change that happens to produce the same result costs almost nothing.

## State and identity

Because the view struct is disposable, your `@State` cannot live inside it. It lives in persistent storage, keyed by the view’s identity. Identity is structural, meaning the view’s type and position in the tree. An explicit `id` does not override that, it pairs with it: change the identifier and the view gets a new identity at that spot, but reuse the same identifier elsewhere and the two stay distinct.

This one rule explains a lot of confusing behavior. As long as the identity is stable, your state survives every rebuild of the struct. The moment the identity changes, by changing `.id` or by removing and reinserting the view, the old state is destroyed and a fresh one is created at its default. It is also why a `List` can recycle its rows without losing their state. The state follows the identity, not the position on screen. Reorder the data and each row’s state travels with its identifier.

## Layout is a negotiation

Layout is three steps and one rule. The parent proposes a size to the child. The child chooses its own size. The parent then places the child. The rule is that the parent never forces a size on the child. A stack divides its space among its children, giving the least flexible ones their size first and sharing what is left. Text measures itself through the text engine, with kerning and the font’s own line metrics, which is why a label is exactly as wide as it needs to be.


@@FIGURE_SVG_002@@


## Animation, the beautiful part

When you change a value inside `withAnimation`, the model value jumps straight to its target. It does not crawl there. Instead the framework makes a copy of that destination, and into the copy it injects an intermediate value, interpolated for this exact instant. The view draws the copy. Your data is already at the final value. Only the presentation is in flight.

Each animation is a tiny record: a from value, a to value, a timing function, and a start time. That is all it needs.


@@FIGURE_SVG_003@@


Two lines of math carry the whole motion. The presented value is the start plus the delta, scaled by the curve $p(t)$, which runs from 0 to 1, so the data sits at the target while only the presentation moves:

v(t) \= vfrom + (vto \- vfrom) p(t)

A spring is the same machinery with the curve replaced by a damped harmonic oscillator. Released from rest, its progress curve is

p(t) \= 1 \- e\-ζ ω0 t\[cos(ωd t) + ζ ω0ωd sin(ωd t)\]

which starts at 0, sweeps past 1, and settles back to 1. That overshoot past 1 is exactly why the spring overshoots its target and then settles.

## What the patent says

US 11,042,388 B2, granted June 22, 2021, priority June 3, 2018. Inventors Jacob Xiao, Kyle Macomber, Joshua Shaffer, and John Harper, the same John Harper who created Core Animation in 2006.

![John Harper](https://aleahim.com/images/blog/swiftui-is-one-graph/john-harper.png)

*John Harper, via his GitHub.*

Hold that name. Apple the company would not exist without Steve Jobs. **The iPhone, and the whole fluid, animated, GPU-composited kingdom that grew on top of it, iOS, iPadOS, watchOS, tvOS, and visionOS, would not exist as we know it without John Harper.** The same hand drew the engine that runs underneath all of it, from Core Animation in 2006 to the very graph this post is about. SwiftUI is just the newest room in a house whose foundation he poured. **He is the John Carmack of Apple, its Linus Torvalds: the engineer whose work a billion people touch every day and whose name almost none of them know.** That is a shame, and correcting it, in my own small way, is part of why I am writing all this.

<figure data-td-mermaid=""><pre>flowchart LR
  I["Inputs, 0 to n"] --&gt; F["Function"]
  F --&gt; O["Cached output, persistent"]
  O -.-&gt;|re-run| F
</pre></figure>

As you can see in the image above, the patent lays the attribute graph out in plain words. It supports zero to n inputs, applies a function on the inputs to calculate an output, stores the output in a persistent memory structure, and whenever any input changes the function gets re-run. Affected attributes set a dirty bit, and the tree is traversed bottom up so that dirty attributes initiate an update. That is exactly what the behavior shows, down to the dirty bit and the bottom up pull, now in Apple’s own words.

It also spells out the animation record as the same four fields the behavior implies: from value, to value, animation function, start time.

<figure data-td-mermaid=""><pre>flowchart LR
  T["Destination state, your data"] --&gt; Cp["Copy"]
  Cp --&gt; Inj["Intermediate value injected"]
  Inj --&gt; Rn["Copy is rendered"]
</pre></figure>

And as the image above shows, the patent describes the method as generating a copy of the destination state and injecting an intermediate value into the copy for rendering. That is the model and presentation split you can watch the real framework perform.

I did not take any of this from the patent. The behavior and the patent are two independent witnesses, and they arrive at the same machine. When the framework you can observe and the patent Apple was granted describe the same structure, that structure is real, forced by the problem, not chosen by taste.

## One graph, one cone, drawn lazily

That is the whole of it. A single demand-driven graph. State flows down through the environment, preferences flow up from children to parents, time is just another input, the graph recomputes only what truly changed, and it hands a coalesced layer tree to Core Animation to composite. Strip away the syntax and SwiftUI is one graph, one cone, drawn lazily.

And here is the part I will only hint at. This was never really about SwiftUI. It began with Core Animation, because I wanted to understand it, and **the only way I trust to understand a thing is to build it again from nothing**. But you cannot understand Core Animation without the drawing layer beneath it, so that came next.

![The engines beneath SwiftUI, the stack I have been rebuilding](https://aleahim.com/images/blog/swiftui-is-one-graph/the-stack.jpg)

A text layer pulls you into typesetting. Transitions pull you into image processing. Each engine demanded the one below it, until the whole stack stood on its own and SwiftUI settled on top almost as an afterthought. None of it ships, and none of it is for sharing. It is mine, a way to learn the machine by rebuilding it, and it has a name: [SlayerMotion](https://slayermotion.com/).

<figure data-td-mermaid=""><pre>flowchart TD
  SUI["SwiftUI, one graph"] --&gt; CA["Core Animation, the compositor"]
  CA --&gt; CG["Core Graphics, drawing"]
  CA --&gt; CT["Core Text, typesetting"]
  CA --&gt; CI["Core Image, effects"]
</pre></figure>

**Of the five, SwiftUI interests me the least, by a wide margin.** It was not even born to be the future of the platform: it started as a way to make watchOS apps bearable to write, and only once it existed did Apple look at it and see what they had, and take it everywhere. It arrived with a quiet promise: that you could finally skip all of it, the dozen frameworks underneath, and just ship.

![What leaks through when you skip the frameworks](https://aleahim.com/images/blog/swiftui-is-one-graph/the-shortcut.jpg)

That promise was a lie. You can ship, yes, but you have not learned the platform, you have learned a facade over it, and the day something leaks through, a layout that will not behave, an animation that stutters, text that measures wrong, you are standing on a stack you never met. The people who took SwiftUI as a way around the frameworks did not become Apple developers. They became SwiftUI users, and that is a different and smaller thing.

Set beside the engines underneath it, SwiftUI is genuinely uninteresting, boring even, a thin and tidy graph that does one clever thing and then gets out of the way. The one that floored me at the start still floors me most, and I suspect always will: Core Animation, a compositor that keeps an animation running smooth on its own clock while your app is busy elsewhere. The drawing layer, the type engine, the image pipeline are close behind. That is where the hard, strange, beautiful problems live, and that is the series. **SwiftUI was just the easiest door into the story.**
