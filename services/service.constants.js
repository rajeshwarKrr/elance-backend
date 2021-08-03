const userSelect = {
    email: 1, 
    userName: 1,
    fullName: 1,
    firstName: 1,
    lastName: 1,
    userType: 1
}

const applicationSelect = {
    projectId: 1,
    userId: 1,
    description: 1,
    bid: 1,
    applicationStatus: 1,
}

const projectSelect = {
    projectTitle: 1,
    description: 1,
    skills: 1,
    education: 1,
    workLocation: 1,
    softwareRequirements: 1,
    freelancersCount: 1,
    duration: 1,
    visibility: 1,
    budget: 1,
    postedBy: 1

}

module.exports = {
    userSelect,
    applicationSelect,
    projectSelect
}