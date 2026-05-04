import express from 'express';
import fs from 'fs';
import initialUsers from './data/users.json' with { type: 'json' };

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

const app = express();
const userManager = new UserManager('./data/users.json', initialUsers);

app.use(express.json());
// Serves static files from the root and specific folders
app.use(express.static('./')); 

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    res.json(userManager.authenticate(username, password));
});

app.post('/register', (req, res) => {
    res.json(userManager.registerUser(req.body));
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});