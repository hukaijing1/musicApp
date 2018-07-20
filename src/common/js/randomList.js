function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);   
}
export default function randomList(list) {  
    let len = list.length;
    for (let i = 0; i < len;i++){
        let j = random(0, i);
        let t = list[i];
        list[i] = list[j];
        list[j] = t;
    }
    return list;
}