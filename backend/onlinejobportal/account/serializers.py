from rest_framework import serializers
from account.models import User, TestImage, TestDescription, ProfileDescription

class UserRegistrationSerializer(serializers.ModelSerializer):
    # We are writing this because we need  confirm password field is in our Registration Request
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
    class Meta:
        model = User
        fields = ['email','name','password','password2','tc']
        extra_kwargs = {
            'password':{'write_only':True}
        }
    
    # Validating Password and Confirm Password while Registration
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        return attrs
    
    def create(self, validate_data):
        return User.objects.create_user(**validate_data)
    
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = User
        fields = ['email', 'password']

class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    class Meta: 
        fields = ['password', 'password2']
    
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        user.set_password(password)
        user.save()
        return attrs
    
class ImageTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestImage
        fields = ['image_url']

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestDescription
        fields = ['id', 'testname', 'testdescription']

class ProfileDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileDescription
        fields = ['description', 'phonenumber', 'email', 'bio', 'address', 'profile_picture']

    def create(self, validated_data):
        user = self.context['request'].user
        profile_description = ProfileDescription.objects.create(user=user, **validated_data)
        return profile_description
    
    