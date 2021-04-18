import {useState} from "react"


import creeperImg from "../../../style/images/creeperHead.png"
import cobbleImg from "../../../style/images/cobbleStone.png"
import style from "./GameCell.module.css"

type Props = {
    image:string
    isCreeper:boolean

}

function GameCell({image, isCreeper}: Props){
    
    const [isRevealed, setRevealed]= useState<boolean>(false)
    
    if (isRevealed) {

        if (isCreeper){
            return <div className={style.card} onClick={() => setRevealed(true)}><img src={creeperImg} alt="Bomb"/></div> 
        }

        else {
            return <div className={style.card} onClick={() => setRevealed(true)}><img src={cobbleImg} alt="Safe"/></div>
        }
        
    } else {
        return <div className={style.card} onClick={() => setRevealed(true)}><img src={image} alt="Unknown"/></div>
    }

}

export default GameCell