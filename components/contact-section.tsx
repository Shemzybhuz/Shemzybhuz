import { PhoneIcon, MapPinIcon, MailIcon } from "lucide-react"

export function ContactSection() {
  const adminPhone = process.env.NEXT_PUBLIC_ADMIN_PHONE || "+2348026705191"

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions? Reach out to us directly and we'll be happy to assist you with appointments or any
            inquiries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-pink-100 text-pink-600">
                <PhoneIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                <p className="mt-1 text-gray-600">{adminPhone}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-pink-100 text-pink-600">
                <MapPinIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Location</h3>
                <p className="mt-1 text-gray-600">Oyo State, Nigeria</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-pink-100 text-pink-600">
                <MailIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                <p className="mt-1 text-gray-600">contact@blessingsignature.com</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.0953308923094!2d3.9306902147627764!3d7.4523084149161605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398c48eeb7eebb%3A0x85e1acf6e932db39!2sOyo%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1649784512345!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Blessing Signature Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
