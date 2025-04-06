# Visual Assets Reference

This document provides the technical definitions for key visual assets used in the Barak AI Property Finder application. It is the authoritative source for SVG code, gradient parameters, and specific styling values.

## 1. SVG Icons and Graphics

This section contains the raw SVG code for all icons and vector graphics used in the app. Each asset should be clearly labeled with its intended use and corresponding ID from the design specifications (e.g., Figma/Builder.io).

### 1.1 Bottom Navigation Bar Icons

#### 1.1.1 Plus Icon

```xml
<!-- SVG code for the Plus icon from Builder.io export -->
[Paste the relevant SVG code here, e.g., from the "Bottom Navigation Bar" section of Figma - Builder.io Code]
Asset ID (Builder.io): [Note the relevant ID if available] Intended Use: Bottom navigation bar - "Plus" tab.
1.1.2 Wishlist Icon
<!-- SVG code for the Wishlist icon from Builder.io export -->
[Paste the relevant SVG code here, e.g., from the "Bottom Navigation Bar" section of Figma - Builder.io Code]
Asset ID (Builder.io): [Note the relevant ID if available] Intended Use: Bottom navigation bar - "Wishlist" tab.
1.1.3 Central Orb Icon
<!-- SVG code for the Central Orb icon from Builder.io export -->
[Paste the relevant SVG code here, e.g., from the "Bottom Navigation Bar" section of Figma - Builder.io Code]
Asset ID (Builder.io): [Note the relevant ID if available] Intended Use: Bottom navigation bar - Central "Chat" tab.
1.1.4 Mes Biens Icon
<!-- SVG code for the Mes Biens icon from Builder.io export -->
[Paste the relevant SVG code here, e.g., from the "Bottom Navigation Bar" section of Figma - Builder.io Code]
Asset ID (Builder.io): [Note the relevant ID if available] Intended Use: Bottom navigation bar - "Mes Biens" tab.
1.1.5 Profil Icon
<!-- SVG code for the Profil icon from Builder.io export -->
[Paste the relevant SVG code here, e.g., from the "Bottom Navigation Bar" section of Figma - Builder.io Code]
Asset ID (Builder.io): [Note the relevant ID if available] Intended Use: Bottom navigation bar - "Profil" tab.
(Continue this pattern for all other SVG icons mentioned in the FSD or visible in the Builder.io exports, such as the AI Avatar, User Avatar Placeholder, Heart Animation, Broken Heart, Remove 'x' icon for tags, etc.)
2. Gradients
This section defines the parameters for custom gradients used in the application.
2.1 Smart Tag Gradients (Positional Definitions)
2.1.1 Position 1 (Greenish)
{
  "colors": ["#B7A1FF", "#34A1FB", "#68D1F5", "#8DE4CF"],
  "locations": [0, 0.317, 0.745, 1]
}
Reference: FSD V9.4 Section 3.2 - Apply Positional Gradient (Green -> ...) Intended Use: First tag in the fixed mandatory visual sequence.
2.1.2 Position 2 (Tealish)
{
  "colors": ["...", "...", "...", "..."],
  "locations": [...]
}
Reference: FSD V9.4 Section 3.2 - Apply Positional Gradient (... -> Teal -> ...) Intended Use: Second tag in the fixed mandatory visual sequence.
(Continue this pattern for all gradient positions in the Smart Tag system (Green -> Teal -> Blue -> Purple -> Pink/Salmon), extracting the color stop information from the relevant parts of the Builder.io JSON exports where gradients are defined.)
2.2 Key Button Gradients (e.g., Sign Up Button)
{
  "colors": ["#81DFDB", "#1F95FD", "#AD74E9"],
  "locations": [0, 0.36, 1],
  "angle": 114 // Or other relevant properties
}
Reference: [Identify the UI element in the FSD or Builder.io export] Intended Use: [Describe the button or UI element]
(Include definitions for any other custom gradients used in the app, referencing their origin in the design specifications.)
3. Specific Styling Values
This section lists specific styling values that need to be consistently applied across the application.
3.1 Colors
Primary Text Color: #222 Secondary Text Color: #ACACAC Border Color: #EBEBEB (List all other specific color codes mentioned in the design or Builder.io exports)
3.2 Fonts
Primary Font Family: SF Pro, -apple-system, Roboto, Helvetica, sans-serif Bold Font Weight: 700 Regular Font Weight: 400 (List any other specific font families or weights)
3.3 Dimensions (if critical and not layout-dependent)
(Include any specific, non-layout related dimensions that need to be referenced, if any.)
Guidance on Populating from Builder.io Exports:
•
SVG Code: Look for <svg> elements within the options.code property of the Custom Code components in the Builder.io JSON. Copy the entire <svg> block.
•
Gradients: Search for properties like background: linear-gradient(...) or look for LinearGradient definitions within the paint sections of the <defs> element in the SVG code from Builder.io. Extract the color stops and their positions. You might need to parse the CSS-like gradient strings into a JSON format with colors and locations arrays suitable for expo-linear-gradient.
•
Colors, Fonts, Dimensions: Examine the responsiveStyles.large (and other breakpoints if necessary) of various components in the Builder.io JSON for properties like color, fontFamily, fontWeight, fontSize, borderRadius, borderColor, etc.
