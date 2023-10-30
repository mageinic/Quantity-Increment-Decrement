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

var config = {
    map: {
        '*': {
            'Magento_Checkout/template/minicart/item/default.html':
                'MageINIC_Quantity/template/minicart/item/default.html',
            'Magento_Checkout/template/summary/item/details.html':
                'MageINIC_Quantity/template/summary/item/details.html',
            'Magento_Checkout/js/view/minicart':
                'MageINIC_Quantity/js/view/minicart',
            'Magento_Checkout/js/view/summary/item/details':
                'MageINIC_Quantity/js/view/summary/item/details',
            'Magento_Checkout/js/view/summary/item/details/thumbnail':
                'Magento_Checkout/js/view/summary/item/details/thumbnail',
            'Magento_Checkout/js/view/summary/item/details/message':
                'Magento_Checkout/js/view/summary/item/details/message',
            'Magento_Checkout/js/view/summary/item/details/subtotal':
                'Magento_Checkout/js/view/summary/item/details/subtotal',
            'sidebar': 'MageINIC_Quantity/js/sidebar',
            'quantity': 'MageINIC_Quantity/js/quantity'
        }
    }
};
