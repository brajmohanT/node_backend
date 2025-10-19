console.log("File System Module...");

import fs from "fs";

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
    fs.watchFile()
}

// appendFile()

