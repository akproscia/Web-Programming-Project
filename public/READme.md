## About the .js files
 
 ---Login.js--- (based off the sample code in class)
 This file takes the username and password input, if a user is found it will login the user in to their account and bring them to their profile page. 

The code starts in the "<script type="module">" in the html.
It calls the login.js and the constructor() gets the html references as user inputs and error messages, then it listens to the login button. When the button is clicked, the login() triggers a Post request to the server with the credentials entered. If the server confirms the credentials, then the user is brought to their profile page. If not showError() is called and will display, why the user could not be logged in. Also, if you are new and would like to register, there is a clickable link that will redirect you to the register page.

--Profile.js---
The code begins when  <script type="module"> import {App }from "./js/profile.js"; new App(); is called. Profile.js connects the users data to their profile page. This allows for data like their username and name to be displayed on their profile page. 

The constructor gets the references and triggers loadProfile(), which fetches the users data from the server. If it can succesfully get the data, then it triggers renderUser(), which fills the html with the username, displayname, and profile pic. 

---Register.js---
This code begins in register.html with "<script type="module">
import setup from "./js/register.js"; setup(); . Register.js creates a new account, using the input from the user, and by saving it to the user.json. 

Register.js creates an instance of the App class. Constructor() sets up the html form inputs, like the username and password. This method also has a register button that will take the users' inputs. After the register button is clicked it triggers register(). First, it checks if both passwords entered are the same, if not then showError() is triggered. Otherwise, the script will take the users input turn it into a JSON object, send a POST request to the register endpoint, and saves it to the json file. If nothing is wrong with the registration, you will be redirected to the login.page. 

----Settings.js--- 
Settings.js lets the user logout, delete their account, change their profile pic, username, displayname, and password. The code begins with "<script type="module"> import {SettingsApp} from "./js/settings.js"; new SettingsApp(); " in settings.html. 

Constructor() maps out the references and buttons, then calls loadCurrentData(), which auto fills the users current display name and username in the textboxs from the server. It also initializes multiple event listners to handle saving the changes. Selectpfp() gets the id of the picture the user clicks and saves it to the users json object so that the change is saved/visible. HandleDelete() triggers confirmation from the user on if they want to delete their account, if confirmed it sends a DELETE request to the server, removes it from the user.json file, and redirects to the login page. The Logout button redirects the user to the login page if clicked. 
  