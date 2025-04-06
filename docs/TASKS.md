# BARAK Development Tasks

## Phase 1: Core Setup & V1 Feature Implementation

##### Environment Setup
*  [ ] TASK ID: ENV-001 | Description: Configure Cursor with Taskmaster based on Vibe Coding tutorial | Priority: High | Estimate: 2h | Status: To Do | Assignee: [Your Name]
*  [ ] TASK ID: ENV-002 | Description: Set up MCP connections (Gemini, FireCrawl, Sequential, ES Code Gen) | Priority: High | Estimate: 3h | Status: To Do | Assignee: [Your Name]
*  **[ ] TASK ID: ENV-003 | Description: Create `/docs/ASSETS_REFERENCE.md` by compiling visual asset definitions (SVG code, gradient parameters, styling values) from Figma/Builder.io exports (as provided in the `Figma - Builder.io Code` source and as specified in FSD V9.4 Section 10 and 17.5) | Priority: High | Estimate: 4h | Status: To Do | Assignee: [Assign to the relevant person/team]**

### Core UI Shell
- [ ] TASK ID: UI-001 | Description: Implement Bottom Navigation Bar (React Navigation Tabs) based on FSD V9.4 Section 5 | Priority: High | Estimate: 4h | Status: To Do | Assignee: [Your Name]
*   ... (Tasks will be added here)

###### Testing Foundation
*  [ ] TASK ID: MOBILE-TEST-001 | Description: Configure Jest for React Native/Expo project (FSD V9.4 Sec 12.1) | Priority: High | Est: 1h | Status: To Do
*  [ ] TASK ID: MOBILE-TEST-002 | Description: Configure React Native Testing Library setup (FSD V9.4 Sec 12.1) | Priority: High | Est: 1h | Status: To Do

##### Phase 1.B: Core Navigation & Authentication
*  [ ] TASK ID: UI-NAV-001 | Description: Implement Bottom Navigation Bar (React Navigation Tabs) based on FSD V9.4 Section 5 (referencing embedded Nav Bar screenshot and ASSETS_REFERENCE.md for visual details) | Priority: High | Est: 4h | Status: To Do
*  [ ] TASK ID: UI-NAV-002 | Description: Implement Top Header Filters (Chat Screen) based on FSD V9.4 Section 5 (referencing embedded Chat Header screenshot for layout and style) | Priority: High | Est: 3h | Status: To Do
*  [ ] TASK ID: UI-AUTH-001 | Description: Set up basic placeholder screens for authentication flow (Login/Signup) as outlined in FSD V9.4 Section 4 (basic structure, no actual authentication logic yet) | Priority: Medium | Est: 2h | Status: To Do
*  [ ] TASK ID: UI-SIDE-MENU-001 | Description: Implement the basic structure of the Side Panel (Drawer Navigator) based on FSD V9.4 Section 4 (placeholder content, trigger mechanism) | Priority: Medium | Est: 3h | Status: To Do

