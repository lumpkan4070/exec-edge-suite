import { Capacitor } from '@capacitor/core';
import { supabase } from '@/integrations/supabase/client';

// Import StoreKit plugin (installed via npm: cordova-plugin-purchase)
declare const CdvPurchase: any;

// Product IDs for App Store (must match App Store Connect exactly)
export const IAP_PRODUCT_IDS = {
  YEARLY_SUBSCRIPTION: 'com.company.apex.subs.yearly',
  MONTHLY_SUBSCRIPTION: 'com.company.apex.subs',
} as const;

export interface IAPProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  currency: string;
}

export interface IAPPurchaseResult {
  success: boolean;
  productId?: string;
  transactionId?: string;
  error?: string;
}

/**
 * IAP Manager for handling In-App Purchases on iOS/Android
 * Uses @capacitor-community/in-app-purchases for StoreKit integration
 */
class IAPManager {
  private isInitialized = false;

  /**
   * Check if the app is running on a native platform (iOS/Android)
   */
  isNativePlatform(): boolean {
    return Capacitor.isNativePlatform();
  }

  /**
   * Initialize the In-App Purchase system
   * Sets up StoreKit listeners and product catalog
   */
  async initialize(): Promise<void> {
    if (!this.isNativePlatform() || this.isInitialized) {
      console.log('[IAP] Skipping initialization - not on native platform or already initialized');
      return;
    }

    try {
      console.log('[IAP] Initializing StoreKit...');
      
      if (typeof CdvPurchase === 'undefined') {
        console.warn('[IAP] cordova-plugin-purchase not available, skipping initialization');
        return;
      }

      const { store, ProductType, Platform } = CdvPurchase;
      
      // Register both subscription products (in descending order per Apple requirements)
      store.register([
        {
          id: IAP_PRODUCT_IDS.YEARLY_SUBSCRIPTION,
          type: ProductType.PAID_SUBSCRIPTION,
          platform: Platform.APPLE_APPSTORE
        },
        {
          id: IAP_PRODUCT_IDS.MONTHLY_SUBSCRIPTION,
          type: ProductType.PAID_SUBSCRIPTION,
          platform: Platform.APPLE_APPSTORE
        }
      ]);
      
      // Handle approved transactions - verify receipt
      store.when().approved((transaction: any) => {
        console.log('[IAP] Transaction approved:', transaction.id);
        transaction.verify();
      });

      // Handle verified receipts - validate with backend
      store.when().verified(async (receipt: any) => {
        console.log('[IAP] Receipt verified, validating with backend...');
        const isValid = await this.validateReceipt(receipt.payload);
        if (isValid) {
          console.log('[IAP] Receipt validated successfully');
          receipt.finish();
        } else {
          console.error('[IAP] Receipt validation failed');
        }
      });

      // Handle finished transactions
      store.when().finished((transaction: any) => {
        console.log('[IAP] Transaction finished:', transaction.id);
      });

      // Handle errors
      store.when().error((error: any) => {
        console.error('[IAP] Store error:', error);
      });
      
      // Initialize with Apple App Store
      // Automatically handles sandbox vs production environment
      await store.initialize([Platform.APPLE_APPSTORE]);
      
      this.isInitialized = true;
      console.log('[IAP] StoreKit initialization complete');
    } catch (error) {
      console.error('[IAP] Initialization failed:', error);
      throw error;
    }
  }

