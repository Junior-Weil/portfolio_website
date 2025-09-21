// components/TestimonialsGrid.tsx
import FlipCard from "./FlipCard";
import GradientMarqueeText from "./AnimatedGradientText";

export default function TestimonialsGrid() {
  const testimonials = [
    {
      image: "/DataDriveVehicle.jpg",
      title: "Data Drive Vehicle",
      docLink: "https://docs.google.com/document/d/1R62fZxs_eFVezG9opYTs5jEd1oRQatV5bLbR9Gc6CI4/edit?tab=t.0",
      docLinkButtonText: "View Document",
      docLinkText: null,
    },
    {
      image: "kaggleImages/AUC.png",
      title: "Kaggle Home Credit",
      docLink: "/kaggle",
      docLinkButtonText: "View Figures",
      docLinkText: "",
    },
  ];

  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="flex flex-grid items-center justify-center overflow-x-auto">
          <GradientMarqueeText className="text-gray-800 text-3xl font-semibold sm:text-4xl" gradientColors={["#1F1C2C", "#928DAB", "#1F1C2C"]} text="Projects"/>
        </div>

        <div className="mt-12">
          <ul className="grid gap-10 grid-cols-2">
            {testimonials.map((item, idx) => (
              <li key={idx}>
                <FlipCard
                  frontContent={
                    <div className="items-center justify-center flex flex-col gap-4 p-4">
                      <img
                        src={item.image}
                        alt={item.title}
                      />
                      <h4 className="text-lg font-semibold text-gray-800">
                        {item.title}
                      </h4>
                    </div>
                  }
                  backContent={
                    <>
                      <a
                        href={item.docLink}
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                      >
                        {item.docLinkButtonText}
                      </a>
                    </>
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
