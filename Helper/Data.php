<?php
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

namespace MageINIC\Quantity\Helper;

use Magento\Framework\App\Helper\AbstractHelper;

/**
 * class Data for helper
 */
class Data extends AbstractHelper
{
    /**
     * XML Path to get the value
     */
    public const XML_MODULE_STATUS_PATH = 'qty_increase_decrease/general/enable';
    public const XML_CART_PAGE_STATUS_PATH = 'qty_increase_decrease/general/show_on_cart';
    public const XML_PRODUCT_WIDGETS_STATUS_PATH = 'qty_increase_decrease/general/show_on_product_widgets';
    public const XML_CHECKOUT_PAGE_STATUS_PATH = 'qty_increase_decrease/general/show_on_checkout_page';
    public const XML_LIST_PAGE_STATUS_PATH = 'qty_increase_decrease/general/show_on_list_page';
    public const XML_WISHLIST_PAGE_STATUS_PATH = 'qty_increase_decrease/general/show_on_wishlist_page';
    public const XML_COMPERE_PAGE_STATUS_PATH = 'qty_increase_decrease/general/show_on_compare_page';
    public const XML_RELATED_PAGE_STATUS_PATH = 'qty_increase_decrease/general/show_on_related_page';
    public const XML_CROSSSELL_PAGE_STATUS_PATH = 'qty_increase_decrease/general/show_on_crosssell_page';
    public const XML_UPSELL_PAGE_STATUS_PATH = 'qty_increase_decrease/general/show_on_upsell_page';
    public const XML_PRODUCT_DETAILS_PAGE_STATUS_PATH = 'qty_increase_decrease/general/show_on_product_details_page';

    /**
     * Module Status
     *
     * @return mixed
     */
    public function getModuleEnable(): mixed
    {
        return $this->scopeConfig->getValue(self::XML_MODULE_STATUS_PATH);
    }

    /**
     * Button status on Listing Page
     *
     * @return mixed
     */
    public function showButtonOnListPage(): mixed
    {
        return $this->scopeConfig->getValue(self::XML_LIST_PAGE_STATUS_PATH);
    }

    /**
     * Button status on Compare product page
     *
     * @return mixed
     */
    public function showButtonOnComparePage(): mixed
    {
        return $this->scopeConfig->getValue(self::XML_COMPERE_PAGE_STATUS_PATH);
    }

    /**
     * Button status on product details page
     *
     * @return mixed
     */
    public function showButtonOnProductDetailsPage(): mixed
    {
        return $this->scopeConfig->getValue(self::XML_PRODUCT_DETAILS_PAGE_STATUS_PATH);
    }

    /**
     * Button status on Cart page
     *
     * @return mixed
     */
    public function showButtonOnCart(): mixed
    {
        return $this->scopeConfig->getValue(self::XML_CART_PAGE_STATUS_PATH);
    }

    /**
     * Button status on Checkout Page
     *
     * @return mixed
     */
    public function showButtonOnCheckoutPage(): mixed
    {
        return $this->scopeConfig->getValue(self::XML_CHECKOUT_PAGE_STATUS_PATH);
    }

    /**
     * Button status on Related product page
     *
     * @return mixed
     */
    public function showButtonOnRelatedPage(): mixed
    {
        return $this->scopeConfig->getValue(self::XML_RELATED_PAGE_STATUS_PATH);
    }

    /**
     * Button status on Upsell product page
     *
     * @return mixed
     */
    public function showButtonOnUpsellPage(): mixed
    {
        return $this->scopeConfig->getValue(self::XML_UPSELL_PAGE_STATUS_PATH);
    }

    /**
     * Button status on Crosssell product page
     *
     * @return mixed
     */
    public function showButtonOnCrosssellPage(): mixed
    {
        return $this->scopeConfig->getValue(self::XML_CROSSSELL_PAGE_STATUS_PATH);
    }

    /**
     * Button status on WishList page
     *
     * @return mixed
     */
    public function showButtonOnWishListPage(): mixed
    {
        return $this->scopeConfig->getValue(self::XML_WISHLIST_PAGE_STATUS_PATH);
    }

    /**
     * Button status on Product Widgets
     *
     * @return mixed
     */
    public function showButtonOnProductWidgets(): mixed
    {
        return $this->scopeConfig->getValue(self::XML_PRODUCT_WIDGETS_STATUS_PATH);
    }
}
