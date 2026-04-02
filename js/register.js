const correctUsername = "Demo";
const correctPassword = "1234";
const correctName = "Demo";
const correctPassword2 = "1234";


const register = (password, passwordConfirmed, errorDiv) => {
   
    if (passwordConfirmed === correctPassword2 && password === correctPassword ) 
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
        const password = document.getElementById("password").value;
        const passwordConfirmed = document.getElementById("passwordConfirmed").value;
        const errorDiv = document.getElementById("error-message");
        
        register(password, passwordConfirmed, errorDiv);
    });
};

export default setup;
