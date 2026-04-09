from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, RegisterSerializer
from .models import User
from rest_framework import status

class UserList(APIView):
    def get(self, request):
        users=User.objects.all()
        serializer=UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class UserRegister(APIView):
    def post(self, request):
        serializer=RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
        





