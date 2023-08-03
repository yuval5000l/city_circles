// DeleteAllButton.js
import React from 'react';
import db from '../config/firebase';
import 'firebase/firestore';

const DeleteAllButton = (name) => {
    const handleDeleteAll = () => {

        // Replace 'collectionName' with the name of your collection
        const collectionRef = db.collection(name);

        // Delete all documents in the collection
        collectionRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            });
        });
    };

    return (
        <button onClick={handleDeleteAll}>
            Delete All Documents in {name}
        </button>
    );
};

export default DeleteAllButton;