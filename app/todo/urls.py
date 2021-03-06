from django.urls import path, include
from django.contrib.auth.views import login
from django.contrib.auth.views import logout
from django.contrib.auth.views import logout_then_login
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf.urls import handler404, handler500

from . import views

from . import views as todo_views

urlpatterns = [
    path('dashboard/', views.ProjectListView.as_view(), name='home'),
    path('accounts/login/', views.LoginFormView.as_view(), name='login'),
    path('registration/', views.RegisterFormView.as_view(), name='registration'),

    path('logout/', views.logout_view, name='logout'),

    path('project-create/', views.ProjectCreate.as_view(), name='project_create'),


    # projec/2/delete/
    path('project/<int:pk>/delete/', views.ProjecDelete.as_view(), name='project_delete'),

    path('todo/<int:pk>/delete/', views.TodoDelete.as_view(), name='todo_delete'),

    # projec/2/update/
    path('project/<int:pk>/update/', views.ProjecUpdate.as_view(), name='project_update'),

    path('todo/<int:pk>/update/', views.TodoUpdate.as_view(), name='todo_update'),

    path('todo/API/', views.TodoListAPI.as_view(), name='todo_api'),


]

app_name = 'todo'



urlpatterns = format_suffix_patterns(urlpatterns)