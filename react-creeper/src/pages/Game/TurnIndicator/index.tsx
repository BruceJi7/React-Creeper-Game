
import style from "./TurnIndicator.module.css"

function TurnIndicator({team, isPlayerTurn}: {team:string, isPlayerTurn:boolean}){
    
    return isPlayerTurn ?  <div className={style.indicator}>
        It's Team {team}'s turn
    </div> : <div className={style.indicator}>
        Team {team}
    </div>
}

export default TurnIndicator