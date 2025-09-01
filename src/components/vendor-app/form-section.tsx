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

export function VendorFormSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    website: "",
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <div>
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                First Name *
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <Label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Last Name *
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Phone *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Address */}
            <div>
              <Label
                htmlFor="address"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Address *
              </Label>
              <Textarea
                id="address"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px] resize-none"
                required
              />
            </div>

            {/* City */}
            <div>
              <Label
                htmlFor="city"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                City *
              </Label>
              <Input
                id="city"
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* State */}
            <div>
              <Label
                htmlFor="state"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                State *
              </Label>
              <Input
                id="state"
                type="text"
                placeholder="State"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Postal Code */}
            <div>
              <Label
                htmlFor="postalCode"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Postal Code *
              </Label>
              <Input
                id="postalCode"
                type="text"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={(e) =>
                  handleInputChange("postalCode", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Country */}
            <div>
              <Label
                htmlFor="country"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Country *
              </Label>
              <Select
                onValueChange={(value) => handleInputChange("country", value)}
              >
                <SelectTrigger className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="fr">France</SelectItem>
                  <SelectItem value="jp">Japan</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Website */}
            <div>
              <Label
                htmlFor="website"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Website *
              </Label>
              <Input
                id="website"
                type="url"
                placeholder="http://your-website.com"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
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
              <span className="text-sm text-gray-600 leading-relaxed">
                I agree to terms & conditions provided by the company. By
                providing my phone number, I agree to receive text messages from
                the business.
              </span>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-red-800 hover:bg-red-900 text-white font-medium py-3 px-6 rounded-md transition-colors"
              disabled={!formData.agreeToTerms}
            >
              SUBMIT
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
