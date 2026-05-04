import React from 'react'

export const metadata = {
  title: 'Refund Policy - Parul Chemicals',
  description: 'Refund Policy of Parul Chemicals',
}

export default function RefundPolicy() {
  return (
    <div className="pt-32 pb-20 bg-[#F8F9FA] text-[#0D2137]">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-[#4DA8DA]">Refund Policy</h1>
        <div className="prose prose-lg text-gray-700 max-w-none">
          <p>
            Thank you for choosing Parul chemicals for your veterinary feed supplement needs. We strive to provide high-quality products and excellent customer service. However, if you are not satisfied with your purchase, we offer the following refund policy:
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#0D2137]">1. Non-Refundable Items</h2>
          <p>
            Please note that veterinary feed supplements are non-refundable items due to hygiene and consumable nature of the product. We do not accept returns or exchanges of any products, except in the case of damage or defects.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#0D2137]">2. Damaged or Defective Products</h2>
          <p>
            If you receive a damaged or defective product, please contact us within 24 hours of receipt. We will investigate the issue and provide a replacement or refund as soon as possible.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#0D2137]">4. Refund Processing</h2>
          <p>
            If a refund is approved, we will process it within 7-10 business days. The refund will be issued in the original form of payment.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-[#0D2137]">5. Return Shipping</h2>
          <p>
            In the case of a damaged or defective product, we will provide a prepaid return label. If the return is due to customer error or change of mind, the customer will be responsible for return shipping costs.
          </p>

          <p className="mt-8">
            Please contact us at <a href="mailto:info@parulchemicals.com" className="text-[#4DA8DA]">info@parulchemicals.com</a> & +91 9825637101 with any questions or concerns about our refund policy.
          </p>
        </div>
      </div>
    </div>
  )
}
