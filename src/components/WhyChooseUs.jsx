import { FaCarAlt, FaWallet, FaRegClock, FaHeadset } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const WhyChooseUs = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2, // Trigger when 20% of the component is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const points = [
    {
      icon: <FaCarAlt className="text-4xl text-secondary" />,
      title: "Wide Variety of Cars",
      description:
        "Whether you're looking for a practical economy car, a spacious family SUV, or a premium luxury ride, we cater to every need with an extensive fleet of vehicles. Choose the perfect car to suit your journey, style, and budget.",
    },
    {
      icon: <FaWallet className="text-4xl text-secondary" />,
      title: "Affordable Prices",
      description:
        "Enjoy transparent pricing without hidden charges. We offer budget-friendly daily rates that make your trips convenient and cost-effective, ensuring exceptional value for every mile.",
    },
    {
      icon: <FaRegClock className="text-4xl text-secondary" />,
      title: "Easy Booking Process",
      description:
        "Book your dream car in just a few clicks. Our seamless and user-friendly platform ensures a hassle-free experience, saving your time and letting you hit the road sooner.",
    },
    {
      icon: <FaHeadset className="text-4xl text-secondary" />,
      title: "Customer Support",
      description:
        "We're here to assist you 24/7. From answering queries to resolving issues, our dedicated customer service team ensures that your journey is smooth and worry-free.",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section ref={ref} className="px-4 py-4 md:py-20 bg-base-100">
      <div className="container mx-auto">
        <h2 className="font-antonio text-2xl md:text-3xl font-bold text-center mb-8">
          Why Choose Us?
        </h2>

        {/* Animated Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {points.map((point, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-base-200 rounded-3xl hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="mb-4">{point.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
              <p className="text-primary/70">{point.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
