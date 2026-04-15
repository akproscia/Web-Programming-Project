class SocialMediaPost {
    constructor(parentElement, postTitle, postText, mediaType, user) {
        // save the parentElement, postTitle, postText, and userName to the object
        this.parentElement = parentElement;
        this.postTitle = postTitle;
        this.postText = postText;
        this.mediaType = mediaType;
        this.user = user.userName;
        this.profilePicURL = user.profilePicURL;

        // create the div as an instance variable, give it the class "post"
        this.div = document.createElement("div");
        this.div.classList.add("post");

        // // create the profile pic image and add it to the div instance variable
        // const image = document.createElement("img");
        // image.classList.add("profile-pic");
        // image.src = this.profilePicURL;
        // this.div.appendChild(image);

        // create the post title and add it to the div
        const title = document.createElement("h3");
        title.classList.add("post-title");
        title.textContent = postTitle;

        const username = document.createElement("p i");
        username.classList.add("post-username");
        username.textContent = `Posted by ${this.user}`;

        this.div.appendChild(title);
        this.div.appendChild(username);

        // media type
        

        // create the post text paragraph and add it to the div instance variable
        const p = document.createElement('p');
        p.textContent = postText;
        this.div.appendChild(p);

        // add the div to the parent element
        this.parentElement.appendChild(this.div);

    }
}

class App {
    constructor(){
        // App should handle references to the post container, text input, other passed values, etc.
        // It should also havr all methods that deal with creating and editing posts. everything will be done through this class. 
        

        //The following code is from Professor Hamza's github repo: 
        //  /csc324-spring-2026/make-a-post-with-classes/js/posts.js
        // It is intended to serve as a starting point, and we can adjust it as needed going forward.

        // set up a reference to the post container in the html
        this.postContainer = document.querySelector("#post-container");
        // set up a reference to the text input
        this.textInput = document.querySelector('#post-body');
        // set up an array variable that will hold the posts 
        this.posts = [];

        this.addPost = this.addPost.bind(this);
        this.sortPosts = this.sortPosts.bind(this);

        document.querySelector("#add-post").addEventListener('submit', this.addPost);
        document.querySelector("#sort").addEventListener("click", this.sortPosts);
    }
}

export default App;