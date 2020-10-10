from quiz import Quiz

class Storage():
    
    
    def getQuestions(self):
        '''
        Question is stored in questions.txt file
        Might want to store different quiz in different file in the future
        '''
        f = open("questions.txt")
        questionlist = []
        for x in f:
            question_type = x.split("|")
            question = question_type[0]
            if question_type[1] == "mcq":
                choice = question_type[2]
                answer = question_type[3]
                questionlist.append(Mcq(question, answer, choice))
            elif question_type[1] == "tf":
                answer = question_type[2]
                questionlist.append(Tfq(question, answer))
        f.close()
        return questionlist

    def saveQuestion():
        '''
        Save question into the questions.txt file
        '''
        x = 6



