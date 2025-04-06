# **Barak AI Property Finder: Feature Specification Document (FSD) - Version 9**

# **Barak AI Property Finder: Feature Specification Document (FSD) - Version 9**

**Date:** 02.04.2025

**Version:** 9.3

**Status:** Final for V1 Development

**Project Type:** Native Mobile Application (iOS & Android)

**Technology Stack:** React Native with Expo framework

**NOTE:** This document supersedes all previous versions. Embedded screenshots within this document serve as the primary source of visual truth for overall screen layout, component placement, and user flow context. For precise visual implementation of key branded assets (logos, icons, gradients) and specific styling values (colors, fonts, dimensions), the /docs/ASSETS_REFERENCE.md document (containing relevant code snippets generated via Figma -> Builder.io export) serves as the authoritative technical reference. Where conflicts arise, prioritize the visual intent conveyed by screenshots, using ASSETS_REFERENCE.md to achieve that intent accurately.

*   **Modal Strategy:**
    *   **System Permissions (Location etc.):** Use standard OS dialogs.
    *   **App Features (Info, Web View, Share, Invites):** Use custom swipe-dismissible modals (implemented using `react-native-modal` or similar). Height determined by content (Half / 75% / 90%). NO 'X' buttons.
    *   **Specific Modals:**
        *   **Info:** Triggered by Info button. Presents a **75%/90% height swipeable modal** as a *preview* of key details. V1 Content TBD (structure placeholder). Must contain a button/link (e.g., "View Full Details") to navigate to the full Property Detail Screen (see Section 6).

*   **Navigation (Path A):** Tapping a property in the list navigates *directly* to the full Property Detail Screen within the "Mes Biens" stack.
*   **Note on "Nouveautés":** Implementation requires backend support for saved searches, background matching, delta calculation, and potentially push notifications. Scope carefully for V1 vs. V1.5. Backend complexity is high.
*   **Property Detail Screen (Full Screen View):** *(Referencing embedded Property Detail screenshot)*
    *   Accessed via Path A (Mes Biens list) or Path B (Info Modal -> "View Full Details" button).

*   **Performance:** Prioritize list rendering (`FlashList`), image loading (`expo-image`), minimizing re-renders.
*   **Offline Capabilities:** Basic caching for liked properties/user profile. Full offline mode not in V1 scope.
*   **AI Integration:** Use **Gemini Flash** via backend API for NLP, suggestions, basic conversation. Monitor latency.
*   **Background Updates/Notifications:** *(Requires significant backend)* Specify need for push notifications (Expo Notifications) triggered by backend for new matches ("Nouveautés") and potentially circle activity. Requires backend support for Saved Searches, periodic matching, delta calculation, and integration with APNS/FCM.

*   **Precise Visual Definition:** The separate document /docs/ASSETS_REFERENCE.md contains code snippets (derived from Figma -> Builder.io export) defining the **exact visual implementation** for key branded assets, custom icons, gradients, and potentially specific critical styling values. This includes raw SVG code, gradient parameters, hex codes, font details, etc. **This external document is the authoritative source for these specific visual definitions.**
*   **Key Assets Defined in ASSETS_REFERENCE.md (Examples):**

*   **17.4 Local Development Environment:** Consistent Node version (.nvmrc), clear setup docs, .gitignore for env specifics.
*   **17.5 Utilizing Asset Reference Document:**
    *   **Purpose:** Visual designs originated in Figma and were processed via Builder.io. While this FSD V9.1 (with embedded screenshots and descriptions) serves as the primary specification for *functionality and overall layout*, the separate /docs/ASSETS_REFERENCE.md document serves as the **authoritative technical reference for the precise visual definition** of key branded assets (SVGs like logos, icons), custom gradients (like Smart Tags), and specific critical styling values (exact colors, fonts, dimensions).
    *   **Workflow:** Development **must** reference /docs/ASSETS_REFERENCE.md when implementing these specific visual elements to ensure design fidelity.
    *   **AI Tool Usage (Cursor):** AI tools **should be prompted** to use the code snippets *from* /docs/ASSETS_REFERENCE.md to generate the corresponding React Native code. Examples:
        *   "Use the SVG code labeled 'Bottom Nav - Central Orb SVG' from /docs/ASSETS_REFERENCE.md to create a react-native-svg component."
        *   "Translate the gradient definition labeled 'Smart Tag Gradient - Position 1' from /docs/ASSETS_REFERENCE.md into props for expo-linear-gradient."
        *   "Apply the exact fontFamily, fontSize, and color specified for 'User Message Text Style' in /docs/ASSETS_REFERENCE.md to the relevant component's StyleSheet."
    *   **Avoid Intermediate Formats:** Direct conversion of the overall Builder.io *structural* JSON to HTML/CSS is **not** the intended workflow. Focus on translating specific *asset definitions* and *styling values* from the reference document directly into native components and styles.
