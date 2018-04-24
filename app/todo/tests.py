import datetime

from django.utils import timezone
from django.test import TestCase

from .models import Todo, Project

# Create your tests here.




class TodoModelTests(TestCase):

    def setUp(self):

        Project.objects.create(title='My project', color='#fff')
        Project.objects.create(title='Second project', color='#000')

        Todo.objects.create(project_id=1, title="lion", todo_priority="high", date_todo='2018-03-06', completed_tasks=False)
        Todo.objects.create(project_id=2, title="cat", todo_priority='sdsdsd', date_todo='2018-03-07', completed_tasks=True)

    def test_todo_can(self):
        lion = Todo.objects.get(title="lion")
        cat = Todo.objects.get(title="cat")

        print(cat.date_todo)
        print(cat.todo_priority)
