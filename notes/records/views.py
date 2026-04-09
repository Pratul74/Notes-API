from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .models import Record
from .serializers import RecordSerializer

class RecordViewset(ModelViewSet):
    permission_classes=[IsAuthenticated]
    serializer_class=RecordSerializer

    def get_queryset(self):
        return Record.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def perform_destroy(self, instance):
        if instance.user!=self.request.user:
            raise PermissionDenied("You cannot delete this note!")
        instance.delete()

    def perform_update(self, serializer):
        if serializer.instance.user!=self.request.user:
            raise PermissionDenied("You cannot update this note!")
        serializer.save()


    


