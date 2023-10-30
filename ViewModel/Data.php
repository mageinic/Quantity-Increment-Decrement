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

namespace MageINIC\Quantity\ViewModel;

use Magento\Catalog\Helper\Output;
use Magento\Catalog\Helper\Product\Compare;
use Magento\Catalog\Model\Product;
use Magento\Tax\Helper\Data as TaxHelper;
use Magento\Catalog\ViewModel\Product\Listing\PreparePostData;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\Url\Helper\Data as UrlHelper;
use Magento\Framework\View\Element\Block\ArgumentInterface;
use Magento\Msrp\Helper\data as MsrpHelper;
use Magento\Wishlist\Helper\Data as WishlistHelper;
use MageINIC\Quantity\Helper\Data as QtyHelper;

/**
 * Class Data ViewModel
 */
class Data implements ArgumentInterface
{
    /**
     * @var ScopeConfigInterface
     */
    protected ScopeConfigInterface $scopeConfig;

    /**
     * @var Output
     */
    protected Output $output;

    /**
     * @var Compare
     */
    protected Compare $compare;

    /**
     * @var WishlistHelper
     */
    protected WishlistHelper $helper;

    /**
     * @var UrlHelper
     */
    protected UrlHelper $urlHelper;

    /**
     * @var MsrpHelper
     */
    protected MsrpHelper $helperMsrp;

    /**
     * @var QtyHelper
     */
    protected QtyHelper $qtyHelper;

    /**
     * @var PreparePostData
     */
    protected PreparePostData $viewModelPostData;

     /**
      * @var TaxHelper
      */
    protected TaxHelper $taxHelper;

    /**
     * @param ScopeConfigInterface $scopeConfig
     * @param Compare $compare
     * @param WishlistHelper $helper
     * @param QtyHelper $qtyHelper
     * @param MsrpHelper $helperMsrp
     * @param TaxHelper $taxHelper
     * @param UrlHelper $urlHelper
     * @param PreparePostData $viewModelPostData
     * @param Output $output
     */
    public function __construct(
        ScopeConfigInterface $scopeConfig,
        Compare              $compare,
        WishlistHelper       $helper,
        QtyHelper            $qtyHelper,
        MsrpHelper           $helperMsrp,
        TaxHelper            $taxHelper,
        UrlHelper            $urlHelper,
        PreparePostData      $viewModelPostData,
        Output               $output
    ) {
        $this->scopeConfig = $scopeConfig;
        $this->output = $output;
        $this->compare = $compare;
        $this->helper = $helper;
        $this->urlHelper = $urlHelper;
        $this->helperMsrp = $helperMsrp;
        $this->qtyHelper = $qtyHelper;
        $this->viewModelPostData = $viewModelPostData;
        $this->taxHelper = $taxHelper;
    }

    /**
     * Show Button On List Page
     *
     * @return mixed
     */
    public function showButtonOnListPage(): mixed
    {
        return $this->qtyHelper->showButtonOnListPage();
    }

    /**
     * Show Button On Compare Page
     *
     * @return mixed
     */
    public function showButtonOnComparePage(): mixed
    {
        return $this->qtyHelper->showButtonOnComparePage();
    }

    /**
     * Show Button On Product Details Page
     *
     * @return mixed
     */
    public function showButtonOnProductDetailsPage(): mixed
    {
        return $this->qtyHelper->showButtonOnProductDetailsPage();
    }

    /**
     * Show Button On Cart
     *
     * @return mixed
     */
    public function showButtonOnCart(): mixed
    {
        return $this->qtyHelper->showButtonOnCart();
    }

    /**
     * Show Button On Related Page
     *
     * @return mixed
     */
    public function showButtonOnRelatedPage(): mixed
    {
        return $this->qtyHelper->showButtonOnRelatedPage();
    }

    /**
     * Show Button On Upsell Page
     *
     * @return mixed
     */
    public function showButtonOnUpsellPage(): mixed
    {
        return $this->qtyHelper->showButtonOnUpsellPage();
    }

    /**
     * Show Button On Crosssell Page
     *
     * @return mixed
     */
    public function showButtonOnCrosssellPage(): mixed
    {
        return $this->qtyHelper->showButtonOnCrosssellPage();
    }

    /**
     * Show Button On Wish List Page
     *
     * @return mixed
     */
    public function showButtonOnWishListPage(): mixed
    {
        return $this->qtyHelper->showButtonOnWishListPage();
    }

    /**
     * Show Button On Product Widgets
     *
     * @return mixed
     */
    public function showButtonOnProductWidgets(): mixed
    {
        return $this->qtyHelper->showButtonOnProductWidgets();
    }

    /**
     * Get Module Enable
     *
     * @return mixed
     */
    public function getModuleEnable(): mixed
    {
        return $this->qtyHelper->getModuleEnable();
    }

    /**
     * Get Product Attribute
     *
     * @param Product $product
     * @param string $attributeHtml
     * @param string $attributeName
     * @return string
     * @throws LocalizedException
     */
    public function getProductAttribute(Product $product, string $attributeHtml, string $attributeName): string
    {
        return $this->output->productAttribute($product, $attributeHtml, $attributeName);
    }

    /**
     * Get Post Data Remove
     *
     * @param Product $product
     * @return string
     */
    public function getPostDataRemove(Product $product): string
    {
        return $this->compare->getPostDataRemove($product);
    }

    /**
     * Get Add To Cart Url
     *
     * @param Product $product
     * @return string
     */
    public function getAddToCartUrl(Product $product): string
    {
        return $this->compare->getAddToCartUrl($product);
    }

    /**
     * Check is allow wishlist module
     *
     * @return bool
     */
    public function isAllow(): bool
    {
        return $this->helper->isAllow();
    }

    /**
     * Wrapper for the PostHelper::getPostData()
     *
     * @param string $url
     * @param array $data
     * @return array
     */
    public function getPostData(string $url, array $data = []): array
    {
        return $this->viewModelPostData->getPostData($url, $data);
    }

    /**
     * Returns options data array
     *
     * @param Product $product
     * @return array
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     */
    public function getOptionsData(Product $product): array
    {
        return [];
    }

    /**
     * Check if we should show MAP proce before order confirmation
     *
     * @param int|Product $product
     * @return bool
     * @throws NoSuchEntityException
     */
    public function isShowBeforeOrderConfirm(int|Product $product): bool
    {
        return $this->helperMsrp->isShowBeforeOrderConfirm($product);
    }

    /**
     * Check if any MAP price is larger than as low as value.
     *
     * @param int|Product $product
     * @return bool
     * @throws NoSuchEntityException
     */
    public function isMinimalPriceLessMsrp(int|Product $product): bool
    {
        return $this->helperMsrp->isMinimalPriceLessMsrp($product);
    }
}
