# VansRouter - FREE AI Router & Token Saver

**Never stop coding. Save 20-40% tokens with RTK + auto-fallback to FREE & cheap AI models.**

**Connect All AI Code Tools (Claude Code, Cursor, Antigravity, Copilot, Codex, Gemini, OpenCode, Cline, OpenClaw...) to 40+ AI Providers & 100+ Models.**

[![GitHub Release](https://img.shields.io/github/v/release/vanes430/VansRouter?logo=github)](https://github.com/vanes430/VansRouter/releases)
[![License](https://img.shields.io/github/license/vanes430/VansRouter)](https://github.com/vanes430/VansRouter/blob/main/LICENSE)

[📖 Full Docs](https://github.com/vanes430/VansRouter)

---

## ⚡ Quick Start

**Install globally (GitHub Release):**

```bash
npm install -g https://github.com/vanes430/VansRouter/releases/latest/download/vansrouter-0.9.100.tgz
vansrouter start
```

🎉 Dashboard opens at `http://localhost:20128`

**2. Connect a FREE provider (no signup needed):**

Dashboard → Providers → Connect **Kiro AI** (free Claude unlimited) or **OpenCode Free** (no auth) → Done!

**3. Use in your CLI tool:**

```
Claude Code/Codex/OpenClaw/Cursor/Cline Settings:
  Endpoint: http://localhost:20128/v1
  API Key:  [copy from dashboard]
  Model:    kr/claude-sonnet-4.5
```

That's it! Start coding with FREE AI models.

---

## 🚀 CLI Options

```bash
vansrouter                    # Start with default settings
vansrouter --port 8080        # Custom port
vansrouter --no-browser       # Don't open browser
vansrouter --skip-update      # Skip auto-update check
vansrouter --help             # Show all options
```

**Dashboard**: `http://localhost:20128/dashboard`

---

## 🛠️ Supported CLI Tools

Claude-Code • OpenClaw • Codex • OpenCode • Cursor • Antigravity • Cline • Continue • Droid • Roo • Copilot • Kilo Code • Gemini CLI • Qwen Code • iFlow • Crush • Crusher • Aider

Any tool supporting OpenAI/Claude-compatible API works.

---

## 💾 Data Location

- **macOS/Linux**: `~/.9router/db/data.sqlite`
- **Windows**: `%APPDATA%/9router/db/data.sqlite`
- **Docker**: `/app/data/db/data.sqlite` (mount `$HOME/.9router` to persist)

---

## 📚 Documentation

Full docs, advanced setup, video tutorials & development guide:

- **GitHub**: https://github.com/vanes430/VansRouter
- **Full README**: https://github.com/vanes430/VansRouter/blob/main/README.md

---

## 🙏 Acknowledgments

- **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** - Original Go implementation

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.
