from quiz import Quiz

class Storage():
    
    
    def getQuestions(self):
        '''
        Question is stored in questions.txt file
        Might want to store different quiz in different file in the future
        '''
        f = open("/questions.txt") #do we open the python file from 1 file before code or from code folder?
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

    def saveQuestion(self, question):
        '''
        Save question into the questions.txt file
        '''
        f = open("/question.txt", "w")
        for x in question:
            if "mcq" == "mcq": #will edit it after quiz has been finallise
                text = "question" + " | mcq | " + "Choice, choice, choice" + " | " + "answer"
            elif "tf" == "tf": #will edit it after quiz has been finallise
                text = "question" + " | tf | " + "answer"
        f.write(text+"\n")
        f.close()
        




