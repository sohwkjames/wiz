# views.py
import json

from django.http import HttpResponse
from django.http import JsonResponse

from .models import Question

def index(request):
    latest_question_list = list(Question.objects.order_by('-pub_date').values())
    context = {'latest_question_list': latest_question_list}
    #return render(request, 'polls/index.html', context)
    print(latest_question_list)
    return JsonResponse(latest_question_list,safe=False)

def detail(request, question_id):
    try:
        question = Question.objects.get(pk=question_id)
        test = question.choice_set.all()
        choiceJson = {}
        i = 1
        for choice in test:
            choiceName = choice.choice_text
            print(choiceName)
            conver_num = str(i)
            choiceJson[conver_num] = choiceName
            i = i + 1
        print(choiceJson)
        questionJson = {'id': question_id, \
        'question_text': question.question_text, \
        'choices': choiceJson, \
        'answer': question.answer}
        print(questionJson)
    except Question.DoesNotExist:
        raise Http404("Question does not exist")
    return JsonResponse(questionJson,safe=False)