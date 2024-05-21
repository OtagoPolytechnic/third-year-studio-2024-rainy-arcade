import Game from "@/Game"
import "../styles/Carousel.css"
const Carousel = () => {

    return(
        <div className="carousel-container">
            <Game name={"Game 3"}/>
            <Game name={"Game 1"}/>
            <Game name={"Game 2"}/>
        </div>
    )
}

export default Carousel