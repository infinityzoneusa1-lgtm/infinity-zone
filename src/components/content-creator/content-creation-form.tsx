"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function ContentCreationForm() {
  const [agree, setAgree] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    contentType: "",
    contentCategory: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:10000"
        }/api/content-creators`,
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
            contentType: formData.contentType || "other",
            contentCategory: formData.contentCategory || "other",
            description: formData.description,
            agreeToTerms: agree,
            contentFile: {
              filename: "placeholder-file.txt",
              originalName: "placeholder-file.txt",
              url: "",
              size: 0,
              mimeType: "text/plain",
            },
          }),
        }
      );

      if (response.ok) {
        setSubmitMessage(
          "Thank you! Your content creator application has been submitted successfully. We'll review it and get back to you soon."
        );
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          country: "",
          contentType: "",
          contentCategory: "",
          description: "",
        });
        setAgree(false);
      } else {
        setSubmitMessage(
          "Sorry, there was an error submitting your application. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting content creator application:", error);
      setSubmitMessage(
        "Sorry, there was an error submitting your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 px-4 flex justify-center bg-white">
      <div className="w-full max-w-xl rounded-xl shadow-lg border border-gray-200 p-6 md:p-10 bg-white">
        <h2 className="text-center text-black text-xl md:text-2xl font-semibold mb-6">
          Fill The Form Below To be Part Of our Content Creation Team
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First Name *"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              placeholder="Last Name *"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <input
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />

          <input
            type="text"
            placeholder="Phone - WhatsApp *"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />

          <select
            value={formData.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
          >
            <option value="">Country *</option>
            <option value="USA">USA</option>
            <option value="India">India</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={formData.contentType}
            onChange={(e) => handleInputChange("contentType", e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
          >
            <option value="">Content Type *</option>
            <option value="video">Video</option>
            <option value="image">Image</option>
            <option value="audio">Audio</option>
            <option value="document">Document</option>
            <option value="other">Other</option>
          </select>

          <select
            value={formData.contentCategory}
            onChange={(e) =>
              handleInputChange("contentCategory", e.target.value)
            }
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
          >
            <option value="">Content Category *</option>
            <option value="beauty">Beauty</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="fashion">Fashion</option>
            <option value="health">Health</option>
            <option value="tech">Tech</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="other">Other</option>
          </select>

          <textarea
            placeholder="Content Description (Optional)"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md h-20 resize-none"
            maxLength={1000}
          />

          <div>
            <label className="block mb-1 text-sm font-medium">
              Upload Content File *
            </label>
            <input
              type="file"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="mt-1"
              required
            />
            <div className="h-36 overflow-y-auto border border-gray-300 p-3 rounded-md text-sm text-gray-700 bg-gray-50 w-full">
              <p>
                I hereby grant Infinity Zone full and exclusive rights to the
                content I submit. This includes, but is not limited to, the
                rights to use, reproduce, modify, distribute, display, and
                publish the content across all platforms and media, now and in
                the future.
                <br />I understand that Infinity Zone will review the submitted
                content to determine its suitability. Payment will only be
                issued upon approval of the content by Infinity Zone’s internal
                review team.
                <br />
                Once content is approved and payment is made, I agree that the
                content is no longer considered my personal property. I may not
                reuse, repost, or distribute the content in any form without
                prior written consent from Infinity Zone. Any unauthorized use
                will be considered a violation of copyright laws, and
                appropriate legal action may be pursued.
                <br />
                If required to post the content on my personal or public
                platform (e.g. social media), I agree to do so only after
                approval is received and tag Infinity Zone on the post.
                <br />I understand that this content is exclusive to Infinity
                Zone and cannot be resold or repurposed by me or any other
                party.
                <br />I confirm that the content submitted is my original work
                and does not infringe on the rights of any third party. I take
                full responsibility for any copyright infringement or plagiarism
                claims that may arise.
                <br />
                Infinity Zone reserves the right to reject any content that does
                not meet its quality, brand, or originality standards. In such
                cases, no payment shall be due.
                <br />
                Infinity Zone reserves the right to update these terms at any
                time. Continued submissions or engagement shall constitute
                acceptance of the updated terms.
                <br />
                <br /> By checking the box, I confirm that I have read,
                understood, and agree to be bound by the terms above.
              </p>
            </div>
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#4b0000] text-white font-medium py-3 rounded-md hover:bg-[#600000] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          <p className="text-center text-xs text-gray-500 mt-3">
            <a href="#" className="underline">
              Privacy Policy
            </a>{" "}
            |{" "}
            <Link href="/terms-and-conditions" className="underline">
              Terms of Service
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
