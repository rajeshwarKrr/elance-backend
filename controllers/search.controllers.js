const { searchService } = require("../services/search.service");

const search = async (req, res) => {
    const { page = 1, size = 10 } = req.query;
    const { searchString = "" } = req.body;
    console.log("search controller")
    const response = await searchService({searchString, page, size})

    res.status(response.status).json({
        ...response
    })
}

module.exports = {
    search
}
