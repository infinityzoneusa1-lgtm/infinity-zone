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
import { useState, useRef } from "react";
import Link from "next/link";
import { Upload, FileText, X } from "lucide-react";

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiry: "",
    message: "",
    preferredContact: "",
    additionalInfo: "",
    newsletter: "",
    agreeToTerms: false,
  });
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
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
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Check file types
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/gif",
      "text/plain",
    ];

    const invalidFiles = files.filter(
      (file) => !allowedTypes.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      alert("Please upload only PDF, DOC, DOCX, images, or text files");
      return;
    }

    // Check file sizes (10MB limit per file)
    const oversizedFiles = files.filter((file) => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert("Each file should be less than 10MB");
      return;
    }

    // Check total number of files (max 5)
    if (attachedFiles.length + files.length > 5) {
      alert("Maximum 5 files can be uploaded");
      return;
    }

    setAttachedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
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

      // Append form fields
      submitData.append("firstName", formData.firstName);
      submitData.append("lastName", formData.lastName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("subject", formData.inquiry || "General Inquiry");
      submitData.append(
        "message",
        `Nature of Inquiry: ${formData.inquiry}\n\nMessage: ${formData.message}\n\nPreferred Contact: ${formData.preferredContact}\n\nAdditional Info: ${formData.additionalInfo}\n\nNewsletter: ${formData.newsletter}`
      );

      // Append files
      attachedFiles.forEach((file) => {
        submitData.append("attachments", file);
      });

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
        }/api/contact`,
        {
          method: "POST",
          body: submitData, // Don't set Content-Type header for FormData
        }
      );

      if (response.ok) {
        setSubmitMessage("Thank you! Your message has been sent successfully.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          inquiry: "",
          message: "",
          preferredContact: "",
          additionalInfo: "",
          newsletter: "",
          agreeToTerms: false,
        });
        setAttachedFiles([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        const errorData = await response.json();
        setSubmitMessage(
          errorData.message ||
            "Sorry, there was an error sending your message. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage(
        "Sorry, there was an error sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Fill the Contact Form:
        </h2>

        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="border border-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="border border-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border border-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="border border-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nature Of Inquiry *
                </label>
                <Select
                  onValueChange={(value: string) =>
                    handleInputChange("inquiry", value)
                  }
                >
                  <SelectTrigger className="w-full border border-black">
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Your message..."
                  className="h-28 border border-black"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attachments (If Applicable)
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div
                  onClick={triggerFileInput}
                  className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <Upload className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                  <p className="text-sm">Click to upload attachments</p>
                  <p className="text-xs text-gray-400 mt-1">
                    PDF, DOC, Images, TXT (Max 10MB each, 5 files total)
                  </p>
                </div>

                {attachedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {attachedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Method of Contact
                </label>
                <Select
                  onValueChange={(value: string) =>
                    handleInputChange("preferredContact", value)
                  }
                >
                  <SelectTrigger className="w-full border border-black">
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <Input
                  value={formData.additionalInfo}
                  onChange={(e) =>
                    handleInputChange("additionalInfo", e.target.value)
                  }
                  placeholder="How did you hear about us?"
                  className="border border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subscribe to Newsletter?
                </label>
                <Select
                  onValueChange={(value: string) =>
                    handleInputChange("newsletter", value)
                  }
                >
                  <SelectTrigger className="w-full border border-black">
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
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
                  messages.
                </p>
              </div>

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
