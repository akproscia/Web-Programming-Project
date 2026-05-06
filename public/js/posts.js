class SocialMediaPost {
    constructor(parentElement, postTitle, postText, mediaType, user) {
        // save the parentElement, postTitle, postText, and userName to the object
        this.parentElement = parentElement;
        this.postTitle = postTitle;
        this.postText = postText;
        this.mediaType = mediaType;
        this.user = user.userName;

        // create the div as an instance variable, give it the class "post"
        this.div = document.createElement("div");
        this.div.classList.add("post");

        // Header: title on the left, media type on right.
        const header = document.createElement("div");
        header.classList.add("post-header");

        // --- top row: create the post title and media badge and add them to the div ---
        const title = document.createElement("h3");
        title.classList.add("post-title");
        title.textContent = postTitle;
        header.appendChild(title);

        const badge = document.createElement("p");
        badge.classList.add("media-badge");
        badge.classList.add(`media-badge--${mediaType}`); // add the media type as a class for styling purposes
        const capitalizedMediaType = mediaType.charAt(0).toUpperCase() + mediaType.slice(1); // capitalize the first letter of the media type for display purposes
        badge.textContent = capitalizedMediaType;
        header.appendChild(badge);

        this.div.appendChild(header);

        // --- second row: create username and date elements and add them to the div ---
        const postInfo = document.createElement("div");
        postInfo.classList.add("post-info");

        const username = document.createElement("span");
        username.classList.add("post-username");
        username.textContent = this.user;
        postInfo.appendChild(username);

        const date = document.createElement("span");
        date.classList.add("post-date");
        date.textContent = new Date().toLocaleDateString();
        postInfo.appendChild(date);

        this.div.appendChild(postInfo);

        // --- body text ---
        const p = document.createElement('p');
        p.classList.add("post-text");
        p.textContent = postText;
        this.div.appendChild(p);

        this.addToDOM(); // add the div to the DOM
    }

    // compare this post with another, for sorting purposes
    localeCompare(otherPost){
        // returns -1 if this.text lexicographically (alphanumerically) comes before otherPost.text
        // returns  1 if this.text lexicographically (alphanumerically) comes after otherPost.text
        // returns  0 if this.text === otherPost.text
        return this.postTitle.localeCompare(otherPost.postTitle);
    }

    // removes the div from the DOM
    remove() {
        this.div.remove();
    }

    //
    addToDOM() {
        this.parentElement.appendChild(this.div);
    }
}

class App {
    constructor() {
        // App should handle references to the post container, text input, other passed values, etc.
        // It should also havr all methods that deal with creating and editing posts. everything will be done through this class. 

        // set up a reference to the post container in the html
        this.postContainer = document.getElementById("post-container");
        // set up a reference to the text input
        this.textInput = document.getElementById("post-body");
        // set up an array variable that will hold the posts 
        this.posts = [];
        this.currentUser = null;

        this.submitPost = this.submitPost.bind(this);
        this.refreshPosts = this.refreshPosts.bind(this);

        this.loadCurrentUser();
    }

    async loadCurrentUser() {
        // fetch the current user from the server to load correct posts and save posts to correct user
        // also redirects to login if user is not logged in
        try {
            // sends req for data on the current user
            const response = await fetch('/api/currentUser');
            if (!response.ok) {
                window.location.href = 'login.html'; 
                return;
            }
            this.currentUser = await response.json();
            this.loadPosts(); // only loads posts once we know who's logged in
        } catch (error) {
            console.error("Error loading profile", error);
        }
    } 

    async loadPosts() {
        // fetch the posts from data/posts.json and save them to an array variable in the App object
        const response = await fetch("/data");
        const data = await response.json();
        
        // Filter through posts to only show posts from the current user
        const myPosts = data.filter(obj => obj.user.userName === this.currentUser.userName);

        // create a new post for each object in the data array
        for (const obj of myPosts) {
            this.createPost(obj);
        }

        // enable the post form and give it a submit listener        
        this.postForm = document.getElementById("add-post");
        this.postForm.addEventListener('submit', this.submitPost);

        // enable the sort button and give it a click listener
        this.refreshButton = document.getElementById("refresh-posts"); 
        this.refreshButton.addEventListener("click", this.refreshPosts);
    }

    createPost(obj) {
        // obj should have postTitle, postText, mediaType, and user
        const post = new SocialMediaPost(this.postContainer, obj.postTitle, obj.postText, obj.mediaType, obj.user);
        this.posts.push(post);
    }
    
    submitPost(event) {
        event.preventDefault(); // prevent the form from refreshing the page

        const obj = {
            postTitle: document.getElementById("post-title").value,
            postText: document.getElementById("post-body").value,
            mediaType: document.getElementById("media-type").value,
            user: { userName: this.currentUser.userName } // add pfp later?
        }


        fetch('/save-data', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        });

        this.createPost(obj);

        // clear the form inputs
        document.getElementById("post-title").value = "";
        document.getElementById("post-body").value = "";
        document.getElementById("media-type").value = "";
    }

    refreshPosts() {
        // remove all of the posts from the DOM and then add them back in the order they are in the this.posts array
        for (const post of this.posts) {
            post.remove();
            post.addToDOM();
        }
    }
}

export default App;