# Design Guidelines: Rotating Date & Time Picker Web App

## Design Approach

**Selected Approach:** Mobile-First Utility Design with Custom Wheel Components

Drawing inspiration from iOS native date pickers and Telegram's clean interface aesthetic, this design prioritizes precision, clarity, and smooth interactions. The wheel picker pattern provides intuitive mobile-native feel while maintaining web accessibility.

**Key Design Principles:**
- Mobile-native interaction patterns adapted for web
- Clarity over decoration
- Smooth, physics-based animations for wheel rotation
- Immediate visual feedback
- Touch-optimized targets and spacing

---

## Core Design Elements

### A. Typography

**Primary Font:** Inter or Roboto via Google Fonts CDN
- **Wheel Picker Values:** 
  - Selected value: 600 weight, 24px
  - Adjacent values: 400 weight, 18px
  - Faded values: 400 weight, 16px with reduced opacity
- **Labels:** 500 weight, 14px uppercase with letter-spacing
- **Headers:** 600 weight, 20px
- **Confirmation Button:** 500 weight, 16px

### B. Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8
- Component padding: p-4 to p-6
- Wheel picker height: Individual wheel h-48 to h-64
- Inter-element spacing: space-y-4 or space-y-6
- Button padding: py-3 px-8

**Container Structure:**
- Mobile-first: Full viewport width with max-w-md centered
- Vertical layout: Header → Wheel Pickers → Preview → CTA
- Content padding: px-4 on mobile, px-6 on tablet+

### C. Component Library

#### 1. Header Section
- App title/context text centered
- Alert icon (from Heroicons) with descriptive text
- Minimal padding (py-4)

#### 2. Wheel Picker Components

**Date Wheel Picker:**
- Three adjacent wheels: Day | Month | Year
- Each wheel displays 5 visible values (2 above, selected, 2 below)
- Gradient fade effect on top and bottom edges
- Drag/swipe to rotate with momentum scrolling
- Haptic-like snap to center alignment
- Active selection highlighted with subtle container

**Time Wheel Picker:**
- Two adjacent wheels: Hours (00-23) | Minutes (00-59)
- Same visual treatment as date picker
- Format: 24-hour time with leading zeros
- Colon separator between wheels

**Wheel Specifications:**
- Height: 200-240px per wheel
- Width: Equal distribution within container
- Item height: 40px
- Visible items: 5 (with overflow hidden)
- Selected item: Centered with subtle background treatment
- Gradient masks: 40px fade at top/bottom

#### 3. Selection Preview Card
- Compact card showing formatted selection
- Format: "Day DD Month YYYY - HH:MM"
- Subtle border or background treatment
- Positioned between pickers and CTA
- Icon indicator (calendar + clock from Heroicons)
- Padding: p-4

#### 4. Confirmation Button
- Full-width with max-w-xs centered
- Height: h-12
- Rounded corners: rounded-lg
- Text: "Confirmar Fecha y Hora"
- Fixed position option at bottom (safe-area aware)

#### 5. Reset/Clear Action
- Secondary text button
- Positioned above primary CTA
- Text: "Restablecer"
- Subtle styling with icon (from Heroicons)

---

## Interaction Specifications

### Wheel Rotation Mechanics
- **Touch/Drag:** Vertical swipe initiates rotation
- **Momentum:** Continues scrolling after release with deceleration
- **Snap:** Auto-centers nearest value on release
- **Resistance:** Subtle bounce at min/max values
- **Multi-touch:** Each wheel independently scrollable

### Visual Feedback
- **Active Selection:** Subtle background container or border
- **Hover State (desktop):** Highlight wheel on hover
- **Drag State:** Slightly increased selected value size
- **Transition:** Smooth opacity fade for non-selected values

### Responsive Behavior
- **Mobile (<640px):** Stacked layout, full-width wheels
- **Tablet (640px+):** Side-by-side date and time sections
- **Desktop:** Centered max-width container with generous spacing

---

## Accessibility Considerations

- Keyboard navigation: Arrow keys to rotate wheels, Tab to switch wheels
- Focus indicators: Clear outline on active wheel
- Screen reader: Announce selected values on change
- Touch targets: Minimum 44px height for all interactive elements
- ARIA labels for wheel pickers and selected values

---

## Page Structure

1. **Header** (py-6)
   - Icon + Title
   - Brief instruction text

2. **Date Picker Section** (py-4)
   - Label: "Fecha del Evento"
   - Three-wheel date selector

3. **Time Picker Section** (py-4)
   - Label: "Hora del Evento"
   - Two-wheel time selector

4. **Preview Card** (py-4)
   - Current selection display
   - Formatted timestamp

5. **Action Area** (py-6)
   - Reset button
   - Primary confirmation button

6. **Footer** (py-4, optional)
   - Telegram integration note or app version

---

## Images

**No hero image required.** This utility-focused app prioritizes functional components over decorative imagery.

**Icons Usage:**
- Heroicons library via CDN
- Calendar icon for date picker section
- Clock icon for time picker section
- Alert/Report icon in header
- Checkmark icon in confirmation button
- Refresh icon for reset action

---

## Visual Hierarchy

**Primary Focus:** Wheel pickers - largest, most prominent elements
**Secondary:** Selected value preview card
**Tertiary:** Labels and instructional text
**Quaternary:** Header and footer elements

**Contrast Strategy:**
- Selected values: Highest contrast
- Adjacent values: Medium contrast
- Faded values: Low contrast (30-50% opacity)
- Background: Neutral, non-competing

---

## Animation Guidelines

**Wheel Rotation:** 
- Smooth bezier easing (ease-out)
- Duration: 200-400ms for snap-to-center
- Momentum scrolling with realistic physics

**Confirmation:**
- Success state animation (optional checkmark)
- Transition duration: 300ms

**No excessive decorative animations** - keep focused on functional micro-interactions that enhance usability.