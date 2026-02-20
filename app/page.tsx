import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-pink-600">Blessing Signature</h1>
          <p className="text-gray-600">Professional Salon Services in Oyo State, Nigeria</p>
        </div>
      </header>

      <nav className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-4 flex gap-6">
          <a href="/" className="hover:text-pink-600">Home</a>
          <a href="#services" className="hover:text-pink-600">Services</a>
          <a href="/booking" className="hover:text-pink-600">Book Now</a>
          <a href="#contact" className="hover:text-pink-600">Contact</a>
        </div>
      </nav>

      <section className="py-16 bg-gradient-to-r from-pink-50 to-pink-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to Blessing Signature</h2>
          <p className="text-lg text-gray-700 mb-8">Experience beauty and elegance with our professional salon services</p>
          <a href="/booking" className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700">
            Book Your Appointment
          </a>
        </div>
      </section>

      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Hair Treatment", price: "₦5,000" },
              { name: "Hair Styling", price: "₦3,500" },
              { name: "Nail Care", price: "₦2,500" },
              { name: "Facial", price: "₦4,500" },
              { name: "Body Treatment", price: "₦6,500" },
              { name: "Massage", price: "₦4,000" },
            ].map((service) => (
              <div key={service.name} className="border rounded-lg p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-pink-600 text-lg font-bold">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Blessing Signature Salon. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Oyo State, Nigeria | +2348026705191</p>
        </div>
      </footer>
    </main>
  )
}
