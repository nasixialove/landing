/**
 * Google Apps Script - 報名表單後端
 * 用於接收網頁表單資料並存入 Google Sheets
 * 
 * 使用方法：
 * 1. 在 Google Sheets 中，點擊「擴充功能」→「Apps Script」
 * 2. 複製此代碼並貼上
 * 3. 點擊「部署」→「新增部署作業」
 * 4. 選擇「網頁應用程式」
 * 5. 存取權限設定為「任何人」
 * 6. 複製部署後的網址，填入 script.js
 */

// ========== 主要函數：處理 POST 請求 ==========
function doPost(e) {
  try {
    // 取得目前的試算表
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 解析 JSON 資料
    var data = JSON.parse(e.postData.contents);
    
    // 取得表單欄位
    var timestamp = new Date();
    var name = data.name || '';
    var email = data.email || '';
    var phone = data.phone || '';
    var message = data.message || '';
    
    // 寫入新的一列資料
    sheet.appendRow([
      timestamp,
      name,
      email,
      phone,
      message
    ]);
    
    // 可選：發送確認郵件給報名者
    if (email) {
      sendConfirmationEmail(email, name);
    }
    
    // 可選：通知管理員有新報名
    notifyAdmin(name, email, phone);
    
    // 回傳成功訊息
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': '報名成功！感謝您的參與。'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // 記錄錯誤
    Logger.log('Error: ' + error.toString());
    
    // 回傳錯誤訊息
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': '提交失敗，請稍後再試或直接聯繫我們。'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ========== 處理 GET 請求（測試用）==========
function doGet() {
  return ContentService
    .createTextOutput('Google Apps Script 正在運作中！')
    .setMimeType(ContentService.MimeType.TEXT);
}

// ========== 發送確認郵件給報名者 ==========
function sendConfirmationEmail(email, name) {
  try {
    var subject = '【報名確認】全球光頻共振：業力轉化與世界和平連結祭典';
    
    var htmlBody = `
      <div style="font-family: 'Microsoft JhengHei', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">✨ 報名確認 ✨</h1>
        </div>
        
        <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="font-size: 16px; color: #333; line-height: 1.8;">
            親愛的 <strong>${name}</strong>，您好！
          </p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.8;">
            感謝您報名參加<strong>「全球光頻共振：業力轉化與世界和平連結祭典」</strong>！
          </p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.8;">
            我們已收到您的報名資料，將會盡快與您聯繫，提供活動的詳細資訊。
          </p>
          
          <div style="background: linear-gradient(135deg, #FEF3C7 0%, #FCD34D 100%); padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
            <p style="font-size: 18px; color: #78350F; margin: 0; font-weight: 600;">
              💫 你的參與，就是改變的開始 💫
            </p>
          </div>
          
          <p style="font-size: 16px; color: #333; line-height: 1.8;">
            在等待的期間，歡迎透過以下方式與我們保持聯繫：
          </p>
          
          <ul style="font-size: 15px; color: #555; line-height: 2;">
            <li>📧 Email: <a href="mailto:nasixialove@gmail.com" style="color: #667EEA;">nasixialove@gmail.com</a></li>
            <li>📱 Instagram: <a href="https://www.instagram.com/nasixia_aura" style="color: #667EEA;">@nasixia_aura</a></li>
          </ul>
          
          <div style="border-top: 2px solid #E5E7EB; margin-top: 40px; padding-top: 20px; text-align: center;">
            <p style="font-size: 14px; color: #999; margin: 0;">
              ✦ 願光與愛與你同在 ✦
            </p>
            <p style="font-size: 14px; color: #999; margin: 10px 0 0 0;">
              娜絲夏光愛聖境
            </p>
          </div>
        </div>
      </div>
    `;
    
    // 發送郵件
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody
    });
    
    Logger.log('確認郵件已發送給: ' + email);
    
  } catch (error) {
    Logger.log('發送確認郵件失敗: ' + error.toString());
  }
}

// ========== 通知管理員有新報名 ==========
function notifyAdmin(name, email, phone) {
  try {
    // 設定管理員郵件地址
    var adminEmail = 'nasixialove@gmail.com'; // 請修改為實際的管理員郵件
    
    var subject = '【新報名通知】全球光頻共振活動';
    
    var body = `
有新的學員報名了！

報名資料：
姓名：${name}
Email：${email}
電話：${phone}
時間：${new Date().toLocaleString('zh-TW')}

請盡快與學員聯繫。

--
此郵件由系統自動發送
    `;
    
    // 發送郵件給管理員
    MailApp.sendEmail(adminEmail, subject, body);
    
    Logger.log('管理員通知郵件已發送');
    
  } catch (error) {
    Logger.log('發送管理員通知失敗: ' + error.toString());
  }
}

// ========== 進階功能：自動回覆並加入 Google Calendar（可選）==========
function addToCalendar(name, email) {
  try {
    // 設定活動日期和時間（請根據實際活動修改）
    var eventStartTime = new Date('2025-12-31 19:00:00');
    var eventEndTime = new Date('2025-12-31 21:00:00');
    
    var calendar = CalendarApp.getDefaultCalendar();
    
    var event = calendar.createEvent(
      '全球光頻共振：業力轉化與世界和平連結祭典',
      eventStartTime,
      eventEndTime,
      {
        description: '感謝 ' + name + ' 報名參加此次祭典。',
        location: '線上祭典',
        guests: email,
        sendInvites: true
      }
    );
    
    Logger.log('活動已加入日曆並發送邀請給: ' + email);
    
  } catch (error) {
    Logger.log('加入日曆失敗: ' + error.toString());
  }
}

// ========== 測試函數（用於開發調試）==========
function testFunction() {
  var testData = {
    name: '測試用戶',
    email: 'test@example.com',
    phone: '0912345678',
    message: '這是測試訊息'
  };
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    new Date(),
    testData.name,
    testData.email,
    testData.phone,
    testData.message
  ]);
  
  Logger.log('測試資料已寫入');
}

// ========== 初始化試算表（首次執行時使用）==========
function initializeSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // 設定標題列
  var headers = ['時間戳記', '姓名', 'Email', '電話', '得知管道'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // 格式化標題列
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#667EEA');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');
  
  // 設定欄寬
  sheet.setColumnWidth(1, 180); // 時間戳記
  sheet.setColumnWidth(2, 120); // 姓名
  sheet.setColumnWidth(3, 200); // Email
  sheet.setColumnWidth(4, 120); // 電話
  sheet.setColumnWidth(5, 300); // 得知管道
  
  // 凍結標題列
  sheet.setFrozenRows(1);
  
  Logger.log('試算表初始化完成');
}

/**
 * 使用說明：
 * 
 * 1. 首次設定時，執行 initializeSheet() 來初始化試算表格式
 * 2. 部署為網頁應用程式時，記得將存取權限設為「任何人」
 * 3. 如需發送郵件，確保已授權 Gmail 和 Calendar 服務
 * 4. 修改 notifyAdmin() 中的管理員郵件地址
 * 5. 如需日曆功能，取消 addToCalendar() 的註解並設定活動時間
 * 
 * 測試步驟：
 * 1. 執行 testFunction() 確認資料能正確寫入
 * 2. 部署後使用 Postman 或瀏覽器測試 POST 請求
 * 3. 確認郵件功能正常運作
 */


