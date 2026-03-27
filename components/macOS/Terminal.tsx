"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  text: string;
  type: "system" | "user" | "prompt";
}

export default function TerminalEmulator() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Python 3.10.12 (main, Nov 20 2023, 15:14:05)", type: "system" },
    { text: "Type 'help', 'copyright', 'credits' or 'license' for more information.", type: "system" },
    { text: ">>> python3 adventure_game.py", type: "user" },
    { text: "Welcome to the adventure game!", type: "system" },
    { text: "In this game, you will explore a magical world filled with wonders and dangers.", type: "system" },
    { text: "Your goal is to collect magical items and defeat monsters to earn points and become the greatest adventurer of all time!", type: "system" },
    { text: "Are you ready to begin your adventure?", type: "system" },
    { text: "\nEnter 1 to knock on the door of the house.\nEnter 2 to peer into the cave.\nEnter 3 to check your score.\nWhat would you like to do?", type: "prompt" },
  ]);

  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [hasWand, setHasWand] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userChoice = input.trim();
    const newMessages: Message[] = [...messages, { text: `(Please enter 1, 2, or 3.) ${userChoice}`, type: "user" }];
    setMessages(newMessages);
    setInput("");

    // Game Logic
    setTimeout(() => {
      processGameChoice(userChoice);
    }, 500);
  };

  const processGameChoice = (choice: string) => {
    let response: Message[] = [];
    
    if (choice === "1") {
      const monster = ["fairy", "dragon", "gorgon"][Math.floor(Math.random() * 3)];
      response.push({ text: `You approach the door of the house.`, type: "system" });
      response.push({ text: `You are about to knock when the door opens and out steps a ${monster}.`, type: "system" });
      response.push({ text: `Eep! This is the ${monster}'s house!`, type: "system" });
      response.push({ text: `The monster attacks you!`, type: "system" });
      
      if (hasWand) {
        response.push({ text: `As the ${monster} moves to attack, you draw your magical Wand of Ogoroth!`, type: "system" });
        response.push({ text: `The Wand of Ogoroth shines brightly in your hand as you brace yourself for the attack.`, type: "system" });
        response.push({ text: `But the ${monster} takes one look at your shiny new toy and runs away!`, type: "system" });
        response.push({ text: `You have rid the town of the ${monster}. You are victorious!`, type: "system" });
        response.push({ text: `\nGAME OVER - YOU WIN!`, type: "system" });
        response.push({ text: `Final Score: ${score + 50}`, type: "system" });
      } else {
        response.push({ text: `You feel a bit under-prepared for this, what with only having a tiny, rusty old magic wand.`, type: "system" });
        response.push({ text: `You do your best... but your rusty old magic wand is no match for the wicked monster.`, type: "system" });
        response.push({ text: `You have been defeated!`, type: "system" });
        response.push({ text: `\nGAME OVER - YOU LOSE`, type: "system" });
        response.push({ text: `Final Score: ${score}`, type: "system" });
      }
      response.push({ text: "\nType 'restart' to play again.", type: "prompt" });
    } else if (choice === "2") {
      response.push({ text: "You peer cautiously into the cave.", type: "system" });
      if (!hasWand) {
        response.push({ text: "It turns out to be only a very small cave.", type: "system" });
        response.push({ text: "Your eye catches a glint of metal behind a rock.", type: "system" });
        response.push({ text: "You have found the magical Wand of Ogoroth!", type: "system" });
        response.push({ text: "You discard your rusty old magic wand and take the Wand of Ogoroth with you.", type: "system" });
        setHasWand(true);
        setScore(s => s + 10);
      } else {
        response.push({ text: "You've already been here and found the Wand of Ogoroth. There is nothing else to see here.", type: "system" });
      }
      response.push({ text: "\nYou walk back out to the field.", type: "system" });
      response.push({ text: "\nEnter 1 to knock on the door of the house.\nEnter 2 to peer into the cave.\nEnter 3 to check your score.\nWhat would you like to do?", type: "prompt" });
    } else if (choice === "3") {
      response.push({ text: `Your current score is ${score}.`, type: "system" });
      response.push({ text: "\nEnter 1 to knock on the door of the house.\nEnter 2 to peer into the cave.\nEnter 3 to check your score.\nWhat would you like to do?", type: "prompt" });
    } else if (choice.toLowerCase() === "restart") {
      setScore(0);
      setHasWand(false);
      setMessages([
        { text: "Welcome back, adventurer!", type: "system" },
        { text: "\nEnter 1 to knock on the door of the house.\nEnter 2 to peer into the cave.\nEnter 3 to check your score.\nWhat would you like to do?", type: "prompt" }
      ]);
      return;
    } else {
      response.push({ text: "Please try again. Enter 1, 2, or 3.", type: "system" });
      response.push({ text: "\nWhat would you like to do?", type: "prompt" });
    }

    setMessages(prev => [...prev, ...response]);
  };

  return (
    <div 
      className="bg-black/90 p-4 font-mono text-sm h-full flex flex-col overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pb-4">
        {messages.map((m, i) => (
          <div key={i} className={`whitespace-pre-wrap leading-relaxed ${
            m.type === "system" ? "text-green-400" : 
            m.type === "user" ? "text-blue-400" : "text-white/80"
          }`}>
            {m.type === "user" && <span className="text-white/40 mr-2">$</span>}
            {m.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleInput} className="flex gap-2 items-center border-t border-white/10 pt-4 bg-black/90">
        <span className="text-white/40">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 text-blue-400 placeholder:text-white/10"
          placeholder="Type here..."
          autoFocus
        />
      </form>
    </div>
  );
}
