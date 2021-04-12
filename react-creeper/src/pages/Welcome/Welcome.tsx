import {Link} from "react-router-dom"

import style from "./Welcome.module.css"

const Welcome = () => {
    return <div className={style.welcome}>
        Welcome to Creeper Game!
        <Link to="/game">Begin</Link>

    </div>
}

export default Welcome