export class SettingsApp {
    constructor() {
        this.displayNameInput = document.querySelector("#displayName");
        this.usernameInput = document.querySelector("#username");
        this.passwordInput = document.querySelector("#password");
        this.confirmPasswordInput = document.querySelector("#passwordConfirmed");
        this.savefromButton = document.querySelector("#change");
        this.errorMessage = document.querySelector("#error-message");
        this.deleteButton = document.querySelector("#delete-account"); 
       
        this.selectedPfp = null;
        this.pfpOptions = document.querySelectorAll(".pfp-option");

        this.loadCurrentData();
        this.savefromButton.addEventListener("click", () => this.handleSave());
        this.deleteButton.addEventListener("click", () => this.handleDelete());
       

        this.pfpOptions.forEach(img => {
            img.addEventListener("click", (e) => this.selectPfp(e));
        });

        this.loadCurrentData();
        this.savefromButton.addEventListener("click", () => this.handleSave())

        //logout button using server.js redirects to login page
        document.querySelector("#logout").addEventListener("click", () => {
        fetch('/api/logout', { method: 'POST' }).then(() => {
        window.location.href = 'login.html';
                  });
              });
    }



    // gets the file name by its id of the selected profilePic
    selectPfp(event) {
        const clicked = event.target;
        this.selectedPfp = clicked.id;
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
            profilePic: this.selectedPfp || undefined,
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
