import React from "react";
import { motion } from "framer-motion";

const Card = ({ image, name, description, reverse }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: reverse ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`relative flex ${reverse ? "flex-row-reverse" : "flex-row"} items-center gap-4 p-4 rounded-2xl shadow-xl`}
        >
            <motion.img
                src={image}
                className="w-64 h-96 object-cover rounded-2xl opacity-80"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                viewport={{ amount: 0.3 }}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-full shadow-md">
                {name}
            </div>
            {/* Card Text Content */}
            <div className="flex-1">
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl font-bold text-white mb-4"
                >
                    {name}
                </motion.h2>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-white"
                >
                    {description}
                </motion.p>
            </div>
        </motion.div>
    );
};

const CardList = () => {
    const categories = [
        {
            name: "Concert",
            image: "./test.avif",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Ut pulvinar metus nec sollicitudin varius. Praesent tincidunt, justo a convallis vestibulum, purus justo sollicitudin nulla, nec tincidunt magna dolor vitae nunc."
        },
        {
            name: "Sports",
            image: "./basketballl.jpeg",
            description: "Proin eget tortor risus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Sed porttitor lectus nibh. Donec sollicitudin molestie malesuada. Vivamus suscipit tortor eget felis porttitor volutpat."
        },
        {
            name: "Theater",
            image: "./threa.avif",
            description: "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla porttitor accumsan tincidunt. Vivamus suscipit tortor eget felis porttitor volutpat. Donec rutrum congue leo eget malesuada."
        },
        {
            name: "Family",
            image: "./carnival.avif",
            description: "Quisque velit nisi, pretium ut lacinia in, elementum id enim. Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem."
        },
    ];

    return (
        <div className="flex flex-col px-60 mt-2">
            {categories.map((category, index) => (
                <Card
                    key={index}
                    image={category.image}
                    name={category.name}
                    description={category.description}
                    reverse={index % 2 !== 0}
                />
            ))}
        </div>
    );
};

export default CardList;
