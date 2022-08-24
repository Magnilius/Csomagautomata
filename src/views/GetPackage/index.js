import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import enterHandle from "../../utils/enterHandle";


const GetPackage = () => {
    
const [packageNum, setPackageNum] = useState(0);
const [password, setPassword] = useState(0);
const inputRef = useRef()
const pwRef = useRef();
const navigate = useNavigate();

const handleNumChange = (e) => {
    let val = e.target.value
    if (val.length > 9) {
        val = val.slice(0, -1);
    }
    setPackageNum(val);
    e.target.value = val;
}

const handlePwChange = (e) => {
    let val = e.target.value
    setPassword(val);
}

const submitForm = (e)=> {
    e.preventDefault();
    getData();

}

const getData = async () => {
    try {
        let response = await fetch(`http://localhost:8080/GetPackage?code=${packageNum}&pass=${password}`);
    let data = await response.json(); 
    if (data == null) {
        resetForm();
    } else {
        await navigate(`/Delivered/${data}`)
    }
    } catch (error) {
        alert('Szerverhiba, türelmét kérjük a hiba javításáig');
    }
    
}

const resetForm = () => {
        alert('Hibás csomagszám vagy jelszó');
        inputRef.current.value = '';
        pwRef.current.value = '';
        setPackageNum(0);
        setPassword(0);
    
}


    
    
    return(
        <div className="middleSquare">
            <h3>Csomag átvétele</h3><br />
            <form id="PackageGetForm" onSubmit={submitForm}>
                <div className="container">
                    <div className="row form-row">
                        <div className="col">
                            <input type="text" ref={inputRef} className="form-control" placeholder="Csomag száma( pl.: 8Ag89JkL9)" onChange={handleNumChange} onKeyDown={enterHandle} required />
                        </div>
                    </div>
                    <div className="row form-row">
                        <div className="col">
                            <input type="password" ref={pwRef} className="form-control" placeholder="Csomaghoz tartozó jelszó" onChange={handlePwChange} onKeyDown={enterHandle} required />
                        </div>
                    </div>
                    <div className="row form-row">
                        <div className="col">
                        <button className="btn btn-light" onClick={() => {navigate('/')}}>Vissza</button>
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-light">Kiadás</button>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    ) 
}

export default GetPackage;