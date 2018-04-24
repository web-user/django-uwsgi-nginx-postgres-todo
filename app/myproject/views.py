from django.http import HttpResponse


def index(request):
    qust = ''
    start_project_list = ['My project', 'Web network', 'Version: 2.1']
    output = ', '.join([n for n in start_project_list])
    return HttpResponse(output)

