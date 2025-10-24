import fs from 'fs/promises'
import { get } from 'http'
import path from 'path'

const LOG_FILE = 'app.log'
const MAX_ARCHIEVE = 3
const SIZE_LIMIT = 0.10*1024*1024


  const fileExists = async (filePath) => {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  const getFileSize = async (filePath) => {
    try {
      const stats = await fs.stat(filePath);
      return stats.size;
    } catch {
      return 0;
    }
  }


const rotateLogs = async()=> {

      const absPath = path.resolve(LOG_FILE)
    const fileStat = await fs.stat(absPath)

     if( await fileExists(`${LOG_FILE}.${MAX_ARCHIEVE}`))
        await fs.unlink(`${LOG_FILE}.${MAX_ARCHIEVE}`)

    for(let i=MAX_ARCHIEVE-1; i>=1; i--){
        if(await fileExists(`${LOG_FILE}.${i}`))
            await fs.rename(`${LOG_FILE}.${i}`,`${LOG_FILE}.${i+1}`)
    }
    // if(app.log exist rename to appendFile.log1)

    if(await fileExists(LOG_FILE))
    await fs.rename(LOG_FILE,`${LOG_FILE}.${1}` )

    // createNewFile app.log
    await fs.writeFile(LOG_FILE,"")

    // delete app.log.4

}


const writeLog = async(txt)=> {

    // if log file [app.log] exists-> (check the file size -> (size>10MB rotate and then write )else write) else create file and write.
    const absPath = path.resolve(LOG_FILE)
    const fileStat = await fs.stat(absPath)

    console.log(await getFileSize(absPath), SIZE_LIMIT)
    if(await getFileSize(absPath) > SIZE_LIMIT){
        await rotateLogs()
    }

    if(!await fileExists(absPath)){
        await fs.writeFile(absPath, "")
    }

     const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] ${txt}\n`;
    await fs.appendFile(absPath, logLine )

}

for (let i = 0; i < 100000; i++) {
    await writeLog(`Sample log entry number ${i}`);
  }