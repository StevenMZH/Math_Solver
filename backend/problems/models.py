from django.db import models

class Problem(models.Model):
    id = models.CharField(primary_key=True, max_length=64, unique=True)
    name = models.CharField(max_length=100)
    problemText = models.CharField(max_length=511)
    image = models.URLField(max_length=200, blank=True, null=True)
    problem = models.CharField(max_length=511)
    solution = models.CharField(max_length=255)

    def __str__(self):
        return f"ClassExercise {self.id}: {self.name}"