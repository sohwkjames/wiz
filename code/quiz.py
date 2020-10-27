# To do
class Question():
    '''
    questiontext is a string. eg 'what color is the moon?'
    answer is an integer. Indicates the correct answer for a question.
            For true false questions, 1 indicates true, 0 indicates 0.
            For Multiple choice questions, 1 indicates the first choice, 2 the second choice etc.
    '''
    def __init__(self, questiontext, answer):
        self.questiontext = questiontext
        self.answer = int(answer)

class Tfq(Question):
    '''
    Child of Question class.
    '''
    # True false questions just need questiontext and answer. answer: 1 if true, 0 if false.
    def __repr__(self):
        return self.questiontext + "\n 1. True 0. False"
    
    def renderAnswer(self):
        # Returns a string.
        if self.answer == 1:
            return ("The correct answer is true")
        else:
            return ("The correct answer is false")

class Mcq(Question):
    '''
    Child of question class.
    '''
    def __init__(self, questiontext, answer, choices):
        super().__init__(questiontext, answer)
        # choices should be a list of strings. eg: ["this is choice 1, nice", "c2", "c3" , "c4"]
        self.choices = choices
    
    def __repr__(self):
        s = self.questiontext + "\n"
        for idx, val in enumerate(self.choices):
            s = s + str(idx+1) + ". " + self.choices[idx] + " "       
        
        return s

    def renderAnswer(self):
        # 
        idx_to_print = int(self.answer) 
        text_to_print = self.choices[self.answer-1] 
        result = str(idx_to_print) + ". " + text_to_print
        return "The correct answer is {}".format(result)
    
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

    def checkValidResponse(self,response, question):
        '''
        Returns true or false.
        '''
        try:
            response = int(response)
        except ValueError:
            print("Sorry, please enter an integer")
            return False
        # if tfq, check if input is 1 or 0.
        if type(question) == Tfq:
            valid_responses = [0,1]
        if type(question) == Mcq:
            valid_responses = range(1, len(question.choices)+1)
        if response not in valid_responses:
            print("Please enter a number in the range of the valid answers.")
            return False        
        return True
            
        

    def playRound(self):
        '''
        Plays one round of the quiz. 
        One round is one question asked to all the players.
        remove question from self.questions after question is asked.
        '''
        if self.questions is None:
            return False
        qn = self.questions.pop()
        print(qn)
        print("")
        # Get all players answers
        for player in self.players:
            while True:
                player_response = input("{} What is your answer? Please enter an integer ".format(player.name))
                # Check if player response is valid.
                if self.checkValidResponse(player_response, qn):
                    break    
            if int(player_response) == int(qn.answer):
                player.score += 1
        # Print correct answer and show current scores
        print("")
        print(qn.renderAnswer())
        
        return True

    def printScores(self):
        '''
        prints the scores of all the players in the game currently.
        '''
        print("Current scores: ")
        for p in self.players:
            print ("{}: {}".format(p.name, p.score))

    def printWinners(self, n):
        '''returns a list of n winners.'''
        tmp = sorted(self.players, key=lambda x: x.score, reverse=True)
        i = 0
        result = []
        # get top 3 players in the result array, or the top n players if less than 3 players.
        while i < len(self.players) or i < n:
            result.append(tmp[i])
            i+=1
        for player in result:
            print("{}: {}".format(player.name, player.score))

    def play(self):
        print("Game started!")
        while self.questions:
            print("----")
            self.playRound()
            self.printScores()
        # Handle game ending.
        print("Game has ended! Here are the winners")
        self.printWinners(3)
                    



    
