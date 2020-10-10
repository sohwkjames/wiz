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
    pass

class Mcq(Question):
    '''
    Child of question class.
    '''
    def __init__(self, questiontext, answer, choices):
        super().__init__(questiontext, answer)
        # choices should be a list of strings. eg: ["this is choice 1, nice", "c2", "c3" , "c4"]
        self.choices = []
    
class Quiz():
    def play(self):
        print("Game started!")
    
