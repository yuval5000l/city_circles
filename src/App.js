import './App.css';
import {Route, Routes} from "react-router-dom";
import NavigationComponent from "./routes/navigation/Navigation.component";
import HomePageComponent from "./routes/homePage/HomePage.component";
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


function App() {
    return (
        <div className="App">
            <ThemeProvider theme={Theme}>
            <Routes>
                <Route path="/" element={<NavigationComponent />}>
                    <Route index element={<HomePageComponent />} />
                    <Route path="NotificationsComponent" element={<NotificationsComponent/>}/>
                    <Route path="CirclesPageComponent" element={<CirclesPageComponent/>}/>
                    <Route path="FriendsPageComponent" element={<FriendsPageComponent/>}/>
                    <Route path="ProfilePageComponent" element={<ProfilePageComponent/>}/>
                    <Route path="BusinessRegistrationStepperComponent" element={<BusinessRegistrationStepper/>}/>
                </Route>
                <Route path="SearchPageComponent" element={<SearchPageComponent />} />
                <Route path="signInPage" element={<SignInPage/>}/>
                <Route path="SignUpPage" element={<SignUpPage/>}/>
            </Routes>
            </ThemeProvider>
        </div>
    );
}

export default App;
