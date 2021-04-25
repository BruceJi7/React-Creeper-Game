
import style from "./TurnIndicator.module.css"

function TurnIndicator({isPlayerTurn}: {isPlayerTurn:boolean}){
    
    return isPlayerTurn ?  <div className={style.yesYourTurn}></div> : <div className={style.notYourTurn}></div>
}

export default TurnIndicator