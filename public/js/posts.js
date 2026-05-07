class SocialMediaPost {
    constructor(parentElement, postTitle, postText, mediaType, user, appInstance) {
        // save the parentElement, postTitle, postText, and userName to the object
        this.parentElement = parentElement;
        this.postTitle = postTitle;
        this.postText = postText;
        this.mediaType = mediaType;
        this.user = user.userName;
        this.appInstance = appInstance; 

        // create the div as an instance variable, give it the class "post"
        this.div = document.createElement("div");
        this.div.classList.add("post");
        this.div.classList.add(`post--${mediaType}`); // add the media type as a class for styling purposes (to add a stripe of color on the left later)

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

        postInfo.appendChild(document.createTextNode("-")); // add a separator between the username and date

        const date = document.createElement("span");
        date.classList.add("post-date");
        date.textContent = new Date().toDateString();
        postInfo.appendChild(date);

        this.div.appendChild(postInfo);

        // --- final row: body text ---
        const p = document.createElement('p');
        p.classList.add("post-text");
        p.textContent = postText;
        this.div.appendChild(p);

        // buttons to edit and delete posts ---
        const controls = document.createElement("div");
        controls.classList.add("post-controls");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => this.handleEdit();

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("btn-delete");
        deleteBtn.onclick = () => this.handleDelete();

        controls.appendChild(editBtn);
        controls.appendChild(deleteBtn);
        this.div.appendChild(controls);

        this.addToDOM(); // add the div to the DOM
    }

    handleDelete() {
        if (confirm("Are you sure you want to delete this post?")) {
            this.appInstance.deletePost(this);
        }
    }

    handleEdit() {
        const newTitle = prompt("Edit Title:", this.postTitle);
        const newText = prompt("Edit Body:", this.postText);

        if (newTitle && newText) {
            this.appInstance.editPost(this, newTitle, newText);
        }
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

class PostsApp {
    constructor() {
        // App should handle references to the post container, text input, other passed values, etc.
        // It should also havr all methods that deal with creating and editing posts. everything will be done through this class. 

        // set up a reference to the post container in the html
        this.postContainer = document.getElementById("posts-list");
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

            document.getElementById("header-username-link").innerHTML = `<i>${this.currentUser.userName}</i> - My Profile`;

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
        const myPosts = data.filter(obj => obj.user.userName.toLowerCase() === this.currentUser.userName.toLowerCase());
        for (const obj of myPosts) { 
            this.createPost(obj); 
        }

        // enable the post form and give it a submit listener        
        this.postForm = document.getElementById("add-post");
        this.postForm.addEventListener('submit', this.submitPost);

        // enable the sort button and give it a click listener
        this.refreshButton = document.getElementById("refresh-posts"); 
        this.refreshButton.addEventListener("click", this.refreshPosts);

        // all call new method applyPostControls
        document.getElementById("search-posts").addEventListener("input", () => this.applyPostControls()); 
        document.getElementById("filter-posts").addEventListener("change", () => this.applyPostControls());
        document.getElementById("sort-posts").addEventListener("change", () => this.applyPostControls());
    }

    applyPostControls() {
        const searchTerm = document.getElementById("search-posts").value.toLowerCase(); // get search term, convert to lowercase for case-sensitivity
        const filterValue = document.getElementById("filter-posts").value; // get filter value from dropdown
        const sortValue = document.getElementById("sort-posts").value; // get sort value from dropdown

        let visiblePosts = this.posts.filter(post => {
            const matchesFilter = filterValue === "all" || post.mediaType === filterValue; // check if post matches filter
            const matchesSearch = post.postTitle.toLowerCase().includes(searchTerm) || post.postText.toLowerCase().includes(searchTerm); // filter posts based on search term
            return matchesFilter && matchesSearch; // return true if post matches both filter and search criteria
        });

        if (sortValue === "oldest") {
            visiblePosts.sort((a, b) => new Date(a.div.querySelector(".post-date").textContent) - new Date(b.div.querySelector(".post-date").textContent)); // sort posts by date, oldest to newest
        } else if (sortValue === "newest") {
            visiblePosts.sort((a, b) => new Date(b.div.querySelector(".post-date").textContent) - new Date(a.div.querySelector(".post-date").textContent)); // sort posts by date, newest to oldest
        } else if (sortValue === "a-z") {
            visiblePosts.sort((a, b) => a.postTitle.localeCompare(b.postTitle)); // sort posts alphabetically
        }

        this.renderPosts(visiblePosts); 
    }

    renderPosts(visiblePosts) {
        // remove all of the posts from the DOM and then add them back in the order they are in the this.posts array
        // changed from refreshPosts to renderPosts because it is now being used for filtering and sorting as well as refreshing
        this.posts.forEach(post => post.remove());
        visiblePosts.forEach(post => post.addToDOM());
    }

    refreshPosts() {
        this.renderPosts(this.posts); // re-render posts in the order they are in the this.posts array (which is the order they were loaded from the server, oldest to newest)
    }

    submitPost(event) {
        event.preventDefault(); // prevent the form from refreshing the page

        const postTitle = document.getElementById("post-title").value;
        const postText = document.getElementById("post-body").value;
        const mediaType = document.getElementById("media-type").value;

        if (!postTitle || !postText || !mediaType) {
            alert("Please fill in all fields before submitting a post.");
            return;
        }
        // prevents you from submitting an empty post.
        

        const obj = {
            postTitle: postTitle,
            postText: postText,
            mediaType: mediaType,
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

    createPost(obj) {
        const post = new SocialMediaPost(this.postContainer, obj.postTitle, obj.postText, obj.mediaType, obj.user, this);
        this.posts.push(post);
    }

    /// delete a post
    async deletePost(postObject) {
        const response = await fetch('/api/delete-post', {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postTitle: postObject.postTitle, user: postObject.user })
        });

        if (response.ok) {
            postObject.remove();
            this.posts = this.posts.filter(p => p !== postObject);
        }
    }
    
    //edit a post & delete posts
    // Source below was used for fetch methods.
    // source https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    async editPost(postObject, newTitle, newText) {
        const response = await fetch('/api/edit-post', {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                oldTitle: postObject.postTitle,
                newTitle: newTitle,
                newText: newText,
                user: postObject.user
            })
        });

        if (response.ok) {
            postObject.postTitle = newTitle;
            postObject.postText = newText;
            postObject.div.querySelector(".post-title").textContent = newTitle;
            postObject.div.querySelector(".post-text").textContent = newText;
        }
    }
}


export default PostsApp;