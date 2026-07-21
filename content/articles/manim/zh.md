---
title: Manim
date: '2026-07-21T13:01:02.706Z'
sourceUrl: 'https://nshipster.com/manim/'
lang: zh
---
几年以前，一位来自日本的化学老师、Twitter 用户 [@38mo1](https://x.com/38mo1/) 发了一张 [万圣节 × 布尔逻辑梗图](https://x.com/38mo1/status/1320004943542009857)，我特别喜欢，就存到了 `~/Downloads` 里。从那以后，每年 10 月 1 号我都会设一个提醒，打开那张图乐一乐 🎃

最近，我想教孩子一些高级蟒蛇数学（[说来话长](https://www.youtube.com/watch?v=ysaIAwxl7fc) 🐍），然后想起 [3blue1brown](https://www.youtube.com/c/3blue1brown) 用来做视频的软件是开源的。

说来说去，今年万圣节，NSHipster 打算扮演一位大家喜爱的 YouTuber。学得像吗？

*不错吧？* 制作那段视频用到的所有东西都[放在 GitHub 上](https://github.com/nshipster/trick-xor-treat)。继续往下读，看看怎么开始做你的下一个超棒讲解视频。

* * *

回到 2015 年，Grant Sanderson 在一场黑客马拉松上想练练 Python 技能，结果捣鼓出了一套"非常粗糙的代码，用来把函数可视化为变换"——这个好玩的实验后来成了 3Blue1Brown YouTube 频道（如今拥有 650 多万订阅者）和 Manim 本身的基石。

## 0 到 1

Manim 以安装困难著称。一部分原因在于它的用户群体扩展到了自称非程序员的人。另一部分是制作动态图形本身固有的复杂性。而且用 Python 写也没帮上什么忙（不过 `uv` 基本解决了所有你能想到的抱怨）。

Docker 几乎就是为解决 Python 应用与系统依赖打包问题而生的，所以完全可以直接甩手不管，[用 Docker 运行 Manim](https://docs.manim.community/en/stable/installation/docker.html)：

```python
$ docker run --rm -it -v "/full/path/to/your/directory:/manim" manimcommunity/manim manim -qm scene.py MySceneName
```

……但这感觉像是在放弃。

再说了，一旦你跑起来了，有个正经的 Python 开发环境你会感激的。跟着我，我保证一切都会好的（拉钩 🤙）。

### 2025 年 macOS 上 Manim 的偏执配置指南

先把准备工作做好：

```python
# 安装 mise
$ brew install mise

# 安装 Python 和 uv
$ mise use -g [email protected] uv@latest
```

*   [Homebrew](https://brew.sh/) 是 macOS 的包管理器。它是安装 Manim 所需的系统依赖的最佳方式。
*   [Mise](https://mise.jdx.dev/) 是一个多语言工具管理器。虽然你也可以用 Homebrew 安装 Python，但跨项目工作时常常需要同时保留几个版本，所以我们在这里推荐用它。
*   [uv](https://docs.astral.sh/uv/) 是一个 Python 包管理器。它快得惊人，而且 *开箱即用™*。

现在，创建项目并安顿下来：

```python
# 创建一个新项目
$ uv init my-explainer

$ cd my-explainer
# 用你喜欢的编辑器打开
```

接下来，安装 Manim 的系统依赖：

```python
# 安装 Manim 依赖
$ brew install pkg-config cairo   # 用于图形渲染
$ brew install --cask mactex-no-gui # 用于 ƒοrmυℓαѕ
$ brew install sox                # 用于配音
```

*   [Cairo](https://www.cairographics.org/) 是一个 2D 图形库。你需要 `pkg-config` 来让 Pycairo 绑定正常工作。
*   [MacTex](https://www.tug.org/mactex/) 是 macOS 的 LaTeX 发行版。要想做出像模像样的数学讲解和漂亮的公式，少不了它。我们推荐下载 `mactex-no-gui`，它去掉了完整版中附带的 GUI 应用。
*   [SoX](https://sourceforge.net/projects/sox/) 是一个音频格式转换工具。Manim 提供了还算不错的配音支持，你需要 SoX 来发挥这个功能。

最后，做个健康检查，看看一切是否顺利：

```python
# 一切正常吗？（🫣）
$ uv run manim checkhealth
```

*搞定！*

## 搭建场景

Manim API [功能丰富且文档完善](https://docs.manim.community/en/stable/tutorials_guides.html)，还有[大量的示例集](https://docs.manim.community/en/stable/examples.html)。这里我们不试图解释所有内容，而是看一个具体的例子，了解它的大致工作方式。

这是一个独立的「Trick XOR Treat」场景：

```python
from manim import *


class TrickXORTreat(Scene):
    def construct(self):
        # 面板背景
        panel_bg = RoundedRectangle(width=7, height=5, corner_radius=0.2).set_fill(
            GREY, opacity=1
        )

        # 标题
        title = Text("Trick XOR Treat").scale(0.8)
        title.move_to(panel_bg.get_top() + DOWN * 0.4)

        # 韦恩图的两个圆
        c1 = Circle(radius=1.4, color=BLACK).move_to(LEFT * 0.8)
        c2 = Circle(radius=1.4, color=BLACK).move_to(RIGHT * 0.8)

        # 为 XOR（异或）创建独立的填充形状
        left_only = Difference(c1, c2).set_fill(ORANGE, opacity=0)
        right_only = Difference(c2, c1).set_fill(ORANGE, opacity=0)
        center = Intersection(c1, c2).set_fill(GREY, opacity=0)  # XOR 排除中心重叠

        # 在左右两部分创建笑脸
        face = VGroup()
        # 左边笑脸
        left_eye = Circle(radius=0.2, color=BLACK, fill_opacity=1)
        left_eye.move_to(left_only.get_center() + UL * 0.3)
        left_mouth = ParametricFunction(
            lambda t: [t, 0.15 * np.sin(t * PI * 5), 0], t_range=[-0.3, 0.3]
        ).set_stroke(color=BLACK, width=8)
        left_mouth.move_to(left_only.get_center() + DOWN * 0.2)
        # 右边笑脸
        right_eye = Circle(radius=0.2, color=BLACK, fill_opacity=1)
        right_eye.move_to(right_only.get_center() + UR * 0.3)
        right_mouth = ParametricFunction(
            lambda t: [t, 0.15 * np.sin(t * PI * 5), 0], t_range=[-0.3, 0.3]
        ).set_stroke(color=BLACK, width=8)
        right_mouth.move_to(right_only.get_center() + DOWN * 0.2)
        face.add(left_eye, left_mouth, right_eye, right_mouth)

        # 组合所有元素
        panel = VGroup(
            panel_bg,
            left_only,
            right_only,
            center,
            VGroup(c1, c2),  # 圆形轮廓
            title,
            face,
        )
        panel.move_to(ORIGIN)

        # 用平滑缩放动画显示面板
        self.play(FadeIn(panel_bg, scale=1.1), Write(title, run_time=1.2), run_time=1.0)

        # 依次绘制圆形
        self.play(Create(c1, run_time=1.0))
        self.wait(0.5)
        self.play(Create(c2, run_time=1.0))
        self.wait(0.5)

        # 带平滑速率函数的戏剧性填充动画
        self.play(
            left_only.animate.set_fill(ORANGE, opacity=1),
            run_time=1.2,
            rate_func=smooth,
        )
        self.wait(0.5)

        self.play(
            right_only.animate.set_fill(ORANGE, opacity=1),
            run_time=1.2,
            rate_func=smooth,
        )
        self.wait(0.5)

        # 笑脸以弹跳效果出现在填充之上
        self.play(FadeIn(face, shift=UP * 0.3, scale=0.8), run_time=0.8)

        # 最后停顿
        self.wait(1.5)
```

Manim API 是令人耳目一新的过程式风格——如果你问我，这跟 SwiftUI 的声明式风格相比，真是种不错的调剂。你创建对象，定位它们，然后明确告诉它们做什么。`.animate` 语法为变换提供了一些语法糖，但本质上，这是命令式编程的精髓。

## 进入开发循环

我们的示例项目包含一个 Mise 任务，用于快速预览场景。它以低[分辨率](https://www.youtube.com/watch?v=1unkluyh2Ks)（480p）和低[帧率](https://www.youtube.com/watch?v=DyqjTZHRdRs)（15 fps）运行 Manim，然后在 QuickTime Player 中打开生成的文件。

```python
$ mise run preview
```

项目还有一个 `render` 任务，当你准备好分享时使用：

```python
$ mise run render
```

如果一切正常，你会看到类似这样的效果：

## （配音）

没有一个 3blue1brown 的讲解视频能缺少其创作者那圆润的男中音。可惜 Sanderson 先生另有要事，没法来参加我们的化装舞会，所以我们得自己想办法。让我们把恐怖指数拉满，让一个人工智能……鬼魂？好像也行？来为我们的片子配音。

[ElevenLabs](https://elevenlabs.io/) 有一些好得吓人的文本转语音模型。虽然 `manim-voiceover` 提供了集成支持，但目前它在 Python 3.13 上有点小脾气，且不支持最新的 [v3 模型](https://elevenlabs.io/v3) 来实现超逼真配音。

首先，从 `manim_voiceover`（`_fixed`）导入，并将场景改为继承 `VoiceoverScene`。

```python
from manim_voiceover_fixed import VoiceoverScene
from manim_voiceover_fixed.services.elevenlabs import ElevenLabsService

class TrickXORTreat(VoiceoverScene):
    def construct(self):
        self.set_speech_service(
            ElevenLabsService(
                voice_name="Liam",
                model="eleven_v3",
                transcription_model=None,  # <-- 临时绕过 https://github.com/ManimCommunity/manim-voiceover/issues/114
            )
        )

        with self.voiceover(
            text="""[annoyingly high-pitch nasal pedantic] Well, actually,
                    it's an exclusive or, also known as XOR..."""
        ):
            # 这个 wait() 会自动等待配音结束！
            self.wait()
```

上下文管理器内的 `wait()` 会一直等到配音播放完毕——不再需要手动计时。对于录制好的配音尤其如此，这能大幅减少后期调整节奏的时间。事实上，开头那个成品视频完全是 Manim 渲染的——没有在 Final Cut 或 Premiere 里做过任何修补！

第一次运行这段代码时，Manim 会贴心地（尽管出人意料地）提示你输入 API token，你可以在[你的账户面板](https://elevenlabs.io/app/developers)获取。token 会保存到 [`.env` 文件](https://nshipster.com/1password-cli/)中，之后就一劳永逸了。

* * *

最好的讲解视频不只是传授知识，它们激发好奇心、带来愉悦，让复杂的概念变得平易近人。这正是当初吸引我关注 3blue1brown 的原因，也是为什么这么多年来我一直把那张愚蠢的梗图留在 Downloads 文件夹里。

所以，如果你的 `~/Downloads` 文件夹里也压着一张梗图，或者只是想过过 Python 技能的瘾，也许今年万圣节 *你也可以* 扮演一个数学 YouTuber。这套行头是开源的，而且说实话——穿上还挺好看的。
