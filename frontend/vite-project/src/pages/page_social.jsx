import { useEffect, useState } from "react";
import { listFriends } from "../../../../backend/process/process_social";
import { accountCurrentUser } from "../services/service.account";

async function ListFriends(){
    const [friends, setFriends] = useState([]);
    const GetFriendsData = async() => {
        const response = await listFriends();
        setFriends(response);
    }
    GetFriendsData();
    return(
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mb-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Friends</h2>
            <div className="space-y-2">
                <div className="flex justify-between text-gray-700 border-b pb-1">
                    {friends.name.map((friendName) => (  
                        <span className="font-medium capitalize">{friendName}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

function SearchUsers(){

}

function DeleteFriend(){

}

function AddFriend(){

}

function SelectFriends(){
    const [friends, setFriends] = useState([]);
    const [selected, setSelected] = useState([]);
    useEffect(() => {
        const GetFriendsData = async() => {
        const response = await listFriends();
        setFriends(response);
    }
    GetFriendsData();
    }, []);

function toggleSelected(event){
    
}
    return(
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mb-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Friends</h2>
            <div className="space-y-2">
                <div className="flex justify-between text-gray-700 border-b pb-1">
                    {friends.map((friend) => (  
                        <div className="flex justify-between items-center">
                        <label> 
                            <span>{friend.name}</span>
                            <input type="checkbox" onChange={toggleSelected(friend.id)}/>
                        </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}