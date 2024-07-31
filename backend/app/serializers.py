from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'ProductID', 'ProductCode', 'ProductName', 'ProductImage', 'CreatedDate', 'UpdatedDate', 'CreatedUser', 'IsFavourite', 'Active', 'HSNCode', 'variant', 'subvariant', 'stock']
    def validate(self, data):
        if 'stock' in data:
            data['stock'] = round(data['stock'])
        return data
    
    def validate_ProductID(self, value):
        if value <= 0:
            raise serializers.ValidationError("Product ID must be greater than 0.")
        return value

    def create(self, validated_data):
        if Product.objects.filter(ProductID=validated_data['ProductID']).exists():
            raise serializers.ValidationError("Product ID already exists.")
        return super().create(validated_data)

class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['ProductID', 'ProductCode', 'ProductName', 'ProductImage', 'IsFavourite', 'Active', 'HSNCode', 'variant', 'subvariant', 'stock']

    def create(self, validated_data):
        validated_data['CreatedUser'] = self.context['request'].user
        return Product.objects.create(**validated_data)

class ProductUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['ProductID', 'ProductCode', 'ProductName', 'ProductImage', 'IsFavourite', 'Active', 'HSNCode', 'variant', 'subvariant', 'stock']

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
