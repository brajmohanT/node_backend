import fs from 'fs/promises'
import path from 'path'

const LOG_FILE = 'app.log'
const MAX_ARCHIEVE = 3
const SIZE_LIMIT = 10

const writeLog = async(txt)=> {

    // if log file [app.log] exists-> (check the file size -> (size>10MB rotate and then write )else write) else create file and write.
    const absPath = path.resolve(LOG_FILE)
    const fileStat = await fs.stat(absPath)

    if(!fileStat.isFile()){

    }

    if(fileStat.size()){

    }

}