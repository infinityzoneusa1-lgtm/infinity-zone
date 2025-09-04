"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export function FatoumataDibbaContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    yourMessage: "",
    agreeToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
        }/api/professionals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            professionalId: "fatoumata-dibba",
            serviceType: "consultation",
            message: formData.yourMessage,
            preferredContactMethod: "email",
            urgency: "medium",
            agreeToTerms: formData.agreeToTerms,
          }),
        }
      );

      if (response.ok) {
        setSubmitMessage(
          "Thank you! Your message has been sent to Fatoumata Dibba successfully. She will get back to you soon."
        );
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          yourMessage: "",
          agreeToTerms: false,
        });
      } else {
        setSubmitMessage(
          "Sorry, there was an error sending your message. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting professional contact:", error);
      setSubmitMessage(
        "Sorry, there was an error sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Column - Professional Info */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto mb-4">
                <img
                  src="/professional.png"
                  alt="Fatoumata Dibba"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Fatoumata Dibba
              </h1>
              <p className="text-primary font-semibold mb-4">
                Business Development Consultant
              </p>
            </div>
            <div className="text-sm text-gray-700 space-y-3">
              <p>
                Fatoumata is a business consultant and a Certified Manager
                Planning and Development (CMPD) associate who has gain his Ph.D
                in a Collective of enterprises known as DREAM FULFILLED.
                Fatoumata professional service spread across industries.
              </p>
              <p>
                Her qualifications includes, over 5 years of Professional
                Development encompassing Real Estate, Entrepreneurship, Arts &
                Culture Management, Business Innovation, and Global Operations,
                all in accomplished achievements. Fatoumata collaborates with
                multiple professionals in that workplace at Infinity Zone.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-center space-x-4">
                <a
                  href="https://facebook.com/fatoumata.dibba.10?_rdc=1&_rdr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  title="Facebook"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://ovou.me/fatoumata"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                  title="Portfolio"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 3a2 2 0 00-2 2v1.816a.5.5 0 00.316.464l14 5.53a.5.5 0 00.368-.004l2-1a.5.5 0 00.316-.464V5a2 2 0 00-2-2H4z" />
                    <path
                      fillRule="evenodd"
                      d="M3 8.75v6.5a2 2 0 002 2h10a2 2 0 002-2v-6.5L10.98 11.5a.5.5 0 01-.36.004L3 8.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/fatoumata-dibba-77257734"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                  title="LinkedIn"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/dibafricceo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
                  title="Instagram"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C7.284 0 6.944.012 5.877.06 2.246.227.227 2.242.06 5.877.012 6.944 0 7.284 0 10s.012 3.056.06 4.123c.167 3.632 2.182 5.65 5.817 5.817C6.944 19.988 7.284 20 10 20s3.056-.012 4.123-.06c3.629-.167 5.652-2.182 5.817-5.817.048-1.067.06-1.407.06-4.123s-.012-3.056-.06-4.123C19.773 2.242 17.758.227 14.123.06 13.056.012 12.716 0 10 0zm0 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.975 1.409 4.099 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.009 2.988-.057 4.042-.124 2.687-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zM10 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-bold text-primary mb-6">
              Connect With Fatoumata Dibba by Leaving A Message Or Directly Via
              Social Media
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name */}
              <div>
                <Label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-700 mb-1 block"
                >
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="w-full border border-gray-300"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <Label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-700 mb-1 block"
                >
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="w-full border border-gray-300"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 mb-1 block"
                >
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full border border-gray-300"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700 mb-1 block"
                >
                  Phone *
                </Label>
                <div className="flex">
                  <Select>
                    <SelectTrigger className="w-20 rounded-r-none border border-gray-300">
                      <SelectValue placeholder="+1" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+1">+1</SelectItem>
                      <SelectItem value="+44">+44</SelectItem>
                      <SelectItem value="+91">+91</SelectItem>
                      <SelectItem value="+234">+234</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="flex-1 rounded-l-none border border-gray-300"
                    required
                  />
                </div>
              </div>

              {/* Your Message */}
              <div>
                <Label
                  htmlFor="yourMessage"
                  className="text-sm font-medium text-gray-700 mb-1 block"
                >
                  Your Message
                </Label>
                <Textarea
                  id="yourMessage"
                  placeholder="Your Message"
                  value={formData.yourMessage}
                  onChange={(e) =>
                    handleInputChange("yourMessage", e.target.value)
                  }
                  className="w-full min-h-[100px] resize-none border border-gray-300"
                />
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    handleInputChange("agreeToTerms", checked as boolean)
                  }
                  className="mt-1"
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  I agree to terms & conditions provided by the company. By
                  providing my phone number, I agree to receive text messages
                  from the business.
                </span>
              </div>

              {/* Submit Message */}
              {submitMessage && (
                <div
                  className={`p-4 rounded-md ${
                    submitMessage.includes("error") ||
                    submitMessage.includes("Sorry")
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {submitMessage}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!formData.agreeToTerms || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
