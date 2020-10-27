from quiz import Quiz
from storage import Storage
from player import Player

# Initialize instance of quiz, storage, players class
quiz = Quiz()
storage = Storage()
player = Player()

# JH: Create the Storage class.
# .getQuestions() should read questions from the txt file.
# .getQuestions() should return a list? of Question objects
questions = storage.getQuestions()

# SetQuestions expects a list? of Question objects.
quiz.setQuestions(questions)

# Broderick: Create the Player class. 
# .getPlayers() should prompt users for player information
# .getPlayers() should return a list? of Player objects.
def temp_generate_players():
    player_list = []
    names = ['james', 'broderick', 'jh']
    for i, v in enumerate(names):
        p = Player()
        p.name = v
        player_list.append(p)
    return player_list
#players = player.getPlayers()

# setPlayers expects a list? of Player objects.
quiz.setPlayers(temp_generate_players())

# James: Begin the quiz
quiz.play()
