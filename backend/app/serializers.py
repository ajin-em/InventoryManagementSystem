from rest_framework import serializers
from .models import Product, Variant, SubVariant

class SubVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubVariant
        fields = ['id', 'name', 'stock']

class VariantSerializer(serializers.ModelSerializer):
    subvariants = SubVariantSerializer(many=True, read_only=True)

    class Meta:
        model = Variant
        fields = ['id', 'name', 'options', 'subvariants']

class VariantCreateSerializer(serializers.ModelSerializer):
    subvariants = SubVariantSerializer(many=True, required=False)

    class Meta:
        model = Variant
        fields = ['name', 'options', 'subvariants']

class ProductSerializer(serializers.ModelSerializer):
    variants = VariantSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'ProductID', 'ProductCode', 'ProductName', 'ProductImage', 'CreatedDate', 'UpdatedDate', 'CreatedUser', 'IsFavourite', 'Active', 'HSNCode', 'TotalStock', 'variants']

class ProductCreateSerializer(serializers.ModelSerializer):
    variants = VariantCreateSerializer(many=True, required=False)

    class Meta:
        model = Product
        fields = ['ProductID', 'ProductCode', 'ProductName', 'ProductImage', 'CreatedUser', 'IsFavourite', 'Active', 'HSNCode', 'TotalStock', 'variants']

    def create(self, validated_data):
        variants_data = validated_data.pop('variants', [])
        product = Product.objects.create(**validated_data)
        for variant_data in variants_data:
            subvariants_data = variant_data.pop('subvariants', [])
            variant = Variant.objects.create(product=product, **variant_data)
            for subvariant_data in subvariants_data:
                SubVariant.objects.create(variant=variant, **subvariant_data)
        return product

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubVariant
        fields = ['id', 'stock']
