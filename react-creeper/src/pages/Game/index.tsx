import {useState, useEffect} from "react"

import GameCell from "./GameCell"

import {shuffleArray} from "../../utility/functions"

import style from "./Game.module.css"




const Game = () => {

    const [cells, setCells] = useState<Array<string>|null>(null)

    
    useEffect(()=> {
        const cells = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"]
        shuffleArray(cells)
        setCells(cells)

    }, [])

    return <div className={style.container}>
        <div className={style.board}>
            {cells && cells.map(c => <GameCell key={c} test={c}/>)}
        </div>
    </div>
}

export default Game