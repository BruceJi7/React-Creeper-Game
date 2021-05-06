export const shuffleArray = (array:Array<any>) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export const splitCleanly = (longString:string) => {
    return longString.split("\n").filter((n:string) => {
        return n.endsWith(".jpg") || n.endsWith(".png")
    } )
}

export const multiclass = (...args: Array<string>) => {
    return args.join(" ")
  }