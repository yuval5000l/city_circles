import {db, timestamp} from "../config/firebase";
import {collection, doc, setDoc, getDocs, getDoc} from "firebase/firestore";

export default class Business
{
    static async getAllBusinesses()
    {
        let lst = [];
        const querySnapshot = await getDocs(collection(db, "Business"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            lst.push({label: doc.data().name});
        });
        return lst;
    }

    static async makeBusiness(name, type, address, openingHours,
                                     contact, social = [], profilePic = "",
                                     pictures = [],rating = [0,0], last_visited =[], reviews = [],
                              footprints = [])
    {
        let coord= await Business.handleGeocode(address);
        if (coord === undefined)
        {
            coord = [0,0];
        }
        let new_business = new Business(name, type, address, coord, openingHours,
            contact, social, profilePic,
            pictures, rating, last_visited, reviews, footprints);
        await new_business.signIn();
        return new_business;
    }


    constructor(name, type, address, coord, openingHours,
                contact, social = [], profilePic = "",
                pictures = [], rating = [0,0], last_visited =[], reviews =[],
                footprints = []) {
        this.name = name;
        this.type = type;
        this.address = address;
        this.openingHours = [];
        this.contact = contact;
        this.social = social;
        this.profilePic = profilePic;
        this.pictures = pictures;

        this.reviews = reviews;
        this.rating = rating;
        this.coord = coord;
        this.last_visited = last_visited;
        this.footprints = footprints;
    }
    signIn = async () => {
        try {
                const ref = doc(db, "Business", this.name).withConverter(businessConverter);
                await setDoc(ref, this);
            }catch (err) {
            console.error(err);
        }
    };
    toString()
    {
        return "Business name: " + this.name_ + "\nBusiness address: " + this.address + "Coord: "+this.coord;
    }
    async addUserReview(userID, reviewContent, rating)
    {
        const review = {
            userID: userID,
            content: reviewContent,
            rating: rating,
            timestamp: timestamp.now().toDate(),
        };
        this.reviews.push(review);
        this.rating[0] += rating;
        this.rating[1] += 1;
        await this.saveToFirebase();
    }

    async addUserFootprint(userID)
    {
        const footprint =
            {
                userID: userID,
                timestamp: timestamp.now().toDate(),
            }
        this.footprints.push(footprint);
        await this.saveToFirebase();
    }
    async saveToFirebase() {
        const ref = doc(db, "Business", this.name).withConverter(businessConverter);
        await setDoc(ref, this);
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
                const { lat, lon } = data[0];
                return [parseFloat(lat), parseFloat(lon)];
            }
            return [0,0];
        }
        catch (error) {
            console.error('Error geocoding address:', error);
            return [0,0];
        }
        // eslint-disable-next-line no-unreachable
        return [0,0];
    };


}


const businessConverter = {
    toFirestore(business) {
        return {
            name : business.name,
            type : business.type,
            address : business.address,
            // openingHours : business.openingHours,
            contact : business.contact,
            social : business.social,
            profilePic : business.profilePic,
            pictures : business.pictures,
            rating: business.rating,
            coord: business.coord, //.map((coo) => coo),
            last_visited: business.last_visited,
            reviews: business.reviews,
            footprints: business.footprints,
        };
    },
    fromFirestore(snapshot, options) {
        const data = snapshot.data(options);
        return new Business(data.name, data.type, data.address, data.coord,data.openingHours, data.contact,
            data.social, data.profilePic, data.pictures, data.rating, data.last_visited, data.reviews, data.footprints);
    },
};

export async function getBusinessByName(name)
{
    const ref = doc(db, "Business", name).withConverter(businessConverter);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        // Convert to Business object
        const business = docSnap.data();
        return business;
    } else {
        console.log("No such document!");
        return null;
    }
}