console.log("File System Module...");

import fs from "fs";
import fsp from "fs/promises";

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

