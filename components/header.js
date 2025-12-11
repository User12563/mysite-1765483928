class SecureHeader extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `\
            <style>
                :host {
                    display: block;
                    width: 100%;
                }
                
                .header {
                    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                    color: white;
                    padding: 1rem 0;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                
                .header-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-weight: 700;
                    font-size: 1.25rem;
                }
                
                .security-badge {
                    background: rgba(255, 255, 255, 0.2);
                    padding: 0.25rem 0.75rem;
                    border-radius: 9999px;
                    font-size: 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }
                
                @media (max-width: 768px) {
                    .header-content {
                        flex-direction: column;
                        gap: 1rem;
                        text-align: center;
                    }
                    
                    .logo {
                        font-size: 1.1rem;
                    }
                }
            </style>
            <header class="header">
                <div class="header-content">
                    <div class="logo">
                        <i data-feather="shield"></i>
                        Secure Gateway
                    </div>
                    <div class="security-badge">
                        <i data-feather="lock" width="12" height="12"></i>
                        Connexion Sécurisée
                    </div>
                </div>
            </header>
        `;
        
        // Feather icons need to be replaced after shadow DOM is attached
        setTimeout(() => {
            if (window.feather) {
                window.feather.replace();
            }
        }, 100);
    }
}

customElements.define('secure-header', SecureHeader);