import FeedItemPage from "../../Components/Styled Components/FeedItemPage";
// import {useOutletContext} from "react-router-dom";


const HomePageComponent = () => {
    // const [setButtomBarValue] = useOutletContext(); // [searchRes, setSearchRes, setButtomBarValue]


    return (<>
            <FeedItemPage/>
            {/*<FeedItemPage setValue={setButtomBarValue}/>*/}
        </>
    );
}

export default HomePageComponent;
