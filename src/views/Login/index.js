import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import enterHandle from "../../utils/enterHandle";


const Login = () => {

const navigate = useNavigate();
const [user, setUser] = useState({
    loginUser : {
        Username: "",
        Password: ""
    }
});

useEffect(()=> {
    const checkLogin = async() => {
        try{
        const token = sessionStorage.getItem('authToken');
        let response = await fetch(`http://localhost:8080/validateUser?token=${token}`);
        let data = await response.json();
        if (await data === true) {navigate('/AddPackage')}
        } catch(err) {
            alert('Szerver hiba');
            navigate('/')
        }
    }
    checkLogin();

}, [])

const handleUnameChange = (e) => {
    setUser(prevState => ({
        loginUser: {
            ...prevState.loginUser,
            Username: e.target.value
        }
    }));
}

const handlePwChange = (e) => {
    setUser(prevState => ({
        loginUser: {
            ...prevState.loginUser,
            Password: e.target.value
        }
    }));
    
}

const submitLoginForm = (e) => {
    e.preventDefault();
    userAuthentication();
}

const userAuthentication = async() => {
    let response = await fetch(`http://localhost:8080/Login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user.loginUser),
    })
     let data = await response.json()
     if (data === "") {
        alert("Hibás felhasználó név vagy jelszó")
     } else {
        await sessionStorage.setItem("authToken", data);
        navigate('/AddPackage')
     }

}


    return (
        <div className="middleSquare">
        <h3>Futár bejelentkezés</h3><br />
        <form id="LoginForm" onSubmit={submitLoginForm} >
            <div className="container">
                <div className="row form-row">
                    <div className="col">
                        <input type="text"  className="form-control" placeholder="Felhasználónév" onChange={handleUnameChange} onKeyDown={enterHandle} required />
                    </div>
                </div>
                <div className="row form-row">
                    <div className="col">
                        <input type="password" className="form-control" placeholder="Jelszó" onChange={handlePwChange} onKeyDown={enterHandle} required />
                    </div>
                </div>
                <div className="row form-row">
                    <div className="col">
                    <button className="btn btn-light" onClick={() => {navigate('/')}}>Vissza</button>
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-light">Bejelentkezés</button>
                    </div>

                </div>
            </div>
        </form>
    </div>
    )
}

export default Login;