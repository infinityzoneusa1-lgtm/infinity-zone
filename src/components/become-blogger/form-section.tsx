"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import Image from "next/image";

export function BloggerFormSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    blogCategory: "",
    website: "",
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
        }/api/bloggers`,
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
            country: formData.country,
            blogCategory: formData.blogCategory,
            website: formData.website,
            experience: "beginner", // Set to valid enum value
            agreeToTerms: formData.agreeToTerms,
          }),
        }
      );

      if (response.ok) {
        setSubmitMessage(
          "Thank you! Your blogger application has been submitted successfully. We'll review it and get back to you soon."
        );
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          country: "",
          blogCategory: "",
          website: "",
          agreeToTerms: false,
        });
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        setSubmitMessage(
          "Sorry, there was an error submitting your application. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting blogger application:", error);
      setSubmitMessage(
        "Sorry, there was an error submitting your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image */}
            <div className="relative">
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/blogger-form.png"
                  alt="Blogger application - People working with laptops and tablets"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    placeholder="First Name"
                    className="border border-black"
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    placeholder="Last Name"
                    className="border border-black"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Email"
                    className="border border-black"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Phone"
                    className="border border-black"
                    required
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <Select
                    onValueChange={(value: string) =>
                      handleInputChange("country", value)
                    }
                  >
                    <SelectTrigger className="w-full border border-black">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">
                        United States
                      </SelectItem>
                      <SelectItem value="United Kingdom">
                        United Kingdom
                      </SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="Pakistan">Pakistan</SelectItem>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Blog Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Category *
                  </label>
                  <Input
                    type="text"
                    value={formData.blogCategory}
                    onChange={(e) =>
                      handleInputChange("blogCategory", e.target.value)
                    }
                    placeholder="Tell Us What Category You Will Be Blogging About"
                    className="border border-black"
                    required
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website *
                  </label>
                  <Textarea
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    placeholder="Web URL Goes here"
                    className="h-24 border border-black"
                    required
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) =>
                      handleInputChange("agreeToTerms", e.target.checked)
                    }
                    className="mt-1 w-4 h-4 border border-black rounded"
                    required
                  />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    I agree to terms & conditions provided by the company. By
                    providing my phone number, I agree to receive text messages
                    from the business.
                  </p>
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
                  disabled={!formData.agreeToTerms || isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
