# v1.0_bling
First native react mobile app dev

Barak AI Property Finder: Feature Specification Document (FSD) - Version 9.4
Date: 5, April 2025
Version: 9.4
Status: Final for V1 Development Start
Project Type: Native Mobile Application (iOS & Android)
Technology Stack: React Native with Expo framework
NOTE: This document supersedes all previous versions. Embedded screenshots within this document serve as the primary source of visual truth for the elements they depict (e.g., Bottom Navigation Bar, Top Header Filters, Smart Tag appearance/colors, Side Panel layout, Modals, Initial Chat State), overriding any conflicting descriptions or previous visual references.

1. Core Idea, Goals & Principles
Core Idea: An AI-powered, conversational French property finder, designed as a native mobile app for iOS and Android. It aggregates criteria-specific listings from the entire French property market using real-time data collection, offering a significantly faster and more intuitive search experience.
Primary Goal: Provide a seamless way for users to find, evaluate, share, and manage properties for rent or purchase in France via a native app experience.
Key Principles:
Native mobile design optimized for a conversational interface.
Unified chat feed as the central interaction paradigm.
AI-driven natural language search with guided refinement (using Gemini Flash LLM primarily for V1).
Embedded viral mechanisms (sharing, collaboration) at natural touchpoints.
Data protection with reference-only property storage.
Progressive feature disclosure based on engagement.
Use mock data during development (earmarked for removal).
Testing infrastructure to be robust but removable for production.
2. Global UI Principles & Interactions
Animations: All UI transitions (tag reordering, modal presentation/dismissal, card movements, screen transitions, etc.) must utilize smooth, high-quality, and purposeful animations, leveraging native capabilities via libraries like react-native-reanimated. Employ standard best-practice values for duration, easing, and physics as a baseline, with specific tuning where noted (e.g., Card Stack Lock resistance).
Dismissal Gestures: Modals and side panels (drawers) are dismissed exclusively via swipe gestures (swipe down for modals, swipe horizontally for side panels) using tools like react-native-gesture-handler. No 'X' close buttons are to be used on these elements. Swipes should incorporate appropriate elastic resistance to prevent accidental dismissal and provide satisfying tactile feedback.
Haptic Feedback: Use native haptic feedback APIs strategically to enhance key interactions (e.g., card lock/unlock, successful swipes, critical confirmations), following platform best practices (iOS/Android).




3. Core Experience
3.1 Chat Interface & AI Search (Unified Feed) (Referencing embedded Chat Feed screenshots)
Central Paradigm: The app opens into a single, chronological feed containing all interactions: User messages, AI messages, Smart Tags, Inline Property Card Stacks, System Notifications, and Collaboration updates. Implemented using a performant list component (e.g., FlashList or optimized FlatList).
Conversational UI: Users interact primarily via natural language text input.
Multi-language Support: System detects user language (FR/EN/ES/DE primarily). AI and UI adapt dynamically based on the language the user is currently typing in, allowing mid-conversation switching. Generated tags, AI messages and system messages should reflect the current interaction language.
AI Parsing & Context: AI (Gemini Flash for V1) parses user input to extract criteria, understands context across multiple messages, and maintains state (managed via application state, e.g., Zustand, Redux Toolkit, or React Context API).
Guided Refinement: AI prompts user for missing required criteria (see Tag System).
Search History: All searches, criteria (tags), and resulting card stacks persist chronologically within the chat feed.
Input Bar (Fixed Bottom): (Referencing embedded Input Bar screenshot)
Style based on embedded screenshot: Rounded text field (TextInput), placeholder "Message Barak...".
No microphone icon. Text input only via keyboard.
Separate Send button (TouchableOpacity or similar with black circle, up arrow icon) positioned to the right.



Error Recovery: Implement mechanisms for handling API errors or critical failures gracefully (e.g., contextual messages in chat, retry options). Define distinct user messages (FR/EN) for key scenarios (Network Error, API Server Error, No Results Found, Invalid Input, Location Denied).

 3.1.A Initial Chat State & Suggestion Bubbles (Referencing embedded Initial Chat screenshot)


