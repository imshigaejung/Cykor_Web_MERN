import { useParams } from "react-router-dom";
import { accountCurrentUser } from '../services/service.account';
import {profileRoom} from '../services/service_room';

async function ShowRoomInfo(){
    const {roomId} = useParams();
    const currentUserId = accountCurrentUser();
    const roomData = await profileRoom(roomId);

    
    return(
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mb-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">{roomData.name}</h2>
            <div className="space-y-2">
                <span className="capitalize text-2xl font-bold text-center text-purple-700 mb-4">{roomData.hostName}</span>
                <span>
                    <button onClick={Invite} type="button" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Invite
                    </button>  
                </span>
                <div className="flex justify-between text-gray-700 border-b pb-1">
                    {roomData.memberNames.map((memberName) => (  
                        <span className="font-medium capitalize">{memberName}</span>
                    ))}
                </div>
                <p className="capitalize text-2xl font-bold text-center text-lime-500 mb-4"> 생성일자 : 
                    <span>{roomData.createdAt}</span>                
                </p>
                </div>
        </div>
    )
}

function EditRoomInfo(){
    const {roomId} = useParams();
    
}

function Invite(){

}

function Kick(){

}

function Leave(){

}

export default function RoomInfo(){
    const {roomId} = useParams();
    const currentUserId = accountCurrentUser();
    const IsHost = async() => {
        try{
            if(currentUserId === roomData.host){
                return true;
            } else {
                return false;
            }
        } catch {
            alert('Unexpected error: location: 4');
        }
    }
    if(IsHost()){
        return(
            <ShowRoomInfo/>
        )
    } else {
        return(
            <EditRoomInfo/>
        )
    }

}