"use client";

import { useState } from "react";
import { trpc } from "~/trpc/client"


export default function FeatureRequestsPage() {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");

  // 1. UNCOMMENT THIS: Initialize the tRPC mutation
  const createRequest = trpc.featureRequest.create.useMutation({
    onSuccess: () => {
      alert("Sent to AI successfully! Check your Inngest Dashboard!");
      setTitle("");
      setPrompt("");
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 2. UNCOMMENT THIS: Actually trigger the backend! 🚀
    createRequest.mutate({
      title: title,
      prompt: prompt,
    });
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Submit a Feature Request 💡</h1>
      <p className="text-gray-500 mb-8">Tell our AI Agent what you want to build, and it will generate a complete PRD.</p>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Feature Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Add Stripe Subscription Billing"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Describe the Feature</label>
          <textarea
            required
            rows={5}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="I want users to be able to subscribe to a pro plan using Stripe. It should support monthly and yearly options..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={createRequest.isPending}
        >
          {createRequest.isPending ? "Submitting to AI..." : "Submit to AI Agent ✨"}
        </button>
      </form>
    </div>
  );
}