##### Phase 1.C: Chat & Search Core Loop
*  [ ] TASK ID: UI-CHAT-001 | Description: Implement the basic structure of the Chat Interface & Unified Feed using a performant list component (e.g., FlashList) as described in FSD V9.4 Section 3.1 (no actual message rendering yet) | Priority: High | Est: 4h | Status: To Do
*  [ ] TASK ID: UI-INPUT-001 | Description: Implement the fixed bottom Input Bar (TextInput and Send button) based on FSD V9.4 Section 3.1 (referencing embedded Input Bar screenshot and ASSETS_REFERENCE.md for styling) | Priority: High | Est: 2h | Status: To Do
*  [ ] TASK ID: UI-TAGS-001 | Description: Implement the basic visual structure for Smart Tags (pill shape, layout, close icon) based on FSD V9.4 Section 3.2 (referencing embedded Tag screenshots and ASSETS_REFERENCE.md for gradients) | Priority: High | Est: 4h | Status: To Do
*  [ ] TASK ID: BE-NLP-001 | Description: Set up the basic API endpoint and request/response structure for initial AI interaction with Gemini Flash (FSD V9.4 Section 62 - AI Integration) | Priority: Medium | Est: 3h | Status: To Do | Assignee: [Backend Developer Name]
*  [ ] TASK ID: BE-SCRAPE-001 | Description: Configure Firecrawl for primary "just-in-time" property data scraping, focusing on essential data points for V1 core features as defined in FSD V9.4 Section 2. | Priority: High | Estimate: 4h | Status: To Do | Assignee: [Developer Name]
*  [ ] TASK ID: BE-DB-001 | Description: Set up database schema and connection for storing scraped property data | Priority: High | Estimate: 3h | Status: To Do | Assignee: [Database Admin Name]
*  [ ] TASK ID: BE-SCRAPE-002 | Description: Implement Firecrawl scripts to collect and store initial property listings in a "just-in-time" manner, prioritizing data required for core V1 search functionality as per FSD V9.4 Sections 3.1 and 11.2. | Priority: High | Estimate: 6h | Status: To Do | Assignee: [Developer Name]
*  [ ] TASK ID: UI-TAGS-002 | Description: Implement the display of basic Smart Tags in the scrollable area above the chat input bar (hardcoded sample tags initially) based on FSD V9.4 Section 3.2 | Priority: Medium | Est: 3h | Status: To Do

##### Phase 1.D: Property Interaction & Persistence
*  [ ] TASK ID: UI-CARD-001 | Description: Implement the basic visual structure of the Property Card component (square aspect ratio, image placeholder, basic text fields for price, location) based on FSD V9.4 Section 3.3 (referencing embedded Card Stack screenshots) | Priority: High | Est: 4h | Status: To Do
*  [ ] TASK ID: UI-CARD-STACK-001 | Description: Implement the basic structure for the Inline Property Card Stack within the chat feed (single card display initially, no swipe functionality) based on FSD V9.4 Section 3.3 | Priority: High | Est: 3h | Status: To Do
*  [ ] TASK ID: UI-MESBIENS-001 | Description: Implement the basic structure for the "Mes Biens" Tab with Top Tab Navigator ("Aimés", "Passés" - placeholder lists) based on FSD V9.4 Section 6 | Priority: Medium | Est: 3h | Status: To Do
*  [ ] TASK ID: UI-WISHLIST-001 | Description: Implement the basic structure for the Wishlist Tab (List of saved searches - placeholder) based on FSD V9.4 Section 6 | Priority: Medium | Est: 2h | Status: To Do

##### Phase 1.E: Initial Growth Hooks & Analytics
*  [ ] TASK ID: ANALYTICS-001 | Description: Integrate a basic analytics SDK (e.g., Firebase Analytics) into the React Native project as outlined in FSD V9.4 Section 15.1 | Priority: Low | Est: 2h | Status: To Do
*  [ ] TASK ID: ANALYTICS-002 | Description: Implement basic analytics event tracking for initial user actions (e.g., App Open, Search Initiated - manual triggering for now) as defined in FSD V9.4 Section 15.2 | Priority: Low | Est: 3h | Status: To Do
*  [ ] TASK ID: UI-PLUS-001 | Description: Implement the basic placeholder screen for the Plus Tab as mentioned in FSD V9.4 Section 8 | Priority: Low | Est: 1h | Status: To Do
*  [ ] TASK ID: UI-PROFIL-001 | Description: Implement the basic structure for the Profil (Réglages) Tab with placeholder content (User Info, Account Management links) based on FSD V9.4 Section 6 | Priority: Medium | Est: 3h | Status: To Do

#### Phase 2: Mobile App V1 - Polish & Advanced
*  (Tasks to be added later)
#### Phase 3: Admin Dashboard V1
*  (Tasks to be added later)
*Format Key:*
*  - [ ] TASK ID: [Prefix-Category-ID] | Description: [Clear task description referencing FSD section if applicable] | Priority: [High/Medium/Low] | Estimate: [e.g., 0.5h, 1h, 2h, 4h, 1d] | Status: [To Do/In Progress/Done/Blocked]

}