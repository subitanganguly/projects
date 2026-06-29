(async function() {
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbynr0bY5wxJw0TN4IVCL3Q1Q2gZbt8l5ITBpqi5_tNwq8qBnDENhHG2eeN8djv4A4uO/exec";

    // Load Bootstrap if missing
    if (!window.bootstrap) {
        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
        document.head.appendChild(css);
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
        document.head.appendChild(script);
        await new Promise(resolve => script.onload = resolve);
    }

    // Premium Styles
    const styles = `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        /* Blur overlay */
        .blur-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            background: rgba(0,0,0,0.15);
            z-index: 1040;
            opacity: 0;
            transition: opacity 0.4s ease;
            pointer-events: none;
        }
        
        .blur-overlay.active {
            opacity: 1;
            pointer-events: none;
        }
        
        .premium-modal .modal-content {
            border: none;
            border-radius: 24px;
            background: #fff;
            box-shadow: 0 40px 80px rgba(0,0,0,0.15);
            font-family: 'Inter', sans-serif;
            overflow: hidden;
        }
        
        .premium-modal .modal-header {
            border: none;
            padding: 32px 36px 8px 36px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef);
            color: #fff;
            border-radius: 24px 24px 0 0;
            position: relative;
            overflow: hidden;
        }
        
        .premium-modal .modal-header::before {
            content: '';
            position: absolute;
            top: -60%;
            right: -20%;
            width: 280px;
            height: 280px;
            background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%);
            border-radius: 50%;
        }
        
        .premium-modal .modal-title {
            font-weight: 800;
            font-size: 1.6rem;
            letter-spacing: -0.03em;
            position: relative;
            z-index: 1;
        }
        
        .premium-modal .modal-title::before { content: "✨ "; }
        
        .premium-modal .subtitle {
            font-size: 0.9rem;
            opacity: 0.9;
            display: block;
            position: relative;
            z-index: 1;
        }
        
        .premium-modal .modal-body {
            padding: 28px 36px 16px 36px;
            background: #fafafa;
        }
        
        .premium-modal .form-label {
            font-weight: 600;
            color: #1e293b;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            margin-bottom: 6px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .premium-modal .gradient-input-wrapper {
            position: relative;
            background: linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef, #6366f1);
            background-size: 300% 300%;
            animation: borderAnim 4s ease infinite;
            padding: 2px;
            border-radius: 14px;
            transition: all .3s ease;
            box-shadow: 0 4px 15px rgba(99,102,241,0.12);
        }
        
        .premium-modal .gradient-input-wrapper:focus-within {
            box-shadow: 0 4px 25px rgba(99,102,241,0.25);
            transform: scale(1.01);
        }
        
        @keyframes borderAnim {
            0%,100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        .premium-modal .gradient-input-wrapper .form-control {
            border: none;
            border-radius: 13px;
            padding: 12px 14px 12px 44px;
            font-size: .95rem;
            font-weight: 500;
            color: #1e293b;
            background: #fff;
            font-family: 'Inter', sans-serif;
        }
        
        .premium-modal .gradient-input-wrapper .form-control:focus {
            box-shadow: none;
            outline: none;
        }
        
        .premium-modal .gradient-input-wrapper .form-control::placeholder {
            color: #94a3b8;
            font-weight: 400;
        }
        
        .premium-modal .input-icon {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.1rem;
            z-index: 2;
            pointer-events: none;
        }
        
        .premium-modal .required-star { color: #ef4444; font-weight: 700; }
        
        .premium-modal .modal-footer {
            border: none;
            padding: 8px 36px 32px 36px;
            justify-content: center;
            background: #fafafa;
            border-radius: 0 0 24px 24px;
        }
        
        .premium-modal .btn-primary {
            background: linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef);
            background-size: 200% 200%;
            animation: btnAnim 4s ease infinite;
            border: none;
            padding: 14px 40px;
            border-radius: 14px;
            font-weight: 700;
            font-size: 1rem;
            transition: all .3s ease;
            box-shadow: 0 8px 25px rgba(99,102,241,0.3);
            width: 100%;
            color: #fff;
            font-family: 'Inter', sans-serif;
        }
        
        @keyframes btnAnim {
            0%,100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        .premium-modal .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(99,102,241,0.4);
        }
        
        .premium-modal .btn-primary::after {
            content: " →";
            transition: all .3s ease;
        }
        
        .premium-modal .btn-primary:hover::after { transform: translateX(4px); }
        
        .premium-modal .btn-primary.loading {
            pointer-events: none;
            opacity: .8;
        }
        
        .premium-modal .btn-primary.loading::after {
            content: "";
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2.5px solid rgba(255,255,255,0.3);
            border-top-color: #fff;
            border-radius: 50%;
            animation: spin .7s linear infinite;
            margin-left: 8px;
        }
        
        @keyframes spin { to { transform: rotate(360deg); } }
        
        .premium-modal .privacy-note { font-size: .7rem; color: #94a3b8; margin-top: 6px; }
        .premium-modal .privacy-note::before { content: "🔒 "; }
        
        /* Error state for inputs */
        .premium-modal .gradient-input-wrapper.error {
            background: linear-gradient(135deg, #ef4444, #dc2626) !important;
            animation: shake 0.5s ease !important;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            75% { transform: translateX(8px); }
        }
        
        .premium-modal .error-message {
            color: #ef4444;
            font-size: 0.75rem;
            font-weight: 500;
            margin-top: 4px;
            display: none;
            align-items: center;
            gap: 4px;
        }
        
        .premium-modal .error-message.show {
            display: flex;
        }
        
        .premium-modal .error-message::before {
            content: "⚠️ ";
        }
        
        @media (max-width:576px) {
            .premium-modal .modal-header { padding: 24px 20px 8px 20px; }
            .premium-modal .modal-title { font-size: 1.3rem; }
            .premium-modal .modal-body { padding: 20px 20px 12px 20px; }
            .premium-modal .modal-footer { padding: 8px 20px 24px 20px; }
            .premium-modal .gradient-input-wrapper .form-control { padding: 10px 12px 10px 40px; font-size: .9rem; }
            .premium-modal .input-icon { left: 12px; font-size: 1rem; }
        }
        
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px) scale(.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .premium-modal .modal-dialog { animation: slideUp .4s cubic-bezier(.34,1.56,.64,1); }
    </style>`;
    document.head.insertAdjacentHTML("beforeend", styles);

    // Create blur overlay
    const blurOverlay = document.createElement('div');
    blurOverlay.className = 'blur-overlay';
    document.body.appendChild(blurOverlay);

    // Modal HTML
    const modalHtml = `
    <div class="modal fade premium-modal" id="visitorModal" tabindex="-1" data-bs-backdrop="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h5 class="modal-title">Welcome Back</h5>
                        <span class="subtitle">We're glad to see you again</span>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label"><span>Full Name</span><span class="required-star">*</span></label>
                        <div class="gradient-input-wrapper">
                            <span class="input-icon">👤</span>
                            <input type="text" class="form-control" id="visitorName" placeholder="Enter your full name" autocomplete="name">
                        </div>
                        <div class="error-message" id="nameError">Please enter your full name</div>
                    </div>
                    <div class="mb-2">
                        <label class="form-label"><span>Mobile Number</span><span class="required-star">*</span></label>
                        <div class="gradient-input-wrapper">
                            <span class="input-icon">📱</span>
                            <input type="tel" class="form-control" id="visitorMobile" placeholder="Enter your mobile number" autocomplete="tel" maxlength="10">
                        </div>
                        <div class="error-message" id="mobileError">Please enter a valid 10-digit mobile number</div>
                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" id="saveVisitorBtn">Continue</button>
                </div>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHtml);

    let visitor = JSON.parse(localStorage.getItem("visitorInfo"));

    // Check if already tracked in this session
    function hasBeenTrackedInSession() {
        const sessionKey = `tracked_${window.location.href}`;
        return sessionStorage.getItem(sessionKey) === 'true';
    }

    function markTrackedInSession() {
        const sessionKey = `tracked_${window.location.href}`;
        sessionStorage.setItem(sessionKey, 'true');
    }

    async function sendVisit() {
        const now = new Date();
        const data = {
            full_name: visitor.full_name,
            mobile: visitor.mobile,
            device_info: navigator.userAgent,
            visit_page: window.location.href,
            visit_date: now.toLocaleDateString(),
            visit_time: now.toLocaleTimeString()
        };
        try {
            await fetch(WEB_APP_URL, { method: "POST", mode: "no-cors", body: JSON.stringify(data) });
            //console.log("✅ Visit tracked successfully");
        } catch (err) {
           // console.error("❌ Tracking Error:", err);
        }
    }

    // Mobile number validation function
    function isValidMobile(number) {
        const clean = number.replace(/\D/g, '');
        if (clean.length !== 10) return false;
        if (/^(\d)\1{9}$/.test(clean)) return false;
        const sequential = '0123456789';
        const reverseSequential = '9876543210';
        if (sequential.includes(clean) || reverseSequential.includes(clean)) return false;
        if (/(\d)\1{2,}/.test(clean)) {
            const uniqueDigits = new Set(clean.split('')).size;
            if (uniqueDigits <= 3) return false;
        }
        const invalidPatterns = [
            /^(\d{2})\1{4}$/,
            /^(\d{3})\1{2}\d$/,
            /^\d{3}(\d)\1{2}\d{3}$/,
        ];
        for (const pattern of invalidPatterns) {
            if (pattern.test(clean)) return false;
        }
        if (clean.startsWith('0') || clean.startsWith('1')) return false;
        if (!['6','7','8','9'].includes(clean[0])) return false;
        return true;
    }

    // Format mobile number as user types
    document.getElementById('visitorMobile').addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '');
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }
        const wrapper = this.closest('.gradient-input-wrapper');
        const errorMsg = document.getElementById('mobileError');
        if (wrapper.classList.contains('error')) {
            wrapper.classList.remove('error');
            errorMsg.classList.remove('show');
        }
    });

    // Clear name error while typing
    document.getElementById('visitorName').addEventListener('input', function() {
        const wrapper = this.closest('.gradient-input-wrapper');
        const errorMsg = document.getElementById('nameError');
        if (wrapper.classList.contains('error')) {
            wrapper.classList.remove('error');
            errorMsg.classList.remove('show');
        }
    });

    // Validate on blur but only if field has content
    document.getElementById('visitorMobile').addEventListener('blur', function() {
        const wrapper = this.closest('.gradient-input-wrapper');
        const errorMsg = document.getElementById('mobileError');
        if (this.value && !isValidMobile(this.value)) {
            wrapper.classList.add('error');
            errorMsg.classList.add('show');
        } else {
            wrapper.classList.remove('error');
            errorMsg.classList.remove('show');
        }
    });

    // Validate name on blur but only if field has content
    document.getElementById('visitorName').addEventListener('blur', function() {
        const wrapper = this.closest('.gradient-input-wrapper');
        const errorMsg = document.getElementById('nameError');
        if (this.value && this.value.trim().length < 2) {
            wrapper.classList.add('error');
            errorMsg.classList.add('show');
        } else {
            wrapper.classList.remove('error');
            errorMsg.classList.remove('show');
        }
    });

    if (!visitor) {
        // First time visitor - show modal
        const modal = new bootstrap.Modal(document.getElementById("visitorModal"), { 
            backdrop: false, 
            keyboard: false 
        });
        
        blurOverlay.classList.add('active');
        modal.show();

        document.getElementById('visitorModal').addEventListener('hidden.bs.modal', function() {
            blurOverlay.classList.remove('active');
        });

        setTimeout(() => document.getElementById("visitorName").focus(), 500);

        const saveBtn = document.getElementById("saveVisitorBtn");
        
        const handleSubmit = async function() {
            const name = document.getElementById("visitorName").value.trim();
            const mobile = document.getElementById("visitorMobile").value.trim();
            let isValid = true;
            
            // Validate name
            const nameWrapper = document.querySelector('#visitorName').closest('.gradient-input-wrapper');
            const nameError = document.getElementById('nameError');
            if (!name || name.length < 2) {
                nameWrapper.classList.add('error');
                nameError.classList.add('show');
                isValid = false;
            } else {
                nameWrapper.classList.remove('error');
                nameError.classList.remove('show');
            }
            
            // Validate mobile
            const mobileWrapper = document.querySelector('#visitorMobile').closest('.gradient-input-wrapper');
            const mobileError = document.getElementById('mobileError');
            if (!mobile || !isValidMobile(mobile)) {
                mobileWrapper.classList.add('error');
                mobileError.classList.add('show');
                isValid = false;
            } else {
                mobileWrapper.classList.remove('error');
                mobileError.classList.remove('show');
            }
            
            if (!isValid) {
                if (!name || name.length < 2) {
                    document.getElementById("visitorName").focus();
                } else {
                    document.getElementById("visitorMobile").focus();
                }
                return;
            }

            this.classList.add("loading");
            this.textContent = "Saving";

            visitor = {
                full_name: name,
                mobile: mobile
            };
            localStorage.setItem("visitorInfo", JSON.stringify(visitor));
            
            // Send data to sheet
            await sendVisit();
            
            // Mark as tracked in this session
            markTrackedInSession();
            
            modal.hide();
        };

        saveBtn.addEventListener("click", handleSubmit);
        document.getElementById("visitorName").addEventListener("keypress", e => e.key === "Enter" && saveBtn.click());
        document.getElementById("visitorMobile").addEventListener("keypress", e => e.key === "Enter" && saveBtn.click());

    } else {
        // Returning visitor - check if already tracked in this session
        if (!hasBeenTrackedInSession()) {
            // console.log("📊 Tracking returning visitor...");
            await sendVisit();
            markTrackedInSession();
        } else {
            // console.log("⏭️ Already tracked in this session - skipping");
        }
    }
})();