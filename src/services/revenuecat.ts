import Purchases from 'react-native-purchases';

export const REVENUECAT_API_KEY = 'revenuecat_api_key';

export const initializePurchases = async () => {
  try {
    await Purchases.configure({ apiKey: REVENUECAT_API_KEY });
    console.log('RevenueCat initialized');
  } catch (error) {
    console.error('Error initializing RevenueCat:', error);
  }
};

export const checkSubscriptionStatus = async () => {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo.entitlements.active.premium !== undefined;
  } catch (error) {
    console.error('Error checking subscription:', error);
    return false;
  }
};

export const purchaseSubscription = async (productId: string) => {
  try {
    const { customerInfo, productIdentifier } = await Purchases.purchaseProduct(productId);
    return {
      success: true,
      customerInfo,
      productIdentifier,
    };
  } catch (error: any) {
    if (error.code === 'PURCHASE_CANCELLED') {
      return { success: false, cancelled: true };
    }
    return { success: false, error };
  }
};