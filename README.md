# 全球光頻共振：業力轉化與世界和平連結祭典

## 專案簡介

這是一個為「娜絲夏光愛聖境」設計的 Landing Page，用於推廣**全球光頻共振：業力轉化與世界和平連結祭典**活動。

此 Landing Page 採用現代化設計，具有宇宙主題的視覺效果，包含星空背景動畫、漸層色彩、以及流暢的用戶體驗。

## 功能特色

### 🎨 設計特色
- **宇宙主題**：深色背景搭配星空動畫效果
- **漸層色彩**：紫色、金色為主的能量配色
- **響應式設計**：完美適配桌面、平板、手機
- **動畫效果**：流暢的滾動動畫與視差效果

### 📱 主要區塊
1. **Hero 區域**：震撼的首屏展示，包含活動標題與CTA
2. **為什麼是現在**：說明活動的時代意義
3. **三大核心價值**：業力轉化、提昇意識、世界和平
4. **特別邀請說明**：強調精準連結的特殊性
5. **活動內容介紹**：詳細說明祭典流程
6. **適合對象**：明確目標受眾
7. **講師介紹**：Aura 老師的專業背景
8. **緊迫感區域**：強調機會有限
9. **報名表單**：簡潔的資料收集
10. **Footer**：聯絡資訊與聲明

### ⚡ 互動功能
- 平滑滾動導航
- 表單驗證與提交
- 滾動動畫效果
- 星空視差效果
- 通知系統
- 事件追蹤（可選）

## 文件結構

```
nasixia/
├── index.html              # 主要 HTML 文件
├── styles.css              # CSS 樣式文件
├── script.js               # JavaScript 互動功能
├── google-apps-script.js   # Google Apps Script 後端代碼（可選）
├── README.md               # 專案說明文件
└── SETUP_GUIDE.md          # 詳細設置指南
```

## 使用方法

### 1. 設置報名系統 ⭐ 重要！

在使用前，請先設置報名系統。有兩種方法：

**方法 1：連結到 Google 表單（最簡單，推薦！）**
- ✅ 5 分鐘完成設置
- ✅ 完全免費
- ✅ 適合快速上線

**方法 2：使用內嵌表單 + Google Sheets**
- ✅ 更好的用戶體驗
- ✅ 資料自動存入 Google Sheets
- ✅ 可自動發送確認郵件

📖 **詳細步驟請參考：[SETUP_GUIDE.md](SETUP_GUIDE.md)**

### 2. 本地預覽

直接在瀏覽器中打開 `index.html` 文件即可預覽。

或使用本地伺服器（推薦）：

**使用 Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**使用 Node.js (http-server):**
```bash
npx http-server
```

然後在瀏覽器中訪問 `http://localhost:8000`

### 3. 部署到 GitHub Pages（推薦）

GitHub Pages 提供免費的靜態網站託管：

```bash
# 初始化 Git 儲存庫
git init
git add .
git commit -m "Initial commit"

# 推送到 GitHub（請先創建儲存庫）
git remote add origin https://github.com/你的用戶名/你的用戶名.github.io.git
git push -u origin main
```

你的網站會發布在：`https://你的用戶名.github.io`

📖 **詳細步驟請參考：[SETUP_GUIDE.md](SETUP_GUIDE.md) 的「部署到 GitHub Pages」章節**

### 4. 其他部署選項

支援的託管平台：
- ✅ **GitHub Pages**（推薦，免費）
- ✅ Netlify（免費）
- ✅ Vercel（免費）
- ✅ AWS S3
- ✅ 傳統虛擬主機

## 自訂設定

### 修改顏色主題

在 `styles.css` 文件的 `:root` 區域修改 CSS 變數：

```css
:root {
    --primary-color: #6B46C1;      /* 主要紫色 */
    --secondary-color: #D946EF;    /* 次要紫色 */
    --accent-color: #F59E0B;       /* 強調色 */
    --cosmic-gold: #FCD34D;        /* 宇宙金色 */
    /* ... 更多顏色 */
}
```

### 連接表單後端

在 `script.js` 文件中找到表單提交處理，替換為實際的 API 端點：

```javascript
// 在 registrationForm.addEventListener('submit') 中
fetch('YOUR_API_ENDPOINT', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    showNotification('報名成功！', 'success');
})
.catch(error => {
    showNotification('提交失敗，請稍後再試', 'error');
});
```

### 添加 Google Analytics

在 `index.html` 的 `</head>` 標籤前添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 添加 Facebook Pixel

在 `index.html` 的 `</head>` 標籤前添加：

```html
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

### 添加倒數計時器

如果需要顯示活動倒數，在 HTML 適當位置添加：

```html
<div id="countdown" class="countdown"></div>
```

然後在 `script.js` 中啟用：

```javascript
createCountdown(new Date('2025-12-31 23:59:59').getTime());
```

## 瀏覽器支援

- ✅ Chrome (最新版本)
- ✅ Firefox (最新版本)
- ✅ Safari (最新版本)
- ✅ Edge (最新版本)
- ⚠️ IE 11 (部分功能可能不支援)

## 效能優化建議

1. **圖片優化**：使用 WebP 格式並壓縮圖片
2. **字體優化**：考慮使用 `font-display: swap`
3. **CSS/JS 壓縮**：使用工具如 cssnano 和 UglifyJS
4. **CDN 加速**：將靜態資源放到 CDN
5. **快取策略**：設定適當的 HTTP 快取頭

## SEO 優化

已包含的 SEO 元素：
- ✅ 語義化 HTML 標籤
- ✅ Meta 描述
- ✅ 標題層級結構
- ✅ Alt 屬性（如添加圖片時請記得設置）

建議添加：
- Open Graph 標籤（社群媒體分享）
- Twitter Card
- Schema.org 結構化數據

## 聯絡資訊

**娜絲夏光愛聖境**
- Email: nasixialove@gmail.com
- Instagram: @nasixia_aura
- 網站: https://nasixialove.systeme.io/

## 授權聲明

此專案為「娜絲夏光愛聖境」專屬設計。

---

**✨ 願光與愛與你同在 ✨**

Copyright © nasixia_heaven. All Rights Reserved.
