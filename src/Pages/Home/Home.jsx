const Home = () => {
  return (
    <div className="bg-[#222736] text-white">
      <header className="py-8 bg-slate-400">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">Welcome to POWERPACK</h1>
          <p className="mt-4 text-lg">
            The ultimate power solutions for all your needs.
          </p>
        </div>
      </header>

      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8">Why Choose POWERPACK?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-4 bg-gray-500 rounded">
              <h3 className="text-xl font-semibold mb-4">
                Reliable Performance
              </h3>
              <p className="text-lg">
                POWERPACK ensures uninterrupted power supply with reliable
                performance in all conditions.
              </p>
            </div>
            <div className="p-4 bg-gray-500 rounded">
              <h3 className="text-xl font-semibold mb-4">
                Versatile Solutions
              </h3>
              <p className="text-lg">
                Our wide range of products caters to various power requirements,
                from small-scale setups to large industrial systems.
              </p>
            </div>
            <div className="p-4 bg-gray-500 rounded">
              <h3 className="text-xl font-semibold mb-4">
                Exceptional Support
              </h3>
              <p className="text-lg">
                Our dedicated support team is available 24/7 to assist you with
                any queries or issues you may have.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
