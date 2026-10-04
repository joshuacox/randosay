"use client";

import React, { useState, useEffect } from "react";

const SAMPLE_FORTUNES = [
  "You will be hungry again in one hour.",
  "Never do card tricks for the group you play poker with.",
  "A conclusion is simply the place where you got tired of thinking.",
  "There is a 20% chance of tomorrow.",
  "The only person who always got his work done by Friday was Robinson Crusoe.",
  "Don't worry about the world coming to an end today. It is already tomorrow in Australia.",
];

const RULE_CHARS = ["#", "*", "=", "~", "-", "+", "$", "%", "@", "^", "!", "W", "V"];

const PRESETS = [
  {
    mode: "cowsay",
    label: "cowsay (standard)",
    avatar: `  ^__^
  (oo)\\_______
   (__)\\       )\\/\\
       ||----w |
       ||     ||`,
    bubble: "say",
  },
  {
    mode: "cowthink",
    label: "cowthink (borg)",
    avatar: `  ^__^
  (==)\\_______
   (__)\\       )\\/\\
       ||----w |
       ||     ||`,
    bubble: "think",
  },
  {
    mode: "ponysay",
    label: "ponysay (twilight)",
    avatar: `  (\\___/)
  (• . •)
  / >✨
  [Magic Pony]`,
    bubble: "say",
  },
  {
    mode: "botsay",
    label: "botsay (robot)",
    avatar: `  [o_o]
  /|   |\\
   d   b
  (Beep Boop)`,
    bubble: "say",
  },
  {
    mode: "lolcat",
    label: "lolcat (rainbow text)",
    avatar: ``,
    bubble: "plain",
  },
];

function generateBanner(char: string, length = 48) {
  return char.repeat(length);
}

function renderSpeechBubble(text: string, think = false) {
  const line = text.trim();
  const len = line.length;
  const top = " " + "_".repeat(len + 2);
  const bottom = " " + "-".repeat(len + 2);
  const left = think ? "(" : "<";
  const right = think ? ")" : ">";
  const stem = think ? "   o\n    o" : "   \\\n    \\";
  return `${top}\n${left} ${line} ${right}\n${bottom}\n${stem}`;
}

