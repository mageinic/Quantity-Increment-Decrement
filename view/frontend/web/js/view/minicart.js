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
        'uiComponent',
        'Magento_Customer/js/customer-data',
        'jquery',
        'ko',
        'underscore',
        'sidebar',
        'mage/translate',
        'mage/dropdown'
    ], function (Component, customerData, $, ko, _) {
        'use strict';

        var sidebarInitialized = false, addToCartCalls = 0, miniCart;

        miniCart = $('[data-block=\'minicart\']');

        function initSidebar()
        {
            if (miniCart.data('mageSidebar')) {
                miniCart.sidebar('update');
            }

            if (!$('[data-role=product-item]').length) {
                return false;
            }
            miniCart.trigger('contentUpdated');

            if (sidebarInitialized) {
                return false;
            }
            sidebarInitialized = true;
            miniCart.sidebar({
                'targetElement': 'div.block.block-minicart', 'url': {
                    'checkout': window.checkout.checkoutUrl,
                    'update': window.checkout.updateItemQtyUrl,
                    'remove': window.checkout.removeItemUrl,
                    'loginUrl': window.checkout.customerLoginUrl,
                    'isRedirectRequired': window.checkout.isRedirectRequired
                }, 'button': {
                    'checkout': '#top-cart-btn-checkout',
                    'remove': '#mini-cart a.action.delete',
                    'close': '#btn-minicart-close'
                }, 'showcart': {
                    'parent': 'span.counter', 'qty': 'span.counter-number', 'label': 'span.counter-label'
                }, 'minicart': {
                    'list': '#mini-cart',
                    'content': '#minicart-content-wrapper',
                    'qty': 'div.items-total',
                    'subtotal': 'div.subtotal span.price',
                    'maxItemsVisible': window.checkout.minicartMaxItemsVisible
                }, 'item': {
                    'qty': ':input.cart-item-qty',
                    'button': ':button.update-cart-item',
                    'qtyDecreasing': '.decreasing-qty',
                    'qtyIncreasing': '.increasing-qty'
                }, 'confirmMessage': $.mage.__('Are you sure you would like to remove this item from the shopping cart?')
            });
        }

        miniCart.on('dropdowndialogopen', function () {
            initSidebar();
        });

        return Component.extend({
            shoppingCartUrl: window.checkout.shoppingCartUrl,
            maxItemsToDisplay: window.checkout.maxItemsToDisplay,
            cart: {},

            initialize: function () {
                var self = this, cartData = customerData.get('cart');
                /*var is_qty = 0;*/
                this.update(cartData());
                cartData.subscribe(function (updatedCart) {
                    addToCartCalls--;
                    this.isLoading(addToCartCalls > 0);
                    sidebarInitialized = false;
                    this.update(updatedCart);
                    initSidebar();
                }, this);
                $('[data-block="minicart"]').on('contentLoading', function () {
                    addToCartCalls++;
                    self.isLoading(true);
                });

                if (cartData()['website_id'] !== window.checkout.websiteId) {
                    customerData.reload(['cart'], false);
                }

                return this._super();
            },
            isLoading: ko.observable(false),
            initSidebar: initSidebar,

            closeMinicart: function () {
                $('[data-block="minicart"]').find('[data-role="dropdownDialog"]').dropdownDialog('close');
            },

            closeSidebar: function () {
                var minicart = $('[data-block="minicart"]');

                minicart.on('click', '[data-action="close"]', function (event) {
                    event.stopPropagation();
                    minicart.find('[data-role="dropdownDialog"]').dropdownDialog('close');
                });

                return true;
            },

            getItemRenderer: function (productType) {
                return this.itemRenderer[productType] || 'defaultRenderer';
            },

            update: function (updatedCart) {
                _.each(updatedCart, function (value, key) {
                    if (!this.cart.hasOwnProperty(key)) {
                        this.cart[key] = ko.observable();
                    }
                    this.cart[key](value);
                }, this);
            },

            getCartParamUnsanitizedHtml: function (name) {
                if (!_.isUndefined(name)) {
                    if (!this.cart.hasOwnProperty(name)) {
                        this.cart[name] = ko.observable();
                    }
                }

                return this.cart[name]();
            },

            getCartParam: function (name) {
                return this.getCartParamUnsanitizedHtml(name);
            },

            getCartItems: function () {
                var items = this.getCartParamUnsanitizedHtml('items') || [];

                items = items.slice(parseInt(-this.maxItemsToDisplay, 10));

                return items;
            },

            getCartLineItemsCount: function () {
                var items = this.getCartParamUnsanitizedHtml('items') || [];

                return parseInt(items.length, 10);
            }
        });
    }
);
