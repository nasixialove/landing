# 🚀 報名系統設置指南

本指南將協助你設置報名系統。提供兩種方法供選擇。

---

## 📋 方法 1：使用 Google 表單（最簡單，推薦！）

這是最簡單的方法，適合快速上線使用。

### ✅ 優點
- ✨ 完全免費
- 🚀 5分鐘內完成設置
- 📊 自動整理到 Google Sheets
- 📧 可設定自動回覆郵件
- 🔒 Google 負責資料安全
- 📱 手機也能查看資料

### 📝 設置步驟

#### 步驟 1: 創建 Google 表單

1. 前往 [Google Forms](https://forms.google.com/)
2. 點擊「空白」創建新表單
3. 設定表單標題：「全球光頻共振 - 活動報名」

#### 步驟 2: 添加問題

建議的問題設計：

```
問題 1: 姓名 *
類型: 簡答
設定: 必填

問題 2: Email *
類型: 簡答
驗證: 電子郵件地址
設定: 必填

問題 3: 聯絡電話
類型: 簡答
設定: 選填

問題 4: 你如何得知這場祭典？
類型: 段落
設定: 選填
```

#### 步驟 3: 設定自動回覆郵件（可選）

1. 點擊右上角「設定」⚙️
2. 選擇「回覆」標籤
3. 勾選「收集電子郵件地址」
4. 勾選「回覆副本」→「總是」
5. 在「回覆訊息」輸入：

```
感謝您報名參加「全球光頻共振：業力轉化與世界和平連結祭典」！

我們已收到您的報名資料，將會盡快與您聯繫。

如有任何問題，歡迎透過以下方式聯繫我們：
Email: nasixialove@gmail.com
Instagram: @nasixia_aura

✨ 願光與愛與你同在 ✨

娜絲夏光愛聖境
```

#### 步驟 4: 取得表單連結

1. 點擊右上角「傳送」
2. 點擊「鏈結」圖示 🔗
3. 勾選「縮短網址」
4. 複製網址（例如：`https://forms.gle/xxxxx`）

#### 步驟 5: 更新網頁連結

在 `index.html` 文件中，找到這一行：

```html
<a href="YOUR_GOOGLE_FORM_URL_HERE"
```

將 `YOUR_GOOGLE_FORM_URL_HERE` 替換成你的 Google 表單網址：

```html
<a href="https://forms.gle/xxxxx"
```

### ✅ 完成！

現在訪客點擊「點此進入報名系統」按鈕時，會開啟你的 Google 表單。

---

## 🔧 方法 2：使用內嵌表單 + Google Sheets（進階）

如果你希望訪客在同一個頁面填寫表單，使用這個方法。

### ✅ 優點
- 📱 無需跳轉頁面，用戶體驗更好
- 🎨 表單樣式與網站一致
- ⚡ 即時驗證與提示
- 📊 資料一樣存到 Google Sheets

### ⚠️ 需要
- 基本的 Google Apps Script 知識
- 約 15-20 分鐘設置時間

### 📝 設置步驟

#### 步驟 1: 創建 Google Sheets

1. 前往 [Google Sheets](https://sheets.google.com/)
2. 創建新試算表，命名為「全球光頻共振 - 報名資料」
3. 在第一列設置標題：

| A列 | B列 | C列 | D列 | E列 |
|-----|-----|-----|-----|-----|
| 時間戳記 | 姓名 | Email | 電話 | 得知管道 |

#### 步驟 2: 創建 Google Apps Script

1. 在 Google Sheets 中，點擊「擴充功能」→「Apps Script」
2. 刪除預設代碼，貼上以下代碼：

```javascript
function doPost(e) {
  try {
    // 取得試算表
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 解析表單資料
    var data = JSON.parse(e.postData.contents);
    
    // 準備寫入的資料
    var timestamp = new Date();
    var name = data.name || '';
    var email = data.email || '';
    var phone = data.phone || '';
    var message = data.message || '';
    
    // 寫入新的一列
    sheet.appendRow([timestamp, name, email, phone, message]);
    
    // 回傳成功訊息
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': '報名成功！'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // 回傳錯誤訊息
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 測試用的 GET 請求
function doGet() {
  return ContentService
    .createTextOutput('Google Apps Script is running!')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

3. 點擊「部署」→「新增部署作業」
4. 類型選擇「網頁應用程式」
5. 設定：
   - 執行身分：我本人
   - 具有存取權的使用者：**任何人**（重要！）
6. 點擊「部署」
7. 複製「網頁應用程式網址」（格式：`https://script.google.com/macros/s/xxxxx/exec`）

#### 步驟 3: 更新 HTML

在 `index.html` 中，找到以下這段：

```html
<!-- 方法 1: 直接連結到 Google 表單（請替換成您的表單連結） -->
<div class="registration-info">
    ...
</div>
```

**刪除上面整段**，然後取消下方「方法 2」的註解（移除 `<!--` 和 `-->`）。

#### 步驟 4: 更新 JavaScript

在 `script.js` 中，找到表單提交的部分（約第 44 行），替換為：

```javascript
if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 獲取表單數據
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message') ? document.getElementById('message').value : ''
        };
        
        // 驗證表單
        if (!formData.name || !formData.email) {
            showNotification('請填寫必填欄位', 'error');
            return;
        }
        
        if (!isValidEmail(formData.email)) {
            showNotification('請輸入有效的電子郵件地址', 'error');
            return;
        }
        
        // 顯示載入狀態
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="btn-icon">⏳</span> 正在提交...';
        submitBtn.disabled = true;
        
        // 發送到 Google Sheets
        fetch('YOUR_GOOGLE_APPS_SCRIPT_URL_HERE', {
            method: 'POST',
            mode: 'no-cors', // 重要：避免 CORS 問題
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(() => {
            // 顯示成功訊息
            showNotification('報名成功！我們會盡快與您聯繫。', 'success');
            
            // 重置表單
            registrationForm.reset();
            
            // 追蹤事件
            trackEvent('Registration', 'Submit', 'Success');
        })
        .catch((error) => {
            console.error('Error:', error);
            showNotification('提交失敗，請稍後再試或直接聯繫我們', 'error');
        })
        .finally(() => {
            // 恢復按鈕
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}
```

**重要**：將 `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` 替換成你在步驟 2 複製的網址。

#### 步驟 5: 測試

1. 在網頁上填寫表單並提交
2. 檢查 Google Sheets 是否有新資料
3. 如果沒有，檢查：
   - Apps Script 網址是否正確
   - Apps Script 存取權限是否設為「任何人」
   - 瀏覽器控制台是否有錯誤訊息

### ✅ 完成！

現在訪客可以直接在你的網頁填寫表單，資料會自動存到 Google Sheets。

---

## 📱 部署到 GitHub Pages

### 步驟 1: 創建 GitHub 儲存庫

1. 前往 [GitHub](https://github.com/)
2. 點擊右上角「+」→「New repository」
3. 命名為：`username.github.io`（將 username 替換成你的 GitHub 用戶名）
   - 例如：`aura.github.io`
4. 設定為 Public
5. 點擊「Create repository」

### 步驟 2: 上傳文件

**選項 A：使用 Git（推薦）**

```bash
# 在專案資料夾中執行
git init
git add .
git commit -m "Initial commit: 全球光頻共振 landing page"
git branch -M main
git remote add origin https://github.com/username/username.github.io.git
git push -u origin main
```

**選項 B：使用網頁上傳**

1. 在 GitHub 儲存庫頁面
2. 點擊「uploading an existing file」
3. 拖曳所有文件（index.html, styles.css, script.js）
4. 點擊「Commit changes」

### 步驟 3: 啟用 GitHub Pages

1. 在儲存庫中，點擊「Settings」
2. 左側選單點擊「Pages」
3. Source 選擇「main」分支
4. 點擊「Save」

### 步驟 4: 訪問網站

大約 1-2 分鐘後，你的網站會發布在：
```
https://username.github.io
```

例如：`https://aura.github.io`

---

## 🎯 推薦方案

根據你的需求選擇：

### 如果你想要...

✅ **最快上線** → 使用方法 1（Google 表單）  
✅ **最佳用戶體驗** → 使用方法 2（內嵌表單）  
✅ **完全免費** → 兩種方法都免費！  
✅ **GitHub Pages 部署** → 兩種方法都支援！

---

## 📞 需要協助？

如果在設置過程中遇到問題：

1. 檢查瀏覽器控制台的錯誤訊息（F12）
2. 確認所有網址都已正確替換
3. 確認 Google Apps Script 權限設定正確

---

## 🎉 恭喜！

設置完成後，你的 landing page 就可以開始收集報名資料了！

**✨ 願光與愛與你同在 ✨**

