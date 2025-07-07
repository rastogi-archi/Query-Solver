import { Facebook, Instagram, Linkedin } from "lucide-react";
import {Link} from "react-router-dom";

const footerLinks = [
  { name: "Home", link: "/" },
  { name: "Connections", link: "/connections" },
  { name: "Chat", link: "/chat" },
  { name: "Post Query", link: "/query" },
];

const Footer = () => {
    return (
        <footer className="bg-[#032b56] text-white py-10 mt-10">
            <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold mb-2">Query Solver</h2>
                    <p className="text-sm text-gray-300">
                        Your trusted companion for query solving
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    {footerLinks.map((data) => (
                        <ul key={data.name} className="space-y-2 text-sm">
                            <Link to={data.link}>
                                <li>{data.name}</li>
                            </Link>
                        </ul>
                    ))}
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li>FAQ</li>
                        <li>Help Center</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>

                {/* Contact / Social */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
                    <p className="text-sm text-gray-300 mb-2">support@querysolver.com</p>
                    <div className="flex space-x-4 mt-3">
                        <div className="hover:text-blue-400"><Facebook /></div>
                        <div className="hover:text-blue-400"><Instagram /></div>
                        <div className="hover:text-blue-400"><Linkedin /></div>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-10 text-center text-sm text-gray-400">
                &copy; {new Date().getFullYear()} QuerySolver. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
