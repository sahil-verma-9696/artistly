import { Shield, Clock, Star, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Artists",
    description:
      "All artists are professionally verified with background checks and portfolio reviews.",
  },
  {
    icon: Clock,
    title: "Quick Booking",
    description:
      "Book artists in minutes with our streamlined booking process and instant confirmations.",
  },
  {
    icon: Star,
    title: "Quality Guaranteed",
    description:
      "Top-rated performers with proven track records and excellent customer reviews.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer support to help you with bookings and event planning.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Artistly?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We make it easy to find and book the perfect entertainment for your
            events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6 group-hover:bg-purple-200 transition-colors duration-300">
                <feature.icon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
