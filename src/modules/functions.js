const fs = require('fs')
const ini = require('ini')
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
module.exports = (client) => {

  client.Rnd = (min, max) => {
    return Math.floor((Math.random()*(max-min))+min)
  }

  client.getFiles = async (dir) => {

    const cmdFiles = await readdir(dir);
    let legacy = []
    let current = []
    cmdFiles.forEach(f => {
      if (!f.startsWith("save_") && !f.startsWith("_iislandsofwarsave_")) return;
      if (f.startsWith("save_"))current.push(f)
      else legacy.push(f)
    });
    console.log(`Found ${current.length} current save files and ${legacy.length} legacy files for a total of ${current.length+ legacy.length} files.`)
  return [current, legacy]}

  client.readLocalFile = (file = `./readyiisland.ini`) => {
    let result= fs.readFileSync(file, 'utf-8')
    return client.readFile(result)
  }

  client.readFile = (file) => {
    let result = ini.parse(file)
    return result
  }
  client.saveFile = (object) => {
    let result = ini.stringify(object)
    return result
  }
 
  client.finder = async (path =require('electron').remote.getGlobal('loaded').path ) =>{
    let files
    client = {}
    require('./functions')(client)
    files = await client.getFiles(path)
    return files
    
    }
 

  
  
  // `await client.wait(1000);` to "pause" for 1 second.
  client.wait = require("util").promisify(setTimeout);
  }