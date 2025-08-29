"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import Link from "next/link";

export function InternshipFormSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postalCode: "",
    country: "",
    applyingFor: "",
    address: "",
    state: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-10">
          Fill the Internship Program Form:
        </h2>

        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 max-w-5xl mx-auto">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            
            {/* LEFT COLUMN */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <Input className="border border-gray-300 rounded-md" type="text" value={formData.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <Input className="border border-gray-300 rounded-md" type="text" value={formData.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <Input className="border border-gray-300 rounded-md" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <Input className="border border-gray-300 rounded-md" type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <Input className="border border-gray-300 rounded-md" type="text" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                <Input className="border border-gray-300 rounded-md" type="text" value={formData.state} onChange={(e) => handleInputChange("state", e.target.value)} required />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal code *</label>
                <Input className="border border-gray-300 rounded-md" type="text" value={formData.postalCode} onChange={(e) => handleInputChange("postalCode", e.target.value)} required />
              </div>

              <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
  <Select onValueChange={(value) => handleInputChange("country", value)}>
    <SelectTrigger className="w-full border border-gray-300 rounded-md">
      <SelectValue placeholder="Select Country" />
    </SelectTrigger>
    <SelectContent className="border border-gray-300 rounded-md shadow-lg">
      <SelectItem value="pakistan" className="hover:bg-gray-100 cursor-pointer">Pakistan</SelectItem>
      <SelectItem value="india" className="hover:bg-gray-100 cursor-pointer">India</SelectItem>
      <SelectItem value="uae" className="hover:bg-gray-100 cursor-pointer">United Arab Emirates</SelectItem>
      <SelectItem value="uk" className="hover:bg-gray-100 cursor-pointer">United Kingdom</SelectItem>
      <SelectItem value="usa" className="hover:bg-gray-100 cursor-pointer">United States</SelectItem>
    </SelectContent>
  </Select>
</div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Applying for *</label>
                <Select onValueChange={(value) => handleInputChange("applyingFor", value)}>
                  <SelectTrigger className="w-full border border-gray-300 rounded-md">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="border border-gray-300 rounded-md shadow-lg">
                    <SelectItem value="frontend" className="hover:bg-gray-100 cursor-pointer">Frontend Developer</SelectItem>
                    <SelectItem value="backend" className="hover:bg-gray-100 cursor-pointer">Backend Developer</SelectItem>
                    <SelectItem value="designer" className="hover:bg-gray-100 cursor-pointer">UI/UX Designer</SelectItem>
                    <SelectItem value="marketing" className="hover:bg-gray-100 cursor-pointer">Marketing Specialist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CV/RESUME</label>
                <div className="border border-dashed border-gray-400 rounded-lg p-6 text-center text-gray-500 cursor-pointer hover:bg-gray-50">
                  <p>Upload your resume</p>
                </div>
              </div>

              <div className="flex items-start space-x-2 text-sm text-gray-600">
                <input type="checkbox" className="mt-1" />
                <p>
                  I agree to{" "}
                  <Link href="/terms-and-conditions" className="underline">
                    terms & conditions
                  </Link>
                  . By providing my phone number, I agree to receive text messages from the business.
                </p>
              </div>

              <Button type="submit" className="w-full bg-red-900 hover:bg-red-800 text-white py-3 rounded-lg text-lg font-semibold">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
