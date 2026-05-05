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

class App {
    // read inputs and create an account
    constructor() {
        // set up references
        this.displayName = document.querySelector("#profileDisplayName");
        this.displayUserName = document.querySelector("#profileUserName");

        this.loadProfile();

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

export default function setup() {
    
}