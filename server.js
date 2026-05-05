import express from 'express';
import fs from 'fs';

// Import posts and user data
import initialUsers from './data/users.json' with { type: 'json' };
import posts from './data/posts.json' with { type: 'json' };

const app = express();

app.use(express.json()); //allows us to parse through JSON files
app.use(express.static('public')); // Serves static files from the public folder


/********************
** User Management **
********************/

class UserManager {
    constructor(dataPath, users) {
        this.dataPath = dataPath;
        this.users = users;
    }

    authenticate(username, password) {
        const user = this.users.find(u => u.userName === username);
        
        if (!user) {
            return { success: false, message: 'Username does not exist.' };
        }
        
        if (user.password === password) {
            return { success: true, message: 'Welcome back!' };
        }
        
        return { success: false, message: 'Incorrect password.' };
    }

    registerUser(userData) {
        const { username, password, displayName } = userData;
        
        if (this.users.find(u => u.userName === username)) {
            return { success: false, message: 'Username already exists.' };
        }

        const newUser = {
            displayName: displayName,
            userName: username,
            email: "",
            password: password,
            interests: ["", ""]
        };

        this.users.push(newUser); 
        this.saveToFile();
        
        return { success: true, message: "User registered." };
    }

    saveToFile() {
        fs.writeFile(this.dataPath, JSON.stringify(this.users, null, 4), (err) => {
            if (err) console.error("Error saving users:", err);
        });
    }
}

/********************
** Display Username/Name on Myprofile page **
********************/

const userManager = new UserManager('./data/users.json', initialUsers);
let currentUser = null;

// set user as null until, a user is login in
// after Successfully login, take there username and name, so that it can be displayed 
// on their Myprofile page. 
app.post('/login', (req, res) => {
    const result = userManager.authenticate(req.body.username, req.body.password);
    if (result.success) {
        currentUser = userManager.users.find(u => u.userName === req.body.username);
    }
    res.json(result);
});

app.get('/api/currentUser', (req, res) => {
    if (currentUser) {
        res.json(currentUser);
    } else {
        res.status(401).json({ message: "User not logged in" });
    }
});

app.post('/register', (req, res) => {
    res.json(userManager.registerUser(req.body));
});

/********************
** Update Username/Name from settings page **
********************/

app.post('/api/updateUser', (req, res) => {
    if (!currentUser) {
        return res.status(401).json({ message: "Not logged in" });
    }

    const { displayName, userName, password } = req.body;
    currentUser.displayName = displayName || currentUser.displayName;
    currentUser.userName = userName || currentUser.userName;
    
    if (password) {
        currentUser.password = password;
    }

    // add changes to users.json
    userManager.saveToFile();
    res.json({ success: true, message: "Settings updated" });
});


/********************
** Post Management **
********************/

app.get('/data', (req, res) => {
    res.json(posts);
});

app.post('/save-data', (req, res) => {
    posts.push(req.body); // add the new post to the posts array in memory
    console.log(posts); // log the posts array to the console to verify that the new post was added
    fs.writeFile(
        'data/posts.json',
        JSON.stringify(posts),
        'utf8',
        (err) => {
            if (err) console.log(err);
            else console.log('Data Written Successfully!');
        }
    );
});

app.get('/failed-to-login');


/*****************
** Start Server **
*****************/

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});