define([
    'jquery',
    'Magento_Customer/js/model/authentication-popup',
    'Magento_Customer/js/customer-data',
    'Magento_Ui/js/modal/alert',
    'Magento_Ui/js/modal/confirm',
    'underscore',
    'jquery/ui',
    'mage/decorate',
    'mage/collapsible',
    'mage/cookies'
], function ($, authenticationPopup, customerData, alert, confirm, _) {
    'use strict';

    return function (widget) {

        $.widget('mage.sidebar', widget, {

            _updateItemQty: function (elem) {
                var itemId = elem.data('cart-item');

                var btnplus = elem.data('btn-plus');
                var btnminus = elem.data('btn-minus');

                this._ajax(this.options.url.update, {
                    'item_id': itemId,
                    'item_qty': $('#cart-item-' + itemId + '-qty').val(),
                    'item_btn_plus': btnplus,
                    'item_btn_minus': btnminus
                }, elem, this._updateItemQtyAfter);
                this._customerData();
            },

            /**
             * Update content after update qty
             *
             * @param {HTMLElement} elem
             */
            _updateItemQtyAfter: function (elem) {
                var productData = this._getProductById(Number(elem.data('cart-item')));

                if (!_.isUndefined(productData)) {
                    $(document).trigger('ajax:updateCartItemQty');

                    if (window.location.href === this.shoppingCartUrl) {
                        window.location.reload(false);
                    }
                }
                this._hideItemButton(elem);
            },

            _customerData : function ()  {
                var sections = ['cart'];
                customerData.invalidate(sections);
                customerData.reload(sections, true);
            }

        });
        return $.mage.sidebar;
    }
});
