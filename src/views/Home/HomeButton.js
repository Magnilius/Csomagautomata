import {useNavigate} from "react-router-dom";

const HomeButton = ({name,link}) => {
    const navigate = useNavigate();

    return(
        <div>
                <div className="homeBtn" onClick={() => navigate(`/${link}`)}>
                    <h4>{name}</h4>
                </div>
        </div>
    )
}

export default HomeButton;