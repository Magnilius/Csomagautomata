import HomeButton from "./HomeButton";


const Home = () => {
    return(
        <div className="homeGrid">
          <HomeButton name="Csomag hozzáadás futárként" link="Login"/>
          <HomeButton name="Csomag átvétele" link="GetPackage"/>
        </div>
    ) 
}

export default Home;