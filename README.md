# 2026 代理式編碼趨勢 · 互動報告

> 把 Anthropic《2026 Agentic Coding Trends Report》整理成一頁可互動、雙語、可深連結的純靜態網站。

本網站把 Anthropic 發布的《2026 Agentic Coding Trends Report — How coding agents are reshaping software development》重新整理成一個複合多區段的單頁網站:八大趨勢(分為「基礎 / 能力 / 影響」三類)、八個真實客戶案例、第一線引言、使用數據與年度優先事項。所有內容皆可中英文一鍵切換,並採用貼近原報告的 Claude 品牌視覺(暖陶土橘、襯線大標、各區段柔和色塊)。

---

## 🔗 線上版 / Live

| | |
|---|---|
| 🌐 網站 | <https://tingwei161803.github.io/anthropic-agentic-coding-trend-2026/> |

> 直接點進去就能用,無需安裝。可用 `https://tingwei161803.github.io/anthropic-agentic-coding-trend-2026/#<slug>` 深連結到特定趨勢(例如 `#trend-3-long-running`)。

---

## ✨ 功能特色

- 🌏 **雙語全頁切換** — 中文 / English 一鍵切換,卡片、詳情、導航、靜態文案全部跟著換,無殘留。
- 🏷️ **趨勢類別篩選** — 依「基礎 / 能力 / 影響」三類即時篩選八大趨勢卡片。
- 🧭 **區段導航 + Scrollspy** — 頂部 sticky 導航跟著捲動高亮當前區段。
- 🔎 **趨勢詳情彈窗** — 點開任一趨勢可看到完整預測清單與真實客戶案例。
- 🔢 **關鍵數據動畫** — Hero 區的統計數字捲動進畫面時 count-up。
- 🌗 **深色 / 淺色模式** — 一鍵切換,並以 `localStorage` 記住偏好。
- 🔗 **深連結** — 每個趨勢都有專屬 `#<slug>`,可直接分享。
- 📱 **響應式設計** — 手機、平板、桌機皆適配。
- ⚡ **純靜態、零 build** — 無後端、無打包工具,載入快、可離線瀏覽。

---

## 📂 內容結構 / 資料來源

本站內容整理自 **Anthropic《2026 Agentic Coding Trends Report — How coding agents are reshaping software development》**。

```
anthropic-agentic-coding-trend-2026/
├── index.html                          # 入口頁(meta / OG / JSON-LD)
├── assets/
│   ├── styles.css                      # Claude 品牌視覺 + MD3 token(淺/深色)
│   ├── app.js                          # 區段渲染、篩選、彈窗、雙語、主題
│   └── og-image.png                    # 社群分享預覽圖
├── data/
│   └── data.js                         # 資料層:SITE_META + SITE_SECTIONS(雙語)
├── 2026 Agentic Coding Trends Report.pdf  # 原始來源報告
├── .nojekyll                           # 讓 GitHub Pages 跳過 Jekyll
└── README.md
```

> ⚠️ **非官方**:本網站為個人整理之非官方資源,內容整理自上述 Anthropic 報告,
> 如有錯誤或出入,請以官方來源為準。文中數據與客戶案例皆引用自該報告。

---

## 🛠 本機使用

```bash
# 1. clone 專案
git clone git@github.com:tingwei161803/anthropic-agentic-coding-trend-2026.git
cd anthropic-agentic-coding-trend-2026

# 2a. 最簡單:直接開啟 index.html
open index.html

# 2b. 或啟動本機伺服器(建議,深連結才正常)
uv run python -m http.server 4173
# 然後瀏覽 http://localhost:4173
```

> 本專案為純靜態網站,不需安裝任何依賴。若要跑本機伺服器,一律使用 `uv`。

---

## 📝 聲明 / License

- 本站為非官方整理,內容著作權歸原始來源 Anthropic 所有;「Claude」為 Anthropic 之商標。
- 網站程式碼以 `MIT` 授權釋出。
- 如為權利人且希望調整或移除內容,請開 issue 聯絡。
