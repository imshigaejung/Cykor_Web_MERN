import { useEffect, useState } from "react";
import { deleteFriends, listFriends } from "../services/service_social";
import { useNavigate } from "react-router-dom";
import { searchUser } from "../services/service_user";

function ListFriends(){
    const [friends, setFriends] = useState([]);
    useEffect(() => {
    const GetFriendsData = async() => {
        const response = await listFriends();
        setFriends(response);
    }
    GetFriendsData();
    }, []);
    return(
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mb-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Friends</h2>
            <div className="space-y-2">
                <div className="flex justify-between text-gray-700 border-b pb-1">
                    {friends.map((friend) => (  
                        <span className="font-medium capitalize">{friend.name}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

function SearchUsers(){
    const [showSearch, setShowSearch] = useState(false);
    const [searchedUser, setSearchedUser] = useState(null);
    const [profileUrl, setProfileUrl] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const handleChange = async (event) => {
        setSearchQuery(event.target.value);
        try{
            const response = await searchUser(searchQuery);
            if(response){
                setShowSearch(true);
                setSearchedUser(response);
                setProfileUrl(`/user/profile/${response.userId}`);
            } else {
                setShowSearch(false);
            }
        } catch {
            alert('Unexpected error: location: 5');
        }   
    };

    return (
        <div className="max-w-md mx-auto my-4">
            <input
                type="text"
                placeholder="검색어 입력"
                value={searchQuery}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showSearch && (
                <div className="flex justify-between text-gray-700 border-b pb-1">
                    <a href={profileUrl}>
                        <span className="font-medium capitalize">{searchedUser.name}</span>
                    </a>
                </div>
            )}
        </div>
    );
}



function SelectFriends(props){
    const [selected, setSelected] = useState([]);
    const [friends, setFriends] = useState([]);
    
    useEffect(() => {
        const GetFriendsData = async() => {
        const response = await listFriends();
        setFriends(response);
    }
    GetFriendsData();
    }, []);

    const toggleSelected = (friend) => {
        const wasSelected = selected.some(selectedFriend => selectedFriend.id === friend.id);
        if(wasSelected){
            setSelected(selected.filter(selectedFriend => selectedFriend.id !== friend.id));
        } else {
            setSelected([...selected, friend]);
        }
    }
    const handleSubmit = () => {
        props.setChecked(selected);
    }
    return(
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mb-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">{props.message}</h2>
            <div className="space-y-2">
                <div className="flex justify-between text-gray-700 border-b pb-1">
                    {friends.map((friend) => (  
                        <div key={friend.id} className="flex justify-between items-center">
                        <label className="flex items-center gap-2"> 
                            <span>{friend.name}</span>
                            <input type="checkbox" checked={
                                selected.some(selectedFriend => selectedFriend.id === friend.id)
                                } 
                                onChange={() => toggleSelected(friend)}/>
                        </label>
                        </div>
                    ))}
                </div>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full" onClick={handleSubmit}>
                    확인
                </button>
            </div>
        </div>
    )
}

export default function Social(){
    const [showSelect, setShowSelect] = useState(false);
    const [checked, setChecked] = useState([]);
    const navigate = useNavigate();
    useEffect(() => { 
        const DeleteFriend = async () =>{
        const confirmed = confirm("이 항목을 삭제하시겠습니까?");
        if (!confirmed) return;
        if(checked.length === 0) return;
            try{
                await Promise.all( 
                checked.map((friend) => {
                    deleteFriends(friend.id);
                }))
                alert('Deletion successful!');
                setChecked([]);
                navigate(0);
            } catch {
                alert('Unexpected error: location: 5');
                navigate(-1);
            }
        }
        DeleteFriend();        
        },[checked]);
    
    return(
        <>
            <div>
                <SearchUsers/>
                <button className="mt-4 bg-orange-600 text-white px-4 py-2 rounded w-full" 
                    onClick={() => setShowSelect(true)}> 친구 삭제 </button>
                {showSelect && (
                    <>
                        <SelectFriends showSelect={setShowSelect} setChecked={setChecked} message="삭제할 친구를 선택하세요"/>
                    </>
                )}
            </div>
            <div>
                <ListFriends />
            </div>
        </>
    )
}