const express = require('express');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const controller = require(`../controllers/controller.js`);
const userController = require(`../controllers/userController.js`);
const forumController = require(`../controllers/forumController.js`);
const homeController = require('../controllers/homeController.js');
const profileController = require('../controllers/profileController.js');
const settingsController = require('../controllers/settingsController.js');
const imageController = require('../controllers/imageController.js');
const threadController = require('../controllers/threadController.js');
const searchController = require('../controllers/searchController.js');

const app = express();

app.get('/', controller.getIndex);
app.get('/login', userController.getLogin);
app.post('/login', userController.loginAccount);

app.get('/register', controller.getSignup);
app.post('/register', userController.registerAccount);

app.get('/logout', userController.logoutAccount);

app.get('/checkUsername', userController.checkUsername);

app.get('/user/:username', profileController.getProfile);
app.get('/user/:username/edit', profileController.getEditProfile);
app.post('/user/:username/edit', profileController.postEditProfile);

app.get('/settings', settingsController.getSettings);
app.get('/changeUsername', settingsController.getChangeUsername);
app.post('/changeUsername', settingsController.postChangeUsername);
app.get('/changePassword', settingsController.getChangePassword);
app.post('/changePassword', settingsController.postChangePassword);
app.get('/delete', settingsController.deleteAccount);

app.post('/uploadImg', upload.single('edit_profile_photo'), imageController.postUpload);
app.get('/images/:name', imageController.getImage);


app.get('/subf/new', forumController.getAddSubforum);
app.post('/new/subf', forumController.postAddSubforum);
app.get('/checkSubforum', forumController.checkSubforum);

app.get('/subf/:subfName', forumController.getSubforum);
app.get('/subf/:subfName/join', forumController.joinSubforum); // TODO: Join subforum
app.get('/subf/:subfName/new/thread', threadController.getCreateThread);
app.post('/subf/:subfName/new/thread', threadController.postCreateThread); // TODO: Create new thread

app.get('/subf/:subfName/:threadId', threadController.getThread);
app.get('/subf/:subfName/:threadId/delete', threadController.getDeleteThread);
app.get('/reply/:threadId/:replyId/delete', threadController.getDeleteReply);
app.post('/subf/:subfName/:threadId', threadController.postThreadReply);

app.post('/action/like', threadController.postLike);
app.post('/action/dislike', threadController.postDislike);
app.post('/action/removeLike', threadController.postRemoveLike);
app.post('/action/removeDislike', threadController.postRemoveDislike);


app.get('/home', homeController.getHome);
app.get('/search', searchController.getSearch);

module.exports = app;
