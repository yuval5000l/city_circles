import {storage} from "../config/firebase";
import {useState} from "react";
import {ref, uploadBytes} from "firebase/storage";



export const uploadFile = async (file) => {
    if (!file) return;
    const filesFolderRef = ref(storage, `projectFiles/${file.name}`);
    try{
        await uploadBytes(filesFolderRef, file);
        console.log(file);
    } catch (err){
        console.log(err);
    }
    return filesFolderRef.storage;
}
export default function UploadPic(file)
{
    return "";

}