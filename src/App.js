import './App.css';
import {Route, Routes} from "react-router-dom";
import NavigationComponent from "./routes/navigation/Navigation.component";
import HomePageComponent from "./routes/homePage/HomePage.component";
import NotificationsComponent from "./routes/notifications/Notifications.component";
import SearchPageComponent from "./routes/search_page/SearchPage.component";
import Theme from "./Theme/Theme";
import {ThemeProvider} from "@mui/material/styles";


function App() {
    return (
        <div className="App">
            <ThemeProvider theme={Theme}>
            <Routes>
                <Route path="/" element={<NavigationComponent />}>
                    <Route index element={<HomePageComponent />} />
                    <Route path="NotificationsComponent" element={<NotificationsComponent/>}/>

                </Route>
                <Route path="SearchPageComponent" element={<SearchPageComponent />} />

            </Routes>
            </ThemeProvider>
        </div>
    );
}

export default App;
