"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function ContentCreationForm() {
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    // Handle form logic here
    alert("Form submitted!");
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
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              placeholder="Last Name *"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <input
            type="email"
            placeholder="Email *"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />

          <input
            type="text"
            placeholder="Phone - WhatsApp *"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />

          <select
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
          >
            <option value="">Country *</option>
            <option value="USA">USA</option>
            <option value="India">India</option>
            <option value="UK">UK</option>
            {/* Add more countries */}
          </select>

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
                the future.<br />I understand that Infinity Zone will review the
                submitted content to determine its suitability. Payment will
                only be issued upon approval of the content by Infinity Zone’s
                internal review team.<br />Once content is approved and payment is
                made, I agree that the content is no longer considered my
                personal property. I may not reuse, repost, or distribute the
                content in any form without prior written consent from Infinity
                Zone. Any unauthorized use will be considered a violation of
                copyright laws, and appropriate legal action may be pursued.<br/>If
                required to post the content on my personal or public platform
                (e.g. social media), I agree to do so only after approval is
                received and tag Infinity Zone on the post.<br/>I understand that
                this content is exclusive to Infinity Zone and cannot be resold
                or repurposed by me or any other party.<br/>I confirm that the
                content submitted is my original work and does not infringe on
                the rights of any third party. I take full responsibility for
                any copyright infringement or plagiarism claims that may
                arise.<br/>Infinity Zone reserves the right to reject any content
                that does not meet its quality, brand, or originality standards.
                In such cases, no payment shall be due.<br/>Infinity Zone reserves
                the right to update these terms at any time. Continued
                submissions or engagement shall constitute acceptance of the
                updated terms.<br/><br/> By checking the box, I confirm that I have read,
                understood, and agree to be bound by the terms above.
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#4b0000] text-white font-medium py-3 rounded-md hover:bg-[#600000] transition"
          >
            Submit
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
