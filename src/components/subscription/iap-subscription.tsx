import { useState, useEffect } from 'react';
import { ExecutiveButton } from '@/components/ui/executive-button';
import { Card } from '@/components/ui/card';
import { Crown, RefreshCw, Smartphone } from 'lucide-react';
import { iapManager, IAPProduct } from '@/lib/iap-manager';
import { toast } from 'sonner';

interface IAPSubscriptionProps {
  onPurchaseSuccess?: () => void;
}

export default function IAPSubscription({ onPurchaseSuccess }: IAPSubscriptionProps) {
  const [products, setProducts] = useState<IAPProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const isNative = iapManager.isNativePlatform();

  useEffect(() => {
    if (isNative) {
      loadProducts();
    }
  }, [isNative]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      // Initialize IAP first (if not already done)
      await iapManager.initialize();
      const availableProducts = await iapManager.getProducts();
      setProducts(availableProducts);
      
      if (availableProducts.length === 0) {
        toast.info('Loading subscription options...');
      }
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load subscription options');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (productId: string) => {
    setLoading(true);
    try {
      const result = await iapManager.purchase(productId);
      
      if (result.success) {
        toast.success('Purchase successful!');
        if (onPurchaseSuccess) {
          onPurchaseSuccess();
        }
      } else {
        toast.error(result.error || 'Purchase failed');
      }
    } catch (error) {
      console.error('Error purchasing:', error);
      toast.error('Purchase failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    setRestoring(true);
    try {
      const result = await iapManager.restorePurchases();
      
      if (result.success) {
        toast.success('Purchases restored successfully!');
        if (onPurchaseSuccess) {
          onPurchaseSuccess();
        }
      } else {
        toast.error(result.error || 'No purchases to restore');
      }
    } catch (error) {
      console.error('Error restoring purchases:', error);
      toast.error('Failed to restore purchases');
    } finally {
      setRestoring(false);
    }
  };

  if (!isNative) {
    return (
      <Card className="p-6 bg-muted/50">
        <div className="flex items-center space-x-3 mb-4">
          <Smartphone className="w-6 h-6 text-muted-foreground" />
          <h3 className="text-lg font-bold text-foreground">Mobile App Required</h3>
        </div>
        <p className="text-muted-foreground">
          In-App Purchases are only available on the iOS or Android mobile app.
          Please use the web version to subscribe via Stripe, or download our mobile app.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Crown className="w-6 h-6 text-amber-500" />
            <h3 className="text-xl font-bold text-foreground">Apple In-App Purchase</h3>
          </div>
          <ExecutiveButton
            variant="outline"
            size="sm"
            onClick={handleRestore}
            disabled={restoring}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${restoring ? 'animate-spin' : ''}`} />
            Restore Purchase
          </ExecutiveButton>
        </div>

        {loading && products.length === 0 ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No products available at the moment.</p>
            <ExecutiveButton
              variant="outline"
              onClick={loadProducts}
              className="mt-4"
            >
              Retry
            </ExecutiveButton>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="p-4 border border-border rounded-lg bg-card hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground mb-1">{product.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                    <p className="text-2xl font-bold text-primary">
                      {product.price} 
                      <span className="text-sm text-muted-foreground">
                        {product.id.includes('yearly') ? ' / year' : ' / month'}
                      </span>
                    </p>
                  </div>
                  <ExecutiveButton
                    variant="primary"
                    onClick={() => handlePurchase(product.id)}
                    disabled={loading}
                    className="ml-4"
                  >
                    {loading ? 'Processing...' : 'Subscribe'}
                  </ExecutiveButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <div className="space-y-3 text-sm text-blue-800 dark:text-blue-200">
          <p>
            <strong>Subscription Details:</strong> Auto-renewable subscriptions. Payment charged to Apple ID at confirmation. Subscription automatically renews unless cancelled at least 24 hours before the end of the current period.
          </p>
          <p>
            <strong>Manage Subscription:</strong> Cancel or modify in iOS Settings → [Your Name] → Subscriptions.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="/privacy" className="text-blue-600 dark:text-blue-400 underline font-medium">
              Privacy Policy
            </a>
            <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline font-medium">
              Terms of Use (EULA)
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
