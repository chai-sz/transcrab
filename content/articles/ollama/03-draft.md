# Ollama

> "Only Apple can do this" —— 据传出自 Tim Cook 之口

Apple 在 WWDC 2024 上推出了 [Apple Intelligence](https://www.apple.com/apple-intelligence/)。在等待了将近一年，等 Craig Federighi 所说的 *"把它做对"* 之后，其"为普通人打造的 AI"的承诺仍然遥不可及。

在我们等待 Apple Intelligence 降临设备的同时，你的 Mac 上其实已经在运行着一些了不起的东西了。把它想象成一种本地的 AI 方法论：自产自用、可持续、全年无休。

本周的 NSHipster，我们将看看如何用 Ollama 在你的 Mac 上本地运行大语言模型——既从终端用户角度，也从开发者角度。

* * *

## 什么是 Ollama？

Ollama 是在 Mac 上运行大语言模型最简单的方式。你可以把它看作是"LLM 界的 Docker"——像管理容器一样拉取、运行和管理 AI 模型。

用 [Homebrew](https://brew.sh/) 或者直接从 [官网](https://ollama.com/download) 下载 Ollama，然后拉取并运行 [llama3.2](https://ollama.com/library/llama3.2)（2GB）。

```
$ brew install --cask ollama
$ ollama run llama3.2
>>> 讲一个关于 Swift 编程的笑话。
一个 Apple 开发者最喜欢的饮料是什么？
酷爱（Kool-Aid）。
```

底层上，Ollama 由 [llama.cpp](https://github.com/ggerganov/llama.cpp) 驱动。但如果说 llama.cpp 提供了引擎，那么 Ollama 就是一辆你真正想开的车——它处理了模型管理、优化和推理的全部复杂性。

类似于 Dockerfile 定义容器镜像，Ollama 使用 Modelfile 来配置模型行为：

```
FROM mistral:latest
PARAMETER temperature 0.7
TEMPLATE """
{{- if .First }}
你是一个有用的助手。
{{- end }}

用户：{{.Prompt}}
助手："""
```

Ollama 使用 [开放容器倡议（OCI）](https://opencontainers.org/) 标准来分发模型。每个模型被拆分为多个层，并用清单（manifest）来描述——与 Docker 容器使用相同的方式：

```
{
  "mediaType": "application/vnd.oci.image.manifest.v1+json",
  "config": {
    "mediaType": "application/vnd.ollama.image.config.v1+json",
    "digest": "sha256:..."
  },
  "layers": [
    {
      "mediaType": "application/vnd.ollama.image.layer.v1+json",
      "digest": "sha256:...",
      "size": 4019248935
    }
  ]
}
```

总的来说，Ollama 的做法考虑周全、工程优良。最重要的是，*开箱即用*。

## 本地运行模型有什么大不了的？

[杰文斯悖论](https://en.wikipedia.org/wiki/Jevons_paradox)指出，当某件事变得更高效时，我们往往会使用*更多*，而不是更少。

在你的设备上拥有 AI 会改变一切。当计算基本上变成免费的，你开始以不同的方式看待智能。

虽然 GPT-4 和 Claude 这样的前沿模型毫无疑问是神迹，但本地运行开源模型这个小小的奇迹同样值得一提。

*   **隐私**：你的数据不会离开你的设备。处理敏感信息时至关重要。
*   **成本**：全天候运行，没有用量计费。不再像 90 年代手机话费那样吝啬提示词。只需固定的前期投入，就能获得无限的推理能力。
*   **延迟**：没有网络往返意味着更快的响应。你的 `/M\d Mac((Book( Pro| Air)?)|Mini|Studio)/` 可以轻松每秒生成几十个 token。（看你跟得上不！）
*   **控制**：没有黑箱 [RLHF](https://knowyourmeme.com/photos/2546581-shoggoth-with-smiley-face-artificial-intelligence) 或审查。AI 为你服务，而不是反过来。
*   **可靠性**：没有停机或 API 配额限制。你的 [exocortex](https://en.wiktionary.org/wiki/exocortex) 100% 在线。就像在 U 盘上装了个维基百科。

## 用 Ollama 构建 macOS 应用

Ollama 还在 11434 端口上暴露了一个 [HTTP API](https://github.com/ollama/ollama/blob/main/docs/api.md)（[leet 语](https://en.wikipedia.org/wiki/Leet)里的 llama 🦙）。这让它可以轻松地与任何编程语言或工具集成。

为此，我们创建了 [Ollama Swift 包](https://github.com/mattt/ollama-swift)，帮助开发者将 Ollama 集成到他们的应用中。

### 文本补全

使用语言模型最简单的方式就是给定提示词生成文本：

```
import Ollama

let client = Client.default
let response = try await client.generate(
    model: "llama3.2",
    prompt: "Tell me a joke about Swift programming.",
    options: ["temperature": 0.7]
)
print(response.response)
// 需要多少 Apple 工程师才能写完一个 API 的文档？
// 一个都不用——WWDC 视频就是文档。
```

### 聊天补全

对于更结构化的交互，你可以使用聊天 API 来维持包含多条消息和不同角色的对话：

```
let initialResponse = try await client.chat(
    model: "llama3.2",
    messages: [
        .system("你是一个有用的助手。"),
        .user("Apple 在哪个城市？")
    ]
)
print(initialResponse.message.content)
// Apple 的总部 Apple Park 位于加利福尼亚州的库比蒂诺（Cupertino）。
// 该公司最初成立于加利福尼亚州的洛斯阿尔托斯，后来于 1997 年搬到了库比蒂诺。

let followUp = try await client.chat(
    model: "llama3.2",
    messages: [
        .system("你是一个有用的助手。"),
        .user("Apple 在哪个城市？"),
        .assistant(initialResponse.message.content),
        .user("请用一个词总结")
    ]
)
print(followUp.message.content)
// Cupertino
```

### 生成文本嵌入

[嵌入（Embeddings）](https://en.wikipedia.org/wiki/Word_embedding) 将文本转换为捕捉语义高维向量。这些向量可用于查找相似内容或进行语义搜索。

例如，如果你想查找与用户查询相似的文档：

```
let documents: [String] = …

// 将文本转换为可比较相似度的向量
let embeddings = try await client.embeddings(
    model: "nomic-embed-text", 
    texts: documents
)

/// 查找相关文档
func findRelevantDocuments(
    for query: String, 
    threshold: Float = 0.7, // 匹配阈值，可调
    limit: Int = 5
) async throws -> [String] {
    // 获取查询的嵌入
    let [queryEmbedding] = try await client.embeddings(
        model: "llama3.2",
        texts: [query]
    )
 
    // 参见：https://en.wikipedia.org/wiki/Cosine_similarity
    func cosineSimilarity(_ a: [Float], _ b: [Float]) -> Float {
        let dotProduct = zip(a, b).map(*).reduce(0, +)
        let magnitude = { sqrt($0.map { $0 * $0 }.reduce(0, +)) }
        return dotProduct / (magnitude(a) * magnitude(b))
    }
    
    // 查找超过相似度阈值的文档
    let rankedDocuments = zip(embeddings, documents)
        .map { embedding, document in
            (similarity: cosineSimilarity(embedding, queryEmbedding),
             document: document)
        }
        .filter { $0.similarity >= threshold }
        .sorted { $0.similarity > $1.similarity }
        .prefix(limit)
    
    return rankedDocuments.map(\.document)
}
```

### 构建 RAG 系统

嵌入在与文本生成结合的 RAG（检索增强生成）工作流中才能真正大放异彩。我们不再要求模型从训练数据中生成信息，而是将回答基于我们自己的文档：

1.  将文档转换为嵌入
2.  根据查询找出相关文档
3.  将这些文档作为生成的上下文

下面是一个简单示例：

```
let query = "AAPL 在 2024 年第三季度的收益如何？"
let relevantDocs = try await findRelevantDocuments(query: query)
let context = """
    请使用以下文档来回答问题。
    如果答案不在文档中，请如实说明。
    
    文档：
    \(relevantDocs.joined(separator: "\n---\n"))
    
    问题：\(query)
    """

let response = try await client.generate(
    model: "llama3.2",
    prompt: context
)
```

* * *

总结一下：不同的模型有不同的能力。

*   像 [llama3.2](https://ollama.com/library/llama3.2) 和 [deepseek-r1](https://ollama.com/library/deepseek-r1) 这样的模型可以生成文本。
    *   有些文本模型有"base"或"instruct"变体，分别适用于微调或聊天补全。
    *   有些文本模型经过调优以支持[工具使用](https://ollama.com/blog/tool-support)，可以执行更复杂的任务并与外部世界交互。
*   像 [llama3.2-vision](https://ollama.com/library/llama3.2-vision) 这样的模型可以同时接收图像和文本作为输入。
*   像 [nomic-embed-text](https://ollama.com/library/nomic-embed-text) 这样的模型创建捕捉语义的数值向量。

有了 Ollama，你可以无限访问这些以及更多开源语言模型的丰富资源。

* * *

那么，用这些你能构建什么呢？这里举一个例子：

### Nominate.app

[Nominate](https://github.com/nshipster/nominate) 是一款 macOS 应用，它使用 Ollama 根据 PDF 文件的内容智能地重命名文件。

和许多追求无纸化生活的人一样，你可能发现自己扫描的文档最终以 `Scan2025-02-03_123456.pdf` 这种神秘名称命名。Nominate 通过将 AI 与传统 NLP 技术相结合，根据文档内容自动生成描述性的文件名来解决这个问题。

该应用利用了我们在本文中讨论的几种技术：

*   通过 `ollama-swift` 包调用 Ollama 的 API 进行内容分析
*   Apple 的 PDFKit 进行 OCR
*   Natural Language 框架进行文本处理
*   Foundation 的 `DateFormatter` 解析日期

## 展望未来

> "未来已经来临——只是分布得还不均匀而已。"——William Gibson

想想这些时间线：

*   Apple Intelligence 是去年发布的。
*   Swift 是 10 年前发布的。
*   SwiftUI 是 6 年前。

如果你等着 Apple 兑现它的承诺，**你将会错过一代人中最重大的技术变革**。

未来已经到来。你不需要等待。有了 Ollama，你*现在*就可以开始构建下一波 AI 驱动的应用。
