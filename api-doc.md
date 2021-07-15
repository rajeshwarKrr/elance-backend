
/ - Welcome message
                 

/api/users/getAllUsers          GET         -               array of users


/api/users/getUserByEmail       
    POST        
    Body- { email: "rajeshwar@gm.c"}    
    response - Queried User


/api/users/registerUser
    POST
    Body - 
    {
        "fullName": "Rajeshwar Reddy Kadari",
        "firstName": "Rajeshwar Reddy",
        "lastName": "Kadari",
        "email": "rajeshraj@gm.c",
        "userName": "rajesh",
        "userType": "freelancer",
        "occupation ": "employee",
        "intro": "Rajeshwar is a good boy",
        "profilePic": "profile pic",
        "phoneNumber": "4655132",
        "address": ["ramanthapur, hyderabad", "medak, chegunta"],
        "website": "website",
        "resume": "resume",
        "socialProfiles": [],
        "qualifications": [],
        "works": [],
        "skills": [{
            "name": "javascript",
            "level": "70%"
        },
        {
            "name": "Java",
            "level": "50%"
        }],
        "portfolioProjects": [],
        "reviews": []
    }