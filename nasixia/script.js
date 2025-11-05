// 全球光頻共振 Landing Page JavaScript

// ========== 平滑滾動 ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== 導航欄滾動效果 ==========
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    }
    
    lastScroll = currentScroll;
});

// ========== 滾動動畫 ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 觀察所有需要動畫的元素
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(`
        .value-card,
        .expect-item,
        .join-card,
        .testimonial-card,
        .faq-item
    `);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ========== 表單提交處理 ==========
const registrationForm = document.getElementById('registrationForm');

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
        
        // 模擬表單提交（實際使用時需要連接到後端 API）
        setTimeout(() => {
            console.log('表單數據:', formData);
            
            // 顯示成功訊息
            showNotification('報名成功！我們會盡快與您聯繫。', 'success');
            
            // 重置表單
            registrationForm.reset();
            
            // 恢復按鈕
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // 可選：跳轉到感謝頁面
            // window.location.href = '/thank-you.html';
        }, 1500);
    });
}

// ========== Email 驗證 ==========
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========== 通知系統 ==========
function showNotification(message, type = 'info') {
    // 移除現有通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 創建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // 添加樣式
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // 自動移除
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// 添加通知動畫樣式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-icon {
        font-size: 1.5rem;
        font-weight: bold;
    }
    
    .notification-message {
        font-size: 1rem;
        font-weight: 500;
    }
`;
document.head.appendChild(style);

// ========== 倒數計時器（可選功能）==========
function createCountdown(targetDate) {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            countdownElement.innerHTML = '活動已開始！';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">天</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">時</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">分</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">秒</span>
            </div>
        `;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// 如果需要倒數計時，設置目標日期
// 例如：createCountdown(new Date('2025-12-31 23:59:59').getTime());

// ========== 能量圈互動效果 ==========
const energyCircle = document.querySelector('.energy-circle');
if (energyCircle) {
    energyCircle.addEventListener('mouseenter', () => {
        energyCircle.style.transform = 'scale(1.05)';
        energyCircle.style.transition = 'transform 0.3s ease';
    });
    
    energyCircle.addEventListener('mouseleave', () => {
        energyCircle.style.transform = 'scale(1)';
    });
}

// ========== 星空視差效果 ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const stars = document.querySelector('.stars');
    const stars2 = document.querySelector('.stars2');
    const stars3 = document.querySelector('.stars3');
    
    if (stars) stars.style.transform = `translateY(${scrolled * 0.5}px)`;
    if (stars2) stars2.style.transform = `translateY(${scrolled * 0.3}px)`;
    if (stars3) stars3.style.transform = `translateY(${scrolled * 0.1}px)`;
});

// ========== 追蹤分析（可選）==========
function trackEvent(category, action, label) {
    // 如果使用 Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    // 如果使用 Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', action, { category, label });
    }
    
    console.log('Event tracked:', { category, action, label });
}

// 追蹤按鈕點擊
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const btnText = e.target.textContent.trim();
        trackEvent('Button', 'Click', btnText);
    });
});

// 追蹤外部連結
document.querySelectorAll('a[href^="http"], a[href^="https"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const url = e.target.href;
        trackEvent('External Link', 'Click', url);
    });
});

// ========== 載入完成 ==========
window.addEventListener('load', () => {
    console.log('🌟 全球光頻共振 Landing Page 已載入完成');
    console.log('✨ 願光與愛與你同在 ✨');
});

// ========== 響應式選單（移動裝置）==========
function createMobileMenu() {
    const navbar = document.querySelector('.navbar .container');
    const navLinks = document.querySelector('.nav-links');
    
    // 創建漢堡選單按鈕
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.cssText = `
        display: none;
        background: transparent;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    `;
    
    // 在移動裝置上顯示
    if (window.innerWidth <= 968) {
        menuToggle.style.display = 'block';
        navbar.insertBefore(menuToggle, navLinks);
        
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(15, 23, 42, 0.98)';
            navLinks.style.padding = '1rem';
            navLinks.style.borderRadius = '0 0 0.5rem 0.5rem';
        });
    }
}

// 在 DOM 載入後創建移動選單
document.addEventListener('DOMContentLoaded', createMobileMenu);

// 視窗大小改變時重新檢查
window.addEventListener('resize', () => {
    if (window.innerWidth > 968) {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.background = 'transparent';
        }
    }
});

