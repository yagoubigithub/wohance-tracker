
const path =  require('path')

const { BrowserWindow, app } = require("electron");




let mainWindow = new BrowserWindow({
    show :false,
    height : 667,
    width : 600,
  // frame : false,
    webPreferences: {
      nodeIntegration : true,
      nativeWindowOpen : true,
      contextIsolation : false,
      allowRunningInsecureContent  : true,
      webSecurity : false
  
     
    }
  });
  
 

  
    if( app.isPackaged){

      mainWindow.loadFile( path.join(__dirname, "index.html"))
      mainWindow.setMenu(null)
    }else{
      mainWindow.loadURL("http://localhost:3000");
    }
  

  // Automatically open Chrome's DevTools in development mode.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
 
 
mainWindow.on('close', (e)=>{
  app.quit()
})

module.exports = mainWindow;

