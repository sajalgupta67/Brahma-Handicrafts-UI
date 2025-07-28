import React from 'react';
import { Truck, Package, RotateCcw, Shield, Clock, MapPin } from 'lucide-react';

export default function Shipping() {
  return (
    <div className="min-h-screen bg-[#e8dac3]">
      <h1 className='text-center text-4xl font-playfair font-bold pt-6 pb-8'>SHIPPING & RETURN</h1>
      <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-8 leading-relaxed space-y-6 font-montserrat">
        <div>
          <h2 className="text-xl font-semibold mb-2">SHIPPING</h2>
          <p>We offer free shipping on all domestic orders.</p>
          
          <br></br>

          <p>
            Orders are typically dispatched within 5–7 business days. Please note that Saturdays, Sundays, and public holidays are not considered business days.
          </p>
          
          <br></br>

          <p>
            If there is an anticipated delay in dispatching your order, we will notify you via email or phone. Occasionally, deliveries may be delayed around public holidays or due to unforeseen circumstances; however, we strive to deliver your order on time.
          </p>
          
          <br></br>

          <p>Once an order has been shipped, it cannot be cancelled.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">TRACKING</h2>
          <p>
            After your order is shipped, we will email you the Tracking Number along with the courier partner’s name. You can track your shipment and check the estimated delivery date by visiting the courier partner’s website and entering the Tracking number.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">RETURNS</h2>
          <p>
            Your purchase is eligible for return or exchange only under the following conditions:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>You received an incorrect product (i.e., it does not match the item specified in your order confirmation email).</li>
            <li>The product has a genuine quality or manufacturing defect.</li>
          </ul>

          <br></br>

          <p>
            All our products are handcrafted by artisans, which makes each piece unique. As a result, slight variations may occur between pieces; these are not considered defects.
          </p>

          <br></br>

          <p>
            Given the artisanal nature of our products, we reserve the right to determine the appropriate resolution. Each return or exchange request is evaluated on a case-by-case basis.
          </p>

          <br></br>

          <p>Please note, we cannot offer refunds in the following situations:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Incorrect or incomplete shipping address provided.</li>
            <li>Three failed delivery attempts by our shipping partner.</li>
            <li>Refusal to accept the package.</li>
          </ul>
          <br></br>
          <p>
            If your purchase meets our return criteria, please email us at <span className="font-medium">brahmahandicraft@gmail.com</span> within 48 hours of delivery with the following details:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Order number</li>
            <li>Delivery address</li>
            <li>Reason for return; if the product is defective or incorrect, please include clear images</li>
          </ul>

          <br></br>

          <p>We regret that we cannot process requests sent after 48 hours of delivery.</p>

          <br></br>

          <p>
            Please ensure the product is returned in its original condition and packaging, along with all original documents such as tags and invoice.
          </p>

          <br></br>

          <p>
            For products with a verified defect, we will send you a replacement within 7 working days after the returned product passes our inspection and quality check at our warehouse.
          </p>

          <br></br>

          <p>
            The customer is responsible for shipping charges when sending items back to our warehouse for return or exchange. We will cover the shipping charges for delivering your replacement product.
          </p>
        </div>
      </div>
    </div>
  );
}