from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .models import User, Blog
from django.contrib import messages
from django.utils.text import slugify
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from .serializers import UserSerializer, BlogSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt

@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):

    email = request.data.get("email")
    password = request.data.get("password")

    user = authenticate(email=email, password=password)

    if user is not None:

        refresh = RefreshToken.for_user(user)

        return Response({
            "msg": "Login Successful",
            "user_id": user.id,
            "access": str(refresh.access_token),   
            "refresh": str(refresh)                
        })

    return Response({"error": "Invalid credentials"}, status=401)
 


def logout_view(request):
    logout(request)
    return redirect('login')


# Blog 
@api_view(['GET'])
def blog_list(request):
    blogs = Blog.objects.all()
    serializer = BlogSerializer(blogs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def blog_detail(request, slug):
    blog = get_object_or_404(Blog, slug=slug)
    serializer = BlogSerializer(blog)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_blog(request):
    if request.method == "POST":
        try:
            title = request.data.get('title')
            content = request.data.get('content')
            status = request.data.get('status')
            image = request.FILES.get('image') 
            author=request.user 

            blog = Blog.objects.create(
                title=title,
                content=content,
                status=status,
                image=image,
                author=author
            )

            return JsonResponse({
                "message": "Blog created successfully",
                "id": blog.id
            })

        except Exception as e:
            return JsonResponse({
                "error": str(e)
            }, status=500)

    return Response({
    "message": "Blog created successfully",
    "id": blog.id
})


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def edit_blog(request, slug):
    blog = Blog.objects.get(slug=slug)

    if blog.author != request.user:
        return Response({"error": "Not allowed"}, status=403)

    serializer = BlogSerializer(blog, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_blog(request, slug):
    blog = get_object_or_404(Blog, slug=slug)
    blog.delete()
    return Response({"msg": "deleted"})



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    blogs = Blog.objects.filter(author=user)

    blog_serializer = BlogSerializer(blogs, many=True)
    user_serializer = UserSerializer(user)  

    return Response({
        "user": user_serializer.data,
        "blogs": blog_serializer.data
    })


@api_view(['POST'])
def signup(request):
    data = request.data

    if User.objects.filter(email=data['email']).exists():
        return Response({"error": "Email already exists"}, status=400)

    user = User.objects.create_user(
        email=data['email'],
        username=data['username'],
        password=data['password']
    )

    return Response({
        "id": user.id,
        "email": user.email
    })