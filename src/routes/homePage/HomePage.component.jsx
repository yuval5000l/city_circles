import FeedItemPage from "../../Components/Styled Components/FeedItemPage";
import {useOutletContext} from "react-router-dom";


const HomePageComponent = () => {
    const [searchRes, setSearchRes, setButtomBarValue] = useOutletContext();


    return (
        <div>
            <FeedItemPage setValue={setButtomBarValue}/>
        </div>
    );
}

export default HomePageComponent;
