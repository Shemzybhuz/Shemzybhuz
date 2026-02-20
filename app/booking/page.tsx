import BookingForm from "@/components/booking-form"

export const metadata = {
  title: "Book Appointment - Blessing Signature Salon",
  description: "Schedule your appointment at Blessing Signature Salon in Oyo, Nigeria",
}

export default function BookingPage() {
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
          <a href="/#services" className="hover:text-pink-600">Services</a>
          <a href="/booking" className="text-pink-600 font-semibold">Book Now</a>
          <a href="/#contact" className="hover:text-pink-600">Contact</a>
        </div>
      </nav>

      <section className="py-12 bg-pink-50">
        <div className="container mx-auto px-4 text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">Book Your Appointment</h2>
          <p className="text-lg text-gray-700">Schedule your visit at Blessing Signature Salon</p>
        </div>

        <div className="container mx-auto px-4 pb-12">
          <BookingForm />
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Blessing Signature Salon. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Oyo State, Nigeria | +2348026705191</p>
        </div>
      </footer>
    </main>
  )
}
