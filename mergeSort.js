//Recursive Merge Sort Algorithm
// ----------
export const mergeSort = (arr) => {
    if(!Array.isArray(arr)) return 'Not an array'
    if(arr.length<2){
        return arr;
    } else {
        let middle = Math.floor(arr.length / 2);
        let left = mergeSort(arr.slice(0,middle));
        let right = mergeSort(arr.slice(middle,arr.length));
        return merge(left,right);
    }
}

const merge = (a,b) => {
    if(!Array.isArray(a)||!Array.isArray(b)) return 'Not an array'
    let merged=[];
    while(a.length || b.length){
        (b[0]===undefined || a[0]<b[0]) ? 
            merged.push(a.shift()) : merged.push(b.shift())
    }
    return merged
}

export const isSorted = (arr) => {
    if(!Array.isArray(arr)) return false
    if(arr.length===1) return true;
    for(let n=0;n<arr.length;n++){
        if(arr[n]>arr[n+1])
            return false
    }
    return true
}