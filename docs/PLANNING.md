# BARAK Project Plan

## Phase 1: Mobile App V1 - Core Features

### 1.A: Foundation & Setup
    - [ ] Environment Setup (Cursor, Taskmaster, MCPs)
    - [ ] Project Initialization & Tooling (React Native/Expo, Linting, State Mgmt, Navigation)
    - [ ] **Create Asset Reference Document (`/docs/ASSETS_REFERENCE.md` from Builder.io exports)**
    - [ ] Testing Foundation (Jest, RTL Setup)
    - [ ] Basic API Client Setup

### 1.B: Core Navigation & Authentication
    - [ ] Implement Core UI Shell (Bottom Nav, Basic Screens, Header Placeholders) - *Refers to ASSETS_REFERENCE.md*
    - [ ] Implement Authentication Flow (UI Screens, API Integration, Token Handling)
    - [ ] Implement Basic Slide-in Side Menu Structure - *Refers to ASSETS_REFERENCE.md*

### 1.C: Chat & Search Core Loop
    - [ ] Implement Chat Interface (Feed, Bubbles, Input Bar) - *Refers to ASSETS_REFERENCE.md*
    - [ ] Implement Basic AI Interaction (Send Message -> Get Response)
    - [ ] Implement Smart Tag System (V1 Basics: Display, Remove, Toggle Visual, Positional Gradient) - *Refers to ASSETS_REFERENCE.md*
    - [ ] Implement API Integration for Search (`GET /properties/search`)
    - [ ] Implement Initial Suggestion Bubbles - *Refers to ASSETS_REFERENCE.md*
    - [ ] Set up initial Firecrawl scraping and data storage mechanism
	

### 1.D: Property Interaction & Persistence
    - [ ] Implement Property Card Stack (V1 Basics: Display, Instruction Card, Basic Swipe) - *Refers to ASSETS_REFERENCE.md*
    - [ ] Implement "Mes Biens" Tab (V1 Basics: "Aimés" & "Passés" Lists UI)
    - [ ] Implement Property Like/Save/Pass Logic (Swipe -> State Update -> API Call -> Update Mes Biens)
    - [ ] Implement API Integration for Property Actions (`POST /like`, `POST /reject`, `GET /liked`, `GET /passed`)
    - [ ] Implement Wishlist Tab (V1 Basics: Saved Searches UI - List, Add/Edit Placeholder)
    - [ ] Implement API Integration for Saved Searches (`POST/PUT/DELETE /users/searches`)

### 1.E: Initial Growth Hooks & Analytics
    - [ ] Implement Analytics Event Tracking (Core User, Search, Property Interactions, Saved Searches)
    - [ ] Implement First Circle Invite Trigger Logic (Prompt after 3rd like - UI/Modal TBD) - *May refer to ASSETS_REFERENCE.md for modal elements*
    - [ ] Implement API Integration for Push Notification Token Registration (`POST /users/device_token`)
    - [ ] Implement Basic Push Notification Handling (Display received notification - Trigger TBD by Backend)

## Phase 2: Mobile App V1 - Polish & Advanced
    - [ ] Collaboration Features (Second Circle Invite Trigger, Sync Logic, UI elements)
    - [ ] Advanced Animations & Interactions (Orb Button, Card Lock Haptics/Scale, Card Sequential Re-fanning Anim, Tag Reordering Anim)
    - [ ] Implement remaining Tag interactions (Long-press menu, Non-required toggle logic)
    - [ ] Implement "Nouveautés" Tab in Mes Biens (Requires Backend)
    - [ ] Implement Notifications display in Chat Feed & Filtering
    - [ ] Performance Tuning & Optimization
    - [ ] Comprehensive Testing (Incl. Integration/E2E setup)
    - [ ] Implement remaining UI details (e.g., Info Modal Content, Profile Screen Content, Final Side Menu Content)
    - [ ] Fuzzy Matching / Misspelling Correction integration review
    - [ ] Accessibility (A11y) audit and refinement

## Phase 3: Admin Dashboard V1 (Separate Project/Timeline TBD)
    - [ ] Dashboard Scaffolding & Core Modules

*Note: Task breakdown and specific priorities within phases are managed in TASKS.md.*