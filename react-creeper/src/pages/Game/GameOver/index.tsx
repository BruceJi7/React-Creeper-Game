
import {A, B, All} from "../../../style/images/winner"

type ScoreType = {
  score: {
    A: number;
    B: number;
  };
};

function GameOver({ score }: ScoreType) {

    console.log("Game Over: ", score)
    
    if (score["A"] > score["B"]){
        return <img src={A} alt="Team A Wins!"/>;

    } else if (score["B"] > score["A"]) {
        return <img src={B} alt="Team B Wins!"/>;
    } else {
        return <img src={All} alt="Uhh both teams win!"/>;
    }
}

export default GameOver;
