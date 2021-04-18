import {useState, useEffect} from "react"

import GameCell from "./GameCell"

import {shuffleArray} from "../../utility/functions"

import style from "./Game.module.css"




const Game = () => {

    const [cells, setCells] = useState<Array<object>|null>(null)

    function initialiseCells(){
        const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"]
        shuffleArray(letters)
        let cells = letters.map(l => {return {image:l, isCreeper:false}})
        const creepers = cells.slice(0,4).map(c => {return {...c, isCreeper:true}})
        const safe = cells.slice(4)
        cells = creepers.concat(safe)
        shuffleArray(cells)
        return cells   
    }
    
    useEffect(()=> {

        const cells = initialiseCells()
        setCells(cells)

    }, [])

    return <div className={style.container}>
        <div className={style.board}>
            {cells && cells.map((c:any) => <GameCell key={c.image} image={c.image} isCreeper={c.isCreeper}/>)}
        </div>
    </div>
}

export default Game