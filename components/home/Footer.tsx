import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <footer className="border-t bg-[#002D69] text-red-50">
        <div className="container md:w-[95%] mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 ">
            <div>
              <h3 className="font-semibold mb-4">For Parents</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="#">Registration Process</Link>
                </li>
                <li>
                  <Link href="#">Payment Management</Link>
                </li>
                <li>
                  <Link href="#">Progress Tracking</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Teachers</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="#">Apply as Teacher</Link>
                </li>
                <li>
                  <Link href="#">Training Program</Link>
                </li>
                <li>
                  <Link href="#">Resources</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="#">About Us</Link>
                </li>
                <li>
                  <Link href="#">Contact</Link>
                </li>
                <li>
                  <Link href="#">Careers</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="#">Terms of Service</Link>
                </li>
                <li>
                  <Link href="#">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#">Help Center</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-300">
            <p>© 2025 AMI Education. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