export default function Home() {
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [customQuoteIndex, setCustomQuoteIndex] = useState(0);
  const [ruleChar, setRuleChar] = useState("=");

  const currentQuote = SAMPLE_FORTUNES[customQuoteIndex];
  const currentPreset = PRESETS[selectedPreset];

  const handleCopy = (cmd: string, key: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleRandomize = () => {
    setSelectedPreset((prev) => (prev + 1) % PRESETS.length);
    setCustomQuoteIndex((prev) => (prev + 1) % SAMPLE_FORTUNES.length);
    setRuleChar(RULE_CHARS[Math.floor(Math.random() * RULE_CHARS.length)]);
  };

  const hrLine = generateBanner(ruleChar, 46);

  let simulationAscii = "";
  if (currentPreset.bubble === "plain") {
    simulationAscii = `${hrLine}\n🌈 ${currentQuote} 🌈\n${hrLine}`;
  } else {
    const bubble = renderSpeechBubble(
      currentQuote,
      currentPreset.bubble === "think"
    );
    simulationAscii = `${hrLine}\n${bubble}\n${currentPreset.avatar}\n${hrLine}`;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-black bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent">
              randosay
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              v1.0.0
            </span>
          </div>
          <nav className="flex items-center space-x-6 text-sm">
            <a
              href="#installation"
              className="text-slate-300 hover:text-amber-400 transition-colors"
            >
              Installation
            </a>
            <a
              href="#features"
              className="text-slate-300 hover:text-amber-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#interactive"
              className="text-slate-300 hover:text-amber-400 transition-colors"
            >
              Interactive Demo
            </a>
            <a
              href="#docs"
              className="text-slate-300 hover:text-amber-400 transition-colors"
            >
              Manual
            </a>
            <a
              href="https://github.com/joshuacox/randosay"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-semibold hover:bg-amber-400 transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
            ✨ Bring serendipity & color to your bash / zsh shell
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Random terminal fortunes,{" "}
            <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
              packaged with style.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 text-lg leading-relaxed">
            <code className="font-mono text-amber-400">randosay</code> wraps the
            classic UNIX <code className="font-mono text-amber-300">fortune</code>{" "}
            database with randomized ASCII speakers (<code>cowsay</code>,{" "}
            <code>cowthink</code>, <code>ponysay</code>, <code>botsay</code>,{" "}
            <code>lolcat</code>) encased in procedural decorative horizontal rules.
          </p>

          {/* Quick Install Banner */}
          <div className="max-w-xl mx-auto mt-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between shadow-2xl font-mono text-sm">
              <span className="text-slate-400 select-all overflow-x-auto whitespace-nowrap mr-3 text-left">
                curl -sL https://raw.githubusercontent.com/joshuacox/randosay/refs/heads/main/bootstrap.sh | bash
              </span>
              <button
                onClick={() =>
                  handleCopy(
                    "curl -sL https://raw.githubusercontent.com/joshuacox/randosay/refs/heads/main/bootstrap.sh | bash",
                    "hero"
                  )
                }
                className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs whitespace-nowrap transition-colors"
              >
                {copied === "hero" ? "Copied! ✓" : "Copy"}
              </button>
            </div>
          </div>
        </section>

        {/* AdSense Unit Slot (Header/Top) */}
        <section aria-label="Sponsor" className="w-full text-center">
          <div className="max-w-3xl mx-auto border border-dashed border-slate-800/80 rounded-xl p-4 bg-slate-900/30 text-xs text-slate-500">
            <div className="font-mono text-[10px] uppercase tracking-wider mb-2">Advertisement</div>
            <ins
              className="adsbygoogle block"
              style={{ display: "block" }}
              data-ad-client="ca-pub-8973108060277483"
              data-ad-slot="default"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </div>
        </section>

        {/* Interactive Live Demo */}
        <section id="interactive" className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Interactive Terminal Simulator</h2>
              <p className="text-slate-400 text-sm">
                Experience how <code className="font-mono text-amber-400">randosay</code> outputs dynamic characters and borders.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRandomize}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold text-sm shadow transition-all cursor-pointer"
              >
                🎲 Roll Random Speaker
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Terminal Window Header */}
            <div className="bg-slate-950/80 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400">
                  user@terminal: ~/randosay
                </span>
              </div>
              <div className="text-xs font-mono text-amber-400">
                speaker: {currentPreset.label}
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-amber-300">
              <div className="text-slate-500 select-none mb-3">$ randosay</div>
              <pre className="whitespace-pre">{simulationAscii}</pre>
            </div>

            {/* Controls Bar */}
            <div className="bg-slate-950/50 p-4 border-t border-slate-800/80 flex flex-wrap gap-3 items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Speaker:</span>
                {PRESETS.map((p, idx) => (
                  <button
                    key={p.mode}
                    onClick={() => setSelectedPreset(idx)}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedPreset === idx
                        ? "bg-amber-500 text-slate-950 font-bold"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {p.mode}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400">Border Char:</span>
                {RULE_CHARS.slice(0, 7).map((c) => (
                  <button
                    key={c}
                    onClick={() => setRuleChar(c)}
                    className={`w-6 h-6 rounded flex items-center justify-center ${
                      ruleChar === c
                        ? "bg-amber-500 text-slate-950 font-bold"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section id="features" className="space-y-8">
          <h2 className="text-2xl font-bold tracking-tight">Key Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="text-2xl">🎲</div>
              <h3 className="font-bold text-lg text-slate-100">Smart Speaker Fallback</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Automatically detects available tools on your system (<code>ponysay</code>, <code>cowsay</code>, <code>botsay</code>, <code>lolcat</code>, or plain <code>fortune</code>) and gracefully adapts if any are missing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="text-2xl">📐</div>
              <h3 className="font-bold text-lg text-slate-100">Dynamic Procedural Rules</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Calculates the terminal width via <code className="text-amber-300 font-mono">tput cols</code> and bounds output between custom randomized repeating glyphs and runes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="text-2xl">📦</div>
              <h3 className="font-bold text-lg text-slate-100">Universal Packaging</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Built-in support for CMake, Nix Flakes (<code className="text-amber-300 font-mono">flake.nix</code>), Arch/Omarchy/Debian package layouts, and an automated bootstrap script.
              </p>
            </div>
          </div>
        </section>

        {/* Installation & Setup */}
        <section id="installation" className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Installation Guide</h2>

          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-200">1. One-Liner (curl bootstrap)</h3>
                <button
                  onClick={() =>
                    handleCopy(
                      "curl -sL https://raw.githubusercontent.com/joshuacox/randosay/refs/heads/main/bootstrap.sh | bash",
                      "inst-curl"
                    )
                  }
                  className="text-xs text-amber-400 hover:underline font-mono"
                >
                  {copied === "inst-curl" ? "Copied! ✓" : "Copy command"}
                </button>
              </div>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto">
                curl -sL https://raw.githubusercontent.com/joshuacox/randosay/refs/heads/main/bootstrap.sh | bash
              </pre>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-200">2. Nix / NixOS Flake</h3>
                <button
                  onClick={() =>
                    handleCopy(
                      "nix run github:joshuacox/randosay",
                      "inst-nix"
                    )
                  }
                  className="text-xs text-amber-400 hover:underline font-mono"
                >
                  {copied === "inst-nix" ? "Copied! ✓" : "Copy command"}
                </button>
              </div>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto">
                nix run github:joshuacox/randosay
              </pre>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-200">3. Build from Source with CMake</h3>
                <button
                  onClick={() =>
                    handleCopy(
                      "git clone https://github.com/joshuacox/randosay.git\ncd randosay\ncmake .\nmake\nsudo make install",
                      "inst-cmake"
                    )
                  }
                  className="text-xs text-amber-400 hover:underline font-mono"
                >
                  {copied === "inst-cmake" ? "Copied! ✓" : "Copy snippet"}
                </button>
              </div>
              <pre className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto">
                {`git clone https://github.com/joshuacox/randosay.git
cd randosay
cmake .
make
sudo make install`}
              </pre>
            </div>
          </div>
        </section>

        {/* Documentation / Man Page Section */}
        <section id="docs" className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Manual & Usage Reference</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 font-mono text-xs sm:text-sm text-slate-300 space-y-4">
            <div>
              <div className="text-amber-400 font-bold mb-1">NAME</div>
              <p className="pl-4 text-slate-400">
                randosay - a wrapper around fortune to make terminal greetings fun
              </p>
            </div>

            <div>
              <div className="text-amber-400 font-bold mb-1">SYNOPSIS</div>
              <p className="pl-4 text-slate-400 font-bold">
                randosay [--debug]
              </p>
            </div>

            <div>
              <div className="text-amber-400 font-bold mb-1">DESCRIPTION</div>
              <p className="pl-4 text-slate-400 leading-relaxed">
                randosay reads quotes from the fortune database and pipes them into
                either cowsay (with variable expressions like -b, -d, -g, -p, -s, -t, -w, -y),
                cowthink with arbitrary cow files, ponysay, ponythink, botsay, or lolcat.
                Each quote is bordered top and bottom by a procedurally generated horizontal rule.
              </p>
            </div>

            <div>
              <div className="text-amber-400 font-bold mb-1">AUTOMATION & LOGIN HOOKS</div>
              <p className="pl-4 text-slate-400 leading-relaxed">
                Add <code className="text-amber-300">randosay</code> to the end of your <code className="text-amber-300">~/.zshrc</code> or <code className="text-amber-300">~/.bashrc</code> to greet yourself with a new fortune and ASCII character every time you launch a new terminal session!
              </p>
            </div>
          </div>
        </section>

        {/* Bottom AdSense slot */}
        <section aria-label="Sponsor" className="w-full text-center">
          <div className="max-w-3xl mx-auto border border-dashed border-slate-800/80 rounded-xl p-4 bg-slate-900/30 text-xs text-slate-500">
            <div className="font-mono text-[10px] uppercase tracking-wider mb-2">Advertisement</div>
            <ins
              className="adsbygoogle block"
              style={{ display: "block" }}
              data-ad-client="ca-pub-8973108060277483"
              data-ad-slot="default"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500 space-y-2">
        <p>
          Maintained by Joshua Edward McLaughlin Cox • Licensed under GNU General Public License v3.0
        </p>
        <p>
          Documentation and site built with Next.js static export & GitHub Actions.
        </p>
      </footer>
    </div>
  );
}
