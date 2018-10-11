const electron = require('electron');
//url og path er et node.js module
const url = require('url');
const path = require('path');
//app og browserwindow hentes fra electronmodulet
const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

// listen for the app to be ready
app.on('ready', function(){
    //Create new window
    mainWindow = new BrowserWindow({});
    // Load HTML into window file://dirname/mainWindow.html er hvad den gør
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol:'file:',
        slashes: true
    }));
    // Quit app(including tilføj punkt) when closed
    mainWindow.on('closed', function(){
        app.quit();
    });
    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
});

// Handle create add window
function createAddWindow() {
     //Create new window
     addWindow = new BrowserWindow({
         width: 300,
         height: 200,
         title: 'Tilføj et punkt til listen'
     });
     // Load HTML into window file://dirname/mainWindow.html er hvad den gør
     addWindow.loadURL(url.format({
         pathname: path.join(__dirname, 'addWindow.html'),
         protocol:'file:',
         slashes: true
     }));
     // slet indhold når der lukkes
     addWindow.on('close', function(){
         addWindow = null;
     });
}

// Create menu template
const mainMenuTemplate = [
    {},
    {
        label:'File',
        submenu:[
            {
                label: 'Tilføj et punkt',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Slet alle punkter'
            },
            {
                label: 'Luk indkøbslisten',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
]