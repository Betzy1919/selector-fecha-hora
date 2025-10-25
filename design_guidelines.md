# Design Guidelines: Telegram Alert Date/Time Picker

## Design Approach

**Selected Approach**: Design System - Material Design with Telegram-inspired simplicity
**Justification**: This is a utility-focused tool for efficient date/time selection in a reporting context. The interface prioritizes usability, clarity, and mobile-friendliness since it will integrate with a Telegram bot where users are primarily on mobile devices.

**Key Design Principles**:
- Mobile-first approach with touch-friendly controls
- Clean, uncluttered interface focusing on the core task
- Immediate visual feedback for all interactions
- Single-purpose page design - no distractions
- Telegram's signature clean aesthetic with modern Material Design patterns

---

## Core Design Elements

### A. Typography

**Primary Font**: Inter (Google Fonts)
- Headers (H1): 32px (text-3xl), font-weight 700, tight line-height
- Subheaders (H2): 24px (text-2xl), font-weight 600
- Body Text: 16px (text-base), font-weight 400
- Labels: 14px (text-sm), font-weight 500
- Helper Text: 13px (text-xs), font-weight 400

**Hierarchy Application**:
- Page title uses H1 with clear purpose statement
- Section labels use font-weight 500 for subtle emphasis
- Selected values displayed in larger text (text-lg) for quick scanning
- All text maintains excellent readability with 1.5 line-height for body content

### B. Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, and 8
- Component spacing: p-4, p-6
- Section gaps: gap-4, gap-6
- Margins between major sections: mb-6, mb-8
- Container padding: px-4 for mobile, px-6 for desktop

**Layout Structure**:
- Single-column centered layout with max-w-md (448px) container
- Full viewport height on mobile with centered vertical alignment
- Generous padding (p-6) around main card/container
- Card-based design with rounded-xl (12px border-radius)
- Touch-friendly minimum tap targets of 44x44px

### C. Component Library

#### 1. Core UI Elements

**Primary Card Container**:
- Elevated card design with subtle shadow
- Rounded corners (rounded-xl)
- White background with clean padding (p-6 md:p-8)
- Subtle border for definition

**Date Picker Component**:
- Custom calendar grid layout (7-column for days)
- Large, touch-friendly date cells (min 44px height)
- Current date highlighted with subtle outline
- Selected date with filled background state
- Clear month/year navigation with arrow buttons
- Week day headers in muted text

**Time Picker Component**:
- Dual column layout for hours and minutes
- Scroll-based selection with smooth transitions
- Large, readable numbers (text-xl)
- Selected time highlighted with background fill
- AM/PM toggle buttons with clear active state

**Summary Display**:
- Prominent card showing selected date and time
- Icon + text combination for visual clarity
- Formatted date display (e.g., "Lunes, 15 de Enero 2024")
- Clear time display with AM/PM indicator
- Positioned at top for immediate confirmation

#### 2. Forms & Inputs

**Action Buttons**:
- Primary button: Full-width on mobile, auto-width on desktop
- Height of h-12 for easy tapping
- Rounded corners (rounded-lg)
- Clear loading states with spinner when applicable
- Text in font-weight 600

**Secondary Actions**:
- "Limpiar" or reset button with ghost/outline style
- Positioned below primary action
- Smaller visual weight but same tap target size

#### 3. Navigation

**Header**:
- Minimal fixed header with app title
- Back button for potential navigation (future Telegram integration)
- Height of h-16
- Subtle bottom border for separation

#### 4. Feedback Elements

**Validation Messages**:
- Inline error messages below inputs
- Success confirmation after selection
- Toast notifications for actions (subtle, bottom-positioned)
- Clear iconography for different message types

**Loading States**:
- Skeleton screens for initial load
- Spinner for async actions
- Disabled state styling for buttons during processing

---

## Images

**No hero images required** for this utility application. The interface is purely functional.

**Icons**: Use Material Icons via CDN
- Calendar icon for date section
- Clock icon for time section  
- Check icon for confirmation states
- Alert/warning icons for validation messages
- Navigation arrows for month selection

---

## Animations

**Minimal, purposeful animations**:
- Smooth transitions on date/time selection (duration-200)
- Subtle scale effect on button press (scale-95)
- Fade-in for success messages (duration-300)
- Smooth scroll for time picker wheels
- No decorative or background animations - keep performance optimal for mobile

---

## Accessibility & Best Practices

- WCAG AA compliant color contrasts throughout
- Keyboard navigation support for all interactive elements
- Clear focus states with visible outlines
- ARIA labels for screen readers
- Touch target minimum of 44x44px
- Proper form labeling and error associations
- Support for system font scaling
- High-contrast mode compatibility

---

## Responsive Behavior

**Mobile (< 768px)**:
- Full-width layout with px-4 padding
- Stacked date and time pickers
- Full-width buttons
- Bottom-fixed action buttons for easy thumb access

**Desktop (≥ 768px)**:
- Centered card with max-w-md
- Side-by-side date and time pickers where space permits
- Hover states for interactive elements
- Larger padding (px-6, py-8)