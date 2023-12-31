import {auth, db, timestamp} from "../config/firebase";
import {collection, doc, setDoc, getDocs, getDoc, updateDoc} from "firebase/firestore";
import User from "./UserClass"

export default class Business {

    static async getAllBusinessesNamesLabels() {
        let lst = [];
        const querySnapshot = await getDocs(collection(db, "Business"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            lst.push({label: doc.data().name});
        });
        return lst;
    }
    static async getAllBusinessesNamesDictionary() {
        let dictionary = {};
        const querySnapshot = await getDocs(collection(db, "Business"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            dictionary[doc.data().name] = businessConverter["fromFirestore"](doc, doc.data());
        });
        return dictionary;
    }
    static async getAllBusinessesNamesLabelsWithoutMyReview() {
        let lst = [];
        const querySnapshot = await getDocs(collection(db, "Business"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            let flag = true;
            for (const review of doc.data().reviews)
            {
                if (review.userID === auth.currentUser.uid)
                {
                    flag = false;
                    break;
                }
            }
            if (flag)
            {
                lst.push({label: doc.data().name});
            }
        });
        return lst;
    }

    static async getAllBusinessesNamesLabelsWithoutMyFootprint() {
        let lst = [];
        const querySnapshot = await getDocs(collection(db, "Business"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            let flag = true;
            for (const footprint of doc.data().footprints)
            {
                if (footprint.userID === auth.currentUser.uid)
                {
                    flag = false;
                    break;
                }
            }
            if (flag)
            {
                lst.push({label: doc.data().name});
            }
        });
        return lst;
    }
    static async getAllBusinessesData() {
        let lst = [];
        const querySnapshot = await getDocs(collection(db, "Business"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            lst.push(doc.data());
        });
        return lst;
    }

    static async getAllBusinesses() {
        let lst = [];
        const querySnapshot = await getDocs(collection(db, "Business"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            // console.log(new Business({name: doc.data().name, type:doc.data().type,
            // address: doc.data().address, openingHours: doc.data().openingHours,
            // contact: doc.data().contact, social: doc.data().social, }));
            const options = doc.data();
            lst.push(businessConverter["fromFirestore"](doc, options));
        });
        return lst;
    }

    static async makeBusiness(name, type, address, profilePic, openingHours,
                              contact, social = [],
                              pictures = [], rating = [0, 0], last_visited = [], reviews = [],
                              footprints = [], circlesFootprint = new Map(), circlesReviews = new Map()) {
        let coord = await Business.handleGeocode(address);
        if (coord === undefined) {
            coord = [0, 0];
        }
        // console.log(circlesFootprint instanceof Object);
        if (circlesFootprint.size === 0) {
            circlesFootprint = {};
            // console.log(User.ListOfCircles);
            User.ListOfCircles.forEach(b_type => circlesFootprint[b_type] = 0);
        }
        if (circlesReviews.size === 0) {
            circlesReviews = {}
            User.ListOfCircles.forEach(b_type => circlesReviews[b_type] = 0);
        }
        let new_business = new Business(name, type, address, coord, openingHours[0],
            contact, social, profilePic,
            pictures, rating, last_visited, reviews, footprints, circlesFootprint, circlesReviews);
        await new_business.signIn();
        new_business.openingHours = translateOpeningHoursToArrays(openingHours[0]);
        return new_business;
    }


    constructor(name, type, address, coord, openingHours,
                contact, social = [], profilePic,
                pictures = [], rating = [0, 0], last_visited = [], reviews = [],
                footprints = [], circlesFootprint = {}, circlesReviews = {}) {
        this.name = name;
        this.type = type;
        this.address = address;
        this.openingHours = openingHours;
        this.contact = contact;
        this.social = social;
        this.profilePic = profilePic;
        this.pictures = pictures;
        this.reviews = reviews;
        this.rating = rating;
        this.coord = coord;
        this.last_visited = last_visited;
        this.footprints = footprints;
        this.circlesFootprints = circlesFootprint;
        this.circlesReviews = circlesReviews;
    }

