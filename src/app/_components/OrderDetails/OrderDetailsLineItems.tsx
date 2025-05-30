import { LineItem } from "@/app/_types/lineItem";
import OrderItem from "../Order/OrderItem";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface OrderDetailsLineItemsProps {
  lineItems: LineItem[];
  showTitle?: boolean;
}

export default function OrderDetailsLineItems({
  lineItems,
  showTitle = true,
}: OrderDetailsLineItemsProps) {
  const { t } = useLanguage();

  return (
    <div>
      {showTitle && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {t("account.orderDetails.products")}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {t("account.orderDetails.totalItems").replace(
              "{count}",
              lineItems.length.toString(),
            )}
          </p>
        </div>
      )}
      <div className="mt-2 flex flex-col items-center justify-center gap-4 divide-y-2 divide-gray-100 rounded-t-lg bg-gray-100 px-4 py-4">
        {lineItems.map((item) => (
          <OrderItem key={item.variant as string} item={item} />
        ))}
      </div>
    </div>
  );
}
