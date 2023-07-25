import {storage} from "../config/firebase";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
// import {ref, getDownloadURL} from "firebase/storage";


// let imageRef = ref(storage, "projectFiles/profile.jpg");
// getDownloadURL(imageRef).then((url) => {
//         //from url you can fetched the uploaded image easily
//         console.log(url);
//
//         // setImageName(url);
//     })
//     .catch((e) => console.log('getting downloadURL of image error => ', e));
// console.log(imageRef);


export const uploadFile = async (file) => {
    let urlAddress = "";
    if (!file) return;
    const filesFolderRef = ref(storage, `projectFiles/${file.name}`);
    try{
        await uploadBytes(filesFolderRef, file);
    } catch (err){
        console.log(err);
    }
    await getDownloadURL(filesFolderRef).then((url) => {
        urlAddress = url;
        return urlAddress;
    }).catch((e) => console.log('getting downloadURL of image error => ', e));
    return urlAddress;
}
// export default function UploadPic(file)
// {
//     return "";
//
// }