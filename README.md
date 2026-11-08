# 2026 代理式編碼趨勢 · 互動報告

> 把 Anthropic《2026 Agentic Coding Trends Report》整理成一頁可互動、雙語、可深連結的純靜態網站。

本網站把 Anthropic 發布的《2026 Agentic Coding Trends Report — How coding agents are reshaping software development》重新整理成一個複合多區段的單頁網站:八大趨勢(分為「基礎 / 能力 / 影響」三類)、八個真實客戶案例、第一線引言、使用數據與年度優先事項。所有內容皆可中英文一鍵切換,版面是一張國際主義風格的資料海報:大面積平塗色塊、壓窄的 Bricolage Grotesque 配 Noto Sans TC 900、嚴格的 12 欄網格與 1–7 章節編號;首屏是一條橫跨整個螢幕的長條圖,畫出「AI 參與六成工作,但完全委派只有 0–20%」這個報告的核心落差(0–20% 是範圍,所以用斜線網底表示)。頁首明示為非官方整理。

---

## 🔗 線上版 / Live

| | |
|---|---|
| 🌐 網站 | <https://anthropic-agentic-coding-trend-2026.peteraim.com/> |

> 直接點進去就能用,無需安裝。可用 `https://anthropic-agentic-coding-trend-2026.peteraim.com/#<slug>` 深連結到特定趨勢(例如 `#trend-3-long-running`)。

---

## ✨ 功能特色

- 🌏 **雙語全頁切換** — 中文 / English 一鍵切換,卡片、詳情、導航、靜態文案全部跟著換,無殘留。
- 🏷️ **趨勢依面向分組** — 八大趨勢按「基礎 / 能力 / 影響」三個面向分成三塊滿版色塊(黑 / 紅 / 粉),每塊是一份大號碼的編號索引。
- 📒 **實證案例帳本** — 八個客戶案例排成一張表:公司、關鍵數字、摘要,點任一列看完整故事。
- 🧭 **章節目錄 + Scrollspy** — 頂部 sticky 的 1–7 目錄跟著捲動高亮當前章節,下緣有閱讀進度線;手機上可橫向滑動,邊緣淡出提示還有更多。
- 🔎 **趨勢詳情彈窗** — 點開任一趨勢可看到完整預測清單與真實客戶案例。
- 📊 **委派落差圖** — Hero 的長條圖以純 CSS 畫出 60% 與 0–20% 的對比,載入時展開一次(尊重「減少動態效果」設定)。
- 🌗 **深色 / 淺色模式** — 沒選過時跟隨系統設定;手動切換後以 `localStorage` 記住偏好。
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
│   ├── styles.css                      # 版面與配色 token(淺/深色)
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
