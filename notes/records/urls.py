from django.urls import path
from .views import RecordViewset
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
router.register('records', RecordViewset, basename="records")

urlpatterns=router.urls

