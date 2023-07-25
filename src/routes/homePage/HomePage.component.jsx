import FeedItemPage from "../../Components/Styled Components/FeedItemPage";
import {useOutletContext} from "react-router-dom";


const HomePageComponent = () => {
    const [setButtomBarValue] = useOutletContext(); // [searchRes, setSearchRes, setButtomBarValue]


    return (
        <div>
            <FeedItemPage setValue={setButtomBarValue}/>
        </div>
    );
}

export default HomePageComponent;
