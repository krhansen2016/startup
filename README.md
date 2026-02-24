# Concept Threads

[My Notes](notes.md)

Concept Threads is custom clothing designing application. It allows for users to select from a variety of clothing parts. Like sleeves, skirts, pants, top, etc. They will be able to choose different colors and patterns for their unique pieces of clothing. Users will be able to create their own accounts, save their favorite designs, and share designs with others. 

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Have you ever had an idea for a piece of clothing or an outfit but you just couldn't seem to visualize how it would actually look? Well Concept Threads is the solution! It allows for creative and inventive people alike to see their fashion ideas come to life! With Concept Threads, users can mix and match all kinds of clothing pieces with different colors and patterns. Have you ever wondered what a baby blue chevron v-neck with bishop sleeves would look like? Well wonder no longer! Users will also be able to save their favorite designs and share them with others, allowing for a collaborative and inspiring design experience.

### Design

![Design image#1](design1_CT.PNG)
![Design image#2](design2_CT.PNG)

These are some sketches of what the finished product could potentially look like.

### Key features

- Ability to create a user account and login
- Account data and created designs are persistently saved and stored
- Ability to select from multiple categories of clothing to create custom designs
- Dropdown menu with organized pieces of clothing
- Color picker wheel for customizing clothing colors and patterns
- Live design preview that updates as changes are made
- A community page with a shared design feed
- Ability to create user profile that displays saved designs
- Ability to add friends and interact with others online

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses proper HTML structure to define the application. There will be four different pages. The login page, design creation page, profile page, and the community page. 
- **CSS** - Make consistent theme and styling across the pages of the application. It will be used for things like font, color scheme, and icons. Determines the look of clothing pieces.
- **React** - Provides login, display of choices, color and pattern selection, live design preview, and the community feed.
- **Service** - Backend service with endpoints for:
    - Login
    - Retrieving clothing piece types
    - Saving and retrieving user-created designs
    - Sharing designs
    - Retrieving user profiles
    - Retrieving friend lists
- **DB/Login** - Stores user accounts, saved designs, and community posts in a database. Register and login users. Credentials are stored in database along with designs.
- **WebSocket** - Provides real-time updates through the community page.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [conceptthreads.click](https://conceptthreads.click).

I made an AWS account, created a new EC2 instance, leased a domain, and edited my Caddyfile so that I have a secure connection.

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I made 4 HTML pages for my startup. The index.html for the main page and login. The create.html for creating an outfit design. The profile.html for view the user's profile and saved designs. Finally, the community.html to post designs and see what others are sharing.
- [x] **Proper HTML element usage** - I did proper use of HTML tags. Each HTML page is built up of heads and bodies, with the bodies containing headers, mains, and footers.
- [x] **Links** - I created several links between each of my pages. Each page has links that can access all of the other pages.
- [x] **Text** - I have plenty text in my pages to act as headers, labels, or placeholders.
- [x] **3rd party API placeholder** - I included placeholders for a 3rd party Authentication API that will allow users to sign in.
- [x] **Images** - I included several images like a favicon, default profile pictures, and placeholders for designs.
- [x] **Login placeholder** - I created a placeholder for the login with a text type of input tag and buttons to submit entered text.
- [x] **DB data placeholder** - I used text and images to represent designs and other data that will we saved and pulled from a database.
- [x] **WebSocket placeholder** - I used text and images to represent posts that other users can make and view in realtime.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Visually appealing colors and layout. No overflowing elements.** - I picked out a specific color palette so my startup will appear cohesive. I also made it so there were no overflowing elements. Every element is were I want it to be and so the layout is also visually appealing.
- [x] **Use of a CSS framework** - I utilized the bootstrap framwork on my profile page of my startup.
- [x] **All visual elements styled using CSS** -Every visual element is solely styled using CSS.
- [x] **Responsive to window resizing using flexbox and/or grid display** - Each page response to window resizing by using either flexbox or grid display.
- [x] **Use of a imported font** - I imported two different google fonts that go well together and used them for all my text.
- [x] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I used many different types of selectors, such as elements, classes, ids, and pseudo selectors.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - I used npm to install vite. Then I used vite to bundle all my files and used commands like npm run dev. It's super cool that I am able to do this now!
- [x] **Components** - I turned all my pages, login, profile, create, and community into react components! So fun!
- [x] **Router** - I created routing between all of my pages. I also made a NotFound route.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