  /**
   * Get available products from the store
   * Fetches product info from Apple App Store
   */
  async getProducts(): Promise<IAPProduct[]> {
    if (!this.isNativePlatform()) {
      console.log('[IAP] Not on native platform, returning empty products');
      return [];
    }

    await this.initialize();
    
    try {
      console.log('[IAP] Fetching products from App Store...');
      
      if (typeof CdvPurchase === 'undefined') {
        console.warn('[IAP] cordova-plugin-purchase not available');
        return [];
      }

      const { store } = CdvPurchase;
      const yearlyProduct = store.get(IAP_PRODUCT_IDS.YEARLY_SUBSCRIPTION);
      const monthlyProduct = store.get(IAP_PRODUCT_IDS.MONTHLY_SUBSCRIPTION);
      
      const products: IAPProduct[] = [];
      
      // Add products in descending order (Yearly first, Monthly second)
      if (yearlyProduct && yearlyProduct.pricing) {
        products.push({
          id: yearlyProduct.id,
          title: yearlyProduct.title || 'Yearly Subscription',
          description: yearlyProduct.description || 'Premium access - Best Value',
          price: yearlyProduct.pricing.price || '$49.99',
          currency: yearlyProduct.pricing.currency || 'USD',
        });
      }
      
      if (monthlyProduct && monthlyProduct.pricing) {
        products.push({
          id: monthlyProduct.id,
          title: monthlyProduct.title || 'Monthly Subscription',
          description: monthlyProduct.description || 'Premium access',
          price: monthlyProduct.pricing.price || '$4.99',
          currency: monthlyProduct.pricing.currency || 'USD',
        });
      }
      
      console.log('[IAP] Found products:', products);
      return products;
    } catch (error) {
      console.error('[IAP] Failed to fetch products:', error);
      return [];
    }
  }

  /**
   * Purchase a product through Apple StoreKit
   * Triggers Apple's payment sheet and validates receipt
   */
  async purchase(productId: string): Promise<IAPPurchaseResult> {
    if (!this.isNativePlatform()) {
      return {
        success: false,
        error: 'In-App Purchases only available on mobile devices',
      };
    }

    await this.initialize();
    console.log('[IAP] Initiating purchase for:', productId);
    
    try {
      if (typeof CdvPurchase === 'undefined') {
        throw new Error('cordova-plugin-purchase not available');
      }

      const { store } = CdvPurchase;
      const product = store.get(productId);
      
      if (!product) {
        throw new Error('Product not found');
      }
      
      if (!product.canPurchase) {
        throw new Error('Product not available for purchase');
      }

      // Get the offer and initiate purchase
      // This will trigger Apple's payment sheet
      const offer = product.getOffer();
      if (!offer) {
        throw new Error('No offer available for product');
      }
      
      await offer.order();
      
      console.log('[IAP] Purchase initiated - waiting for Apple payment sheet');
      
      // The purchase flow continues in the approved/verified callbacks
      // Return pending status
      return {
        success: true,
        productId,
        transactionId: 'pending',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Purchase failed';
      console.error('[IAP] Purchase error:', errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Validate receipt with backend
   * Supports dual environment (production first, then sandbox)
   */
  private async validateReceipt(receiptData: string): Promise<boolean> {
    try {
      console.log('[IAP] Validating receipt with backend...');
      
      const { data, error } = await supabase.functions.invoke('validate-receipt', {
        body: { receiptData }
      });

      if (error) {
        console.error('[IAP] Receipt validation error:', error);
        return false;
      }
      
      console.log('[IAP] Receipt validation result:', data);
      return data?.valid === true;
    } catch (error) {
      console.error('[IAP] Receipt validation failed:', error);
      return false;
    }
  }

  /**
   * Restore previous purchases
   * Required by Apple for subscription apps
   */
  async restorePurchases(): Promise<IAPPurchaseResult> {
    if (!this.isNativePlatform()) {
      return {
        success: false,
        error: 'In-App Purchases only available on mobile devices',
      };
    }

    await this.initialize();
    console.log('[IAP] Initiating restore purchases...');
    
    try {
      if (typeof CdvPurchase === 'undefined') {
        throw new Error('cordova-plugin-purchase not available');
      }

      const { store } = CdvPurchase;
      
      // Restore purchases - this will trigger the approved/verified callbacks
      await store.restorePurchases();
      
      console.log('[IAP] Restore purchases initiated - waiting for callbacks');
      return {
        success: true,
        productId: 'restored',
        transactionId: 'pending',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Restore failed';
      console.error('[IAP] Restore error:', errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }
}

export const iapManager = new IAPManager();
