const correctUsername = "Demo";
const correctPassword = "1234";
const correctName = "Demo";
const correctPassword2 = "1234";


const register = (username, password, errorDiv) => {
   
    if (username === correctUsername && password === correctPassword) 
      {
        window.location.href = "profile.html";
      }

    else { 
        errorDiv.classList.remove("hidden");
    }
}

const setup = () => {
    const registerButton = document.getElementById("register");

  registerButton.addEventListener("click", () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const errorDiv = document.getElementById("error-message");
        
        register(username, password, errorDiv);
    });
};

export default setup;
