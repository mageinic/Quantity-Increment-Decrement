/**
 * MageINIC
 * Copyright (C) 2023 MageINIC <support@mageinic.com>
 *
 * NOTICE OF LICENSE
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see https://opensource.org/licenses/gpl-3.0.html.
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @category MageINIC
 * @package MageINIC_Quantity
 * @copyright Copyright (c) 2023 MageINIC (https://www.mageinic.com/)
 * @license https://opensource.org/licenses/gpl-3.0.html GNU General Public License,version 3 (GPL-3.0)
 * @author MageINIC <support@mageinic.com>
 */

define([
    'jquery',
    'uiComponent',
    'Magento_Customer/js/model/authentication-popup',
    'Magento_Customer/js/customer-data', 'Magento_Checkout/js/model/quote',
    'Magento_Checkout/js/action/get-totals',
    'Magento_Checkout/js/model/shipping-service',
    'Magento_Checkout/js/model/shipping-rate-registry',
    'Magento_Checkout/js/model/resource-url-manager',
    'mage/storage',
    'Magento_Checkout/js/model/error-processor',
    'mage/url',
    'Magento_Ui/js/modal/alert',
    'Magento_Ui/js/modal/confirm',
    'underscore',
    'jquery/ui',
    'mage/decorate',
    'mage/collapsible',
    'mage/cookies'
], function (
    $,
    Component,
    authenticationPopup,
    customerData,
    quote,
    getTotalsAction,
    shippingService,
    rateRegistry,
    resourceUrlManager,
    storage,
    errorProcessor,
    url,
    alert,
    confirm,
    _
) {
    'use strict';

    return Component.extend({
        shoppingCartUrl: window.checkout.shoppingCartUrl, defaults: {
            template: 'Magento_Checkout/summary/item/details'
        },

        getValue: function (quoteItem) {
            return quoteItem.name;
        }, updateItemQtyCheckout: function (data, event) {
            var btnMinus = "";
            var btnPlus = "";
            if (event.target.classList[1] === "minus") {
                btnMinus = event.currentTarget.dataset.btnMinus;
            }
            if (event.target.classList[1] === "plus") {
                btnPlus = event.currentTarget.dataset.btnPlus;
            }
            var itemId = event.currentTarget.dataset.cartItem;


            var elem = $('#cart-item-' + itemId + '-qty');
            if (event.target.classList[1] === 'plus') {
                elem.val(parseInt(elem.val()) + 1)
            } else if (event.target.classList[1] === 'minus' && elem.val() !== '1') {
                elem.val(parseInt(elem.val()) - 1)
            }

            this._ajax(
                url.build('checkout/sidebar/updateItemQty'),
                {
                    'item_id': itemId,
                    'item_qty': elem.val(),
                    'item_btn_plus': btnPlus,
                    'item_btn_minus': btnMinus
                },
                elem,
                this._updateItemQtyAfter
            );
        },

        _getProductById: function (productId) {
            return _.find(customerData.get('cart')().items, function (item) {
                return productId === Number(item['item_id']);
            });
        },

        _updateItemQtyAfter: function (elem) {
            var productData = this._getProductById(Number(elem.data('cart-item')));

            if (!_.isUndefined(productData)) {
                $(document).trigger('ajax:updateCartItemQty');

                if (window.location.href === this.shoppingCartUrl) {
                    window.location.reload(false);
                }
            }
            this._hideItemButton(elem);
            this._customerData();
        },

        _customerData: function () {
            var deferred = $.Deferred();
            getTotalsAction([], deferred);
            var sections = ['cart'];
            customerData.invalidate(sections);
            customerData.reload(sections, true);
            var self = this;
            self._estimateTotalsAndUpdateRatesCheckout();
        },

        _ajax: function (url, data, elem, callback) {
            $.extend(data, {
                'form_key': $.mage.cookies.get('form_key')
            });

            $.ajax({
                url: url, data: data, type: 'post', dataType: 'json', context: this,

                /** @inheritdoc */
                beforeSend: function () {
                    elem.attr('disabled', 'disabled');
                },

                /** @inheritdoc */
                complete: function () {
                    elem.attr('disabled', null);
                }
            })
                .done(function (response) {
                    var msg;

                    if (response.success) {
                        callback.call(this, elem, response);
                    } else {
                        msg = response['error_message'];

                        if (msg) {
                            alert({
                                content: msg
                            });
                        }
                    }
                })
                .fail(function (error) {
                    console.log(JSON.stringify(error));
                });
        },

        _hideItemButton: function (elem) {
            var itemId = elem.data('cart-item');

            $('#update-cart-item-' + itemId).hide('fade', 300);
        },

        _removeItemAfter: function (elem) {
            var productData = this._getProductById(Number(elem.data('cart-item')));

            if (!_.isUndefined(productData)) {
                $(document).trigger('ajax:removeFromCart', {
                    productIds: [productData['product_id']]
                });
                var sections = ['cart'];

                setTimeout(function () {
                    if (customerData.get('cart')().items.length === 0) {
                        window.location.reload();
                    }
                }, 2000);

                if (window.location.href.indexOf(this.shoppingCartUrl) === 0) {
                    window.location.reload();
                }
            }
            this._customerData();
        },

        _estimateTotalsAndUpdateRatesCheckout: function () {
            var serviceUrl, payload;
            var address = quote.shippingAddress();
            shippingService.isLoading(true);
            serviceUrl = resourceUrlManager.getUrlForEstimationShippingMethodsForNewAddress(quote);
            payload = JSON.stringify({
                address: {
                    'street': address.street,
                    'city': address.city,
                    'region_id': address.regionId,
                    'region': address.region,
                    'country_id': address.countryId,
                    'postcode': address.postcode,
                    'email': address.email,
                    'customer_id': address.customerId,
                    'firstname': address.firstname,
                    'lastname': address.lastname,
                    'middlename': address.middlename,
                    'prefix': address.prefix,
                    'suffix': address.suffix,
                    'vat_id': address.vatId,
                    'company': address.company,
                    'telephone': address.telephone,
                    'fax': address.fax,
                    'custom_attributes': address.customAttributes,
                    'save_in_address_book': address.saveInAddressBook
                }
            });
            storage.post(serviceUrl, payload, false).done(function (result) {
                rateRegistry.set(address.getCacheKey(), result);
                shippingService.setShippingRates(result);
            }).fail(function (response) {
                shippingService.setShippingRates([]);
                errorProcessor.process(response);
            }).always(function () {
                shippingService.isLoading(false);
            });
        },

        checkModuleIsEnable: function () {
            return window.checkoutConfig.MageINICQuantityModuleStatus;
        }
    });
});
