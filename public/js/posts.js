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

        // create the post title and add it to the div
        const title = document.createElement("h3");
        title.classList.add("post-title");
        title.textContent = postTitle;
        this.div.appendChild(title);

        // create the media badge and add it to the div
        const badge = document.createElement("p");
        badge.classList.add("media-badge");
        badge.textContent = mediaType;
        this.div.appendChild(badge);

        // create username element and add it to the div
        const username = document.createElement("p");
        username.classList.add("post-username");
        username.textContent = `Posted by ${this.user}`;
        this.div.appendChild(username);        

        // create the post text paragraph and add it to the div instance variable
        const p = document.createElement('p');
        p.textContent = postText;
        this.div.appendChild(p);

        // add the div to the DOM
        this.addToDOM();
    }

    // compare this post with another, for sorting purposes
    localeCompare(otherPost){
        // returns -1 if this.text lexicographically (alphanumerically) comes before otherPost.text
        // returns  1 if this.text lexicographically (alphanumerically) comes after otherPost.text
        // returns  0 if this.text === otherPost.text
        return this.text.localeCompare(otherPost.text);
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

        this.submitPost = this.submitPost.bind(this);
        this.refreshPosts = this.refreshPosts.bind(this);

        this.loadPosts();
    }

    async loadPosts() {
        // fetch the posts from data/posts.json and save them to an array variable in the App object
        const response = await fetch("/data");
        const data = await response.json();
        
        // create a new post for each object in the data array
        for (const obj of data) {
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
            user: { userName: document.getElementById("user-name").value } // add pfp later?
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
        document.getElementById("user-name").value = "";
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