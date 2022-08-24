import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import enterHandle from "../../utils/enterHandle";

const AddPackage = () => {
    const navigate = useNavigate();
    const [newPackage, setNewPackage] = useState({
        Pack : {
            Size: "",
            LastDate: "",
            Container: 0
        }
    });

    const [packDropdown, setPackDropdown] = useState([])

    useEffect(()=> {
        const checkStorage = async() => {
            let response = await (fetch(`http://localhost:8080/storeCheck`))
            let data = await response.json();
            if (await data.length === 0) {
                alert('Az automata jelenleg tele van!')
                navigate('/')
            } else {
                let allSize = []
                await data.map(store => {
                    allSize.push(store.Size)
                })
              
                if (allSize.includes('A')) {
                    setPackDropdown([
                        <option value="">Csomag mérete</option>,
                        <option value="A">Nagy Csomag</option>,
                        <option value="B">Közepes Csomag</option>,
                        <option value="C">Kis Csomag</option>
                    ])
                } else if(allSize.includes('B')) {
                    setPackDropdown([
                        <option value="">Csomag mérete</option>,
                        <option value="B">Közepes Csomag</option>,
                        <option value="C">Kis Csomag</option>
                    ])
                } else {
                    setPackDropdown([
                        <option value="">Csomag mérete</option>,
                        <option value="C">Kis Csomag</option>
                    ])
                }
                
            }
        }
        const checkLogin = async() => {
            try{
            const token = sessionStorage.getItem('authToken');
            let response = await fetch(`http://localhost:8080/validateUser?token=${token}`);
            let data = await response.json();
            if (await data === false) {navigate('/Login')}
            } catch(err) {
                alert('Szerver hiba');
                navigate('/')
            }
        }
        checkLogin();
        checkStorage()
    }, [])

      
    const handleSelectChange = (e) => {
        setNewPackage(prevState => ({
            Pack: {
                ...prevState.Pack,
                Size: e.target.value
            }
        }));
    }

    const handleDateChange = (e) => {
        let today =  new Date().toISOString().split('T')[0];
        if (e.target.value >= today) {
            setNewPackage(prevState => ({
                Pack: {
                    ...prevState.Pack,
                    LastDate: e.target.value
                }
            }));
        } else {
            alert('Érvénytelen dátum bevitel')
            e.target.value = '';
        }
    }

    const addPackSubmit = (e) => {
        e.preventDefault();
        dataSubmitFetch();
    }


    const dataSubmitFetch = async() => {
        let response = await fetch(`http://localhost:8080/AddPackage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPackage.Pack),
    })
     let data = await response.json()
     if (data === "") {
        alert("Sikertelen bevitel");
     } else {
        alert("Sikeres csomag feltöltés");
        navigate('/')
     }

    }



    return (
        <div className="middleSquare">
        <h3>Új csomag hozzáadása</h3><br />
        <form id="AddPackForm" onSubmit={addPackSubmit}>
            <div className="container">
                <div className="row form-row">
                    <div className="col">
                        <select className="form-select" onChange={handleSelectChange} onKeyDown={enterHandle} required>
                            {packDropdown}
                        </select>
                    </div>
                </div>
                <div className="row form-row">
                    <div className="col">
                        <input type="date" className="form-control" onChange={handleDateChange} onKeyDown={enterHandle} required/>
                    </div>
                </div>
                <div className="row form-row">
                    <div className="col">
                    <button className="btn btn-light" onClick={() => {sessionStorage.removeItem('authToken');navigate('/')}}>Kijelentkezés</button>
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-light">Hozzáadás</button>
                    </div>

                </div>
            </div>
        </form>
    </div>
    )
}

export default AddPackage;