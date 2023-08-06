import FeedItemPage from "../../Components/Styled Components/FeedItemPage";
import {useOutletContext} from "react-router-dom";
// import {useOutletContext} from "react-router-dom";


const FeedPageComponent = () => {
    // const [setButtomBarValue] = useOutletContext(); // [searchRes, setSearchRes, setButtomBarValue]

    const [searchRes, setSearchRes, setButtomBarValue, lstBusiness, lstUsers, user] = useOutletContext();

    return (<>
            <FeedItemPage lstBusiness={lstBusiness} lstUsers={lstUsers} user={user}/>
            {/*<FeedItemPage setValue={setButtomBarValue}/>*/}
        </>
    );
}

export default FeedPageComponent;
