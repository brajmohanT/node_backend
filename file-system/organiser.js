/* Flow */
// 1. get the desired folder as args
// 2. check if that folder exist. 
// 3. list all the files in that folder 
// 4. loop thorugh all the files 
// 5. check the extention of the current file and check if there is folder for that extention
// 6. if folder exist push rename the file (that is equal to moving the file) 
// 7. if folder not exists create and move file.

/*  Input: folder: OUTPUT: organised folder */

import fs from 'fs'
import path from 'path'

const filesExt = {
    images: ['.jpg', '.jpeg', '.png', '.gif'],
    videos: ['.mp4', '.mkv', '.mov'],
    docs: ['.pdf','.md','.txt'],
    code: ['.js','.json'],
}

const inputDir = process.argv[2]

if(!inputDir){
    console.log("😡No directory entered")
    process.exit(1)
}

const absoluteDirPath = path.resolve(inputDir)

if(!fs.existsSync(absoluteDirPath)){
    console.log('😔 No Such Directory exists')
    process.exit(1)
}

const outputDir = path.join(absoluteDirPath,'outputOrganised')

if(!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir)
}

const getCategory = (ext)=>{

    for(const entries of Object.entries(filesExt)){
        const [cat, extensions] = [...entries]
        
        if(extensions.includes(ext.toLowerCase())) return cat

    }
    return 'other'
}

const organiseFolder = ()=>{
    const files = fs.readdirSync(absoluteDirPath)

    for(const file of files ){
        const filePath = path.join(absoluteDirPath,file)
        const stat = fs.statSync(filePath)

        if(stat.isFile()){

            const fileExt = path.extname(filePath)
            const fileCategory = getCategory(fileExt)

            const catOutputDir = path.join(outputDir, fileCategory)

            if(!fs.existsSync(catOutputDir)){
                fs.mkdirSync(catOutputDir)
            }

            const destPath = path.join(catOutputDir,file)
            fs.copyFileSync(filePath, destPath)

            console.log("💖 file "+file+" moved to "+catOutputDir)
        }

    }
}

organiseFolder()
console.log("😍😍😍😍😍 All Organised")