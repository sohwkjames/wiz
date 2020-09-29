from quiz import Quiz
from storage import Storage
from player import Player

# Initialize instance of quiz, storage, players class
quiz = Quiz()
# storage = Storage()
player = Player()

# JH: Create the Storage class.
# .getQuestions() should read questions from the txt file.
# .getQuestions() should return a list? of Question objects
# questions = storage.getQuestions()

# SetQuestions expects a list? of Question objects.
# quiz.SetQuestions(questions)

# Broderick: Create the Player class. 
# .getPlayers() should prompt users for player information
# .getPlayers() should return a list? of Player objects.
players = player.getPlayers()

# LoadPlayers expects a list? of Player objects.
# quiz.LoadPlayers(players)

# James: Begin the quiz
# quiz.play()
