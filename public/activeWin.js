const methode = ActiveWin.prototype;

const mainWindow = require("./mainWindow");
const { ipcMain, desktopCapturer, screen } = require("electron");
const fileIcon = require("extract-file-icon");
const activeWindow = require("active-win");

var Jimp = require("jimp");

const fs = require("fs");
const path = require("path");
let activeWinInterval , screenshotInterval;
function ActiveWin() {
  // ActiveWin
 const display = screen.getPrimaryDisplay();
  ipcMain.on("start-get-active-win", () => {
    activeWinInterval = setInterval(() => {
      (async () => {
        
        activeWindow().then(currentWin=>{
          if (!currentWin) return;
          console.log(currentWin)
          const filename = currentWin.owner.name.split(".")[0];
          if (
            !fs.existsSync(path.join(__dirname, "image_apps", filename + ".png"))
          ) {
            //  icon.extract(currentWin.owner.path, path.join(__dirname ,  "image_apps") .toString()  );
  
            const icon = fileIcon(currentWin.owner.path, 32);
  
            Jimp.read(icon)
              .then((image) => {
                // Do stuff with the image.
                image
                  .writeAsync(
                    path.join(__dirname, "image_apps", filename + ".png")
                  )
                  .then(() => {
                    mainWindow.webContents.send("upload_icon", {
                      path: path.join(__dirname, "image_apps", filename + ".png"),
                      name: currentWin.owner.name,
                    });
                  });
              })
              .catch((err) => {
                // Handle an exception.
              });
          }
  
          mainWindow.webContents.send("current-win", {
            title: currentWin.title,
            platform: currentWin.platform,
            name: currentWin.owner.name,
          });

        }).catch(err=>{
          console.log(err)
        })

      

       

        
     
      })();
    }, 5000);

//display.size.width, display.size.height
 

screenshotInterval = setInterval(()=>{
 
      desktopCapturer
      .getSources({
        types: ["screen"],
        thumbnailSize: {
          width: 780,
          height: 600,
        },
      }).then(async (sources)=>{

        console.log(sources)
        sources.map(source=>{
          if(source.name === "Entire Screen"){

            const image = source.thumbnail.toDataURL()

            mainWindow.webContents.send("screenshot", {
            image
            });
          }
        })
      })


    } ,20000)
  });

  ipcMain.on("stop-get-active-win", () => {
    console.log("stop record");
    clearInterval(activeWinInterval);
    clearInterval(screenshotInterval);
  });
}
module.exports = ActiveWin;
