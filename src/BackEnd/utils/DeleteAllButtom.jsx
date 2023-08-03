// DeleteAllButton.js
import React from 'react';
import {db} from '../config/firebase';
import 'firebase/firestore';
import {collection, getDocs, deleteDoc} from "firebase/firestore";

const DeleteAllButton = ({name}) => {
    const handleDeleteAll = () => {

        // Replace 'collectionName' with the name of your collection
        getDocs(collection(db, name)).then((querySnapshot) =>
        {
            querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref).then(r => {});

        })});

    };

    return (
        <button onClick={handleDeleteAll}>
            Delete All Documents in {name}
        </button>
    );
};

export default DeleteAllButton;