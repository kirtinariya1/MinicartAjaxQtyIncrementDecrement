var config = {
	config: {
        mixins: {
            'Magento_Checkout/js/sidebar': {
                'Kcn_MinicartQty/js/sidebar': true
            }
        }
    },
    map: {
        '*': {
            'Magento_Checkout/template/minicart/item/default.html': 'Kcn_MinicartQty/template/minicart/item/default.html'
        }
    }
};