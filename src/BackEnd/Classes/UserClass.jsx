import {auth, db, timestamp} from "../config/firebase";
import "firebase/auth";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore";
import {getBusinessByName} from "./BusinessClass";
// import {auth} from "./config/firebase";

export default class User {
    // TODO as little as I can
    constructor(email, password, name = "", userID_ = auth?.currentUser?.uid, review = [],
                footprint = [], circles = [], friends = [], profile_pic = "") {

        this.name_ = name;
        this.email_ = email;
        this.password_ = password;
        this.profile_pic = profile_pic;
        this.userID_ = userID_;
        this.reviews = review;
        this.footprints = footprint;
        this.circles = circles;
        this.friends = friends;
        // this.birthday = birthday;
    }

    signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, this.email_, this.password_).then(async cred => {
                this.userID_ = cred.user.uid;
                const ref = doc(db, "Users", cred.user.uid).withConverter(userConverter);
                await setDoc(ref, this);
                console.log("id is: ", this.userID_)
            });
        } catch (err) {
            console.error(err);
        }
    };

    getUserName() {
        return this.name_;
    }

    getUserId() {
        return this.userID_;
    }

    toString() {
        return "the user name is: " + this.name_ + ", the user ID is: " + this.userID_;
    }

    getCircles() {
        return this.circles;
    }
    getFootprints() {
        return this.footprints;
    }

    getUserReviews() {
        return this.reviews; // [{businessID: "", businessName: "", businessPhoto: "", content: "", rating: "", timestamp: timestamp Object},...]
    }

    async addBusinessReview(businessID, businessName, Photo, reviewContent, rating) {
        const review = {
            businessID: businessID,
            businessName: businessName,
            businessPhoto: Photo,
            content: reviewContent,
            rating: rating,
            timestamp: timestamp.now().toDate(),
            circles: this.circles
        };
        this.reviews.push(review);
        // console.log("Review added: ", review);
        await this.saveToFirebase();
    }

    async addBusinessFootprint(businessID, businessName, Photo) {
        const footprint = {
            businessID: businessID,
            businessName: businessName,
            businessPhoto: Photo,
            timestamp: timestamp.now().toDate(),
            circles: this.circles
        };
        this.footprints.push(footprint);
        // console.log("footprint added: ", footprint);
        await this.saveToFirebase();
    }

    async AddUserMoreInfo(name, school, neighborhood, hobby, pic) {

        // const circlesLst = {
        //     school: school,
        //     neighborhood: neighborhood,
        //     hobby: hobby,
        // };
        this.circles.push(school);
        this.circles.push(neighborhood);
        this.circles.push(hobby);
        this.name_ = name;
        this.profile_pic = pic;
        // this.birthday = birthday;
        // console.log("footprint added: ", footprint);
        await this.saveToFirebase();
    }

    async saveToFirebase() {
        const ref = doc(db, "Users", this.userID_).withConverter(userConverter);
        await setDoc(ref, this);
    }

    getPic() {
        return this.profile_pic;
    }

    getUserFootprints() {
        return this.footprints;
    }

    static async getUserFriendsById(id) {
        const user = await getUserById(id);
        return user?.friends;
    }
    async changeCircle(index, value)
    {
        this.circles[index] = value;
        await this.saveToFirebase();
    }
    async getMyReviews() {
        let listOfReviews = [];
        for (const review of this.reviews) {
            const business = await getBusinessByName(review.businessID);
            listOfReviews.push(this.feedItemConverter(review, business));
        }
        return listOfReviews;
    }

    feedItemConverter(review, business) {
        return {
            user_id: this.userID_, user_name: this.name_, profile_photo_url: this.profile_pic,
            circles: review.circles, time: review.timestamp.toDate(),
            business_name: business.name, business_photo_url: business.profilePic,
            rating: (business.rating[0] / business.rating[1]),
            url_to_business: business.id, review: review.content,
            review_address: review.content
        }
    }

    static async getFriendsReviews(userID) {
        const friends_id = await User.getUserFriendsById(userID);
        let listOfReviews = [];
        if (friends_id.length > 0) {
            for (const friend_id of friends_id) {
                const friend = await getUserById(friend_id);
                if (friend !== null) {
                    for (const review of friend.reviews) {
                        const business = await getBusinessByName(review.businessID);
                        listOfReviews.push(User.feedItemConverter(friend, review, business));
                    }
                } else {
                    console.error("Error getting friend from database!");
                    return listOfReviews;
                }
            }
        } else {
            console.log("Ain't got no friends!");
        }

        return listOfReviews;
    }

    static feedItemConverter(user, review, business) {
        return {
            user_id: user.userID_, user_name: user.name_, profile_photo_url: user.profile_pic,
            circles: review.circles, time: review.timestamp.toDate(),
            business_name: business.name, business_photo_url: business.profilePic,
            rating: (business.rating[0] / business.rating[1]),
            url_to_business: business.id, review: review.content,
            review_address: review.content
        }
    }
    static feedItemFootprintConverter(user, review, business) {
        return {
            user_id: user.userID_, user_name: user.name_, profile_photo_url: user.profile_pic,
            circles: review.circles, time: review.timestamp.toDate(),
            business_name: business.name, business_photo_url: business.profilePic,
            url_to_business: business.id
        }
    }
    static async getAllUsers()
    {
        let lst = [];
        const querySnapshot = await getDocs(collection(db, "Users"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            // console.log(new Business({name: doc.data().name, type:doc.data().type,
            // address: doc.data().address, openingHours: doc.data().openingHours,
            // contact: doc.data().contact, social: doc.data().social, }));
            const options = doc.data();
            lst.push(userConverter["fromFirestore"](doc, options));
        });
        return lst;
    }

    static async getAllUsersReviewsFootprintsExceptCurrentUser()
    {
        let lstUsers = [];
        const querySnapshot = await getDocs(collection(db, "Users"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            // console.log(new Business({name: doc.data().name, type:doc.data().type,
            // address: doc.data().address, openingHours: doc.data().openingHours,
            // contact: doc.data().contact, social: doc.data().social, }));
            const options = doc.data();
            if (options.userID !== auth?.currentUser?.uid)
            {
                lstUsers.push(userConverter["fromFirestore"](doc, options));
            }
        });

        let listOfReviews = [];
        for (const user of lstUsers)
        {
            for (const review of user.getUserReviews())
            {
                const business = await getBusinessByName(review.businessID);
                listOfReviews.push(User.feedItemConverter(user, review, business));
            }
            // for (const review of user.getUserFootprints())
            // {
            //     const business = await getBusinessByName(review.businessID);
            //     listOfReviews.push(User.feedItemFootprintConverter(user, review, business));
            // }
        }

        return listOfReviews;
    }
}

