# To do
class Question():
    '''
    questiontext is a string. eg 'what color is the moon?'
    answer is an integer, pointing to the index of the correct answer. 
    question choices will be an attribute in the child clases.
    '''
    def __init__(self, questiontext, answer):
        self.questiontext = questiontext
        self.answer = answer

class Tfq(Question):
    '''
    Child of Question class.
    '''
    # True false questions just need questiontext and answer. answer: 1 if true, 0 if false.
    def __repr__(self):
        return self.questiontext

class Mcq(Question):
    '''
    Child of question class.
    '''
    def __init__(self, questiontext, answer, choices):
        super().__init__(questiontext, answer)
        # choices should be a list of strings. eg: ["this is choice 1, nice", "c2", "c3" , "c4"]
        self.choices = []
    
    def __repr__(self):
        s = self.questiontext + "\n"
        for idx, choice in enumerate(self.choices):
            s += idx + ". " + choice + "\n"
        return s
    
class Quiz():

    def __init__(self):
        self.questions = []
        self.players = []
        pass

    def setQuestions(self, questionList):
        '''
        takes a list of question objects, Updates self.questions
        '''
        for qn in questionList:
            self.questions.append(qn)
    
    def setPlayers(self, playerList):
        for player in playerList:
            self.players.append(player)

    def playRound(self):
        '''
        Plays one round of the quiz. 
        One round is one question asked to all the players.
        remove question from self.questions after question is asked.
        '''
        if self.questions is None:
            print("self.questions is none")
            return False
        qn = self.questions.pop()
        print(qn)
        for player in self.players:
            player_response = input("{} What is your answer? Please enter an integer".format(player.name))
            if player_response == qn.answer:
                player.score += 1
        return True


    def play(self):
        print("Game started!")
        while self.questions:
            self.playRound()



    
