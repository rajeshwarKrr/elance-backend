
const pagination = ({page, size}) => {
    const limit = parseInt(size)
    const skip = (page - 1) * size;

    return ({limit, skip})
}

const queryConditions = (bodyObj) => {
    const conditions = {};
    for(let key of Object.keys(bodyObj)) {
        conditions[key] = bodyObj[key]
    }
    return conditions;
}

module.exports = {
    pagination,
    queryConditions
}