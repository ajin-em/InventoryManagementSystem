from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Product, SubVariant
from .serializers import ProductSerializer, ProductCreateSerializer, StockSerializer

class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProductCreateSerializer
        return ProductSerializer

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

class AddStockView(generics.UpdateAPIView):
    queryset = SubVariant.objects.all()
    serializer_class = StockSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        instance = serializer.save()
        instance.stock += self.request.data.get('stock', 0)
        instance.save()

class RemoveStockView(generics.UpdateAPIView):
    queryset = SubVariant.objects.all()
    serializer_class = StockSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        instance = serializer.save()
        instance.stock -= self.request.data.get('stock', 0)
        instance.save()