Appearance: When the chat feed is empty or awaiting new user input (no active search results displayed), display initial Suggestion Bubbles above the input bar.
Visual Style: Based on embedded screenshot. Render as outlined pills (white background, grey text/border). Style using React Native View and Text components.
Content: Offer common search starters (e.g., "Acheter maison avec jardin", "Louer appartement 3 pièces près des écoles [autour de moi]", "Bonnes affaires autour de moi"). Content must be geographically relevant if location is known.
Interaction: Tapping a suggestion bubble (TouchableOpacity) immediately triggers a search based on its criteria, populating the relevant Smart Tags and initiating the results flow. Cannot be closed with an 'x'.
3.1.B Location Permission & Relevance


Permission Trigger: Prompt the user for OS-level location permission via the standard native system dialog (using libraries like expo-location). Trigger this:
Upon the first instance the user attempts to use location-based criteria (e.g., tapping/typing "autour de moi").
(Recommended): Proactively prompt shortly after signup or first launch with clear value proposition ("Can Barak use your location to find properties nearby?").
Handling Denial: If permission is denied, the app must gracefully handle location-based searches by prompting the user to manually enter a location. "Autour de moi" functionality will be disabled. Display clear feedback to the user.
Geo-Relevance: All AI suggestions (initial bubbles, refinement prompts, etc.) and potentially default search behavior MUST be relevant to the user's currently known or allowed location.



3.1.C Slide-in Side Menu (History Navigator) (Referencing embedded Side Panel screenshot)
Activation: Triggered by tapping the Hamburger Menu icon (three horizontal lines, top-left). Implemented using a navigation drawer solution (e.g., from react-navigation/drawer).
Appearance & Animation:
Slides in from the left edge.
Width: Occupies 90% of the viewport width.
Animation: Smooth native drawer animation, potentially customized with react-native-reanimated.
Background: White with very subtle drop shadow.
Dismissal: Swipe right on the menu or tap the background overlay. No 'X' button.
Visual Content: Based on embedded screenshot. Includes:
Header Section (Logged Out: Prominent "Premium Gratuit / S'inscrire par téléphone" CTA; Logged In: User info placeholder/name, link to "Mes Biens").
Recent Searches Section: Vertical list of recent searches (compact card with image placeholder/first image, criteria summary, timestamp). Tap closes drawer & scrolls chat feed to corresponding stack. Max 10 shown initially, "Voir tout" button links to full history view (Post-V1).
Account Settings Link (Text: "Account settings"): Navigates to Profile screen.
App Version (Subtle text at bottom).
Accessibility: Ensure proper accessibility labels, roles, and focus management for native elements.




3.2 Tag System (Smart Tags) (Referencing embedded Tag screenshots)
Function: Dynamically generated visual representations of user search criteria, appearing in the scrollable area directly above the chat input bar. Implemented using View, Text, expo-linear-gradient, and TouchableOpacity components.
Visual Appearance:
Shape: Pill-shaped (borderRadius).
Layout: Appear sequentially in the first row. Wrap to subsequent rows as needed (flexWrap: 'wrap'). Compact spacing (marginRight, marginBottom).
Content: Display criterion text (e.g., "Acheter", "Paris, 12th", "3 Pieces", "€800k max.", "Balcon"). Use appropriate French terms (e.g., "Classe énergie").
Remove Icon: Small 'x' icon (TouchableOpacity) within each tag allows removal.
Color, Order & Gradient Logic (Positional Gradient):
A. Initial Entry: When a criterion is first recognized, its tag appears immediately. Initial visual order matches recognition order. Initial color may be neutral or type-based temporarily.
B. AI Intervention: If the 5 required criteria (Action, Location, Budget, Rooms, Type) are missing, AI prompts for the most critical ones (1-2 questions max).
C. Reordering Animation: Once all 5 required criteria are present, the tags animate smoothly and quickly into the fixed mandatory visual sequence: 1. Action (Buy/Rent), 2. Location, 3. Budget, 4. Rooms, 5. Property Type, 6+ Then any other secondary/feature tags.
D. Apply Positional Gradient: After tags settle into the fixed order, the visual color gradient (Green -> Teal -> Blue -> Purple -> Pink/Salmon) is applied sequentially across the visible tags based on their final position. The first tag is greenish, the second tealish, etc.
Fuzzy Matching / Misspelling Correction: The backend NLP (Gemini Flash) or a frontend layer must handle common misspellings and variations (e.g., "peces" -> "pièces", "mason" -> "maison") in both French and English to generate the correct tags. Use reliable geocoding for location names/postal codes, handling failures gracefully.



