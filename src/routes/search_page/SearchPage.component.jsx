import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../BackEnd/config/firebase";


const SearchPageComponent = () => {

    useEffect(() => {
        check_sign_in();
    }, []);

    const check_sign_in = () => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                window.location.replace("/signInPage");
            }
        });
    };


    return (
        <div> SearchPage</div>

    );


}

export default SearchPageComponent;