# 🚀 快速開始指南

5 分鐘讓你的 Landing Page 上線！

---

## 📋 準備工作

你需要：
- ✅ 一個 Google 帳號
- ✅ 一個 GitHub 帳號
- ✅ 10 分鐘時間

---

## 步驟 1：創建 Google 表單（3 分鐘）

### 1.1 創建表單

1. 前往 https://forms.google.com/
2. 點擊「空白」創建新表單
3. 標題輸入：`全球光頻共振 - 活動報名`

### 1.2 添加問題

複製以下問題到表單：

```
問題 1: 姓名 *
類型: 簡答
必填: 是

問題 2: Email *  
類型: 簡答
驗證: 電子郵件
必填: 是

問題 3: 聯絡電話
類型: 簡答
必填: 否

問題 4: 你如何得知這場祭典？
類型: 段落
必填: 否
```

### 1.3 取得表單連結

1. 點擊右上角「傳送」
2. 點擊鏈結圖示 🔗
3. 勾選「縮短網址」
4. **複製網址**（例如：`https://forms.gle/xxxxx`）

---

## 步驟 2：修改網頁連結（1 分鐘）

### 2.1 開啟 index.html

用任何文字編輯器開啟 `index.html`

### 2.2 找到這一行（約第 370 行）

```html
<a href="YOUR_GOOGLE_FORM_URL_HERE"
```

### 2.3 替換網址

將 `YOUR_GOOGLE_FORM_URL_HERE` 替換成你剛複製的 Google 表單網址：

```html
<a href="https://forms.gle/你的表單ID"
```

### 2.4 儲存文件

按 `Ctrl + S`（Windows）或 `Cmd + S`（Mac）儲存

---

## 步驟 3：上傳到 GitHub Pages（5 分鐘）

### 3.1 創建 GitHub 儲存庫

1. 前往 https://github.com/
2. 點擊右上角「+」→「New repository」
3. 儲存庫名稱輸入：`你的用戶名.github.io`
   - 例如：`aura.github.io`
4. 設定為 **Public**
5. 點擊「Create repository」

### 3.2 上傳文件

**方法 A：使用網頁上傳（最簡單）**

1. 在新創建的儲存庫頁面
2. 點擊「uploading an existing file」
3. 拖曳這些文件進去：
   - `index.html`
   - `styles.css`
   - `script.js`
4. 在下方輸入提交訊息：`Initial commit`
5. 點擊「Commit changes」

**方法 B：使用 Git（如果你熟悉 Git）**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用戶名/你的用戶名.github.io.git
git push -u origin main
```

### 3.3 啟用 GitHub Pages

1. 在儲存庫中，點擊「Settings」
2. 左側選單點擊「Pages」
3. Source 選擇 **main** 分支
4. 點擊「Save」

### 3.4 等待發布

大約 1-2 分鐘後，你的網站會發布在：

```
https://你的用戶名.github.io
```

例如：`https://aura.github.io`

---

## ✅ 完成！

現在你可以：

1. 🌐 訪問你的網站：`https://你的用戶名.github.io`
2. 📱 分享給朋友測試報名
3. 📊 在 Google 表單查看報名資料

---

## 🎯 接下來做什麼？

### 設定自動回覆郵件

1. 開啟你的 Google 表單
2. 點擊「設定」⚙️
3. 選擇「回覆」標籤
4. 勾選「回覆副本」→「總是」
5. 在回覆訊息輸入：

```
感謝您報名參加「全球光頻共振：業力轉化與世界和平連結祭典」！

我們已收到您的報名資料，將會盡快與您聯繫。

如有任何問題，歡迎聯繫：
Email: nasixialove@gmail.com
Instagram: @nasixia_aura

✨ 願光與愛與你同在 ✨

娜絲夏光愛聖境
```

### 自訂網站內容

你可以修改：

1. **顏色**：編輯 `styles.css` 的 `:root` 變數
2. **文字內容**：直接修改 `index.html`
3. **講師照片**：替換 `.instructor-placeholder` 區域

### 追蹤訪客數據

添加 Google Analytics：

1. 前往 https://analytics.google.com/
2. 創建新帳戶和資源
3. 取得追蹤 ID
4. 在 `index.html` 的 `</head>` 前加入追蹤代碼

---

## ❓ 常見問題

### Q: 網站沒有顯示？

A: 等待 1-2 分鐘讓 GitHub Pages 發布。如果還是不行：
- 檢查儲存庫名稱是否正確（必須是 `用戶名.github.io`）
- 確認儲存庫設定為 Public
- 檢查 Settings → Pages 是否已啟用

### Q: 表單連結無效？

A: 確認：
- Google 表單設定為「任何人都可回覆」
- 網址複製完整（包含 https://）
- index.html 中的網址已正確替換

### Q: 想要自訂網域名稱？

A: GitHub Pages 支援自訂網域：
1. 購買網域（如 GoDaddy、Cloudflare）
2. 在 GitHub Settings → Pages → Custom domain 設定
3. 在網域商設定 DNS（CNAME 指向 `用戶名.github.io`）

### Q: 可以修改網站內容嗎？

A: 當然可以！修改後：
1. 重新上傳文件到 GitHub
2. 或使用 Git 推送更新
3. 幾分鐘後網站會自動更新

---

## 📞 需要協助？

如果遇到問題：

1. 查看詳細指南：[SETUP_GUIDE.md](SETUP_GUIDE.md)
2. 檢查瀏覽器控制台錯誤（按 F12）
3. 聯繫：nasixialove@gmail.com

---

## 🎉 恭喜！

你的 Landing Page 已經上線了！

現在可以開始分享並收集報名了。

**✨ 願光與愛與你同在 ✨**

---

## 📚 延伸閱讀

- [完整設置指南](SETUP_GUIDE.md) - 包含進階功能設定
- [README](README.md) - 專案完整說明
- [GitHub Pages 文件](https://docs.github.com/pages) - 官方文件


