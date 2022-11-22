
export const getCodeByName = (name) => {
    return name
        .toLowerCase()
        .trim()
        .split(" ")
        .join("-");
}