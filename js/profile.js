class user {

    constructor(displayName, userName, email, password){
        this.displayName = displayName;
        this.userName = userName;
        this.email = email;
        this.password = password;
        
    }

    setDisplayName(displayName) {
        this.displayName = displayName;
    }
    setUserName(userName) {
        this.userName = userName;
    }
    setBio(bio) {
        this.bio = bio;
    }

    getDisplayName() {
        return this.displayName;
    }
    getUserName() {
        return this.userName;
    }
    getBio() {
        return this.bio;
    }

    

}