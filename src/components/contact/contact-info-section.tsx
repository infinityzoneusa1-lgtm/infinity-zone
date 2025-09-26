import { MapPin, Clock, Phone, Mail } from "lucide-react";

export function ContactInfoSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Visit Our Office
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Come visit us at our office or reach out through any of the contact
            methods below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Address */}
          <div className="text-center">
            <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Address
            </h3>
            <p className="text-gray-600 text-sm">
              123 Business Avenue
              <br />
              Suite 100
              <br />
              City, State 12345
            </p>
          </div>

          {/* Phone */}
          <div className="text-center">
            <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600 text-sm">
              +1 (555) 123-4567
              <br />
              +1 (555) 987-6543
              <br />
              Toll Free: 1-800-INFINITY
            </p>
          </div>

          {/* Email */}
          <div className="text-center">
            <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600 text-sm">
              info@infinityzone.com
              <br />
              support@infinityzone.com
              <br />
              sales@infinityzone.com
            </p>
          </div>

          {/* Hours */}
          <div className="text-center">
            <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hours</h3>
            <p className="text-gray-600 text-sm">
              Mon - Fri: 9:00 AM - 6:00 PM
              <br />
              Saturday: 10:00 AM - 4:00 PM
              <br />
              Sunday: Closed
            </p>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-gray-200 rounded-lg h-64 md:h-80 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Interactive Map
            </h3>
            <p className="text-gray-500">
              Map integration will be available here
              <br />
              showing our exact location and directions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
