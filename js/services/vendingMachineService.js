const VendingMachineService = (() => {
    const loadProducts = async (url) => {
        try {
            const response = await fetch(url);
            return response.json();
        } catch (error) {
            console.error('Error loading products:', error);
        }
    };

    const isAffordable = (totalAmount, price) => totalAmount >= price;

    const insertAmount = (totalAmount, amount) => {
        return amount > 0 ? totalAmount + amount : totalAmount;
    };

    const returnAmount = () => 0;

    const purchaseProduct = (totalAmount, price) => {
        return totalAmount >= price ? totalAmount - price : totalAmount;
    };

    return {
        loadProducts,
        isAffordable,
        insertAmount,
        returnAmount,
        purchaseProduct,
    };
})();

export default VendingMachineService;