
export const groupBy = (list, field, arr = false) => {

    let data = list.reduce(function (rv, x) {
        (rv[x[field]] = rv[x[field]] || []).push(x);
        return rv;
    }, {});

    if (arr) {
        data = Object.values(data)
    }

    return data
};

export const makeSlug = (name) => {
    return makePlainText(name, '-')
}


export const makeKey = (name) => {
    return makePlainText(name, '_')
}

export const makePlainText = (name, delimiter) => {
    //converting name to lower case then spaces replacing with '-' 
    //removing other special chars
    //
    // eslint-disable-next-line
    return name.trim().toLowerCase().replace(/[ \/\&]/g, delimiter) // replacing spaces with - 
        // eslint-disable-next-line
        .replace(/[^\w-]+/g, '') // removing special chars
        // eslint-disable-next-line
        .replace(/(\-)\1+/ig, (str, match) => { // removing duplicate consecutive '-'
            return match[0]
        })
}
