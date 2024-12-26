import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SpecialOffers = () => {

  const offers = [
    {
      id: 1,
      title: "15% Off Weekend Rentals",
      description:
        "Plan your weekend getaway now! Enjoy a special discount on all car rentals this weekend.",
      image: "https://i.ibb.co.com/DRjTbwG/1920.jpg",
      buttonText: "Learn More",
    },
    {
      id: 2,
      title: "Luxury Cars at $99/Day",
      description:
        "Experience the ultimate comfort and style this holiday season with our luxury cars.",
      image: "https://i.ibb.co.com/2KCLs97/Back-red-background-audi.jpg",
      buttonText: "Book Now",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 200 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section className="px-4 pb-4 md:pb-20">
      <div className="container mx-auto">
        <h2 className="font-antonio text-2xl md:text-3xl font-bold text-center mb-8">
          Special Offers
        </h2>

        {/* Animated Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              className="flex flex-col md:flex-row items-center bg-base-200 rounded-3xl hover:shadow-lg overflow-hidden min-h-80"
              variants={cardVariants}
              whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 400 } }}
              initial={{ opacity: 0, x: index % 2 === 0 ? -200 : 200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
            >
              {/* Image Section */}
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full md:w-1/2 h-full object-cover"
              />

              {/* Content Section */}
              <div className="p-12 flex flex-col justify-center">
                <h3 className="text-xl font-semibold mb-3">{offer.title}</h3>
                <p className="text-primary/70 mb-4">{offer.description}</p>
                <Link
                  to="/available-cars"
                  className="btn btn-primary btn-sm self-start"
                >
                  {offer.buttonText}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOffers;