Interaction:
Tap-to-Toggle: Tap toggles active/inactive state (visual change: e.g., opacity change or switch to outlined style). Rule: Required tags (Action, Location, etc.) cannot be toggled off if they are essential for a valid search. Optional tags can be toggled.
Remove ('x'): Tap 'x' removes tag. Results adjust. Rule: If removing a required tag makes criteria incomplete, AI must automatically re-prompt for it shortly after.
Long-Press Menu:
Trigger: Long press on a tag (react-native-gesture-handler).
Appearance: Contextual popup menu appears above the tag (simple grey vertical stack per embedded screenshot). Implement using modal/overlay techniques.
Content: Displays up to 4 AI-predicted, contextually relevant alternative suggestions (geographically adjacent locations, logical budget steps, related features/types).
Action: Tapping a suggestion replaces the original tag with the selected one. Tapping outside dismisses.
AI Logic: Backend (Gemini Flash/Pro) generates predictions based on tag type and user context.








3.3 Property Card Stack (Referencing embedded Card Stack screenshots)
Appearance: Inline within the chat feed. Implemented using a custom component leveraging react-native-reanimated and react-native-gesture-handler for swipe animations.
Cards:
Square aspect ratio.
Content: Property image (handle broken URLs with placeholder), price, location, key details, certification badge (top-left), right-aligned vertical action buttons (Info, Call, Share, Web).
Instruction Card: (SVG Asset ID: 55d1ec0e-3618-4275-8591-2d1e2085acba) Shown at the start of every search while results load. (See embedded Instruction Card visual).
Promo Card: (Visual based on embedded screenshot) Last card in stack for non-logged-in users.
Fan Formation: Top card fully visible (0° rotation, 1.0 scale). Underlying cards progressively scaled down (e.g., 0.95, 0.90) and rotated anti-clockwise (e.g., 1.5°, 3.0°). Max 2-3 underlying cards visually hinted.
Loading & Instruction Card Dismissal:
Instruction card displays during data fetch.
Crucially, once property data is loaded, the Instruction Card must automatically swipe off screen to the right (immediate and reliable transition), triggering the Heart Animation (SVG Asset ID: dda6975b-4cbd-4ee4-b6a0-fdb4e40877ed) immediately. This action reveals the first property card.
Swipe Mechanics:
Left swipe: Reject. Triggers Broken Heart Animation (SVG Asset ID: f43dadd4-28a0-497b-978e-95211e258a71).
Right swipe: Save/Like. Triggers Heart Animation.
Animations use specified SVGs and follow Tinder/Instagram pattern (e.g., scale out from center).
Natural arc motion, spring resistance during drag, velocity determines completion.
Auto-Scroll & Lock Mechanism & Haptics:
When the stack first appears (after instruction card dismisses) or is navigated to, it automatically scrolls to the top portion of the viewport (with consistent top/left/right padding) and locks:
Main chat feed scroll is temporarily disabled.
Stack visually scales up slightly to 102% (pop effect).
Subtle haptic feedback triggers (on lock).
Unlock: Requires a firm vertical drag gesture on the feed (overcoming noticeable elastic resistance).
Unlock Feedback: Upon successful unlock drag, stack animates back to 100% scale, feed scrolling re-enables, and a more pronounced haptic feedback triggers.
Animation on Swipe: When top card is swiped off, the next card animates smoothly to the top position (0°/1.0 scale). Underlying cards perform a quick, sequential, staggered animation to re-establish the fan effect (e.g., card 3 moves to 1.5°/0.95, card 4 moves to 3.0°/0.90).
Scroll Reset: Any subsequent scroll action (up/down) while the stack is visible resets the cards to their initial fanned state (top card showing) via a quick animation.
Persistence & Data Freshness: Card stacks remain chronologically in the chat feed. Implement background checks upon app open/stack interaction to remove/mark properties that are no longer available based on latest aggregated data.






