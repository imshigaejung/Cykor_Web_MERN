import { useState } from 'react'

function Login(props){
    const [is_login, setIs_login] = useState(null);

    return (
    <>        
        <h3>Welcome!</h3>
        <div>
            <form onSubmit={event=>{
                event.preventDefault();
                  
            }}>
                <p><input type="text" placeholder='id'></input></p>
                <p><input type='text' placeholder='pw'></input></p>
                <p><input type='submit' value={props.mode}></input></p>        
            </form>
        </div>
    </>    
    )
}

export default Login;