import { useState } from "react";
import slides from "./data/slides.json";
import "./styles/style.css";

export default function SmartSpendAIPitch() {
  const [message, setMessage] = useState("");
  const [showDemo, setShowDemo] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [income, setIncome] = useState(3000);

  const [chat, setChat] = useState([
    {
      sender: "ai",
      text: "Hello Ibrahim! Your spending is looking great this week.",
    },
    {
      sender: "user",
      text: "What should I improve?",
    },
    {
      sender: "ai",
      text: "You are close to your entertainment limit. Saving an extra $50 this week would help you hit your monthly goal faster.",
    },
  ]);

  const handleSend = () => {
    const savingsGoal = income * 0.25;
    const safeSpending = income * 0.5;
    const emergencyFund = income * 0.15;

    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    let aiReply = `Based on your monthly income of $${income}, SmartSpend AI recommends saving at least $${savingsGoal.toFixed(
      0
    )} this month.`;

    const lower = message.toLowerCase();

    if (lower.includes("save")) {
      aiReply = `With an income of $${income}, you should target savings of around $${savingsGoal.toFixed(
        0
      )} monthly.`;
    } else if (lower.includes("travel")) {
      aiReply = `You can safely spend approximately $${(
        income * 0.1
      ).toFixed(0)} on travel this month.`;
    } else if (lower.includes("food")) {
      aiReply = `Food expenses should ideally stay under $${(
        income * 0.2
      ).toFixed(0)} monthly.`;
    } else if (lower.includes("shopping")) {
      aiReply = `Your shopping budget should remain below $${(
        income * 0.15
      ).toFixed(0)} this month.`;
    } else if (lower.includes("budget")) {
      aiReply = `Safe spending limit: $${safeSpending.toFixed(
        0
      )}. Emergency reserve: $${emergencyFund.toFixed(0)}.`;
    }

    const aiMessage = {
      sender: "ai",
      text: aiReply,
    };

    setChat([...chat, userMessage, aiMessage]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      <section className="px-8 py-16">
        <h1 className="text-6xl font-black mb-6">
          SmartSpend <span className="text-green-400">AI</span>
        </h1>

        <p className="text-slate-300 text-xl mb-8 max-w-2xl">
          AI-powered financial assistant for budgeting and saving.
        </p>

        <div className="mb-6">
          <label className="block mb-2">Monthly Income</label>

          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => {
              setShowDemo(!showDemo);
              setShowLearnMore(false);
            }}
            className="bg-green-500 text-black px-6 py-3 rounded-xl font-bold"
          >
            Try Demo
          </button>

          <button
            onClick={() => {
              setShowLearnMore(!showLearnMore);
              setShowDemo(false);
            }}
            className="border border-slate-600 px-6 py-3 rounded-xl"
          >
            Learn More
          </button>
        </div>

        {showDemo && (
          <div className="mt-8 bg-slate-900 rounded-2xl p-6">
            <p>Recommended Savings: ${(income * 0.25).toFixed(0)}</p>
            <p>Bills & Essentials: ${(income * 0.45).toFixed(0)}</p>
            <p>Entertainment: ${(income * 0.15).toFixed(0)}</p>
          </div>
        )}

        {showLearnMore && (
          <div className="mt-8 bg-slate-900 rounded-2xl p-6 max-w-3xl">
            <p>
              SmartSpend AI helps users control expenses and improve financial habits using AI recommendations.
            </p>
          </div>
        )}
      </section>

      <section className="px-8 py-16 bg-black/40">
        <h2 className="text-4xl font-black mb-10 text-center">
          Presentation Slides
        </h2>

        <div className="space-y-8 max-w-5xl mx-auto">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-8"
            >
              <h3 className="text-3xl font-black mb-4">
                {slide.title}
              </h3>

              {slide.subtitle && (
                <p className="text-green-300 mb-4">
                  {slide.subtitle}
                </p>
              )}

              <p className="text-slate-300 whitespace-pre-line">
                {slide.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 py-20">
        <h2 className="text-4xl font-black mb-8">
          Live AI Assistant
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-3xl">

          <div className="space-y-4 mb-6">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user"
                    ? "bg-green-500 text-black rounded-2xl p-4 ml-auto w-fit"
                    : "bg-slate-800 rounded-2xl p-4 w-fit"
                }
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask SmartSpend AI..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3"
            />

            <button
              onClick={handleSend}
              className="bg-green-500 text-black px-6 rounded-xl font-bold"
            >
              Send
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}