3.4 Action Buttons & Modals (Referencing embedded Modal screenshots)
Card Buttons: Info, Call, Share, Web Listing Link. Vertically stacked right on property cards.
Modal Strategy:
System Permissions (Location etc.): Use standard OS dialogs.
App Features (Info, Web View, Share, Invites): Use custom swipe-dismissible modals (implemented using react-native-modal or similar). Height determined by content (Half / 75% / 90%). NO 'X' buttons.
Specific Modals:
Info: Triggered by Info button. Presents a 75%/90% height swipeable modal as a preview of key details. V1 Content TBD (structure placeholder). Must contain a button/link (e.g., "View Full Details") to navigate to the full Property Detail Screen (see Section 6).
Call: Trigger native dialer intent with property's contact phone number.
Share: Triggered by Share button. Half-height swipeable modal (visual based on embedded screenshot) showing Messenger, WhatsApp, SMS options. Tap triggers native share intent/sheet. Sharing via SMS includes a deep link.
SMS Deep Linking: Deep link directs to App Store/Play Store if app not installed (passing context if possible). If app installed, opens app directly to shared content (property detail) respecting Circle permissions.
Web Listing Link: Triggered by Web button. 90% height swipeable modal containing a WebView component displaying the source property listing URL. Include basic nav controls (Back, Forward, Refresh) within the modal header. Close via swipe only. Respect safe areas.
First/Second Circle Invites: Triggered by specific prompts (see Section 7). Use 75%/90% swipeable modals to include explanatory text/marketing about the benefits of sharing.




