class PurchasesService {
  async makePurchase(newPurchase) {
    const data = await newPurchase.save();

    return data;
  }
}

module.exports = new PurchasesService();