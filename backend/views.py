from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from dataBase.models import User, API_Request, API_Response
from ..dataBase.serializers import UserSerializer, APIRequestSerializer, APIResponseSerializer

# # User CRUD Operations

# @api_view(['POST'])
# def add_user(request):
#     serializer = UserSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET'])
# def get_users(request):
#     users = User.objects.all()
#     serializer = UserSerializer(users, many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)

# @api_view(['PUT'])
# def update_user(request, pk):
#     # Update a User by their primary key (UUID).
#     try:
#         user = User.objects.get(pk=pk)
#     except User.DoesNotExist:
#         return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
#     serializer = UserSerializer(user, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['DELETE'])
# def delete_user(request, pk):
#     # Delete a User by their primary key (UUID).
#     try:
#         user = User.objects.get(pk=pk)
#     except User.DoesNotExist:
#         return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
#     user.delete()
#     return Response({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


# # API_Request CRUD Operations

# @api_view(['POST'])
# def add_api_request(request):
#     serializer = APIRequestSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET'])
# def get_api_requests(request):
#     api_requests = API_Request.objects.all()
#     serializer = APIRequestSerializer(api_requests, many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)

# @api_view(['GET'])
# def get_api_request_by_id(request, pk):
#     try:
#         api_request = API_Request.objects.get(pk=pk)
#     except API_Request.DoesNotExist:
#         return Response({'error': 'API Request not found'}, status=status.HTTP_404_NOT_FOUND)
    
#     serializer = APIRequestSerializer(api_request)
#     return Response(serializer.data, status=status.HTTP_200_OK)

# @api_view(['DELETE'])
# def delete_api_request(request, pk):
#     try:
#         api_request = API_Request.objects.get(pk=pk)
#     except API_Request.DoesNotExist:
#         return Response({'error': 'API Request not found'}, status=status.HTTP_404_NOT_FOUND)
    
#     api_request.delete()
#     return Response({'message': 'API Request deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


# # API_Response CRUD Operations

# @api_view(['POST'])
# def add_api_response(request):
#     serializer = APIResponseSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def get_api_responses(request):
#     api_responses = API_Response.objects.all()
#     serializer = APIResponseSerializer(api_responses, many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(['GET'])
# def get_api_response_by_id(request, pk):
#     try:
#         api_response = API_Response.objects.get(pk=pk)
#     except API_Response.DoesNotExist:
#         return Response({'error': 'API Response not found'}, status=status.HTTP_404_NOT_FOUND)
    
#     serializer = APIResponseSerializer(api_response)
#     return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(['DELETE'])
# def delete_api_response(request, pk):
#     try:
#         api_response = API_Response.objects.get(pk=pk)
#     except API_Response.DoesNotExist:
#         return Response({'error': 'API Response not found'}, status=status.HTTP_404_NOT_FOUND)
    
#     api_response.delete()
#     return Response({'message': 'API Response deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