User.ListOfCirclesNeighborhoods = ["Old City",
    "Rehavia",
    "Talbieh",
    "German Colony",
    "Nayot",
    "Sheikh Jarrah",
    "Silwan",
    "Issawiya",
    "French Hill",
    "Katamon",
    "Baka",
    "Mea Shearim",
    "Malha"];
User.ListOfCirclesSchools = ["HUJI", "Bezalel", "Lev", "Hadassah", "Al-Quds", "Music Academy", "Azrieli", "Dacid Yelin", "Musrara", "Visual Theatre"]
User.ListOfCirclesPersonalities = [
    "ESTJ",
    "ENTJ",
    "ESFJ",
    "ISTJ",
    "ISFJ",
    "INTJ",
    "INFJ",
    "ESTP",
    "ESFP",
    "ENTP",
    "ENFP",
    "ISTP",
    "ISFP",
    "INTP",
    "INFP",
    "ENFJ"
]
User.ListOfCircles = [...User.ListOfCirclesNeighborhoods , ...User.ListOfCirclesSchools, ...User.ListOfCirclesPersonalities];

export async function getUserById(id) {
    if (id === null || id === undefined) {
        return null;
    }
    const ref = doc(db, "Users", id).withConverter(userConverter);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        // Convert to User object and return it
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }

}

export async function getUserCircles(id) {
    const user = await getUserById(id);
    return user.circles

}


export const SignIn = async ({email}, {password}) => {
    // const ref = doc(collection(db, "Users")).withConverter(userConverter);

    try {
        await createUserWithEmailAndPassword(auth, email, password).then(async cred => {

            // Adds a user with the same uid
            const data = {
                name: "",
                email: email,
                password: password,
                userID: cred.user.uid,
                reviews: [],
                footprints: [],
                circles: [],
                // birthday: null
                profile_pic: "",
                friends: [],
            }
            await setDoc(doc(db, "Users", cred.user.uid), data);
            return true;
            // await setDoc(ref, data);

        });
    } catch (err) {
        console.error(err);
        return false;
    }
    return true;

    // handleRefresh();
};

const userConverter = {
    toFirestore(user) {
        return {
            FirstName: user.name_,
            email: user.email_,
            password: user.password_,
            userID: user.userID_,
            reviews: user.reviews,
            footprints: user.footprints,
            circles: user.circles,
            friends: user.friends,
            profilePic: user.profile_pic
            // birthday: user.birthday
        };
    },
    fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        return new User(data.email, data.password, data.FirstName, data.userID, data.reviews, data.footprints,
            data.circles, data.friends, data.profilePic
            // data.birthday
        );
    },
};

export const LogIn = async ({email}, {password}) => {
    console.log("this is email", email)
    console.log("this is password", password)
    try {
        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // const user = userCredential.user;
            return true;
        })
    } catch (err) {
        console.error(err);
        return false;
    }
    return true;
};

export const CompareUserTimeStamp = (user_a, user_b) => {
    return user_b.time - user_a.time;
}