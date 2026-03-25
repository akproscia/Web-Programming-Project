class User {

    constructor(displayName, userName, email, password, bio, interests){
        this.displayName = displayName;
        this.userName = userName;
        this.email = email;
        this.password = password;
        
        this.bio = bio;
        this.interests = []; //function to split from list by comments
        this.following = []; //should we have followers and following instead?

    }

    // Setters
    setDisplayName(displayName) {
        this.displayName = displayName;
    }
    setUserName(userName) {
        this.userName = userName;
    }
    setPassword(password) {
        this.password = password;
    }
    setBio(bio) {
        this.bio = bio;
    }


    // Getters
    getDisplayName() {
        return this.displayName;
    }
    getUserName() {
        return this.userName;
    }
    getBio() {
        return this.bio;
    }

    addInterest(interest) {
        this.interests.push(interest);
    }
    //adds to the list of users they are following
    addFollowing(user){
        this
    }

}

class App {
    // read inputs and create an account
    constructor() {
        // set up references
        this.displayName = document.querySelector("#");


    }

    createAccount() {
        const account = new User();
        this.users.push(account);
    }
}