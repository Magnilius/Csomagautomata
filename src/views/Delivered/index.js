import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Delivered = () => {

    const params = useParams();
    const [timeLeft, setTimeLeft] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (timeLeft === 0) {
            navigate('/');
            setTimeLeft(null)
        }

        if(!timeLeft) return;

        const countDownInterval = setInterval (()=> {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(countDownInterval)
    }, [timeLeft])

    useEffect(()=> {
        setTimeLeft(90);
    }, [])

    return (
        <div className="middleSquare">
            <div className="row form-row">
                <h1>Kedves Ügyfelünk!</h1>
            </div>
            <div className="row form-row">
                <h3>A csomagod a {params.boxNum}. fiókban található!</h3>
            </div>
            <div className="row form-row">
                <h3>A rendszer automatikus visszairányít a főoldalra: {timeLeft}</h3>
            </div>
            <div className="row form-row">
                <div className="col">
                    <button className="btn btn-light" onClick={() => {navigate('/GetPackage')}}>Új átvétel indítása</button>
                </div>
                <div className="col">
                    <button className="btn btn-light" onClick={() => {navigate('/')}}>Főoldal</button>
                </div>
            </div>
        </div>
    )
}

export default Delivered;