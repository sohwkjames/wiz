# views.py
from django.http import HttpResponse
from django.http import JsonResponse

from .models import Question

def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    context = {'latest_question_list': latest_question_list}
    #return render(request, 'polls/index.html', context)
    return JsonResponse({'question':'context'})

def detail(request, question_id):
    try:
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        raise Http404("Question does not exist")
    return JsonResponse({'question': question.question_text})