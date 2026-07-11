
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';

export default function PricingPage() {
    const plans = [
        {
            name: 'Starter',
            price: '$999',
            desc: 'Perfect for small businesses getting started.',
            features: ['5 Page Website', 'Basic SEO', 'Contact Form', 'Mobile Responsive', '1 Month Support']
        },
        {
            name: 'Professional',
            price: '$2,499',
            desc: 'Ideal for growing businesses needing more.',
            features: ['10 Page Website', 'Advanced SEO', 'Blog Integration', 'Social Media Setup', '3 Months Support', 'Speed Optimization'],
            popular: true
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            desc: 'For large organizations with complex needs.',
            features: ['Unlimited Pages', 'E-commerce', 'Custom Functionality', 'Priority Support', 'Dedicated Manager', 'Monthly Reports']
        }
    ];

    return (
        <div className="pt-24 pb-20 container mx-auto px-6">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Simple Pricing</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Transparent packages tailored to your needs. No hidden fees.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <div key={plan.name} className={`bg-gray-900 rounded-2xl p-8 border ${plan.popular ? 'border-blue-500 relative' : 'border-gray-800'}`}>
                        {plan.popular && <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>}
                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                        <p className="text-gray-400 mb-6 text-sm">{plan.desc}</p>
                        <div className="text-4xl font-bold mb-8 text-white">{plan.price}</div>

                        <ul className="space-y-4 mb-8">
                            {plan.features.map((f) => (
                                <li key={f} className="flex items-center text-gray-300">
                                    <FaCheck className="text-green-500 mr-3 text-sm" />
                                    {f}
                                </li>
                            ))}
                        </ul>

                        <Link href="/contact" className={`block text-center w-full py-3 rounded-lg font-bold transition-colors ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}>
                            Get Started
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
