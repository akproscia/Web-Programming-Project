class App {
    constructor(){
        this.displayNameInput = document.querySelector('#displayName');
        this.usernameInput = document.querySelector('#username');
        this.passwordInput = document.querySelector('#password');
        this.confirmInput = document.querySelector('#passwordConfirmed');
        this.errorDiv = document.querySelector('#error-message');

        this.register = this.register.bind(this);

        document.querySelector('#register').addEventListener('click', this.register);
    }

    async register(event){
        if(event) event.preventDefault();

        if(this.passwordInput.value !== this.confirmInput.value) {
            this.showError("Passwords do not match");
            return;
        }

        const userData = {
            displayName: this.displayNameInput.value,
            username: this.usernameInput.value,
            password: this.passwordInput.value
        }

        const response = await fetch('/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (result.success){
            alert("Registration successful!");
            window.location.href = 'login.html';
        } else {
            this.showError(result.message);
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