import { Capacitor } from '@capacitor/core';

// Product IDs for App Store (must match App Store Connect)
export const IAP_PRODUCT_IDS = {
  LEADERSHIP_PLAN: 'com.apex.leadershipplan',
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
      console.log('[IAP] Product ID:', IAP_PRODUCT_IDS.LEADERSHIP_PLAN);
      
      // TODO: Native developer - Initialize StoreKit here
      // Example with cordova-plugin-purchase:
      // const { store, ProductType, Platform } = CdvPurchase;
      // store.register([{
      //   id: IAP_PRODUCT_IDS.LEADERSHIP_PLAN,
      //   type: ProductType.PAID_SUBSCRIPTION,
      //   platform: Platform.APPLE_APPSTORE
      // }]);
      // 
      // store.when().approved((transaction) => {
      //   transaction.verify();
      // });
      //
      // store.when().verified((receipt) => {
      //   this.validateReceipt(receipt.payload);
      // });
      //
      // await store.initialize([Platform.APPLE_APPSTORE]);
      
      this.isInitialized = true;
      console.log('[IAP] StoreKit initialization ready');
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
      
      // TODO: Native developer - Replace with actual StoreKit call
      // Example with cordova-plugin-purchase:
      // const product = store.get(IAP_PRODUCT_IDS.LEADERSHIP_PLAN);
      // if (!product) throw new Error('Product not found');
      // 
      // return [{
      //   id: product.id,
      //   title: product.title,
      //   description: product.description,
      //   price: product.pricing.price,
      //   currency: product.pricing.currency,
      // }];
      
      // Placeholder for development
      return [{
        id: IAP_PRODUCT_IDS.LEADERSHIP_PLAN,
        title: 'Leadership Plan',
        description: 'Premium access to all leadership features',
        price: '$4.99',
        currency: 'USD',
      }];
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
      // TODO: Native developer - Implement actual StoreKit purchase
      // Example with cordova-plugin-purchase:
      // const product = store.get(productId);
      // if (!product || !product.canPurchase) {
      //   throw new Error('Product not available for purchase');
      // }
      //
      // const offer = product.getOffer();
      // await offer.order();
      //
      // This will trigger Apple's payment sheet
      // Purchase flow continues in the approved/verified callbacks
      // set up in initialize()
      
      return {
        success: false,
        error: 'StoreKit integration pending - native implementation required',
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
      
      // TODO: Native developer - Call your receipt validation edge function
      // Example:
      // const { data, error } = await supabase.functions.invoke('validate-receipt', {
      //   body: { receiptData }
      // });
      //
      // if (error) throw error;
      // return data.valid;
      
      return false;
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
      // TODO: Native developer - Implement actual StoreKit restore
      // Example with cordova-plugin-purchase:
      // await store.restorePurchases();
      // 
      // The restored purchases will trigger the approved/verified callbacks
      // set up in initialize()
      
      console.log('[IAP] Restore purchases initiated');
      return {
        success: false,
        error: 'StoreKit integration pending - native implementation required',
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
