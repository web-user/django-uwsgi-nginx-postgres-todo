from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from django.urls import reverse_lazy, reverse
from django.views import View

from .forms import LoginForm, TodoFormSet, TodoForm, TodoFilter
from django.shortcuts import redirect, render
from django.contrib.auth import logout
from .models import Post, Project, Todo
from .serializers import TodoSerializer
from django.contrib.auth.forms import UserCreationForm

import django_filters.rest_framework
import django_filters

from rest_framework import routers, serializers, viewsets, filters

from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework import generics

from django.views.generic import FormView, ListView, TemplateView
from django.views.generic.edit import CreateView, UpdateView, DeleteView

from django.contrib import messages

from django.shortcuts import render_to_response
from django.template import RequestContext

import json



class TodoListAPI(generics.ListAPIView):
    queryset = Todo.objects.order_by('date_todo')
    serializer_class = TodoSerializer
    filter_class = TodoFilter
    search_fields = ('title',)
    ordering_fields = ('date_todo', 'title', 'status_display')
    filter_backends = (
        django_filters.rest_framework.DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )


class LoginFormView(FormView):
    template_name = 'todo/auth.html'
    form_class = LoginForm

    def form_valid(self, form):
        cd = form.cleaned_data
        user = authenticate(username=cd['username'], password=cd['password'])
        if user and user.is_active:
            login(self.request, user)
            return redirect(reverse('todo:home'))
        return HttpResponse('Invalid User')

    def form_invalid(self, form):
        return HttpResponse('Invalid login')


class RegisterFormView(FormView):
    template_name = 'todo/registration.html'
    form_class = UserCreationForm

    def form_valid(self, form):
        form.save()
        username = form.cleaned_data.get('username')
        raw_password = form.cleaned_data.get('password1')
        user = authenticate(username=username, password=raw_password)

        if user and user.is_active:
            login(self.request, user)
            return redirect(reverse('todo:home'))
        return HttpResponse('Invalid User')

    def form_invalid(self, form):
        return HttpResponse('Invalid login')


class ProjectListView(LoginRequiredMixin, CreateView):
    form_class = TodoForm
    template_name = 'todo/content.html'
    success_url = reverse_lazy('todo:home')

    def get_context_data(self, **kwargs):
        # kwargs['projects'] = Project.objects.exclude(todos__completed_tasks=True)
        kwargs['projects'] = Project.objects.all()
        kwargs['page_title'] = 'Page - Dashboard'

        kwargs['project_todos'] = Project.objects.exclude(todos__completed_tasks=True)
        # print(request.GET)
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        return super().form_valid(form)

    def form_invalid(self, form):
        print("Invalid data")
        return super().form_invalid(form)


def logout_view(request):
    logout(request)
    return redirect(reverse('todo:login'))
    # Redirect to a success page.


class ProjectCreate(CreateView):
    model = Project
    fields = ['title', 'color']
    success_url = reverse_lazy('todo:home')

    def form_valid(self, form):
        return super().form_valid(form)

    def form_invalid(self, form):
        print("Invalid data")
        messages.error(self.request, 'Invalid data')
        return redirect(reverse('todo:home'))


class ProjecUpdate(UpdateView):
    model = Project
    fields = ['title', 'color']
    success_url = reverse_lazy('todo:home')


class ProjecDelete(DeleteView):
    model = Project
    success_url = reverse_lazy('todo:home')

    def delete(self, request, *args, **kwargs):
        project = Project.objects.get(pk=kwargs['pk'])
        todos = project.todos.all()
        if todos.filter(completed_tasks=False):
            messages.error(request, 'Oops, something bad happened')
            return redirect(reverse('todo:home'))
        else:
            return super().delete(request, *args, **kwargs)


class TodoDelete(DeleteView):
    model = Todo
    success_url = reverse_lazy('todo:home')


class TodoUpdate(UpdateView):
    model = Todo
    fields = ['title', 'completed_tasks', 'todo_priority']
    success_url = reverse_lazy('todo:home')



def error_404(request):
    response = render_to_response('404.html', {},
                                  context_instance=RequestContext(request))
    response.status_code = 404
    return response


def error_500(request):
    response = render_to_response('todo/error_404.html', {},
                                  context_instance=RequestContext(request))
    response.status_code = 500
    return response