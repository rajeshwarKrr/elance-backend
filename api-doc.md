# API Documentation
***
***
## /api/users/getAllUsers?page=1&size=2
###### GET : BODY
```
{
  _id: <userID>
< can give anything from schema here >
}
```
***
## /api/users/registerUser
###### POST : BODY
```
        
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
```
***
## /api/projects/createProject
###### POST : BODY
```
{    
    "projectTitle": "Project Title 6",
    "description": "Project Description 6",
    "skills": ["javascript", "nodejs", "reactjs"],
    "education": ["MTech", "Btech"],
    "workLocation": ["remote", "onsite"],
    "softwareRequirements": ["4gb", "windows", "linux"],
    "freelancersCount": 2,
    "visibility": ["one", "two", "three"],
    "postedBy": "60efa62ea041ba33f7d5d653",
    "budget": {
        "minPrice": 200,
        "maxPrice": 700,
        "currency": "rupee"
    },
    "duration": {
        "from": "30-07-2021", 
        "to": "30-08-2021"
    }
}
```
***
## /api/projects/getAllProjects?page=1&size=2
###### GET : BODY
```
{
  _id: <projectId>
< can give anything from schema here >
}
```
***
## /api/projects/getAllAppliedProjects
###### GET : BODY
```
{
    _id: <application id>
    <can give anything from application schema>
}

```
***
## /api/projects/applyProject
###### POST : BODY
```
{
    "projectId": "60f1b2faf979f66fb1ff659b",
    "userId": "60f1b05ef979f66fb1ff6571",
    "description": "can do  Description",
    "bid": 300,
    "duration": 20,
    "coverLetter": "applicaiton coverletter",
    "attachmentLinks": ["linnk1", "link2"]
}
```
***
## api/favourites/setFavUser 
###### POST : BODY 
```
    {
        "favouriteUserId": <fav user id>, 
        "userId": <current user id>
    }
```

## api/favourites/unSetFavUser 
###### POST : BODY 
```{
    "favouriteUserId": <fav user id>, 
    "userId": <current user id>
    }
```

## api/favourites/getAllFavUsers 
###### GET : BODY 
```{
    "userId": <current user id>
    }
```

## api/favourites/setFavProject 
###### POST: : BODY

```
{    
    "favProjectId": <fav project id>, 
    "userId": <current user id>
}
```

## api/users/setReview
###### POST: BODY

```
{    
    "userId": <freelance user id>
    "reviewedBy": "reviewer user id",
    "title": "string",
    "description": "string",
    "rating": number,
}

```

## api/users/getUserReviews
###### GET : BODY

```
{
   "userId": <current user id>
}
```



## api/users/readNotification: POST

###### GET : BODY
```
{
   "notificationId": <current notification id>
   "userId": <current user id>
}
```
