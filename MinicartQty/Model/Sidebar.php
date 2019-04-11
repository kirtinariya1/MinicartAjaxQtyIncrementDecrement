<?php
namespace Kcn\MinicartQty\Model;

use Magento\Checkout\Helper\Data as HelperData;
use Kcn\MinicartQty\Model\Cart;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Locale\ResolverInterface;
use Magento\Quote\Api\Data\CartItemInterface;
use Magento\Quote\Model\Quote\Address\Total;

class Sidebar extends \Magento\Checkout\Model\Sidebar
{
    protected $resolver;

    /**
     * @var Cart
     */
    protected $cart;

    /**
     * @param Cart $cart
     * @param HelperData $helperData
     * @param ResolverInterface $resolver
     * @codeCoverageIgnore
     */
    public function __construct(
        Cart $cart,
        ResolverInterface $resolver
    ) {
        $this->cart = $cart;
        $this->resolver = $resolver;
    }

    /**
     * Update quote item
     *
     * @param int $itemId
     * @param int $itemQty
     * @throws LocalizedException
     * @return $this
     */
    public function updateQuoteItem($itemId, $itemQty)
    {
        $qtyPlusMinus = explode(",", $itemQty);

        $itemData = [$itemId => ['qty' => $this->normalize($qtyPlusMinus[0]), 'qtyplusminus' => $qtyPlusMinus[1]]];
        $this->cart->updateItems($itemData)->save();
        return $this;
    }

    protected function normalize($itemQty)
    {
        if ($itemQty) {
            $filter = new \Zend_Filter_LocalizedToNormalized(
                ['locale' => $this->resolver->getLocale()]
            );
            return $filter->filter($itemQty);
        }
        return $itemQty;
    }

    public function checkQuoteItem($itemId)
    {
        $item = $this->cart->getQuote()->getItemById($itemId);
        if (!$item instanceof CartItemInterface) {
            throw new LocalizedException(__("The quote item isn't found. Verify the item and try again."));
        }
        return $this;
    }
}
