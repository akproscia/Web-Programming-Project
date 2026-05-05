class SettingsApp {
    constructor() {
        this.displayNameInput = document.querySelector("#displayName");
        this.usernameInput = document.querySelector("#username");
        this.passwordInput = document.querySelector("#password");
        this.confirmPasswordInput = document.querySelector("#passwordConfirmed");
        this.savefromButton = document.querySelector("#change");
        this.errorMessage = document.querySelector("#error-message");

        this.loadCurrentData();
        this.savefromButton.addEventListener("click", () => this.handleSave());
       
        this.deleteButton = document.querySelector("#delete-account"); // Grabs your button
       this.deleteButton.addEventListener("click", () => this.handleDelete());
   
    }
     
    async handleDelete() {
    const confirmDelete = confirm("Are you sure, you want to delete your account.");
    
    if (confirmDelete) {
        const response = await fetch('/api/deleteAccount', {
            method: 'DELETE' 
        });

        if (response.ok) {
            alert("Account has been deleted.");
            window.location.href = 'login.html'; 
        }
    }
}
    // auto fills in username/name into text boxes
    // if nothing loads into the text boxes go back to login
    async loadCurrentData() {
        const response = await fetch('/api/currentUser');
        if (response.ok) {
            const user = await response.json();
            this.displayNameInput.value = user.displayName;
            this.usernameInput.value = user.userName;
        } else {
            window.location.href = 'login.html';
        }
    }
    
    // if the user verifies their password, then new username/name 
    // will be saved.
    async handleSave() {
        const password = this.passwordInput.value;
        const confirm = this.confirmPasswordInput.value;

        if (password !== confirm) {
            this.errorMessage.classList.remove("hidden");
            return;
        }

        const updatedData = {
            displayName: this.displayNameInput.value,
            userName: this.usernameInput.value,
            password: password || undefined 
        };

        const response = await fetch('/api/updateUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            alert("Changes saved!");
            window.location.href = 'profile.html';
        }
    }
}

export default function setup() {
    new SettingsApp();
}