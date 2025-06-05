import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {accountLogin, accountSignup} from '../services/service_account';


async function handleSubmit(event, action, setAction, navigate){
    event.preventDefault();
    try{
        if(action == 'Login'){
            const userData = {
                stringId: event.target.stringId.value,
                password: event.target.password.value
            }
            const response =  await accountLogin(userData);
            //결과 출력
            if(response.status >= 200 && response.status < 300){
                alert(response.data.message);
                navigate('/main');
            } else if(response.status >= 400){
                alert(response.data.error);
                navigate(-1);
            }
        } else if (action == 'Signup'){
            const userData = {
                name: event.target.stringId.value,
                stringId: event.target.stringId.value,
                password: event.target.password.value
            }
            const response =  await accountSignup(userData);
            //결과 출력
            if(response.status >= 2 && response.status < 300){
                alert(response.data.message);
                setAction('Login');
            } else if(response.status >= 400){
                alert(response.data.error);
                navigate(-1);
            }
        }
    } catch {
        alert('Unexpected error: location: 1');
    }
}

function InputUserinfo(props){
    return(
        <form onSubmit={(event) => handleSubmit(event, props.mode, props.changeMode, props.navigate)}>
                <p><input type='text' name='stringId' placeholder='id'/></p>
                <p><input type='password' name='password' placeholder='pw'/></p>
                <p><input type='submit' value={props.mode}/></p>        
        </form>
    )
}

export default function Account(props){   
    const [action, setAction] = useState('Login');
    const navigate = useNavigate();
    return (
        <>        
        <h3>{action}</h3>
        <div>
            <InputUserinfo mode={action} changeMode={setAction} navigate={navigate} />
            <button onClick={() => setAction((action === 'Login')?'Signup':'Login')}>
                {(action === 'Login')?'Go to Sign up':'Go to Login'}
            </button>
        </div>
        </>    
    )
}



