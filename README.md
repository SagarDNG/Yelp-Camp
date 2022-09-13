## Udemy Bootcamp Project

### Deployment commands for Heroku
Ensure you have Git & Heroku CLI <br>
First, go to folder location 
```
cd /d folderPath
```
Don't forget to add .gitignore file
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
```
git push heroku master
```