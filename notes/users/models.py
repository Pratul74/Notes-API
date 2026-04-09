from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    phone_number=models.CharField(max_length=10, blank=True)
    username=models.CharField(unique=True)
    REQUIRED_FIELDS=["email", "first_name", "last_name"]

    def __str__(self):
        return self.username
