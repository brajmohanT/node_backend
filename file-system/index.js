console.log("File System Module...");

import fs from "fs";
import fsp from "fs/promises";
import path from 'path'

const FILE_NAME_PROMISE = 'copypromise.txt'

const data = " we are writing into the file name as copy";
// fs.writeFile('copy.txt',data, (err)=>{
// fs.writeFile('./jaja/copy.txt',data, (err)=>{
// fs.writeFile('/copy.txt',data, (err)=>{
// fs.writeFile('<*>copy.txt',data, (err)=>{
// fs.writeFile('copy.txt',undefined, (err)=>{

// Question: List down the ways in which you will get errors.

const writeFile = () => {
  fs.writeFile("copy.txt", data, "utf8", (err) => {
    if (err) {
      console.log("File-System index.js writeFile", err);
    } else {
      console.log("File Change Made Successfuly!");
    }
  });
};

const readFile = () => {
  //QUESTIONS: What Happens when utf8 is not used?
  // Why it happens?
  fs.readFile("copy.txt", "utf8", (err, data) => {
    if (err) {
      console.log("File-system", "Issue with reading file", err);
    } else {
      console.log("FIle Data", "\n", data);
    }
  });
};

const appendFile = () => {
  const newData = "\n this is new data in new line3.";
  fs.appendFile("copy.txt", newData, "utf8", (err) => {
    if (err) {
      console.log("Something gone wrong with appenidng task");
    } else {
      console.log("appended new data Successfuly");
    }
  });
};

const deleteFile = ()=>{
    fs.unlink('copy.txt',(err)=>{
        if (err) {
            
        } else {
            
        }
    })
}

const watchFile = ()=>{
    fs.watch('copy.txt','utf8',(evnt,fileNm)=>{

        console.log("\nFile Is being changed ",fileNm, "has", evnt)
        
    })
}

// appendFile()


/* Promise based methods: More modern way */

const writeFilePromise = async()=>{
    try {
        await fsp.writeFile(FILE_NAME_PROMISE, data,'utf8')  
        console.log("File Created with data")
    } catch (error) {
        console.log("Error Writing FIle ", error)
    }
}

const readFilePromise = async()=>{
    try {
        const dataRead= await fsp.readFile(FILE_NAME_PROMISE,'utf8')  
        console.log("File data  ", dataRead)
    } catch (error) {
        console.log("Error Reading FIle ", error)
    }
}

const appendFilePromise = async()=>{
    try {
        const dataToAppend = "Append this data"
        await fsp.appendFile(FILE_NAME_PROMISE, dataToAppend,'utf8')  
        console.log("File apended data  ")
    } catch (error) {
        console.log("Error appending FIle ", error)
    }
}

const deleteFilePromise = async()=>{
    try {
        await fsp.unlink(FILE_NAME_PROMISE)  
        console.log("File deleted  ")
    } catch (error) {
        console.log("Error deleting FIle ", error)
    }
}


const watchFilePromise = async()=>{
    try {
        const watcher = fsp.watch('copy.txt')
        for await (const event of watcher)
            console.log("watching ", event.eventType)
    } catch (error) {
        console.log("error watching file ", error)
    }
}
// writeFilePromise()
// deleteFilePromise()
// watchFile()
// watchFilePromise()


/* Path Module  */

const filePath = path.join('dirName','folderName','fileName.json')
const filePathResolved = path.resolve('dirName','folderName','fileName.json')

/* KNOW:  / this is the absolute path sign */
// const filePathResolved = path.resolve('dirName','/folderName','fileName.json')

// console.log("this is the file path ", filePath)
// console.log("resolved this is the file path ", filePathResolved)
// KNOW: __dirname is a global variable in Node.js that contains the absolute path of the directory where the current JavaScript file resides.
// THis varible doesn't exists in ES module only in comman js
// console.log("absolute path of current working directy ", __dirname)


const baseName = path.basename("/user/brajmohan/file.txt")
const dirName = path.dirname("/user/brajmohan/file.txt")
const extensionName = path.extname("/user/brajmohan/file.json")
const parsePathName = path.parse("/user/brajmohan/file.json")
// console.log("Base Name", baseName)
// console.log("dir Name", dirName)
// console.log("ext Name", extensionName)
// console.log("parsed path Name", parsePathName)


// console.log(fs.existsSync('copy.txt'))

/* 
process.argv array
Index,Value,Description
[0]: /path/to/node: The path to the Node.js executable itself.
[1]: /path/to/your/script.js: The path to the JavaScript file being executed.
[2]: user_input: The first actual command-line argument provided by the user at the launch of program.
*/
/* console.log(process.argv[0])
console.log(process.argv[1])
console.log(process.argv[2]) */



//fs.stat() method : returns the stats about the path.
// returns the stat object conatining info of stat props
/* 
Property/Method	Description
.size	The total size of the file in bytes.
.isFile()	A method that returns true if the path points to a regular file.
.isDirectory()	A method that returns true if the path points to a directory (folder).
.mtime	The "Modified Time"—the time the file's content was last modified (as a Date object).
.birthtime	The "Birth Time"—the time the file was created (as a Date object).
.atime	The "Access Time"—the time the file was last accessed (read).

*/

const statOftxt = fs.statSync('copy.txt')
// console.log('stat of file ', statOftxt);

