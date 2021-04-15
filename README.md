"# Wiz program" 

## Setting up

> Install the React and Django with  
```npm install -g create-react-app```  
```npm install --global yarn```  
```python -m pip install Django```  
```python -m pip install django-cors-headers```  

> Clone the project to your local repository.  

## Intro

> In order to start WIZ, you need to get the backend and frontend running

## Backend

>To start the Backend, navigate to WIZ folder, then run the program by excuting the following command
```python manage.py runserver```  
You should see the follow message if successful:
```Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
April 14, 2021 - 23:10:43
Django version 3.1.5, using settings 'WIZ.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

## Frontend

>To start the Frontend, simply navigate to frontend folder, then run the program by excuting the following command:
```Yarn start```  
>You should see the follow message if successful:
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://xx.xx.xx.xx:3000

Note that the development build is not optimized.
To create a production build, use yarn build.
```


## Playing the quiz

>Go to http://localhost:3000/ and you can start playing the quiz.


## Other notes

> WIZ/db.sqlite3 is the database for the quiz, question can be changed from there by opening software that could read sqlite like db browser etc.  
> WIZ/WIZ/models.py is the structure of the quiz database.  
> Use ```python manage.py makemigrations``` after you have modified models.py in order to migrate the changes.
> 
