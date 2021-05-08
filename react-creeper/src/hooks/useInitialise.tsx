import useLocalStorage from "./useLocalStorage"
import defaultImages from "../defaultImages"
import { shuffleArray } from "../utility/functions";
 

function initialiseCells(imgArray: Array<string>) {

    const sessionImg = imgArray.length > 16? imgArray.slice(0, 16) : imgArray;
    shuffleArray(sessionImg);
    let cells = sessionImg.map((l) => {
      return { image: l, isCreeper: false };
    });
    const creepers = cells.slice(0, 4).map((c) => {
      return { ...c, isCreeper: true };
    });
    const safe = cells.slice(4);
    cells = creepers.concat(safe);
    shuffleArray(cells);
    return cells;
  }


function useInitialise(){

    const {retrieveImages} = useLocalStorage("creeper-images")
    const userImages = retrieveImages()

    if (userImages) {
        return initialiseCells(userImages)
    } else {
        return initialiseCells(defaultImages) 
    }


}

export default useInitialise