4. User Management
Phone Verification (Primary User):
The only signup method for the initial user.
20-second signup flow via OTP.
Use native SMS handling capabilities (e.g., expo-sms or OS APIs).
Development: Allow bypass/mock OTP. Production: Use secure service (e.g., Firebase Auth, Twilio).
User Profiles:
Guest mode (limited functionality). Logged-in state upon phone verification.
Store preferences/session via AsyncStorage or secure storage (expo-secure-store).
Primary user profile identified by phone number; no initial profile picture (use placeholder avatar).
Circle Member Signup: Invited users can join via SSO (Google, Facebook, Apple - using expo-auth-session or Firebase Auth providers) OR phone verification. SSO allows profile pictures.
5. Navigation System (React Navigation)
Bottom Navigation Bar: (Referencing embedded Nav Bar screenshot)
Implementation: Use @react-navigation/bottom-tabs.
Visual: Based exactly on embedded screenshot.
Icons/Labels: Plus, Wishlist, [Central Button], Mes Biens, Profil. Use provided SVG assets (rendered via react-native-svg).
Central Button Style: Animated "psychedelic orb" (blues/greens, foggy/soupy, Siri-like) using react-native-reanimated / gradients. Fallback: Pulsing orange. Inactive: Greyed/static gradient.
Active State (Outer Icons): Dark grey/charbon color.
Fixed position, respects safe areas.
Default Tab: Chat (Central Button).
Top Header Filters (Chat Screen): (Referencing embedded Chat Header screenshot)
Implementation: Row of toggle buttons within the Chat screen's header component.
Labels: "Recherches", "Messages", "Notifications".
Function: Visibility toggles for chat feed items (Card Stacks, User/AI/Partner Messages, System Notifications/New Match Alerts). Managed via state controlling list filtering.
Style: Active/ON = Solid dark grey bg/white text. Inactive/OFF = White bg/grey text/grey border outline.
Stack Navigation: Use @react-navigation/native-stack for navigating between screens pushed from tabs (e.g., Profile settings, property details within Mes Biens).
6. Property Management Screens & Tabs
Mes Biens Tab:
Top Tab Navigator (@react-navigation/material-top-tabs or similar) with:
"Aimés" (Liked): (Default Tab) Properties swiped right.
"Passés" (Skipped): Properties swiped left.
"Nouveautés" (New For You): (Requires significant backend - See Note) Properties matching saved searches, not yet seen by user.
Each tab displays a vertical list (FlashList/FlatList) of properties.
List items use compact style similar to Recent Searches (thumbnail, criteria summary).
Navigation (Path A): Tapping a property in the list navigates directly to the full Property Detail Screen within the "Mes Biens" stack.
Note on "Nouveautés": Implementation requires backend support for saved searches, background matching, delta calculation, and potentially push notifications. Scope carefully for V1 vs. V1.5.
Property Detail Screen (Full Screen View): (Referencing embedded Property Detail screenshot)
Accessed via Path A (Mes Biens list) or Path B (Info Modal -> "View Full Details" button).
Full screen (not modal). Navigation via stack header (Back button).
Content Sections: Header (Title/Address), Image Gallery/Carousel, Price/Size/Rooms Overlay, Key Feature Tags (Balcony, etc.), Certification Score, Agent Info, Market Intelligence (Price History, Area Avg - data permitting), Action Buttons (Contact Agent, Follow), Tabbed Section (Details, Map, Photos, Floor Plan), Similar Properties, Collaboration Section (if applicable).
Wishlist Tab (V1 Scope: Saved Searches):
Purpose: View, manage, and edit saved search criteria sets.
UI: List of saved searches (e.g., User-defined name like "Dream Paris Apt", criteria summary).
Actions: Tap to re-run search in chat feed, Edit criteria, Delete saved search.
Découvrir (Explorer) Tab: V1 Placeholder screen.
Notifs Tab: V1 Placeholder screen. (Actual notifications appear in Chat Feed under filter).
Profil (Réglages) Tab:
Content: User Info (Avatar placeholder, Name input, Verified Phone), Account Management (Logout, Delete Account), Collaboration Management (View/Invite Circles), Support (Help/FAQ Link, Contact), Legal (Privacy Policy, ToS), App Version.
(Future: Notification Settings).
*   **Note on "Nouveautés":** Implementation requires backend support for saved searches, background matching (leveraging the Data Aggregation Strategy, e.g., via Firecrawl), delta calculation, and potentially push notifications. Scope carefully for V1 vs. V1.5 due to backend complexity in both data processing and the aggregation pipeline.
7. Social & Collaborative Features
"Cercle de Décision" (Sharing Tiers):
First Circle (Partner/Co-Buyers):
Max 4 users.
Real-time sync of key actions (likes, seen status) between members via backend/WebSockets.
Invite Trigger: System prompts user (via 75%/90% height swipeable modal) after their 3rd cumulative liked property. Prompt can also appear in Plus/Mes Biens, Profil.
Second Circle (Entourage/Advisors):
View-only access to specifically shared properties/searches initiated by a First Circle member.
Can add comments and emoji reactions to shared items.
Requires user signup (Google/FB/Apple SSO or Phone verification). Profile pics shown on shared items UI.
Invite Trigger: System prompts user (via 75%/90% height swipeable modal) after their 7th cumulative liked property. Prompt can also appear in Plus/Mes Biens, Profil.
Future (V2+): Location Intelligence ("Expertise Locale"), Growth Mechanisms ("Moments Immobiliers", Ambassador Program).
8. Widget Dashboard (Plus Tab)
V1: Placeholder screen initially. Can be populated with basic widgets if time permits.
V1 Potential Widgets: (Layout: Mix of 2-column squares / 1-column rectangles)
Growth: "Invite Your Partner" CTA, "Share with Family & Friends" CTA.
Discovery: "Popular Searches Near You".
Shortcuts: "Saved Searches", "Liked Properties", "Settings".
V2+: Full widget set as previously discussed (Good Buys, Neighborhood Info, etc.).
9. Technical Implementation (React Native / Expo)
State Management: Choose appropriate library (Zustand recommended for simplicity, Redux Toolkit for complex state).
API Integration: Use fetch or libraries like axios or RTK Query. Implement robust loading/error states. Fallback to mock data if API_URL env var is not set. Use API client wrapper for auth tokens.
Navigation: Use react-navigation suite.
Animations: Use react-native-reanimated.
Gestures: Use react-native-gesture-handler.
Storage: Use expo-secure-store for tokens, AsyncStorage for non-sensitive data.
Performance: Prioritize list rendering (FlashList), image loading (expo-image), minimizing re-renders.
Offline Capabilities: Basic caching for liked properties/user profile. Full offline mode not in V1 scope.
AI Integration: Use Gemini Flash via backend API for NLP, suggestions, basic conversation.
Background Updates/Notifications: (Requires significant backend) Specify need for push notifications (Expo Notifications) and backend infrastructure for "Nouveautés" feature (if pursued in V1/V1.5).
Accessibility (A11y): Adhere to platform best practices for semantic properties, focus order, touch targets, screen reader compatibility for all components. Note A11y testing as an ongoing requirement.

