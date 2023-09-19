const methode = DevTools.prototype;
const {BrowserWindow} = require('electron');
const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer');

function DevTools(isDev){
     // devTools


     if(isDev){
        const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer');
  // Or if you can not use ES6 imports
     /**
     const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
     */
     const { app } = require('electron');
     
     app.whenReady().then(() => {
         installExtension(REDUX_DEVTOOLS)
             .then((name) => console.log(`Added Extension:  ${name}`))
             .catch((err) => console.log('An error occurred: ', err));
     });
     }
    
   

}
module.exports = DevTools;