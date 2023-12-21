import PaymentStatus from "@/components/PaymentStatus";
import { FEE, PRODUCT_CATEGORIES } from "@/config";
import { getServerSideUser } from "@/lib/payload-utils";
import { formatPrice } from "@/lib/utils";
import { Product, ProductFile, User } from "@/payload-types";

import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import payload from "payload";

interface ThankYouPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const Page = async ({ searchParams }: ThankYouPageProps) => {
  const orderId = searchParams.orderId;
  const Nextcookie = cookies();
  const { user } = await getServerSideUser(Nextcookie);

  const { docs: orders } = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });
  const [order] = orders;
  if (!order) return notFound();
  const orderUserId =
    typeof order.user === "string" ? order.user : order.user.id;

  if (orderUserId !== user?.id) {
    return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`);
  }
  const products = order.products as Product[];
  const orderTotal = products.reduce((total = 0, product) => {
    return total + product.price;
  }, 0);

  return (
    <main className="relative lg:min-h-full">
      <div className="hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12 ">
        <Image
          src="/checkout-thank-you.jpg"
          fill
          className="h-full w-full object-cover object-center"
          alt="thank you for your Order"
        />
      </div>
      <div>
        <div className=" mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24  ">
          <div className="lg:col-start-2">
            <p className="text-sm font-medium text-blue-600">Order Sucessful</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Thanks for ordering
            </h1>
            {order._isPaid ? (
              <p className="mt-2 text-base text-muted-foreground">
                Your order was processed and your assets are available to
                download below. we&apos;ve send your receipt and order details
                to{` `}
                {typeof order.user !== "string" ? (
                  <span className="font-medium text-gray-900">
                    {order.user.email}
                  </span>
                ) : null}
              </p>
            ) : (
              <p className="mt-2 text-base text-muted-foreground">
                we appreciate your order, and we&apos;re currently processing
                it. So hang tight and we&apos;ll send you confirmation very
                soon!
              </p>
            )}
            <div className="mt-16 text-sm font-medium">
              <div className="text-muted-foreground">Order nr.</div>
            </div>
            <div className="mt-2 text-gray-900">{order.id}</div>
            <ul className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground">
              {(order.products as Product[]).map((prod) => {
                const label = PRODUCT_CATEGORIES.find(
                  (c) => c.value === prod.category
                )?.label;
                const downloadUrl = (prod.product_files as ProductFile)
                  .url as string;
                const { image } = prod.images[0];
                return (
                  <li key={prod.id} className="flex space-x-6 py-6">
                    <div className="relative h-24 w-24">
                      {typeof image !== "string" && image.url ? (
                        <Image
                          src={image.url}
                          alt={`${prod.name} image`}
                          fill
                          className="flex-none rounded-md bg-gray-100 object-cover object-center"
                        />
                      ) : null}
                    </div>
                    <div className="flex-auto flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="text-gray-900">{prod.name}</h3>
                        <p className="my-1">Category: {label}</p>
                      </div>
                      {order._isPaid ? (
                        <a
                          href={downloadUrl}
                          download={prod.name}
                          className="text-blue-600 hover:underline underline-offset-2"
                        >
                          Download asset
                        </a>
                      ) : null}
                    </div>
                    <p className="flex-none font-medium text-gray-900">
                      {formatPrice(prod.price)}
                    </p>
                  </li>
                );
              })}
            </ul>
            <div className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p className="text-gray-900">{formatPrice(orderTotal)}</p>
              </div>
              <div className="flex justify-between">
                <p>Transaction fee</p>
                <p className="text-gray-900">{formatPrice(FEE)}</p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                <p className="text-base">Total</p>
                <p className="text-base">{formatPrice(orderTotal + FEE)}</p>
              </div>
            </div>
            <PaymentStatus
              isPaid={order._isPaid}
              orderEmail={(order.user as User).email}
              orderId={order.id}
            />
            <div className="mt-16 border-t border-gray-200 py-6 text-right">
              <Link
                href="/products"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Continue shopping &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