Data Aggregation Strategy (V1)

*   **Requirement:** The application requires near real-time access to property listings aggregated from multiple major French real estate portals (e.g., SeLoger, Logic-Immo, LeBonCoin). Data freshness is important, including the removal/flagging of de-listed properties (See Section 3.3).
*   **V1 Approach:** For V1, leverage a third-party web scraping service optimized for dynamic content and handling anti-scraping measures.
*   **Recommended Tool:** **Firecrawl.dev** is the recommended service based on initial assessment ([See Firecrawl Assessment Report - Link/Reference if available]). Its capabilities for handling dynamic sites, structured data extraction, proxy management, and scalable pricing align well with V1 needs.
*   **Implementation:**
    *   The backend system will utilize the Firecrawl API (or chosen alternative) to perform targeted scraping requests based on user search criteria or background refresh needs.
    *   Focus on extracting key structured data points (Price, Location, Rooms, Type, Features, Images, Source URL, Agent Contact) potentially using Firecrawl's extraction schemas.
    *   Implement appropriate error handling and retry logic for scraping requests.
    *   Basic caching strategies should be employed on the backend to minimize redundant scrapes for common searches within a short timeframe.
*   **Proof of Concept:** Prior to full implementation, a PoC should validate Firecrawl's effectiveness and latency specifically against the primary target French portals.
*   **Alternative:** If Firecrawl proves unsuitable during PoC, alternatives like Oxylabs, Bright Data, or targeted in-house scraping (using libraries like Puppeteer/Playwright on the backend) would need to be evaluated, noting the increased development/maintenance overhead of the latter.
*   **Note:** The robustness of this aggregation pipeline is critical. V1 focuses on basic functionality; advanced anti-blocking, large-scale parallelization, and auto-adapting scrapers are post-V1 considerations.

---




