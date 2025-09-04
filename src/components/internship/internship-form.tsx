"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useRef } from "react";
import Link from "next/link";
import { Upload, FileText, X } from "lucide-react";

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
    agreeToTerms: false,
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a PDF or DOC/DOCX file");
        return;
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      setResumeFile(file);
    }
  };

  const removeFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value.toString());
      });

      // Append resume file if selected
      if (resumeFile) {
        submitData.append("resume", resumeFile);
      }

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
        }/api/internships`,
        {
          method: "POST",
          body: submitData, // Don't set Content-Type header for FormData
        }
      );

      if (response.ok) {
        setSubmitMessage(
          "Thank you! Your internship application has been submitted successfully. We'll review it and get back to you soon."
        );
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          postalCode: "",
          country: "",
          applyingFor: "",
          address: "",
          state: "",
          agreeToTerms: false,
        });
        setResumeFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        const errorData = await response.json();
        setSubmitMessage(
          errorData.message ||
            "Sorry, there was an error submitting your application. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting internship application:", error);
      setSubmitMessage(
        "Sorry, there was an error submitting your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <Input
                  className="border border-gray-300 rounded-md"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <Input
                  className="border border-gray-300 rounded-md"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <Input
                  className="border border-gray-300 rounded-md"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <Input
                  className="border border-gray-300 rounded-md"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <Input
                  className="border border-gray-300 rounded-md"
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <Input
                  className="border border-gray-300 rounded-md"
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal code *
                </label>
                <Input
                  className="border border-gray-300 rounded-md"
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) =>
                    handleInputChange("postalCode", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <Select
                  onValueChange={(value) => handleInputChange("country", value)}
                >
                  <SelectTrigger className="w-full border border-gray-300 rounded-md">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent className="border border-gray-300 rounded-md shadow-lg">
                    <SelectItem
                      value="pakistan"
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      Pakistan
                    </SelectItem>
                    <SelectItem
                      value="india"
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      India
                    </SelectItem>
                    <SelectItem
                      value="uae"
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      United Arab Emirates
                    </SelectItem>
                    <SelectItem
                      value="uk"
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      United Kingdom
                    </SelectItem>
                    <SelectItem
                      value="usa"
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      United States
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Applying for *
                </label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("applyingFor", value)
                  }
                >
                  <SelectTrigger className="w-full border border-gray-300 rounded-md">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="border border-gray-300 rounded-md shadow-lg">
                    <SelectItem
                      value="frontend"
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      Frontend Developer
                    </SelectItem>
                    <SelectItem
                      value="backend"
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      Backend Developer
                    </SelectItem>
                    <SelectItem
                      value="designer"
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      UI/UX Designer
                    </SelectItem>
                    <SelectItem
                      value="marketing"
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      Marketing Specialist
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CV/RESUME
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {!resumeFile ? (
                  <div
                    onClick={triggerFileInput}
                    className="border border-dashed border-gray-400 rounded-lg p-6 text-center text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                    <p className="text-sm">Click to upload your resume</p>
                    <p className="text-xs text-gray-400 mt-1">
                      PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>
                ) : (
                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {resumeFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-start space-x-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={formData.agreeToTerms}
                  onChange={(e) =>
                    handleInputChange("agreeToTerms", e.target.checked)
                  }
                  required
                />
                <p>
                  I agree to{" "}
                  <Link href="/terms-and-conditions" className="underline">
                    terms & conditions
                  </Link>
                  . By providing my phone number, I agree to receive text
                  messages from the business.
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

              <Button
                type="submit"
                disabled={!formData.agreeToTerms || isSubmitting}
                className="w-full bg-red-900 hover:bg-red-800 text-white py-3 rounded-lg text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
