/* =========================================================================
   data/data.js — content layer for the 2026 Agentic Coding Trends site.

   Plain globals, no modules, loaded BEFORE assets/app.js.
   Source: Anthropic, "2026 Agentic Coding Trends Report — How coding agents
   are reshaping software development." This is an UNOFFICIAL interactive
   reorganization of that report's content for easier browsing.

   Every human-facing string is a { en, zh } object. List fields are
   { en: [...], zh: [...] } with matching length/order. app.js reads:
     window.SITE_META      -> page title / subtitle
     window.SITE_SECTIONS  -> ordered, typed section blocks (rendered in order)
   ========================================================================= */

window.SITE_META = {
  title:    { en: "2026 Agentic Coding Trends", zh: "2026 代理式編碼趨勢" },
  subtitle: { en: "How coding agents are reshaping software development",
              zh: "編碼代理正如何重塑軟體開發" }
};

window.SITE_SECTIONS = [

  /* ---------------------------------------------------------------- HERO */
  {
    type: "hero",
    id: "overview",
    title:    { en: "2026 Agentic Coding Trends",
                zh: "2026 代理式編碼趨勢" },
    subtitle: { en: "In 2025, coding agents moved from experimental tools to production systems shipping real features. This report distils Anthropic’s eight predictions for how that shift reshapes software development in 2026 — across foundation, capability, and impact.",
                zh: "2025 年,編碼代理從實驗性工具走向能交付真實功能的生產系統。本報告整理 Anthropic 對 2026 年的八項預測,從「基礎」「能力」到「影響」三大面向,呈現這場轉變將如何重塑軟體開發。" },
    stats: [
      { value: 8,  label: { en: "Key trends", zh: "項關鍵趨勢" } },
      { value: 60, suffix: "%", label: { en: "Of developer work uses AI", zh: "開發者工作用到 AI" } },
      { value: 27, suffix: "%", label: { en: "Of AI-assisted work is net-new", zh: "AI 輔助工作屬全新增量" } },
      { display: { en: "0–20%", zh: "0–20%" }, label: { en: "Of tasks fully delegated", zh: "任務真正完全委派" } }
    ]
  },

  /* ------------------------------------------------------------ FOREWORD */
  {
    type: "prose",
    id: "foreword",
    title:    { en: "Foreword — from assistance to collaboration",
                zh: "前言 — 從輔助走向協作" },
    subtitle: { en: "What changed in 2025, and the collaborative reality underneath the gains.",
                zh: "2025 年發生了什麼改變,以及這些成果背後真實的協作樣貌。" },
    blocks: [
      { type: "p", text: { en: "In 2025, coding agents moved from experimental tools to production systems that ship real features to real customers. Engineering teams discovered that AI can handle entire implementation workflows: writing tests, debugging failures, generating documentation, and navigating increasingly complex codebases.",
                            zh: "2025 年,編碼代理從實驗性工具,轉變為能向真實客戶交付真實功能的生產系統。工程團隊發現 AI 已能處理完整的實作流程:撰寫測試、除錯、產生文件,並在日益複雜的程式庫中穿梭自如。" } },
      { type: "p", text: { en: "In 2026, we expect single agents to become coordinated teams. Tasks that took hours or days may now complete with minimal human intervention — and engineers who once wrote every line of code will increasingly orchestrate long-running systems of agents so they can focus on architecture and strategy.",
                            zh: "2026 年,我們預期單一代理將演化為協同團隊。過去需要數小時、甚至數天的任務,如今可在極少人為介入下完成;曾經逐行撰寫程式的工程師,將愈來愈多地去協調長時間運作的代理系統,把心力放在架構與策略上。" } },
      { type: "p", text: { en: "Yet a critical nuance has emerged: this transformation is fundamentally collaborative. Anthropic’s Societal Impacts research finds that while developers use AI in roughly 60% of their work, they report being able to “fully delegate” only 0–20% of tasks. AI is a constant collaborator — using it well still requires thoughtful set-up, active supervision, validation, and human judgment, especially for high-stakes work.",
                            zh: "但其中浮現了一個關鍵細節:這場轉變本質上是「協作」。Anthropic 的「社會影響」研究發現,雖然開發者在約 60% 的工作中使用 AI,卻僅能在 0–20% 的任務上「完全委派」。AI 是恆常在側的協作者——要用得好,仍需要縝密的設定、主動監督、驗證與人類判斷,在高風險工作上尤其如此。" } },
      { type: "h3", text: { en: "Three categories of trends", zh: "三大類趨勢" } },
      { type: "ul", items: {
          en: [
            "Foundation trends — the tectonic shift we believe will reshape how development work happens.",
            "Capability trends — what we expect agents to be able to accomplish.",
            "Impact trends — what we anticipate will affect business outcomes and organizational structures."
          ],
          zh: [
            "基礎趨勢(Foundation)——我們認為將重塑開發工作方式的地殼級轉變。",
            "能力趨勢(Capability)——我們預期代理將能達成的事。",
            "影響趨勢(Impact)——我們預期將牽動商業成果與組織結構的變化。"
          ] } },
      { type: "p", text: { en: "The gap between early adopters and late movers is widening. Software development is evolving toward a model where human expertise focuses on defining the problems worth solving, while AI handles the tactical work of implementation. Let’s dive in.",
                            zh: "早期採用者與後進者之間的差距正在拉大。軟體開發正朝向一種新模式演進:人類專業聚焦於「定義值得解決的問題」,而 AI 負責實作層面的戰術工作。讓我們開始吧。" } }
    ]
  },

  /* ---------------------------------------------------- THE EIGHT TRENDS */
  {
    type: "cards",
    id: "trends",
    title:    { en: "The eight trends", zh: "八大趨勢" },
    subtitle: { en: "Filter by category, then tap any trend for its predictions and a real customer example.",
                zh: "依類別篩選,點開任一趨勢可看到其預測與真實客戶案例。" },
    filters: [
      { key: "foundation", label: { en: "Foundation", zh: "基礎" } },
      { key: "capability", label: { en: "Capability", zh: "能力" } },
      { key: "impact",     label: { en: "Impact",     zh: "影響" } }
    ],
    items: [
      {
        slug: "trend-1-sdlc",
        group: "foundation",
        title:   { en: "Trend 1 · The software development lifecycle changes dramatically",
                   zh: "趨勢 1 · 軟體開發生命週期劇烈改變" },
        summary: { en: "Agent-driven implementation, automated testing, and inline docs collapse SDLC cycle time from weeks to hours.",
                   zh: "代理驅動的實作、自動化測試與即時文件,將開發生命週期的循環時間從數週壓縮到數小時。" },
        tags: ["lifecycle", "orchestration", "onboarding"],
        overview: { en: "Interacting with computers is undergoing its biggest change since the GUI. 2026 is poised to be the year the systemic effects of agentic coding reconfigure the software development lifecycle and reshape engineering roles — the engineer shifts from implementer to orchestrator. Crucially, engineers are becoming more “full-stack”: AI fills knowledge gaps across frontend, backend, databases, and infrastructure while humans provide oversight and direction.",
                     zh: "人與電腦的互動,正經歷自圖形介面以來最大的改變。2026 年很可能成為「代理式編碼的系統性效應重新配置開發生命週期、並重塑工程角色」的一年——工程師將從「實作者」轉變為「協調者」。關鍵在於,工程師正變得更「全端」:AI 在前端、後端、資料庫與基礎設施之間補足知識缺口,而人類負責監督與指引。" },
        predictions: {
          en: [
            "Evolution of abstraction: most tactical writing, debugging, and maintaining of code shifts to AI while engineers focus on architecture, system design, and strategic decisions about what to build.",
            "Engineering role transformation: being a software engineer increasingly means orchestrating agents — evaluating output, providing direction, and ensuring the system solves the right problems.",
            "Expedited onboarding: timelines to ramp onto a new codebase collapse from weeks to hours, changing how companies think about talent deployment and project resourcing."
          ],
          zh: [
            "抽象層的演進:大部分撰寫、除錯與維護程式的戰術性工作交給 AI,工程師則專注於架構、系統設計,以及「該打造什麼」的策略決策。",
            "工程角色的轉變:當一名軟體工程師,愈來愈意味著「協調代理」——評估產出、給予方向,並確保整個系統解決的是對的問題。",
            "上手速度大幅加快:熟悉一個新程式庫的時間,從數週縮短到數小時,改變了企業對人才調度與專案資源配置的思考方式。"
          ]
        },
        inPractice: {
          company: "Augment Code",
          text: { en: "A startup building AI-powered tools for systems like networking platforms and storage infrastructure flattened the learning curve for engineers joining a new codebase by using Claude for deep contextual code understanding. One enterprise customer finished a project their CTO had estimated would take 4–8 months in just two weeks.",
                  zh: "一家為網路平台、儲存基礎設施等系統打造 AI 工具的新創公司,透過 Claude 提供的深度脈絡理解,大幅降低工程師熟悉新程式庫的門檻。一位企業客戶,把 CTO 原本估計要 4–8 個月的專案,在短短兩週內完成。" }
        }
      },
      {
        slug: "trend-2-coordinated-teams",
        group: "capability",
        title:   { en: "Trend 2 · Single agents evolve into coordinated teams",
                   zh: "趨勢 2 · 單一代理演化為協同團隊" },
        summary: { en: "Orchestrator-led multi-agent systems decompose tasks across specialized agents working in parallel, then synthesize the results.",
                   zh: "由協調者主導的多代理系統,將任務拆解給平行運作的專責代理,再把結果整合起來。" },
        tags: ["multi-agent", "orchestration", "parallelism"],
        overview: { en: "Organizations in 2026 will harness multiple agents acting together to handle complexity that was hard to imagine a year ago. A single-agent workflow processes tasks sequentially through one context window; a hierarchical architecture uses an orchestrator to coordinate specialized agents — each with dedicated context — then synthesizes their work into integrated output.",
                     zh: "2026 年,組織將能驅動多個代理協同運作,處理一年前難以想像的複雜度。單一代理工作流以單一脈絡窗循序處理任務;階層式架構則由一個「協調者」統籌各專責代理——每個代理擁有專屬脈絡——再把它們的成果整合為一體。" },
        predictions: {
          en: [
            "Multi-agent systems replace single-agent workflows: organizations adopt multi-agent workflows that maximize performance gains through parallel reasoning across separate context windows.",
            "New skills emerge in task decomposition, agent specialization, and coordination — alongside dev environments that show the status of concurrent agent sessions and version control for simultaneous agent-generated contributions."
          ],
          zh: [
            "多代理系統取代單一代理工作流:組織採用多代理工作流,透過跨脈絡窗的平行推理,把效能增益推到最大。",
            "任務拆解、代理專業化與協調等新技能隨之出現——同時也需要能顯示多個並行代理工作階段狀態的開發環境,以及能處理多代理同時產出貢獻的版本控制。"
          ]
        },
        inPractice: {
          company: "Fountain",
          text: { en: "A frontline workforce management platform achieved 50% faster screening, 40% quicker onboarding, and 2× candidate conversions using Claude for hierarchical multi-agent orchestration. Fountain Copilot coordinates specialized sub-agents for screening, document generation, and sentiment analysis — letting one logistics customer cut the time to fully staff a new fulfillment center from one or more weeks to under 72 hours.",
                  zh: "一個第一線人力管理平台,以 Claude 進行階層式多代理協調,達成篩選速度快 50%、入職流程快 40%、應徵者轉換率 2 倍的成果。其 Fountain Copilot 作為中央協調代理,統籌篩選、文件生成與情緒分析等專責子代理——讓一家物流客戶把「為新履約中心配齊人力」的時間,從一週以上縮短到 72 小時以內。" }
        }
      },
      {
        slug: "trend-3-long-running",
        group: "capability",
        title:   { en: "Trend 3 · Long-running agents build complete systems",
                   zh: "趨勢 3 · 長時運作的代理打造完整系統" },
        summary: { en: "Task horizons expand from minutes to days or weeks — agents plan, iterate, recover from failures, and build entire applications with periodic human checkpoints.",
                   zh: "任務時間跨度從數分鐘擴展到數天、甚至數週——代理會規劃、迭代、從失敗中復原,並在人類定期檢查點下打造完整應用。" },
        tags: ["autonomy", "task-horizon", "technical-debt"],
        overview: { en: "Early agents handled one-shot tasks of a few minutes: fix this bug, write this function, generate this test. By late 2025, agents produced full feature sets over the course of several hours. In 2026, agents will work for days at a time, building and testing entire applications with minimal intervention focused on strategic oversight at key decision points.",
                     zh: "早期的代理只處理幾分鐘內的一次性任務:修這個 bug、寫這個函式、產生這個測試。到 2025 年底,代理已能在數小時內產出完整的功能集。2026 年,代理將能連續工作數天,在人類僅於關鍵決策點提供策略性監督的情況下,打造並測試完整的應用。" },
        predictions: {
          en: [
            "Task horizons expand from minutes to days or weeks: agents evolve from discrete tasks that complete in minutes to working autonomously for extended periods.",
            "Agents handle the messy reality of software development: planning, iterating, and refining across dozens of work sessions, recovering from failures, and maintaining coherent state throughout complex projects.",
            "Economics change: formerly non-viable projects become feasible, and technical debt that accumulated for years gets systematically eliminated by agents working through backlogs.",
            "Path to market accelerates: entrepreneurs use agents to go from idea to deployed application in days instead of months."
          ],
          zh: [
            "任務跨度從分鐘擴展到數天或數週:代理從「幾分鐘完成的離散任務」演化為「長時間自主運作」。",
            "代理能處理軟體開發的混亂現實:跨數十個工作階段規劃、迭代與打磨,從失敗中復原,並在複雜專案全程維持一致的狀態。",
            "經濟模型改變:過去不可行的專案變得可行;多年累積、因沒人有時間處理而堆積的技術債,被代理在待辦清單中系統性地清除。",
            "上市路徑加速:創業者用代理把點子變成已部署的應用,從數個月縮短到數天。"
          ]
        },
        inPractice: {
          company: "Rakuten",
          text: { en: "Engineers tested Claude Code on a complex task: implement a specific activation-vector extraction method in vLLM — a massive open-source library with 12.5 million lines of code — across multiple programming languages. Claude Code finished the entire job in seven hours of autonomous work in a single run, achieving 99.9% numerical accuracy compared to the reference method.",
                  zh: "工程師以一項複雜任務測試 Claude Code:在 vLLM(一個擁有 1,250 萬行程式碼的大型開源函式庫)中,以多種程式語言實作特定的激活向量擷取方法。Claude Code 在單次執行中,以七小時的自主工作完成了整件任務,並達到與參考方法相比 99.9% 的數值準確度。" }
        }
      },
      {
        slug: "trend-4-human-oversight",
        group: "capability",
        title:   { en: "Trend 4 · Human oversight scales through intelligent collaboration",
                   zh: "趨勢 4 · 人類監督透過智慧協作而擴展" },
        summary: { en: "Oversight shifts from reviewing everything to reviewing what matters — agents flag uncertainty and elevate high-impact decisions to humans.",
                   zh: "監督的重心,從「檢視一切」轉為「檢視重點」——代理會標記不確定之處,並把高影響的決策交還給人。" },
        tags: ["human-in-the-loop", "quality-control", "review"],
        overview: { en: "Perhaps the most valuable capability of 2026 is agents learning when to ask for help, with humans stepping into the loop only when required. This isn’t about removing humans — it’s about making human attention count where it matters most. Even as AI capabilities expand, the human role remains central: the shift is from writing code to reviewing, directing, and validating it.",
                     zh: "2026 年也許最有價值的能力,是代理學會「何時該求助」,讓人類只在必要時介入。這不是要把人從流程中移除,而是要讓人的注意力用在最關鍵之處。即使 AI 能力擴張,人的角色依然居中:重心從「寫程式」轉為「審查、指引與驗證程式」。" },
        predictions: {
          en: [
            "Agentic quality control becomes standard: AI agents review large-scale AI-generated output for security vulnerabilities, architectural consistency, and quality issues that would overwhelm human capacity.",
            "Agents learn when to ask for help: rather than blindly attempting every task, sophisticated agents recognize situations requiring human judgment and elevate decisions with potential business impact.",
            "Oversight shifts from reviewing everything to reviewing what matters: teams maintain quality and velocity by handling routine verification automatically while escalating genuinely novel situations, boundary cases, and strategic decisions."
          ],
          zh: [
            "代理式品質控管成為標準:AI 代理檢視大規模的 AI 產出,找出會壓垮人力的安全漏洞、架構一致性問題與品質問題。",
            "代理學會何時求助:成熟的代理不再盲目嘗試每件任務,而能辨識出需要人類判斷的情境,並把具潛在商業影響的決策往上呈報。",
            "監督從「審查一切」轉為「審查重點」:團隊讓例行驗證自動進行,把真正新穎的情境、邊界案例與策略決策交給人,藉此同時維持品質與速度。"
          ]
        },
        inPractice: {
          company: "CRED",
          text: { en: "A fintech platform serving over 15 million users across India implemented Claude Code across its entire development lifecycle to accelerate delivery while maintaining the quality standards essential for financial services. The Claude-powered system has doubled their execution speed — not by eliminating human involvement, but by shifting developers toward higher-value work.",
                  zh: "一個服務印度逾 1,500 萬用戶的金融科技平台,在整個開發生命週期導入 Claude Code,在維持金融服務必備的品質標準下加速交付。這套以 Claude 驅動的系統讓他們的執行速度翻倍——靠的不是移除人類參與,而是把開發者推向更高價值的工作。" }
        }
      },
      {
        slug: "trend-5-new-surfaces",
        group: "capability",
        title:   { en: "Trend 5 · Agentic coding expands to new surfaces and users",
                   zh: "趨勢 5 · 代理式編碼擴展到新場景與新使用者" },
        summary: { en: "From legacy languages like COBOL and Fortran to non-developers in security, ops, design, and data — coding reaches contexts traditional tools could not.",
                   zh: "從 COBOL、Fortran 等老舊語言,到資安、維運、設計、資料領域的非開發者——編碼觸及了傳統工具到不了的場景。" },
        tags: ["democratization", "legacy-languages", "form-factors"],
        overview: { en: "The earliest wave of agentic coding helped professional engineers work faster in familiar environments. In 2026, it expands into contexts and use cases traditional tools could not reach — from legacy languages to new form factors that democratize access beyond traditional developers. The barrier separating “people who code” from “people who don’t” is becoming more permeable: everyone becomes more full-stack.",
                     zh: "代理式編碼最早的浪潮,讓專業工程師在熟悉的環境中更快工作。2026 年,它擴展到傳統工具到不了的場景與用例——從老舊語言,到讓「傳統開發者以外的人」也能使用的新型態介面。「會寫程式的人」與「不會寫程式的人」之間的那道牆,正變得愈來愈可穿透:每個人都變得更全端。" },
        predictions: {
          en: [
            "Language barriers disappear: support expands to less-common and legacy languages like COBOL and Fortran, enabling maintenance of legacy systems and removing adoption barriers for specialized use cases.",
            "Coding democratizes beyond engineering: new form factors and interfaces open agentic coding to non-traditional developers in fields like cybersecurity, operations, design, and data science — tools like Cowork, built for non-developers to automate file and task management, signal this shift is already underway."
          ],
          zh: [
            "語言藩籬消失:支援擴展到 COBOL、Fortran 等較冷門與老舊的語言,讓老舊系統得以維護,並移除特殊用例的採用門檻。",
            "編碼民主化、跨出工程之外:新型態介面讓資安、維運、設計、資料科學等領域的非傳統開發者也能使用代理式編碼——像 Cowork 這類為非開發者打造、用來自動化檔案與任務管理的工具,正顯示這股轉變已然展開。"
          ]
        },
        inPractice: {
          company: "Legora",
          text: { en: "An AI-powered legal platform integrates agentic workflows throughout its product, showing how coding agents extend into domain-specific applications. “We have found Claude to be brilliant at instruction following, and at building agents and agentic workflows,” said CEO Max Junestrand. Legora uses Claude Code to accelerate its own development while giving lawyers agentic capabilities without engineering expertise.",
                  zh: "一個 AI 驅動的法律平台,在整個產品中整合代理式工作流,展現了編碼代理如何延伸到特定領域應用。執行長 Max Junestrand 表示:「我們發現 Claude 在遵循指示、以及建構代理與代理式工作流方面都極為出色。」Legora 用 Claude Code 加速自家開發,同時讓不具工程背景的律師也能擁有代理能力。" }
        }
      },
      {
        slug: "trend-6-economics",
        group: "impact",
        title:   { en: "Trend 6 · Productivity gains reshape software development economics",
                   zh: "趨勢 6 · 生產力增益重塑軟體開發經濟學" },
        summary: { en: "Timeline compression changes which projects are viable; productivity comes from greater output volume, not just speed.",
                   zh: "時程壓縮改變了「哪些專案值得做」;生產力來自更高的產出量,而不只是更快的速度。" },
        tags: ["economics", "output-volume", "ROI"],
        overview: { en: "Organizations that intelligently integrate agents will see timeline compression that affects what projects are viable and how quickly they can respond to market opportunities. Internal research reveals an interesting pattern: engineers report a net decrease in time per task, but a much larger net increase in output volume. Productivity comes primarily through greater output — more features shipped, more bugs fixed, more experiments run — rather than simply doing the same work faster. About 27% of AI-assisted work is net-new: scaling projects and exploratory work that wouldn’t be cost-effective if done manually.",
                     zh: "聰明整合代理的組織,將看到時程被壓縮,進而影響「哪些專案可行」以及「能多快回應市場機會」。內部研究揭露一個有趣的型態:工程師回報「每項任務的時間」淨減少,但「產出量」的淨增加更為顯著。生產力主要來自更高的產出——交付更多功能、修復更多 bug、跑更多實驗——而不只是用同樣的方式做得更快。約 27% 的 AI 輔助工作屬於全新增量:那些若靠人工就不符成本效益的擴展型專案與探索性工作。" },
        predictions: {
          en: [
            "Three multipliers drive acceleration: agent capabilities, orchestration improvements, and better use of human experience compound into step-function gains rather than linear ones.",
            "Timeline compression changes project viability: development that once took weeks now takes days, making previously unviable projects feasible and enabling faster response to market opportunities.",
            "Economics of software development shift: total cost of ownership decreases as agents augment engineer capacity, project timelines shorten, and faster time-to-value improves return on investment."
          ],
          zh: [
            "三個乘數驅動加速:代理能力、協調機制的改善,以及對人類經驗更好的運用,彼此複合成「階梯式」而非「線性」的增益。",
            "時程壓縮改變專案可行性:過去要數週的開發如今只要數天,讓原本不可行的專案變得可行,也讓回應市場機會更為迅速。",
            "軟體開發經濟學位移:代理擴充了工程產能、專案時程縮短、價值實現更快,使整體擁有成本下降、投資報酬提升。"
          ]
        },
        inPractice: {
          company: "TELUS",
          text: { en: "A leading communications technology company, where teams created over 13,000 custom AI solutions while shipping engineering code 30% faster. The company has saved over 500,000 hours, with an average of 40 minutes saved per AI interaction. Notably, much of this is “papercut” work — minor quality-of-life fixes that are typically deprioritized but become feasible when AI makes addressing them cheap.",
                  zh: "一家領先的通訊科技公司,其團隊打造了超過 13,000 個客製 AI 解決方案,同時讓工程程式碼交付速度提升 30%。公司已省下逾 50 萬小時,平均每次 AI 互動節省 40 分鐘。值得注意的是,其中許多是「紙割傷」型的工作——那些通常被排到後面、卻在 AI 讓處理成本大降後變得值得做的小幅體驗改善。" }
        }
      },
      {
        slug: "trend-7-non-technical",
        group: "impact",
        title:   { en: "Trend 7 · Non-technical use cases expand across organizations",
                   zh: "趨勢 7 · 非技術用例在組織內全面擴散" },
        summary: { en: "Sales, marketing, legal, and operations teams build their own tools and automate workflows with little or no engineering intervention.",
                   zh: "銷售、行銷、法務、營運團隊在幾乎不需工程介入的情況下,自行打造工具、自動化流程。" },
        tags: ["business-teams", "automation", "self-service"],
        overview: { en: "One of the most significant trends of 2026 is steady growth in agentic coding by functional and business-process teams creating their own solutions to problems they experience, and improving processes they use every day. Domain experts who understand problems deeply gain the confidence to initiate solutions themselves — removing the bottleneck of filing a ticket and waiting for a development team.",
                     zh: "2026 年最重要的趨勢之一,是功能性與業務流程團隊穩定地增加使用代理式編碼,自行為親身遇到的問題打造解法,並改善每天在用的流程。深刻理解問題的領域專家,獲得了「自己動手做解法」的信心——移除了「開單、然後等開發團隊」的瓶頸。" },
        predictions: {
          en: [
            "Coding capabilities democratize beyond engineering: non-technical teams across sales, marketing, legal, and operations gain the ability to automate workflows and build tools with little or no coding expertise.",
            "Domain experts implement solutions directly: the hands-on experts who understand problems deeply gain confidence to initiate solutions themselves.",
            "Productivity gains extend across entire organizations: problems not worth engineering time get solved, experimental workflows become trivial to attempt, and manual processes get automated."
          ],
          zh: [
            "編碼能力跨出工程、走向民主化:銷售、行銷、法務、營運等非技術團隊,在幾乎不需編碼專業的情況下,也能自動化流程、打造工具。",
            "領域專家直接落實解法:那些對問題最熟悉的第一線專家,有了自行啟動解法的信心。",
            "生產力增益擴及整個組織:不值得花工程時間的問題被解掉、實驗性流程變得輕而易舉、人工流程被自動化。"
          ]
        },
        inPractice: {
          company: "Zapier",
          text: { en: "A leading AI orchestration platform made agents accessible to all employees. Design teams use Claude artifacts to rapidly prototype concepts in real-time during customer interviews — showing in minutes what would normally take weeks. Zapier reached 89% AI adoption across the entire organization, with 800-plus AI agents deployed internally. (Separately, Anthropic’s own legal team cut contract-review turnaround from two-to-three days to 24 hours with Claude-powered workflows.)",
                  zh: "一個領先的 AI 協調平台,讓全體員工都能使用代理。設計團隊在客戶訪談現場,用 Claude artifacts 即時快速打造概念原型——幾分鐘就能展示原本要數週才做得出來的東西。Zapier 在全組織達到 89% 的 AI 採用率,內部部署了 800 多個 AI 代理。(另外,Anthropic 自家的法務團隊也以 Claude 驅動的工作流,把合約審查的周轉時間從 2–3 天縮短到 24 小時。)" }
        }
      },
      {
        slug: "trend-8-security",
        group: "impact",
        title:   { en: "Trend 8 · Agentic coding improves security — but also offensive uses",
                   zh: "趨勢 8 · 代理式編碼強化防禦,但也賦能攻擊" },
        summary: { en: "Dual-use risk demands security-first architecture: the same capabilities that help defenders also help attackers scale.",
                   zh: "雙用途風險要求「安全優先」的架構:幫助防禦者的能力,同樣會幫助攻擊者擴大規模。" },
        tags: ["security", "dual-use", "defense"],
        overview: { en: "Agentic coding is transforming security in two directions at once. As models become more powerful and better aligned, building security into products gets easier — any engineer can leverage AI to perform security reviews, hardening, and monitoring that previously required specialized expertise. But the same capabilities that help defenders also help attackers scale their efforts. The balance favors prepared organizations: teams that bake security in from the start will be better positioned to defend against adversaries using the same technology.",
                     zh: "代理式編碼正同時朝兩個方向改變資安。隨著模型更強大、對齊更佳,把安全性內建到產品裡變得更容易——任何工程師都能借助 AI 進行過去需要專門專業的資安審查、強化與監控。但幫助防禦者的能力,同樣會幫助攻擊者擴大規模。天平偏向有準備的組織:從一開始就把安全內建進去的團隊,將更有本錢抵禦使用相同技術的對手。" },
        predictions: {
          en: [
            "Security knowledge becomes democratized: with improved agents, any engineer can deliver in-depth security reviews, hardening, and monitoring. Engineers still consult specialists, but it gets easier to build hardened, secure applications.",
            "Threat actors scale attacks: agents benefit offensive uses too, making it more important for engineers to build in security from the start.",
            "Agentic cyber defense systems rise: automated agentic systems enable security responses at machine speed, automating detection and response to match the pace of autonomous threats."
          ],
          zh: [
            "資安知識民主化:有了更強的代理,任何工程師都能進行深入的資安審查、強化與監控。工程師仍會諮詢專家,但打造強固、安全的應用變得更容易。",
            "威脅行為者擴大攻擊:代理同樣有利於攻擊用途,使得工程師「從一開始就內建安全」更形重要。",
            "代理式資安防禦系統崛起:自動化的代理系統能以機器速度回應,自動化偵測與反應,以跟上自主威脅的步調。"
          ]
        }
      }
    ]
  },

  /* ----------------------------------------------------- EVOLUTION TIMELINE */
  {
    type: "timeline",
    id: "evolution",
    accent: "blue",
    title:    { en: "The expanding task horizon", zh: "不斷擴張的任務時間跨度" },
    subtitle: { en: "How far an agent can run on its own has stretched from minutes to weeks.",
                zh: "代理能「自己跑多遠」,已經從數分鐘延展到數週。" },
    events: [
      { date: { en: "Before 2025", zh: "2025 年之前" },
        title: { en: "One-shot tasks · minutes", zh: "一次性任務 · 數分鐘" },
        body:  { en: "Early agents handled discrete tasks at most a few minutes long: fix this bug, write this function, generate this test.",
                 zh: "早期代理處理的是頂多幾分鐘的離散任務:修這個 bug、寫這個函式、產生這個測試。" } },
      { date: { en: "Late 2025", zh: "2025 年下半" },
        title: { en: "Full feature sets · hours", zh: "完整功能集 · 數小時" },
        body:  { en: "Increasingly adept agents produced full feature sets over the course of several hours of work.",
                 zh: "愈來愈純熟的代理,能在數小時的工作中產出完整的功能集。" } },
      { date: { en: "2026 (predicted)", zh: "2026 年(預測)" },
        title: { en: "Entire applications · days to weeks", zh: "完整應用 · 數天到數週" },
        body:  { en: "Agents work for days at a time, building and testing entire applications and systems with periodic human checkpoints for strategic oversight.",
                 zh: "代理能連續工作數天,在人類定期於檢查點提供策略監督下,打造並測試完整的應用與系統。" } }
    ]
  },

  /* --------------------------------------------------- CUSTOMER CASE STUDIES */
  {
    type: "cards",
    id: "customers",
    title:    { en: "Proof in production", zh: "生產環境中的實證" },
    subtitle: { en: "Real organizations already shipping with agentic coding. Tap a card for the full story.",
                zh: "已經用代理式編碼交付成果的真實組織。點開卡片看完整故事。" },
    items: [
      { slug: "case-augment", title: { en: "Augment Code", zh: "Augment Code" },
        summary: { en: "A 4–8 month project, finished in two weeks.", zh: "原估 4–8 個月的專案,兩週完成。" },
        tags: ["dev tools", "onboarding"],
        overview: { en: "A startup building AI-powered software development tools used Claude to flatten the learning curve for engineers joining a new codebase, providing deep contextual understanding. One enterprise customer finished a project their CTO had initially estimated would take 4–8 months in just two weeks.",
                    zh: "一家打造 AI 軟體開發工具的新創公司,用 Claude 提供深度脈絡理解,大幅降低工程師熟悉新程式庫的門檻。一位企業客戶把 CTO 原估 4–8 個月的專案,在短短兩週內完成。" } },
      { slug: "case-fountain", title: { en: "Fountain", zh: "Fountain" },
        summary: { en: "50% faster screening · 2× conversions · staffing in <72h.", zh: "篩選快 50% · 轉換 2 倍 · 配齊人力 <72 小時。" },
        tags: ["multi-agent", "HR tech"],
        overview: { en: "A frontline workforce management platform achieved 50% faster screening, 40% quicker onboarding, and 2× candidate conversions using Claude for hierarchical multi-agent orchestration. Fountain Copilot coordinates specialized sub-agents — letting one logistics customer fully staff a new fulfillment center in under 72 hours instead of one or more weeks.",
                    zh: "一個第一線人力管理平台,以 Claude 進行階層式多代理協調,達成篩選快 50%、入職快 40%、應徵者轉換率 2 倍。Fountain Copilot 統籌各專責子代理——讓一家物流客戶把「為新履約中心配齊人力」從一週以上縮短到 72 小時內。" } },
      { slug: "case-rakuten", title: { en: "Rakuten", zh: "樂天 Rakuten" },
        summary: { en: "7 hours autonomous on a 12.5M-line codebase · 99.9% accuracy.", zh: "在 1,250 萬行程式庫上自主 7 小時 · 99.9% 準確度。" },
        tags: ["long-running", "open source"],
        overview: { en: "Engineers tested Claude Code on a complex task: implement an activation-vector extraction method in vLLM — a 12.5-million-line open-source library — across multiple languages. Claude Code finished the entire job in seven hours of autonomous work in a single run, achieving 99.9% numerical accuracy versus the reference method.",
                    zh: "工程師以複雜任務測試 Claude Code:在 vLLM(1,250 萬行的開源函式庫)中,以多種語言實作激活向量擷取方法。Claude Code 在單次執行中以七小時自主工作完成整件任務,達到與參考方法相比 99.9% 的數值準確度。" } },
      { slug: "case-cred", title: { en: "CRED", zh: "CRED" },
        summary: { en: "2× execution speed across a fintech serving 15M+ users.", zh: "服務逾 1,500 萬用戶的金融科技,執行速度翻倍。" },
        tags: ["fintech", "velocity"],
        overview: { en: "A fintech platform serving over 15 million users across India implemented Claude Code across its entire development lifecycle, doubling execution speed while maintaining the quality standards essential for financial services — not by eliminating human involvement, but by shifting developers toward higher-value work.",
                    zh: "一個服務印度逾 1,500 萬用戶的金融科技平台,在整個開發生命週期導入 Claude Code,在維持金融服務必備品質標準下讓執行速度翻倍——靠的不是移除人類參與,而是把開發者推向更高價值的工作。" } },
      { slug: "case-legora", title: { en: "Legora", zh: "Legora" },
        summary: { en: "Agentic workflows put in lawyers’ hands — no engineering needed.", zh: "把代理式工作流交到律師手上——無需工程能力。" },
        tags: ["legal tech", "domain-specific"],
        overview: { en: "An AI-powered legal platform integrates agentic workflows throughout its product. “We have found Claude to be brilliant at instruction following, and at building agents and agentic workflows,” said CEO Max Junestrand. Legora uses Claude Code to accelerate its own development while providing agentic capabilities to lawyers who need to create sophisticated automations without engineering expertise.",
                    zh: "一個 AI 驅動的法律平台,在整個產品中整合代理式工作流。執行長 Max Junestrand 表示:「我們發現 Claude 在遵循指示、以及建構代理與代理式工作流方面都極為出色。」Legora 用 Claude Code 加速自家開發,同時讓需要建立精密自動化、卻不具工程背景的律師也能擁有代理能力。" } },
      { slug: "case-telus", title: { en: "TELUS", zh: "TELUS" },
        summary: { en: "13,000+ custom AI solutions · 500,000+ hours saved.", zh: "13,000+ 個客製 AI 解法 · 省下逾 50 萬小時。" },
        tags: ["telecom", "org-wide"],
        overview: { en: "A leading communications technology company whose teams created over 13,000 custom AI solutions while shipping engineering code 30% faster. The company has saved over 500,000 hours, averaging 40 minutes saved per AI interaction — much of it “papercut” work that improves quality of life but is typically deprioritized.",
                    zh: "一家領先的通訊科技公司,其團隊打造逾 13,000 個客製 AI 解法,同時讓工程程式碼交付快 30%。公司已省下逾 50 萬小時,平均每次 AI 互動省下 40 分鐘——其中許多是改善體驗、卻通常被排到後面的「紙割傷」型工作。" } },
      { slug: "case-zapier", title: { en: "Zapier", zh: "Zapier" },
        summary: { en: "89% AI adoption org-wide · 800+ internal agents.", zh: "全組織 89% AI 採用率 · 800+ 內部代理。" },
        tags: ["automation", "non-technical"],
        overview: { en: "A leading AI orchestration platform made agents accessible to all employees. Design teams use Claude artifacts to rapidly prototype concepts in real-time during customer interviews, showing in minutes what would normally take weeks. Zapier achieved 89% AI adoption across the entire organization, with 800-plus AI agents deployed internally.",
                    zh: "一個領先的 AI 協調平台,讓全體員工都能使用代理。設計團隊在客戶訪談現場用 Claude artifacts 即時打造原型,幾分鐘展示原本要數週的成果。Zapier 在全組織達到 89% AI 採用率,內部部署 800 多個 AI 代理。" } },
      { slug: "case-anthropic-legal", title: { en: "Anthropic — Legal", zh: "Anthropic — 法務" },
        summary: { en: "Contract review turnaround: 2–3 days → 24 hours.", zh: "合約審查周轉:2–3 天 → 24 小時。" },
        tags: ["internal", "legal"],
        overview: { en: "Anthropic’s own legal team reduced contract-review turnaround from two-to-three days down to 24 hours by building Claude-powered workflows that automate repetitive tasks like contract redlining and content review. Using Claude Code, a lawyer with no coding experience built self-service tools that triage issues before they hit the legal queue — freeing attorneys to focus on strategic counsel instead of tactical busywork.",
                    zh: "Anthropic 自家的法務團隊,透過打造 Claude 驅動的工作流(自動化合約紅線標註、內容審查等重複性工作),把合約審查的周轉時間從 2–3 天縮短到 24 小時。一位毫無編碼經驗的律師,用 Claude Code 打造了自助工具,在問題進入法務佇列前先分流——讓律師得以專注於策略性法律意見,而非戰術性雜務。" } }
    ]
  },

  /* ----------------------------------------------------------------- QUOTES */
  {
    type: "quotes",
    id: "voices",
    accent: "purple",
    title:    { en: "Voices from the field", zh: "來自第一線的聲音" },
    subtitle: { en: "How practitioners describe working alongside agents.",
                zh: "實踐者如何描述與代理並肩工作。" },
    quotes: [
      { text: { en: "We have found Claude to be brilliant at instruction following, and at building agents and agentic workflows.",
                zh: "我們發現 Claude 在遵循指示、以及建構代理與代理式工作流方面都極為出色。" },
        by: "Max Junestrand · CEO, Legora" },
      { text: { en: "I’m primarily using AI in cases where I know what the answer should be or should look like. I developed that ability by doing software engineering ‘the hard way.’",
                zh: "我主要在「我知道答案應該是什麼、或應該長什麼樣」的情況下使用 AI。而那份判斷力,是我用『硬功夫』做軟體工程練出來的。" },
        by: { en: "Anthropic engineer", zh: "Anthropic 工程師" } },
      { text: { en: "Software development is evolving toward a model where human expertise focuses on defining the problems worth solving, while AI handles the tactical work of implementation.",
                zh: "軟體開發正演進為一種模式:人類專業聚焦於定義「值得解決的問題」,而 AI 負責實作層面的戰術工作。" },
        by: { en: "2026 Agentic Coding Trends Report", zh: "《2026 代理式編碼趨勢報告》" } },
      { text: { en: "The goal isn’t to remove humans from the loop — it’s to make human expertise count where it matters most.",
                zh: "目標從來不是把人移出迴圈,而是讓人類專業用在最關鍵之處。" },
        by: { en: "Priorities for the year ahead", zh: "〈未來一年的優先事項〉" } }
    ]
  },

  /* ------------------------------------------------------------------ BARS */
  {
    type: "bars",
    id: "data",
    accent: "green",
    title:    { en: "How developers actually use AI", zh: "開發者實際如何使用 AI" },
    subtitle: { en: "Share of work by mode (%). Source: Anthropic Societal Impacts research. The gap between “use” and “fully delegate” is the collaborative reality.",
                zh: "依使用模式的工作占比(%)。來源:Anthropic 社會影響研究。「使用」與「完全委派」之間的落差,正是協作的真實樣貌。" },
    series: [
      { label: { en: "Use AI",         zh: "使用 AI" },   value: 60 },
      { label: { en: "Net-new work",   zh: "全新增量" },   value: 27 },
      { label: { en: "Fully delegate", zh: "完全委派" },   value: 20 }
    ]
  },

  /* -------------------------------------------------------------- PRIORITIES */
  {
    type: "prose",
    id: "priorities",
    accent: "pink",
    title:    { en: "Priorities for the year ahead", zh: "未來一年的優先事項" },
    subtitle: { en: "Four areas that demand immediate attention in 2026.",
                zh: "2026 年需要立即著手的四個面向。" },
    blocks: [
      { type: "p", text: { en: "These eight trends converge on a central theme: software development is shifting from an activity centered on writing code to one grounded in orchestrating agents that write code — while maintaining the human judgment, oversight, and collaboration that ensure quality outcomes.",
                            zh: "這八項趨勢匯聚於一個核心主題:軟體開發正從「以寫程式為中心」的活動,轉變為「以協調寫程式的代理為基礎」的活動——同時保有確保品質的人類判斷、監督與協作。" } },
      { type: "p", text: { en: "The research is clear: AI is a constant collaborator, but using it effectively requires active supervision and validation, especially in high-stakes work. It’s not “fully delegated” but highly collaborative — and that distinction matters for how organizations approach adoption.",
                            zh: "研究很清楚:AI 是恆常在側的協作者,但要用得有效,需要主動監督與驗證,在高風險工作上尤其如此。它不是「完全委派」,而是「高度協作」——這個區別,深深影響組織該如何看待採用。" } },
      { type: "h3", text: { en: "Four areas demand immediate attention", zh: "四個需要立即關注的面向" } },
      { type: "ul", items: {
          en: [
            "Mastering multi-agent coordination to handle complexity that single-agent systems cannot address.",
            "Scaling human-agent oversight through AI-automated review systems that focus human attention where it matters most.",
            "Extending agentic coding beyond engineering to empower domain experts across departments.",
            "Embedding security architecture as part of agentic system design from the earliest stages."
          ],
          zh: [
            "精通多代理協調,處理單一代理系統無法應付的複雜度。",
            "透過 AI 自動化審查系統來擴展「人類—代理」監督,把人的注意力用在最關鍵之處。",
            "把代理式編碼延伸到工程之外,賦能各部門的領域專家。",
            "從最早期就把安全架構內建為代理系統設計的一部分。"
          ] } },
      { type: "p", text: { en: "Organizations that treat agentic coding as a strategic priority in 2026 will define what becomes possible; those that treat it as an incremental productivity tool will discover they are competing in a game with new rules. The key to success lies in understanding that the goal isn’t to remove humans from the loop — it’s to make human expertise count where it matters most.",
                            zh: "在 2026 年把代理式編碼視為「策略優先事項」的組織,將定義什麼成為可能;把它僅當成「漸進式生產力工具」的組織,則會發現自己是在用新規則玩的賽局裡競爭。成功的關鍵在於理解:目標不是把人移出迴圈,而是讓人類專業用在最關鍵之處。" } }
    ]
  },

  /* ------------------------------------------------------------------- CTA */
  {
    type: "cta",
    id: "cta",
    title: { en: "Build with Claude", zh: "用 Claude 開始打造" },
    text:  { en: "These trends describe a shift already underway. Explore how Claude and Claude Code turn agentic coding into shipped software.",
             zh: "這些趨勢描述的是一場已然展開的轉變。探索 Claude 與 Claude Code 如何把代理式編碼變成真正交付的軟體。" },
    link:  { label: { en: "Visit claude.ai", zh: "前往 claude.ai" }, url: "https://claude.ai" }
  }
];
