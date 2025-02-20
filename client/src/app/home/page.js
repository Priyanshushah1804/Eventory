"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import EventCard from '../../../../client2/src/components/EventCard';
import LocationCard from '../../../../client2/src/components/LocationCard';

// Custom Card Components
const HomePage = () => {
    const [opacity, setOpacity] = useState(1);

    // Handle scroll event
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const fadeStart = 0; // Start fading immediately
            const fadeEnd = 400; // Fully faded out after scrolling 400px

            // Calculate opacity based on scroll position
            let newOpacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
            newOpacity = Math.max(0, Math.min(1, newOpacity)); // Clamp between 0 and 1
            setOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Dummy data for locations and events
    const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston'];
    const events = ['Marathon Movie Night', 'Oscar Special', 'Horror Fest', 'Kids Carnival'];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Banner Section */}
            <div
                className="relative h-[400px] transition-opacity duration-500"
                style={{ opacity }}
            >
                <img
                    src="/banner.png"
                    alt="Movie Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center pl-20">
                    <div className="space-y-4">
                        <Link href="/booking">
                            <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300">
                                Book Now
                            </button>
                        </Link>
                        <Link href="/events">
                            <button className="bg-transparent border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition-colors duration-300">
                                Explore Events
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Location-Based Cards Section */}
            <section className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold mb-8">Movies Near You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {locations.map((location, index) => (
                        <LocationCard key={index} location={location} />
                    ))}
                </div>
            </section>

            {/* Event-Based Cards Section */}
            <section className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold mb-8">Special Events</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {events.map((event, index) => (
                        <EventCard key={index} event={event} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
