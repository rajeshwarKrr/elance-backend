
const pagination = ({page, size}) => {
    const limit = parseInt(size)
    const skip = (page - 1) * size;

    return ({limit, skip})
}

const queryConditions = (bodyObj, keys = []) => {
    const conditions = {};

    for(let key of keys) {
        if(bodyObj[key])
            conditions[key] = bodyObj[key]
    }
    return conditions;
}

module.exports = {
    pagination,
    queryConditions
}