10. Asset Usage
10. Asset Usage (Revised)
Source of Truth:
Functional Usage & Context: This FSD (V9.1) defines which assets are used (e.g., Heart Animation on Like), where they appear, and their functional purpose. Embedded screenshots provide visual context.
Precise Visual Definition: The separate document /docs/ASSETS_REFERENCE.md contains code snippets (derived from Figma -> Builder.io export) defining the exact visual implementation for key branded assets, custom icons, gradients, and potentially specific critical styling values. This includes raw SVG code, gradient parameters, hex codes, font details, etc.
Key Asset IDs/URLs (Examples - Refer to ASSETS_REFERENCE.md for full code/definitions):
Instruction Card SVG: 55d1ec0e-3618-4275-8591-2d1e2085acba.svg (Use SVG code from ASSETS_REFERENCE.md). Used during load.
Heart Animation SVG: dda6975b-4cbd-4ee4-b6a0-fdb4e40877ed.svg (Use SVG code from ASSETS_REFERENCE.md). Used for like swipe / instruction card auto-dismiss.
Broken Heart SVG: f43dadd4-28a0-497b-978e-95211e258a71.svg (Use SVG code from ASSETS_REFERENCE.md). Used for reject swipe.
Bottom Nav Icons (Plus, Wishlist, Central Orb, Mes Biens, Profil): Source SVG code directly from ASSETS_REFERENCE.md.
AI Avatar Icon (Chat Feed): Source SVG code from ASSETS_REFERENCE.md.
User Avatar Placeholder Icon (Chat Feed): Source SVG code from ASSETS_REFERENCE.md.
Smart Tag Gradients: Use linear-gradient definitions from ASSETS_REFERENCE.md for each positional step (Green->Teal, Teal->Blue, etc.).
Implementation:
SVGs must be rendered using react-native-svg. AI tools (Cursor) should be prompted to convert SVG code from ASSETS_REFERENCE.md into functional React Native components.
Gradients must be implemented using expo-linear-gradient, translating parameters from ASSETS_REFERENCE.md.
Other UI Icons (e.g., standard icons like arrows, menu): Can use a reputable icon library (like react-native-vector-icons or Expo's icons) OR use custom SVG definitions from ASSETS_REFERENCE.md if specified for branding consistency.




11. API Integration & Architecture
11.1 API Design: RESTful, JWT Auth, Rate Limiting (Backend), Versioning (/api/v1/).
11.2 Core Endpoints (Examples): Search, Verify Phone/OTP, User Profile (GET/PUT), Property Like/Reject/Get Liked, Circle Invite/Members/Share Property, Analytics Events.
11.3 Error Handling: Standard JSON error format, categorized codes, client retry logic.
12. Testing Strategy
12.1 Test Types: Unit (Jest, >80% goal), Component (RNTL), Integration (Detox - Phased), Performance (Phased), Visual Regression (Phased).
12.2 Continuous Testing: Pre-commit hooks, CI/CD integration (EAS Build), Manual QA essential.
12.3 Test Data Management: Mock data, Test environment (backend), API Mocking (MSW/Mirage).
12.4 Error Tracking & Reporting: Crash Reporting (Sentry/Crashlytics - Essential), Test Reports via CI/CD.
13. Performance Optimization
13.1 Performance Targets (Goals): Sub-2s warm launch, <3.5s TTI, 60fps, <1s API render, <150-200MB RAM.
13.2 Optimization Strategies: Image opt (expo-image), List virtualization (FlashList), Network caching (RTK Query/React Query), RN Opts (memo, useCallback, profiling).
13.3 Performance Monitoring: Basic post-launch monitoring (Firebase Perf/Sentry), regular profiling.
14. Environment Configuration
14.1 Environment Types: Development, Staging, Production.
14.2 Configuration Management: Env Vars (Expo constants/EAS Secrets), Feature Flags (Post-V1 consideration). No secrets in Git.
14.3 Build Configuration: EAS Build profiles, secure credential management.
15. Analytics & Business Intelligence
15.1 Event Tracking Infrastructure (Mobile App): Integrate SDK (Segment/Firebase/etc.), standardized schema, offline batching.
15.2 Core Analytics Events (Mobile App): Track User, Search, Property Interaction, Collaboration, Error events as listed previously.
15.3 Admin Dashboard Components (Separate Project Scope): V1 Mobile app sends data; dashboard build is separate.
16. Deployment & Release Management
16.1 CI/CD Pipeline: EAS Build/Submit recommended, integrated tests, code quality checks.
16.2 Release Process: Semantic Versioning, EAS Preview builds for QA, Staged Rollouts (App/Play Store).
16.3 App Store Submission: Prepare metadata/assets, configure store listings.
16.4 Post-Release Monitoring: Crash reports, user feedback, analytics monitoring, hotfix process.
17. Development Practices & Guidelines (Revised)
17.1 Code Organization: Feature-based folders, focused components, TypeScript, Style guide (Prettier/ESLint).
17.2 Development Workflow: Git Flow/GitHub Flow, Mandatory Code Reviews, Documentation (JSDoc/TSDoc, README, CHANGELOG).
17.3 Testing Practices: Test alongside features, cover happy/error paths, mock dependencies.
17.4 Local Development Environment: Consistent Node version (.nvmrc), clear setup docs, .gitignore for env specifics.
17.5 Utilizing Asset Reference Document: Visual designs originated in Figma and were processed via Builder.io. While this FSD V9.1 (with embedded screenshots and descriptions) serves as the primary specification for functionality and overall layout, the separate /docs/ASSETS_REFERENCE.md document (containing relevant code snippets from Builder.io export) serves as the authoritative technical reference for the precise visual definition of key branded assets (SVGs like logos, icons), custom gradients (like Smart Tags), and specific critical styling values (exact colors, fonts, dimensions).
Development must reference ASSETS_REFERENCE.md when implementing these specific visual elements.
AI tools (Cursor) should be prompted to use the code snippets from ASSETS_REFERENCE.md to generate the corresponding React Native code (e.g., react-native-svg components from SVG code, expo-linear-gradient props from gradient definitions, specific StyleSheet values).
Direct conversion of the overall Builder.io structure to HTML/CSS or intermediate formats is not the intended workflow for this native React Native project. Focus on translating specific asset definitions and styling values into native components and styles.


