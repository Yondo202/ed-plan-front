
export const NumberComma = (el) => {
    if(el){
        const num = el;
        var commas = num.toLocaleString("en-US");
        var commas = parseFloat(commas)
        var commas = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return commas
    }else{
        return null
    }
}

export const NumberComma2 = (el) => {
    if(el){
        const num = el;
        var commas = num.toLocaleString("en-US");
        var commas = parseFloat(commas)
        return commas
    }else{
        return null
    }
}

