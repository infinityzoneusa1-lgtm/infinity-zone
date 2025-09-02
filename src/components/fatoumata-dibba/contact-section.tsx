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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
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

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors"
                disabled={!formData.agreeToTerms}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
