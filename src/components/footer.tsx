export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Contact */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-secondary-foreground font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold">Beauty Zone</span>
            </div>
            <div className="space-y-2 text-sm">
              <p>123 Beauty Street</p>
              <p>New York, NY 10001</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@beautyzone.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block hover:text-secondary transition-colors">
                About Us
              </a>
              <a href="#" className="block hover:text-secondary transition-colors">
                Contact
              </a>
              <a href="#" className="block hover:text-secondary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block hover:text-secondary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block hover:text-secondary transition-colors">
                Skincare
              </a>
              <a href="#" className="block hover:text-secondary transition-colors">
                Makeup
              </a>
              <a href="#" className="block hover:text-secondary transition-colors">
                Fragrance
              </a>
              <a href="#" className="block hover:text-secondary transition-colors">
                Hair Care
              </a>
            </div>
          </div>

          {/* Location Map Placeholder */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Visit Us</h3>
            <div className="bg-secondary/20 h-32 rounded-lg flex items-center justify-center">
              <span className="text-sm">Map Location</span>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 Beauty Zone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
