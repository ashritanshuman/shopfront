import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from 'sonner';
import productsData from '@/data/products.json';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const found = productsData.find(p => p.id === id);
    if (found) {
      setProduct(found);
      if (found.variants && found.variants.length > 0) {
        setSelectedVariant(found.variants[0]);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const availableStock = selectedVariant?.stock || product.stock;

  const handleAddToCart = () => {
    if (availableStock === 0) {
      toast.error('This product is out of stock');
      return;
    }

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      variant: selectedVariant ? {
        color: selectedVariant.color,
        size: selectedVariant.size
      } : undefined,
      maxStock: availableStock,
    });
  };

  const handleBuyNow = () => {
    if (availableStock === 0) {
      toast.error('This product is out of stock');
      return;
    }

    handleAddToCart();
    navigate('/cart');
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        originalPrice: product.originalPrice,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square overflow-hidden rounded-lg bg-muted mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img src={img} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">({product.reviewsCount} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <Badge className="bg-accent">
                    {product.discountPercentage}% OFF
                  </Badge>
                </>
              )}
            </div>

            <p className="text-muted-foreground mb-6">{product.description}</p>
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6 space-y-4">
              {/* Colors */}
              {Array.from(new Set(product.variants.map((v: any) => v.color))).length > 1 && (
                <div>
                  <Label className="font-semibold mb-2 block">Color</Label>
                  <div className="flex gap-2">
                    {Array.from(new Set(product.variants.map((v: any) => v.color))).map((color: any) => (
                      <Button
                        key={color}
                        variant={selectedVariant?.color === color ? 'default' : 'outline'}
                        onClick={() => {
                          const variant = product.variants.find((v: any) => v.color === color);
                          setSelectedVariant(variant);
                        }}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {Array.from(new Set(product.variants.map((v: any) => v.size))).length > 1 && (
                <div>
                  <Label className="font-semibold mb-2 block">Size</Label>
                  <div className="flex gap-2">
                    {Array.from(new Set(product.variants.map((v: any) => v.size))).map((size: any) => {
                      const variant = product.variants.find(
                        (v: any) => v.size === size && v.color === selectedVariant?.color
                      );
                      const isAvailable = variant && variant.stock > 0;
                      
                      return (
                        <Button
                          key={size}
                          variant={selectedVariant?.size === size ? 'default' : 'outline'}
                          disabled={!isAvailable}
                          onClick={() => {
                            if (variant) {
                              setSelectedVariant(variant);
                            }
                          }}
                        >
                          {size}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Stock Status */}
          <div className="mb-6">
            {availableStock > 0 ? (
              <p className="text-success font-medium">In Stock ({availableStock} available)</p>
            ) : (
              <p className="text-destructive font-medium">Out of Stock</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <Button
              variant="accent"
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={availableStock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              variant="default"
              size="lg"
              className="flex-1"
              onClick={handleBuyNow}
              disabled={availableStock === 0}
            >
              Buy Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleWishlistToggle}
              className={inWishlist ? 'text-accent border-accent' : ''}
            >
              <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <Truck className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-medium">Free Delivery</p>
                <p className="text-xs text-muted-foreground">On orders over ₹999</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-medium">Secure Payment</p>
                <p className="text-xs text-muted-foreground">100% secure</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <RotateCcw className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="font-medium">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day return policy</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-4">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b pb-2">
                <span className="font-medium">{key}</span>
                <span className="text-muted-foreground">{value as string}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
