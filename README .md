## system requirements

 - [ Install Node js](https://nodejs.org/en)
 - [ Install mongodb](https://www.mongodb.com/docs/manual/installation/)
 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Quick Startt
your back end start on 
```bash
http://localhost:3000/

```

## Routes and payload

- #### Add user
```bash
Route :
 http://localhost:8080/auth/signup  Or
  http://localhost:8080/auth/login

payload:
  {
    "email": "7@gmail.com",
    "password": "kartik@123",
    "role": "user",
    "firstName": "kartik",
    "lastName": "sarvaiya"
}

Login
{
    "email": "kartik@gmail.com",
    "password":"kartik@123"
}

Check user is login or not 
   Route :
      http://localhost:8080/auth/check



LogOut User
   Route :
     http://localhost:8080/auth/logout

```
In response you
You will get a token and you have to save the token.


- #### Update User Profile 
 Update User and uplod Profile Photos
```base
 Route :
    http://localhost:8080/user

 payload:
   {
    "role": "user",
    "firstName": "Raa Kartik",
    "lastName": "sarvaiya",
    "bio": "My name is kartiksinh sarvaiya"
}

if you are uplod file so file feild name is profileUrl
file uplod formate is = form-data

```


- #### User Profile
If user Login show profile this route
```base
 Route :
  http://localhost:8080/user/profile

``` 
  - #### Show List User (only public User )

When the user wants to see his full URL then he will go to this route
  ```base
   Route:
   http://localhost:8080/user/list
                                   ro
    http://localhost:8080/user/list?page=2&limit=2

  ```
  - #### Show List User (only public User )


## Show List of Users (only public users)

When the admin wants to view the full URL, they can navigate to this route:

```base
Route:
http://localhost:8080/admin/list?accountType=private&page=1&limit=10

You can modify these parameters:
accountType=public
  ```