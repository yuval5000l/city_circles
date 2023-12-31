import './App.css';
import {Route, Routes, useLocation} from "react-router-dom";
import NavigationComponent from "./routes/navigation/Navigation.component";
import FeedPageComponent from "./routes/feedPage/FeedPage.component";
import NotificationsComponent from "./routes/notifications/Notifications.component";
import SearchPageComponent from "./routes/search_page/SearchPage.component";
import Theme from "./Theme/Theme";
import {ThemeProvider} from "@mui/material/styles";
import CirclesPageComponent from "./routes/circles/CirclesPage.component";
import FriendsPageComponent from "./routes/friends/FriendsPage.component";
import ProfilePageComponent from "./routes/profile/ProfilePage.component";
import SignInPage from "./routes/logIn&signUp/SignInPage";
import SignUpPage from "./routes/logIn&signUp/SignUpPage";
import BusinessRegistrationStepper from "./routes/businessRegistrationPage/BusinessRegistrationStepper";
import BusinessPage from "./routes/businessPage/BusinessPage.component";
import OuterPerspectiveUserProfileComponent from "./routes/profileOuterPerspective/profileOuterPerspective";
import {useEffect} from "react";
import CreateUser from "./routes/logIn&signUp/CreateUser";

const ScrollToTop = () => {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null; // The ScrollToTop component doesn't render any additional elements
};

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={Theme}>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<NavigationComponent/>}>
                        <Route index element={<CirclesPageComponent/>}/>
                        <Route path="FeedPageComponent" element={<FeedPageComponent/>}/>
                        <Route path="NotificationsComponent" element={<NotificationsComponent/>}/>
                        <Route path="CirclesPageComponent" element={<CirclesPageComponent/>}/>
                        <Route path="FriendsPageComponent" element={<FriendsPageComponent/>}/>
                        <Route path="ProfilePageComponent" element={<ProfilePageComponent/>}/>
                        <Route path="OuterPerspectiveUserProfileComponent"
                               element={<OuterPerspectiveUserProfileComponent/>}/>
                        <Route path="BusinessRegistrationStepperComponent" element={<BusinessRegistrationStepper/>}/>
                        <Route path="BusinessPage" element={<BusinessPage/>}/>

                    </Route>
                    <Route path="SearchPageComponent" element={<SearchPageComponent/>}/>
                    <Route path="signInPage" element={<SignInPage/>}/>
                    <Route path="SignUpPage" element={<SignUpPage/>}/>
                    <Route path="SignUpPageHelper" element={<CreateUser/>}/>

                    {/*<Route path="BusinessPage" element={<BusinessPage/>}/>*/}
                </Routes>
            </ThemeProvider>
        </div>
    );
}

export default App;
