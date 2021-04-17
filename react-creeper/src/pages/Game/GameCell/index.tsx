import {useState} from "react"

import style from "./GameCell.module.css"

type Props = {
    test:string
}

function GameCell({test}: Props){
    
    
    
    return <div className={style.cell}>{test}</div>
}

export default GameCell