    signIn = async () => {
        try {
            const ref = doc(db, "Business", this.name).withConverter(businessConverter);
            await setDoc(ref, this);

            await this.setOpeningHours(this.openingHours, ref);

        } catch (err) {
            console.error(err);
        }
    };

    toString() {
        return "Business name: " + this.name_ + "\nBusiness address: " + this.address + "Coord: " + this.coord;
    }

    async addUserReview(userID, userName, userPhoto, reviewContent, rating,circles) {
        const review = {
            userID: userID,
            userName: userName,
            userPhoto: userPhoto,
            content: reviewContent,
            rating: rating,
            timestamp: timestamp.now().toDate(),
            userCircles: circles

        };
        circles.forEach(circle => this.circlesReviews[circle] += 1);

        this.reviews.push(review);
        this.rating[0] += rating;
        this.rating[1] += 1;
        await this.saveToFirebase();
    }

    async addUserFootprint(userID, userName, userPhoto, circles) {
        const footprint =
            {
                userID: userID,
                userName: userName,
                userPhoto: userPhoto,
                timestamp: timestamp.now().toDate(),
                userCircles: circles
            }
        circles.forEach(circle => this.circlesFootprints[circle] += 1);
        this.footprints.push(footprint);
        await this.saveToFirebase();
    }

