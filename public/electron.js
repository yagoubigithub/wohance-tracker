const electron = require("electron");
const isDev = require("electron-is-dev")
require('v8-compile-cache');



const { app, dialog , Tray } = electron;
const path = require("path")
const fs = require("fs")




app.commandLine.appendSwitch('ignore-certificate-errors');

let tray; 
app.on("ready", () => {

 /*  fs.mkdir(path.join(__dirname ,  "image_apps") .toString(), { recursive: true }, (err) => {
    if (err) throw err;
});

 */


  
 

  const mainWindow = require('./mainWindow');

 //  mainWindow.setMenu(null);
 
/*  const DevTools = require('./devTools')
 const devTools = new DevTools(isDev); */

 const ActiveWin = require('./activeWin')
 const activeWin = new ActiveWin();
 
   
  //set the icon tray for windows and mac
  //for mac should have 2 icons one 16x16 and other 32X32

  const iconName =
  process.platform === "win32" ? "windows-icon.png" : "iconTemplate.png";
const iconPath = path.join(__dirname, `./img/${iconName}`);

//initial the tray
tray = new Tray(iconPath);

//this toolTip is for when you hover the tray icon will show the title
//I just take the title from index.html
tray.setToolTip("workplus");


//get the tray position in the screen
  const { x, y } = tray.getBounds();
 
  //console.log(x,y)

  //get the width and the height of the mainWindow
  const { width, height } = mainWindow.getBounds();

  //set the new position of the mainwindow
  //by default mainwindow will show in the center of the screen
  //we want to show the screen in the  corner of the screen

  const yPosition = process.platform === "darwin" ? y : y - height;
  mainWindow.setBounds({
    x:parseInt( x - width / 2 - 100),
    y: yPosition,
    width,
    height,
  });

 

tray.on("click" ,  ()=>{

    if(mainWindow.isVisible()){
        mainWindow.hide();
    }else{
        mainWindow.show();
    }
})

   
  


  
  
});