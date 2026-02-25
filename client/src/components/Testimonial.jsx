import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { useRef, useState } from "react";

export default function Testimonial() {
  const testimonials = [
    {
      image: "/src/assets/A1.png",
      name: "Oliver",
      role: "Engineering Student",
      text: "PrepMate AI helped me generate revision-ready notes within seconds. My exam preparation became 10x faster.",
    },
    {
      image: "/src/assets/A2.png",
      name: "Amelia",
      role: "BCA Student",
      text: "The diagrams and structured notes feature is amazing. It saves hours of manual work.",
    },
    {
      image: "/src/assets/A3.png",
      name: "Jack",
      role: "Final Year Student",
      text: "The AI understands context really well. My project documentation looks professional now.",
    },
    {
      image: "/src/assets/A4.png",
      name: "Olivia",
      role: "College Student",
      text: "The revision mode is my favorite feature. Short, crisp and exam-focused notes!",
    },
    {
      image: "/src/assets/A5.png",
      name: "Harry",
      role: "Engineering Student",
      text: "PrepMate AI helped me generate revision-ready notes within seconds. My exam preparation became 10x faster.",
    },
    {
      image: "/src/assets/A6.png",
      name: "Jacob",
      role: "BCA Student",
      text: "The diagrams and structured notes feature is amazing. It saves hours of manual work.",
    },
    {
      image: "/src/assets/A7.png",
      name: "Charlie",
      role: "Final Year Student",
      text: "The AI understands context really well. My project documentation looks professional now.",
    },
    {
      image: "/src/assets/A8.png",
      name: "Thomas",
      role: "College Student",
      text: "The revision mode is my favorite feature. Short, crisp and exam-focused notes!",
    },
  ];

  const x = useMotionValue(0);
  const containerRef = useRef(null);

  const [speed, setSpeed] = useState(120); // fast default
  const [isDragging, setIsDragging] = useState(false);

  useAnimationFrame((t, delta) => {
    if (isDragging) return;

    const width = containerRef.current?.scrollWidth / 2;
    if (!width) return;

    const moveBy = (speed * delta) / 1000;
    let current = x.get() - moveBy;

    // infinite loop left side
    if (current <= -width) {
      current = 0;
    }

    // infinite loop right side
    if (current > 0) {
      current = -width;
    }

    x.set(current);
  });

  return (
    <section className="max-w-7xl mx-auto py-30 relative">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Trusted by Students Nationwide
        </h2>

        <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
          Thousands of students are already creating smarter notes using{" "}
          <span className="font-bold">PrepMate AI</span>
        </p>

        <div className="relative overflow-hidden">
          {/* Gradient Left */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-linear-to-r from-white to-transparent z-10" />

          {/* Gradient Right */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-linear-to-l from-white to-transparent z-10" />

          <motion.div
            ref={containerRef}
            style={{ x }}
            className="flex gap-8 w-max cursor-grab active:cursor-grabbing"
            drag="x"
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            onMouseEnter={() => setSpeed(30)} // slow on hover
            onMouseLeave={() => setSpeed(120)} // fast normally
          >
            {[...testimonials, ...testimonials].map((item, index) => (
              <div
                key={index}
                className="min-w-72 max-w-72 bg-white border border-gray-200 rounded-2xl p-6"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.role}</p>
                  </div>
                </div>

                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
