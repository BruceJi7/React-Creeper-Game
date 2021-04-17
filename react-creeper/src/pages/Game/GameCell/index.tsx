import {useState} from "react"

import style from "./GameCell.module.css"

type Props = {
    image:string
    isCreeper:boolean

}

function GameCell({image, isCreeper}: Props){
    
    const [isRevealed, setRevealed]= useState<boolean>(false)
    
    if (isRevealed) {

        if (isCreeper){
            return <div className={style.creeperCard} onClick={() => setRevealed(true)}>&nbsp;</div> 
        }

        else {
            return <div className={style.safeCard} onClick={() => setRevealed(true)}>&nbsp;</div>
        }
        
    } else {
        return <div className={style.hiddenCard} onClick={() => setRevealed(true)}>{image}</div>
    }

}

export default GameCell