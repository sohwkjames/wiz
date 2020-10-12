from code import quiz

s = "is the sun hot?"
ans = 1
Tfq = quiz.Tfq(s, 1)

s = "what school are we in"
choices = ['nus', 'ntu', 'smu', 'sutd']
ans = 1
Mcq = quiz.Mcq(s, ans, choices)
from code import quiz, storage, player
import unittest

class TestStorageMethods(unittest.TestCase):

    def test_getQuestions(self):
        print("Testing getQuestions()")
        s = storage.Storage()
        # getQuestions currently reads from hardcoded location questions.txt.

        actual_results = s.getQuestions()
        '''
        Sample data:
        "Here is a sample mcq qn, with some puncuation!!" | mcq | "this is choice 1, nice" , "ntu" , "smu" , "sutd" | 1
        "sun is blue" | "tf" | 0
        '''
        expected = []
        expected.append(quiz.Mcq("Here is a sample mcq qn, with some puncuation!!", 1, ["this is choice 1, nice" , "ntu" , "smu" , "sutd"]))
        expected.append(quiz.Tfq("sun is blue", 0))

        self.assertEqual(actual_results, expected)

if __name__ == '__main__':
    unittest.main()
