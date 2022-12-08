## Udemy Bootcamp Project

#### Did this Project, which was part of a Course, ([Full Stack Web Development Course on Udemy](https://www.udemy.com/share/101W923@lkE8SWWDyxQELt0MoaJ-tC0AQCKabeJJuQjkYS9tXORT_X46pCYoUNbkFyhu61f_nw==/))

### Commands for running App on Local machine

```
node index.js
```
OR

``` 
nodemon 
```

### Deployment commands for Heroku
Ensure you have Git & Heroku CLI <br>
First, go to folder location 
```
cd /d folderPath
```
Don't forget to create .gitignore file
```
git init
```
```
git add .
```
```
git commit -m "commitMessageHere"
```
```
heroku login
```
```
heroku create
```
```
heroku git:remote -a herokuAppName
```
We'll get herokuAppName after creating heroku App
```
git push heroku master
```

### Pushing changes to Heroku App
```
git add .
```
```
git commit -m "commitMessageHere"
```
```
heroku login
```
```
git push heroku master
```

