import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white mt-10">
      {/* Top Section */}
      <div className="border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="/assets/itl-logo-nobg.png"
                  alt="ITL Logo"
                  width={120}
                  height={120}
                  className="h-32 w-32"
                />
              </Link>
              <p className="text-neutral-300 leading-relaxed max-w-md">
                The largest gathering of Internationally Trained Lawyers (ITLs) in Canada.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-neutral-300 hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-neutral-300 hover:text-white transition">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/speakers" className="text-neutral-300 hover:text-white transition">
                    Speakers
                  </Link>
                </li>
                <li>
                  <Link href="/awards" className="text-neutral-300 hover:text-white transition">
                    Awards
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-neutral-300 hover:text-white transition">
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 mb-6">
                <li>
                  <Link href="/privacy" className="text-neutral-300 hover:text-white transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-neutral-300 hover:text-white transition">
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
              <div>
                <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
                <a
                  href="mailto:info@itlconference.ca"
                  className="text-neutral-300 hover:text-white transition"
                >
                  info@itlconference.ca
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-neutral-400 text-sm">
            © Copyright {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

