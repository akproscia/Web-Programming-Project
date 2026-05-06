class User {

    constructor(displayName, userName, email, password, bio){
        this.displayName = displayName;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.bio = bio;

        this.interests = []; //function to split from list by comments
        this.following = []; //should we have followers and following instead?
        this.friends = []; //mutuals

        this.contacts = {
            spotify: null,
            letterboxd: null,
            goodreads: null,
            instagram: null,
            discord: null,
            steam: null,
        };
    }

    // Setters
    setDisplayName(displayName) { this.displayName = displayName; }
    setUserName(userName) { this.userName = userName; }
    setPassword(password) { this.password = password; }
    setBio(bio) { this.bio = bio; }


    // Getters
    getDisplayName() { return this.displayName; }
    getUserName() { return this.userName; }
    getBio() { return this.bio; }

    setContact(platform, url) {
        // need to chech to make sure that the platform exists and is in our system
        if (platform in this.contacts) {
            this.contacts[platform] = url;
        }
    }
    //adds to the list of users they are following
    addFollowing(user){
        if (!this.following.includes(user)) {
            this.following.push(user);
        }
    }

    addInterest(interest) {
        this.interests.push(interest);
    }
    
}

export class App {
    // read inputs and create an account
    constructor() {
        // set up references
        // constructor/ loadProfile get username/Name from server so that it can be displayed
        // on the users profile
        this.profileDisplayName2 = document.querySelector("#profileDisplayName");
        this.profileDisplayUsername2 = document.querySelector("#profileDisplayUsername");
      
        this.loadProfile();
    }

    async loadProfile()
    {
        try {
            // sends request to get data on the current user
            const response = await fetch('/api/currentUser');

            if (response.ok) {
                const userData = await response.json();
                this.renderUser(userData);
            } else {
                console.log("No user logged in");
                window.location.href = 'login.html'; 
            }
        } catch (error) {
            console.error("Error loading profile", error);
        }
    }

    //creates user
    renderUser(user) {
        this.profileDisplayName2.textContent = user.displayName;
        this.profileDisplayUsername2.textContent = `@${user.userName}`;
        const pfpElement = document.querySelector(".profile-pic");
        //makes sure the selected profile pic appears on the profile page
        if (pfpElement && user.profilePic) {
        pfpElement.src = `images/${user.profilePic}`;
        }
    }
    

    /*
    Needs to be developed further!
    showContacts(user) {
        const container = document.querySelector(".connect-list");

        const icons = {
            spotify: "/images/spotify-logo.png",
            letterboxd: "/images/letterboxd-logo.png",
            goodreads: "/images/goodreads-logo.png",
            instagram: "/images/instagram-logo.png",
            discord: "/images/discord-logo.png",
            steam: "/images/steam-logo.png",
        };

        for (const [platform, url] of this.user.contacts) {
            if (url != null) {
                const item = document.createElement("div");
                item.classList.add("connect-item"); // make connect-item class in css!
                const img = document.createElement("img");
                img.src = icons[platform];
                const link = document.createElement("a");
                link.href = url;
                link.
                container.appendChild();

            }
        }
    }
    */

    createAccount() {
        const account = new User();
        this.users.push(account);
    }
}

