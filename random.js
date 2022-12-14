export const randomNumber = (min,max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.floor(Math.random() * (max - min) + min));
}

export const randomArray = (min,max,elements) => {

    let arr = [];
    for(let i=0;i<elements;i++){
        arr.push(randomNumber(min,max));
    }
    console.log(arr);
    return arr;
}