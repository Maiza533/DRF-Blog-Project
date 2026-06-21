from django.contrib import admin
from django.urls import path
from .views import create_blog, delete_blog, blog_detail, edit_blog, blog_list, login_view, logout_view, profile, signup

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('blogs/create/', create_blog, name='create_blog'),
    path('blogs/', blog_list, name='blog_list'),
    path("blogs/<slug:slug>/", blog_detail, name='blog_detail'),
    
    path("blogs/<slug:slug>/edit/", edit_blog, name='edit_blog'),
    path("blogs/<slug:slug>/delete/", delete_blog, name='delete_blog'),
    path('profile/', profile, name='profile'),
    path('signup/', signup),
]