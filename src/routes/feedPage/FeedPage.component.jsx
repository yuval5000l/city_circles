import FeedItemPage from "../../Components/Styled Components/FeedItemPage";
import {useOutletContext} from "react-router-dom";
// import {useOutletContext} from "react-router-dom";


const FeedPageComponent = () => {
    // const [setButtomBarValue] = useOutletContext(); // [searchRes, setSearchRes, setButtomBarValue]

    const [searchRes, setSearchRes, setButtomBarValue, dictBusiness, lstUsers, user] = useOutletContext();

    return (<>
            <FeedItemPage dictBusiness={dictBusiness} lstUsers={lstUsers} user={user}/>
            {/*<FeedItemPage setValue={setButtomBarValue}/>*/}
        </>
    );
}

export default FeedPageComponent;
