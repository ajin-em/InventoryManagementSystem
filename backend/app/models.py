from django.db import models
import uuid

class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ProductID = models.BigIntegerField(unique=True)
    ProductCode = models.CharField(max_length=255, unique=True)
    ProductName = models.CharField(max_length=255)
    ProductImage = models.ImageField(upload_to="uploads/", blank=True, null=True)
    CreatedDate = models.DateTimeField(auto_now_add=True)
    UpdatedDate = models.DateTimeField(blank=True, null=True)
    CreatedUser = models.ForeignKey("auth.User", related_name="products", on_delete=models.CASCADE)
    IsFavourite = models.BooleanField(default=False)
    Active = models.BooleanField(default=True)
    HSNCode = models.CharField(max_length=255, blank=True, null=True)
    TotalStock = models.DecimalField(default=0.00, max_digits=20, decimal_places=8, blank=True, null=True)

    class Meta:
        db_table = "products_product"
        verbose_name = "product"
        verbose_name_plural = "products"
        unique_together = (("ProductCode", "ProductID"),)
        ordering = ("-CreatedDate", "ProductID")

class Variant(models.Model):
    product = models.ForeignKey(Product, related_name='variants', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    options = models.JSONField()  

    class Meta:
        db_table = "products_variant"
        verbose_name = "variant"
        verbose_name_plural = "variants"
        unique_together = (("product", "name"),)

class SubVariant(models.Model):
    variant = models.ForeignKey(Variant, related_name='subvariants', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    stock = models.DecimalField(default=0.00, max_digits=20, decimal_places=8)

    class Meta:
        db_table = "products_subvariant"
        verbose_name = "subvariant"
        verbose_name_plural = "subvariants"
        unique_together = (("variant", "name"),)
