class App {
    constructor(){
        this.usernameInput = document.querySelector('#username');
        this.passwordInput = document.querySelector('#password');
        this.errorDiv = document.querySelector('#error-message');

        this.login = this.login.bind(this);

        document.querySelector('#login').addEventListener('click', this.login);
    }

    async login(event){
        if(event) event.preventDefault();

        const credentials = {
            username: this.usernameInput.value,
            password: this.passwordInput.value
        }

        const response = await fetch('/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        });

        const auth = await response.json();

        if (auth.success){
            window.location.href = 'profile.html'; 
        } else { 
            this.showError(auth.message); 
        }
    }

    showError(message){
        this.errorDiv.textContent = message;
        this.errorDiv.classList.remove('hidden');
    }
}

export default function setup() {
new App(); 
}