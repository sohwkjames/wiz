from code import quiz

s = "is the sun hot?"
ans = 1
Tfq = quiz.Tfq(s, 1)

s = "what school are we in"
choices = ['nus', 'ntu', 'smu', 'sutd']
ans = 1
Mcq = quiz.Mcq(s, ans, choices)