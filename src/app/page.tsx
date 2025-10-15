export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center bg-brand-dark text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Subscription Car Wash Service</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Convenient, eco‑friendly car care at your doorstep. Stay polished without the hassle.
        </p>
        <a href="#pricing" className="bg-yellow-500 hover:bg-yellow-400 text-brand-dark font-semibold px-6 py-3 rounded">View Plans</a>
      </section>

      {/* About Section */}
      <section id="about" className="bg-brand text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg leading-relaxed">
            Bison Car Care provides hassle‑free car wash services for residents of Dubai. Our mobile teams
            use eco‑friendly, waterless cleaning solutions to keep your car spotless without wasting water.
            Partnering with building management, we offer exclusive on‑site services for apartment
            complexes and villas.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-brand-dark text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Services</h2>
          <ul className="space-y-4 text-lg">
            <li>Exterior & interior cleaning</li>
            <li>Waterless, eco‑friendly wash</li>
            <li>Detailing add‑ons</li>
            <li>Consistent, scheduled care</li>
          </ul>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-brand text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Basic Plan */}
            <div className="bg-brand-dark p-6 rounded-lg shadow-md flex flex-col">
              <h3 className="text-2xl font-semibold mb-2">Basic</h3>
              <p className="text-4xl font-bold mb-4">AED 200</p>
              <p className="mb-6">Weekly wash</p>
              <a href="/api/checkout?plan=basic" className="mt-auto bg-yellow-500 hover:bg-yellow-400 text-brand-dark font-semibold px-4 py-2 rounded">Subscribe</a>
            </div>
            {/* Premium Plan */}
            <div className="bg-brand-dark p-6 rounded-lg shadow-md flex flex-col">
              <h3 className="text-2xl font-semibold mb-2">Premium</h3>
              <p className="text-4xl font-bold mb-4">AED 400</p>
              <p className="mb-6">Twice weekly wash</p>
              <a href="/api/checkout?plan=premium" className="mt-auto bg-yellow-500 hover:bg-yellow-400 text-brand-dark font-semibold px-4 py-2 rounded">Subscribe</a>
            </div>
            {/* Executive Plan */}
            <div className="bg-brand-dark p-6 rounded-lg shadow-md flex flex-col">
              <h3 className="text-2xl font-semibold mb-2">Executive</h3>
              <p className="text-4xl font-bold mb-4">AED 700</p>
              <p className="mb-6">3–4 washes per week</p>
              <a href="/api/checkout?plan=executive" className="mt-auto bg-yellow-500 hover:bg-yellow-400 text-brand-dark font-semibold px-4 py-2 rounded">Subscribe</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-brand-dark text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg mb-8">Have questions or want to know more? Drop us a line!</p>
          <a href="mailto:info@bisoncarcare.com" className="bg-yellow-500 hover:bg-yellow-400 text-brand-dark font-semibold px-6 py-3 rounded">Contact Us</a>
        </div>
      </section>
    </>
  );
}