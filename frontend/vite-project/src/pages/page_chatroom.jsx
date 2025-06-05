import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {makeMessage, listMessage} from '../services/service_message';
import { accountCurrentUser } from '../services/service_account';

//route : /room/:roomId
function InputChat(){
    const [message, setMessage] = useState([]);
    const {roomId} = useParams();

    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            const messageData = {
                roomId: roomId,
                userId: accountCurrentUser,  
                text: message
            } 
            const response =  await makeMessage(messageData);
            //결과 출력

            if(response.status >= 400){
                alert(response.data.error);
            } else {
                setMessage([]);
            }
        } catch {
            alert('Unexpected error: location: 2');
        }
    }
    return(
        <form onSubmit={handleSubmit} className="fixed bottom-0 w-full flex justify-center bg-white p-4 shadow-md">
            <textarea
                name="message"
                placeholder="Input message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={1}
                className="w-2/3 resize-none p-2 border rounded-lg shadow focus:outline-none focus:ring focus:border-blue-300 max-h-40 overflow-y-auto"
            />
            <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Send
            </button>
        </form>
    )
}

function ListChatLog(){
    const [chatLogs, setChatLogs] = useState([]);
    const {roomId} = useParams();
    //채팅방 불러오기 시에만 작동
    useEffect(() => {
        const GetChatList = async() => {
            try{
                const response =  await listMessage(roomId);
                //결과 출력
                if(response.status >= 400){
                    alert(response.data.error);
                } else {
                    setChatLogs(response.data.reverse());
                }
            } catch {
                alert('Unexpected error: location: 3');
            }
        };
        GetChatList();
    }, [roomId]) 
    return(
        <div className="flex flex-col-reverse gap-2 p-4 pb-28 max-h-screen overflow-y-auto">
            {chatLogs.map((chat, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-2 shadow">
                    <strong className="block text-blue-700">{chat.userName}</strong>
                    <p className="text-sm">{chat.text}</p>
                </div>
            ))}
        </div>
    )
}



export default function Chatroom(){
    return (
        <>        
        <h3></h3>
        <div>
            
        </div>
        </>    
    )
}