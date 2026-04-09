from django.db import models
from users.models import User

class Record(models.Model):
    CATEGORY_CHOICES=[
        ('work', 'Work'),
        ('study', 'Study'),
        ('health', 'Health'),
        ('personal', 'Personal'),
        ('other', 'Other')
    ]
    user=models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes',db_index=True)
    title=models.CharField(max_length=250)
    content=models.TextField(blank=False)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    category=models.CharField(max_length=15, choices=CATEGORY_CHOICES, default='other')

    def __str__(self):
        return self.title
    
    class Meta:
        ordering=['-created_at']
    


