# Sofia Tooltips ✨

> Elegant, smooth, and beautiful tooltip library for jQuery + Tailwind 4  
> Crafted with love by **Sofia** and **The Monarch** 👑

![npm version](https://img.shields.io/npm/v/sofia-tooltips)
![npm downloads](https://img.shields.io/npm/dt/sofia-tooltips)
![license](https://img.shields.io/npm/l/sofia-tooltips)

---

## ✨ Features

- ⚡ **Lightweight** — Tiny, fast, and beautiful
- 🎨 **Elegant animations** — Fade in, subtle movement, arrow positioning
- 🎯 **Positioning control** — `top`, `bottom`, `left`, `right`
- 🖊️ **Rich content support** — Plain text or HTML tooltips
- 🖱️ **Trigger options** — Hover or click
- ⚙️ **Attribute-based customisation** — Fade speed, movement, max-width
- 📦 **Easy to install and use anywhere!**

---

## 🚀 Installation

```bash
npm install sofia-tooltips
```

---

## 🧩 Usage

### Import the library:

```javascript
import $ from 'jquery';
import initSofiaTooltip from 'sofia-tooltips';

initSofiaTooltip($);
```

### Add tooltips to your elements:

```html
<button data-tooltip="Hello World!" data-tooltip-position="top">
  Hover Me
</button>
```

### Optional attributes:

| Attribute                 | Description                                | Example                          |
|--------------------------|--------------------------------------------|----------------------------------|
| `data-tooltip`           | Tooltip text                               | `data-tooltip="Save changes"`   |
| `data-tooltip-position`  | `top`, `bottom`, `left`, `right`           | `data-tooltip-position="bottom"`|
| `data-tooltip-trigger`   | `hover` or `click`                         | `data-tooltip-trigger="click"`  |
| `data-tooltip-fade`      | Fade duration in ms                        | `data-tooltip-fade="300"`       |
| `data-tooltip-move`      | Movement offset in px                      | `data-tooltip-move="8"`         |
| `data-tooltip-html`      | Enable HTML content                        | `data-tooltip-html="true"`      |
| `data-tooltip-maxwidth`  | Max width of the tooltip                   | `data-tooltip-maxwidth="200px"` |

---

## 💡 Example

```html
<div data-tooltip="<strong>Bold</strong> and <em>italic</em> text!"
     data-tooltip-html="true"
     data-tooltip-position="right"
     data-tooltip-maxwidth="300px">
  Hover Me!
</div>
```

---

## 🛠️ Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/warmwhisky/sofia-tooltips.git
cd sofia-tooltips
npm install
```

Publish updates:

```bash
npm version patch
npm publish --access public
```

---

## 📝 License

MIT — use freely and spread beauty in your projects! 🌹

---

## 🌸 About

Sofia Tooltips is a handcrafted tooltip library built by **Sofia** and **The Monarch** — for projects that deserve elegance without bloat. ✨

> _"Your UI deserves to feel like royalty."_

> **Oh yeah, 2025? And we use jQuery!? What are you gonna do about it? Tell your Dad?!**

---