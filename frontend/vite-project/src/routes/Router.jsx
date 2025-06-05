import {Routes, Route} from "react-router-dom";
import {Main} from "../pages/page_main";
import {Chatroom} from "../pages/page_chatroom";
import {Roominfo} from "../pages/page_roominfo";
import {Notification}from "../pages/page_notification";
import {Social} from "../pages/page_social";
import {Userprofile} from "../pages/page_userprofile";
import {Account} from "../pages/page_account";

function Router(){
    return(
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/room/:roomId" element={<Chatroom />} />
        <Route path="/room/:roomId/info" element={<Roominfo />} />
        <Route path="/friends" element={<Social />} />
        <Route path="/profile/:userId" element={<Userprofile />} />
        <Route path="/login" element={<Account/>} />
    </Routes>
    );
}

export default Router