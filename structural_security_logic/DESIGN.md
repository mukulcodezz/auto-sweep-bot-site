---
name: Structural Security Logic
colors:
  surface: '#0f1417'
  surface-dim: '#0f1417'
  surface-bright: '#343a3e'
  surface-container-lowest: '#0a0f12'
  surface-container-low: '#171c20'
  surface-container: '#1b2024'
  surface-container-high: '#252b2e'
  surface-container-highest: '#303539'
  on-surface: '#dee3e8'
  on-surface-variant: '#bdc8d0'
  inverse-surface: '#dee3e8'
  inverse-on-surface: '#2c3135'
  outline: '#87929a'
  outline-variant: '#3e484f'
  surface-tint: '#78d1ff'
  primary: '#90d7ff'
  on-primary: '#003549'
  primary-container: '#3abff8'
  on-primary-container: '#004b66'
  inverse-primary: '#006689'
  secondary: '#47dfa4'
  on-secondary: '#003825'
  secondary-container: '#00bd85'
  on-secondary-container: '#00452e'
  tertiary: '#ffc544'
  on-tertiary: '#402d00'
  tertiary-container: '#e4a900'
  on-tertiary-container: '#5a4100'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c3e8ff'
  primary-fixed-dim: '#78d1ff'
  on-primary-fixed: '#001e2c'
  on-primary-fixed-variant: '#004c68'
  secondary-fixed: '#69fcbe'
  secondary-fixed-dim: '#47dfa4'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffdea2'
  tertiary-fixed-dim: '#fabc22'
  on-tertiary-fixed: '#261900'
  on-tertiary-fixed-variant: '#5c4200'
  background: '#0f1417'
  on-background: '#dee3e8'
  surface-variant: '#303539'
typography:
  headline-lg:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  code-block:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
spacing:
  container-max: 600px
  gutter: 1rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
  inset-pad: 1.25rem
---

## Brand & Style

The design system is engineered for high-stakes Solana security operations. The personality is evidentiary and dry, prioritizing technical precision over marketing aesthetics. It avoids "hacker" tropes in favor of a structural, laboratory-grade interface that conveys confidence through data density and visual clarity.

The style is a hybrid of **Minimalism** and **Modern Corporate Terminal**. It utilizes heavy structural grid lines, monospaced data blocks, and a strict information hierarchy to ensure that critical security alerts are never obscured by decorative elements. Every visual choice must serve a functional purpose, facilitating rapid scanning of transaction hashes and smart contract logs.

## Colors

This design system utilizes a high-contrast dark mode palette to reduce eye strain during prolonged technical audits. 

- **Primary (#3ABFF8):** Reserved for functional interactions, command highlights, and active state indicators.
- **Success (#36D399):** Indicates verified security gates, passed checks, and successful sweeps.
- **Warning (#FBBD23):** Used exclusively for non-production environments (Devnet) and cautionary edge cases.
- **Danger (#F87272):** Signals guard-clause halts, broken security logic, or compromised states.
- **Surface:** The background is a matte black (#0A0B0D), providing a neutral floor for vibrant status colors.

## Typography

The typography strategy separates **instructional data** (Inter) from **system data** (JetBrains Mono). 

- **Headings & Labels:** Use JetBrains Mono to reinforce the technical nature of the bot. Labels should often be displayed in all-caps with increased letter spacing for a "metadata" appearance.
- **Body Text:** Use Inter for narrative descriptions and audit explanations. It provides the necessary readability for long-form security reports.
- **Code & Hashes:** All blockchain-specific data (TX IDs, Addresses, Command inputs) must use JetBrains Mono to ensure character distinction (e.g., 0 vs O).

## Layout & Spacing

As a Telegram-based bot, the layout follows a **Fixed-Fluid hybrid** model. The primary container is optimized for mobile chat widths (max 600px) but scales within web-view overlays.

- **Vertical Rhythm:** Use a strict 4px/8px baseline grid. Elements are stacked with 1rem (16px) gaps by default.
- **Data Density:** Content should be compact. Use 1.25rem internal padding for cards to maximize the visible data on a single screen.
- **Structural Lines:** Use 1px solid borders (#1A1C1E) to separate log entries rather than relying solely on whitespace. This mimics a ledger or terminal environment.

## Elevation & Depth

This design system avoids shadows to maintain its "terminal" aesthetic. Depth is achieved through **Tonal Layering** and **Structural Outlines**:

- **Level 0 (Background):** #0A0B0D.
- **Level 1 (Cards/Containers):** #141517 with a 1px border of #26292E.
- **Level 2 (Inputs/Command Blocks):** #000000 with a 1px border of the primary accent color.
- **Interactive States:** Use a subtle primary-colored outer glow (2px spread, 0% blur) for focused elements, creating a "monitor-like" luminescence without traditional drop shadows.

## Shapes

The design system utilizes **Sharp (0px)** corners for all structural components to emphasize a rigid, engineering-focused environment. 

In rare cases where Telegram's native UI forces rounded corners (like chat bubbles), the internal content (status bars, command blocks) must maintain sharp 90-degree angles to differentiate the bot's "system" outputs from general user chat.

## Components

### Monospace Command Blocks
Text containers for copyable code. Background: #000000; Border-left: 3px solid #3ABFF8. A small "COPY" label sits in the top-right corner using the `label-caps` typography style.

### Terminal Status Bars
Horizontal bars used for boot-checks or progress. 
- Track: #1A1C1E. 
- Fill: Primary or Success color. 
- Style: Segmented into 10 distinct blocks to show granular progress.

### Hash-Chain Connectors
Visual vertical lines (1px dashed, #26292E) that connect sequential log entries. Small nodes (4px squares) indicate individual event "links" in the security chain.

### Gated Timeline (5-Phase)
A vertical or horizontal stepper. 
- **Inactive:** Outlined square.
- **Active:** Pulsing primary square.
- **Completed:** Solid emerald square with a checkmark.
- Logic: Each phase must be accompanied by a timestamp in `label-caps`.

### Security Gates
Small badges placed at the top of audit reports. They use a high-contrast background (e.g., Success background with black text) to signal the "Pass/Fail" status of the sweep logic immediately.