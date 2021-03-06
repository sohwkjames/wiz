import datetime

from django.db import models
from django.utils import timezone


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    answer = models.IntegerField()
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.question_text

    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)

class Tfq(Question):
    '''
    Child of Question class.
    '''
    # True false questions just need questiontext and answer. answer: 1 if true, 0 if false.
    def __repr__(self):
        return self.question_text + "\n 1. True 0. False"
    
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
        super().__init__(question_text, answer)
        # choices should be a list of strings. eg: ["this is choice 1, nice", "c2", "c3" , "c4"]
        self.choices = choices
    
    def __repr__(self):
        s = self.questiontext + "\n"
        print(self.choices)
        return s

    def renderAnswer(self):
        idx_to_print = int(self.answer)
        text_to_print = self.choices[self.answer - 1]
        result = str(idx_to_print) + ". " + text_to_print
        return "The correct answer is {}".format(result)

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text