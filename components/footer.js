class SecureFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `\
            <style>
                :host {
                    display: block;
                    width: 100%;
                }
                
                .footer {
                    background: #1e1b4b;
                    color: #e0e7ff;
                    padding: 2rem 0;
                    margin-top: auto;
                }
                
                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1rem;
                    text-align: center;
                }
                
                .footer-links {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                }
                
                .footer-link {
                    color: #a5b4fc;
                    text-decoration: none;
                    transition: color 0.3s ease;
                    font-size: 0.875rem;
                }
                
                .footer-link:hover {
                    color: #ffffff;
                }
                
                .copyright {
                    margin-top: 1.5rem;
                    font-size: 0.75rem;
                    color: #818cf8;
                }
                
                @media (max-width: 768px) {
                    .footer-links {
                        gap: 1rem;
                    }
                    
                    .footer-link {
                        font-size: 0.8rem;
                    }
                }
            </style>
            <footer class="footer">
                <div class="footer-content">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 1rem;">
                        <i data-feather="shield" width="16" height="16"></i>
                        <span style="font-weight: 600;">Système d'Authentification Sécurisé</span>
                    </div>
                    <div class="footer-links">
                        <a href="#" class="footer-link">Confidentialité</a>
                        <a href="#" class="footer-link">Sécurité</a>
                        <a href="#" class="footer-link">Support</a>
                        <a href="#" class="footer-link">À propos</a>
                    </div>
                    <div class="copyright">
                        © 2024 Secure Gateway Portal. Tous droits réservés.
                    </div>
                </div>
            </footer>
        `;
        
        // Feather icons need to be replaced after shadow DOM is attached
        setTimeout(() => {
            if (window.feather) {
                window.feather.replace();
            }
        }, 100);
    }
}

customElements.define('secure-footer', SecureFooter);