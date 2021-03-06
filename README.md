# django-uwsgi-nginx-postgres-todo
A complete example for deploying Django project with Nginx and postgres on Docker.
## QuickStart
Install Docker Engine from the tutorial <https://docs.docker.com/engine/installation/>.</br>
Install Docker Compose from the tutorial <https://docs.docker.com/compose/install/>.</br>
Get the latest project clone to your computer:
```bash
$ git clone https://github.com/web-user/django-uwsgi-nginx-postgres-todo.git
```
Run docker-compose commands to start containers:
```bash
$ docker-compose up -d
```
Now you can access the application at <http://localhost> or <http://ip docker>(Docker Toolbox) sudo docker inspect $(sudo docker ps -q) | grep IPA.</br>
## Django Admin
If you want to access django admin site, please apply the django default migrations to database:
```bash
$ docker-compose exec web bash
$ python manage.py migrate
```
Then you need to create a superuser account:
```bash
$ python manage.py createsuperuser
```

```db migrate
$ docker-compose run web python app/manage.py migrate
```

docker-compose run web python app/manage.py collectstatic


## Celery Results
Redis is used as broker for Celery <http://docs.celeryproject.org/en/latest/getting-started/brokers/redis.html>.</br>
The official tutorial <http://docs.celeryproject.org/en/latest/django/> tells us how to use Celery with Django.</br>
You can check the Celery results from logs:
```bash
$ docker-compose logs celery
```
## Docker Images Reference

| Name   | Image                              |
| ------ | ---------------------------------- |
| Nginx  | <https://hub.docker.com/_/nginx/>  | |
| Redis  | <https://hub.docker.com/_/redis/>  |
| Python | <https://hub.docker.com/_/python/> |