    static async handleGeocode(address) {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                    address
                )}&format=json&limit=1`
            );
            const data = await response.json();
            if (data.length > 0) {
                const {lat, lon} = data[0];
                return [parseFloat(lat), parseFloat(lon)];
            }
            return [0, 0];
        } catch (error) {
            console.error('Error geocoding address:', error);
            return [0, 0];
        }
        // eslint-disable-next-line no-unreachable
        // noinspection UnreachableCodeJS
        return [0, 0]
    };

    getName(){ return this.name;}
    getRating() {
        return (this.rating[0] !== 0) ? this.rating[0] / this.rating[1] : this.rating[1];
    }

    getProfilePic() {
        return this.profilePic;
    }

    getBusinessType() {
        return this.type;
    }
    getContacts()
    {
        return this.contact;
    }
    getCirclesCount()
    {
        let combined_dictionary = {};
        for (const [key, value] of Object.entries(this.circlesFootprints)) {
            combined_dictionary[key] = value + this.circlesReviews[key];
        }
        // this.circlesFootprints.forEach(circle => {combined_dictionary[circle] = this.circlesFootprints[circle] + this.circlesReviews[circle]});
        return combined_dictionary; //{"HUJI":5, "YoYo": 0, "RockNRoll": 0};
    }
    getReviews()
    {
        return this.reviews;
    }
    getFootprints()
    {
        return this.footprints;
    }

    getAllUsersThatUsedService(ListOfCirclesToInclude)
    {
        let setUsers = new Set();
        for (const footprint of this.footprints) {
            if (ListOfCirclesToInclude.length === 0 ||
                footprint.userCircles.filter(value => ListOfCirclesToInclude.includes(value)).length > 1)
            {
                setUsers.add(footprint.userID);
            }
        }
        for (const review of this.reviews) {
            if (ListOfCirclesToInclude.length === 0 ||
                review.userCircles.filter(value => ListOfCirclesToInclude.includes(value)).length > 1)
            {
                setUsers.add(review.userID);
            }
        }
        return setUsers.size;
    }

    getSumFootprintsAndReviews(ListOfCirclesToInclude)
    {
        let SumFootprintsAndReviews = 0;
        if (ListOfCirclesToInclude.length === 0)
        {
            for (const [key, value] of Object.entries(this.circlesFootprints)) {
                SumFootprintsAndReviews += value + this.circlesReviews[key];
            }
            return SumFootprintsAndReviews;
        }
        ListOfCirclesToInclude.forEach(circle => SumFootprintsAndReviews += this.circlesFootprints[circle] + this.circlesReviews[circle]);
        return SumFootprintsAndReviews;
    }
    getRatingCircles(ListOfCirclesToInclude)
    {
        let sumOfReviews = 0;
        if (ListOfCirclesToInclude.length === 0)
        {
            return this.rating;
        }
        let count = 1;
        for (const review of this.reviews) {
            if (review.userCircles.filter(item=> ListOfCirclesToInclude.includes(item)).length > 0)
            {
                sumOfReviews += review.rating
                count++;
            }
        }
        return sumOfReviews / count;
    }
    async setOpeningHours(openingHoursArray, ref) {
        this.openingHours = openingHoursArray;
        await updateDoc(ref,
            {
                openingHours: openingHoursArray
            })
        return true;
    }

    async saveToFirebase() {
        const ref = doc(db, "Business", this.name).withConverter(businessConverter);
        await setDoc(ref, this);
    }

    static async getAllBusinessByName()
    {
        let dictionary = {};
        const querySnapshot = await getDocs(collection(db, "Business"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            // console.log(new Business({name: doc.data().name, type:doc.data().type,
            // address: doc.data().address, openingHours: doc.data().openingHours,
            // contact: doc.data().contact, social: doc.data().social, }));
            const options = doc.data();
            dictionary[options.name] = businessConverter["fromFirestore"](doc, options);
        });
        return dictionary;
    }
}

Business.ListOfTypes = ["Creative Services" , "Food & Drinks", "Music", "Outdoors" ,
    "Lifestyle & Home", "Health & Wellness", "Consulting", "Technology Solutions","Handmade Crafts"];

const businessConverter = {
    toFirestore(business) {
        return {
            name: business.name,
            type: business.type,
            address: business.address,
            openingHours: translateArraysToOpeningHours(business.openingHours), // TODO fix
            contact: business.contact,
            social: business.social,
            profilePic: business.profilePic,
            pictures: business.pictures,
            rating: business.rating, //.map((rat)=> rat),
            coord: business.coord, //.map((coo) => coo),
            last_visited: business.last_visited,
            reviews: business.reviews,
            footprints: business.footprints,
            circlesFootprint: business.circlesFootprints,
            circlesReviews: business.circlesReviews
        };
    },
    fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        return new Business(data.name, data.type, data.address, data.coord,
            translateOpeningHoursToArrays(data.openingHours), data.contact,
            data.social, data.profilePic, data.pictures,
            data.rating, data.last_visited, data.reviews, data.footprints,
            data.circlesFootprint,
            data.circlesReviews);
    },
};

export function translateOpeningHoursToArrays(openingHours) {
    let lstDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const regex = /(\d+),(\d+)/g;
    let openingHoursArray = {};
    for (let i = 0; i < 7; i++) {
        const matches = openingHours[lstDays[i]].matchAll(regex);
        const result = [];

        for (const match of matches) {
            const hour = parseInt(match[1]);
            const minute = parseInt(match[2]);
            result.push([hour, minute]);
        }
        openingHoursArray[lstDays[i]] = result;
    }
    return openingHoursArray;
}

function translateArraysToOpeningHours(openingHours) {
    let lstDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let openingHoursArray = {};
    for (let i = 0; i < 7; i++) {
        let openHours = ("0" + openingHours[lstDays[i]][0][0]).slice(-2);
        let openMinutes = ("0" + openingHours[lstDays[i]][0][1]).slice(-2);
        let closeHours = ("0" + openingHours[lstDays[i]][1][0]).slice(-2);
        let closeMinutes = ("0" + openingHours[lstDays[i]][1][1]).slice(-2);
        openingHoursArray[lstDays[i]] = "start " +
            openHours +//.format("HH")+
            "," + openMinutes +//.format("MM")+
            " end " + closeHours +//.format("HH")+
            "," + closeMinutes;//.format("MM");

    }
    // return "start "+day[0].format("HH")+","+day[0].format("MM")+ " end " + day[1].format("HH")+","+day[1].format("MM");
    return openingHoursArray;
}


export async function getBusinessByName(name) {
    const ref = doc(db, "Business", name).withConverter(businessConverter);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        // Convert to Business object
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }
}