from quiz import Quiz
from storage import Storage
from player import Player

# Initialize instance of quiz, storage, players class
quiz = Quiz()
storage = Storage()
player = Player()

# JH: Get questions from some file. Need to decide what data structure to represent. 
questions = storage.getQuestions()

quiz.SetQuestions(questions)

# Broderick: prompt users for player information
players = player.getPlayers()
quiz.LoadPlayers(players)

# James: Begin the quiz
quiz.play()

