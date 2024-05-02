# Project Design and Management
## BOGO SORT CONNOISSEURS

**Team Members:**
- Sua Bae
- Andrew Beketov
- Surya Jasper
- Shweta Kumaran
- Warren Wu

## Sprint 1 Planning - Agenda

### Meeting Topics:
1. Discuss the various requirements regarding the project
2. Discuss any questions the team may have
3. Discuss the user stories 
4. Discuss the product backlog
5. Discuss the sprint goal and create it
6. Team decides the tasks from product backlog to implement for the sprint
7. Revise the task information and vote on story points

## Sprint 1 Planning - Meeting Minutes

1. What do we need to do?

   - Overall, switch to cloud deployment and web development

   - Cloud deployment

     - Host the SQL database on AWS cloud

     - Set up endpoints for the client-side web platform to interact with

   - Web development

     - Transform JavaFX infrastructure to a web-deployable format using Spring or React

     - Support 4 views - managers (already have), cashiers (already have), customers (need to build), menu board (somewhat have already)

   - API Usage

     - Implement web authentication

     - Implement translation API for accessibility

     - Implement weather API for seasonal / weather-based items

   - Accessibility

     - Ensure platform meets WCAG accessibility standards

2. Questions we have

   - What frontend architecture should we use?

   - We already have a cashier view that is essentially analogous to a customer view as well as a menu view within the cashier view - can we extend these to satisfy the requirements or do we need to start from scratch?

   - What can we use the weather API to do?

   - How do we implement translation of menu items such as “Gig em Patty Melt” or “Texas Style Toast” that might not make sense outside of English?

   - How much would the backend need to change?

3. User stories

   - Manager analyzing sales trends to boost revenue

     - We provide different types of sales analysis data that the manager can utilize to see how to maximize profits

     - Let’s say the manager sees that the Patty melt and seasoned fries often sell together. He might consider building a combo item with the two.

     - Or in another example, if the manager sees that corn dogs are selling very frequently, but there isn’t enough inventory to support it, he might consider raising the minimum quantity or reorder amount to save money and time

   - International customer who needs translation

     - Let’s say a customer from Sweden without much familiarity of English is visiting Texas A\&M and decides to go to REV’s Grill. Without the use of any translation modules, they won’t be able to make sense of the menu, and even the cashiers wouldn’t be able to help unless one of them speaks Swedish.

     - Using a translation API we can solve this problem and greatly improve the accessibility of our platform.

   - Cashier who wants to take orders efficiently

     - The ease of use of our platform will allow cashiers to breeze through orders and get through more people in a day.

4. Product backlog

   - Set up project with new tech stack and database

   - Design UI for login, menu, landing, manager, cashier, and customer pages

   - Implement login functionality and Google OAuth

   - Organize menu categories, include item pictures, and populate menu

   - Create dynamic menu board updates and frontend implementation

   - Develop cashier features: search bar, order button, confirmation page, and dynamic updates

   - Implement customer features: ordering page, dynamic menu updates, translations, weather display, suggested items, order button, and tip buttons

   - Develop manager features: inventory management (table, restocking, viewing, adding, updating, deleting ingredients), order history (table, updating, deleting orders), menu item management (table, adding, updating, deleting items), and sales trend analysis (product usage chart, sales report, excess report, ordering trend report)

5. Sprint Goal

   - Implement new tech stack and database setup

   - Set up backend objects for menu items, inventory, and orders

   - Create UI designs for login, menu board, website landing, manager overview, manager sales trends, cashier ordering, cashier information, customer ordering, and customer menu overview pages

   - Begin implementation of login functionality including login button, login page, and Google OAuth integration

6. Tasks to implement for the Sprint

   - Infrastructure Setup:

     - Set up project with a new tech stack

     - Repopulate the database with necessary data structures

     - Establish backend objects for essential functionalities: menu items, inventory items, orders

   - UI Design:

     - Create UI mockups for key pages:

     - Login page

     - Menu board

     - Website landing page

     - Manager overview page

     - Manager sales trends page

     - Cashier ordering page

     - Cashier information page

     - Customer ordering page

     - Customer menu overview

   - Implementation:

     - Initiate basic login functionality:

     - Implement login button

     - Develop login page

     - Integrate Google OAuth for authentication

7. Revise Task Information

   - Story points

     - Manager analyzing sales trends

       - Andrew - Yes

       - Sua - Yes

       - Shweta - Yes

       - Warren - Yes

       - Surya - Yes

     - International customer who needs translation

       - Andrew - Maybe (might be useful for international visitors)

       - Sua - No (ordering system already includes pictures and clear UI design that would be easy and straightforward to follow)

       - Warren - No (might not be very helpful since a lot of the menu items can’t be easily translated as they have A\&M-specific vocabulary and references)

       - Shweta - No (It’s an unrealistic scenario that someone is visiting A\&M with no knowledge of English or ordering systems, and even if someone does, there are still a lot of other problems including calling out orders, cashier interaction, etc. that this can’t fix)

       - Surya - No (unrealistic scenario and also might not be intuitive to navigate through - most people will want to order quickly and the design makes the choices very straightforward)

     - Cashier who wants to take orders efficiently

       - Andrew - Yes

       - Sua - Yes

       - Warren - Yes

       - Shweta - Maybe (not sure how important the design is for speed of ordering especially for someone who has to punch in 100s of orders a day)

       - Surya - Yes

   - Task revisions

     - Prioritize manager analysis

       - Manager overview page

       - Manager sales trends page

     - Prioritize cashier efficiency

       - Cashier ordering page

       - Cashier information page
       
### Sprint 1:
#### Standup #1: 3/26
- **Sua Bae:**
  - What I did yesterday:
    - Reviewed project requirements and user stories
  - What I plan to do today:
    - Begin helping with drafting UI mockups of key pages
  - Any blockers:
    - None
- **Andrew Beketov:**
  - What I did yesterday:
    - Started with reviewing project requirements and deliverables
  - What I plan to do today:
    - Set up the SCRUM board table and populate it with our tasks
  - Any blockers:
    - None
- **Surya Jasper:**
  - What I did yesterday:
    - Reviewed user stories and provided feedback
    - Conducted initial research on backend integration
  - What I plan to do today:
    - Collaborate with the team to prioritize tasks for the sprint
  - Any blockers:
    - None
- **Shweta Kumaran:**
  - What I did yesterday:
    - Analyzed project requirements and deliverables
  - What I plan to do today:
    - Help with populating SCRUM board table and review deliverables
  - Any blockers:
    - None
- **Warren Wu:**
  - What I did yesterday:
    - Reviewed project documentation and deliverables
  - What I plan to do today:
    - Begin on drafting UI mockups of key pages
  - Any blockers:
    - None

#### Standup #2: 3/28
- **Sua Bae:**
  - What I did yesterday:
    - Helped with setting up frontend
  - What I plan to do today:
    - Begin on implementing key pages into frontend
  - Any blockers:
    - None
- **Andrew Beketov:**
  - What I did yesterday:
    - Continued with creating frontend UI mockups of key pages and creation of new ones such as Login page
  - What I plan to do today:
    - Finalize design w/ Warren
  - Any blockers:
    - None
- **Surya Jasper:**
  - What I did yesterday:
    - Explored ideas for oath implementation
  - What I plan to do today:
    - Begin on oath implementation
  - Any blockers:
    - None
- **Shweta Kumaran:**
  - What I did yesterday:
    - Began on integrating backend database
  - What I plan to do today:
    - Continue with integrating backend database
  - Any blockers:
    - None
- **Warren Wu:**
  - What I did yesterday:
    - Continued with frontend UI design and setting up React
  - What I plan to do today:
    - Finalize frontend UI design
  - Any blockers:
    - None

#### Standup #3: 3/31
- **Sua Bae:**
  - What I did yesterday:
    - Continued working on key frontend pages such as menu
  - What I plan to do today:
    - Help on finalizing everything for release 1.0
  - Any blockers:
    - None
- **Andrew Beketov:**
  - What I did yesterday:
    - Helped with getting everything set up for today's meeting
    - Implemented key features according to our design such as Navbar
  - What I plan to do today:
    - Finalize all items for release 1.0
  - Any blockers:
    - None
- **Surya Jasper:**
  - What I did yesterday:
    - Finished oath implementation
  - What I plan to do today:
    - Help with connecting backend to frontend implementation and finalizing for release 1.0
  - Any blockers:
    - None
- **Shweta Kumaran:**
  - What I did yesterday:
    - Worked on setting up backend database
  - What I plan to do today:
    - Continue working on backend database
    - Finalize everything for release 1.0
  - Any blockers:
    - None
- **Warren Wu:**
  - What I did yesterday:
    - Implemented frontend pages such as order
  - What I plan to do today:
    - Finalize all items for release 1.0
  - Any blockers:
    - None

#### Sprint 1 Retrospective Meeting: 4/1
**Sprint 1 Retrospective Meeting Agenda**

**Date:** 4/1 
**Time:** 9:10am
**Location:** ZACH 592
 

**Agenda:**

1. **Conclusion of Spring 1 Discussion**
   - Discussion about the conclusion of sprint 1


2. **Review of Tasks completed**
   - Goals set for Sprint 1
   - Review of what was completed

3. **Successes and Challenges**
   - What did we do successfully?
   - Did we encounter any major challenges?

4. **Product Backlog Changes**
   - Review of changes
   - Why did we change?

5. **Planning for Next Sprint**
   - Sprint 2 plans
   - Goals and strategies

6. **Communication and Collaboration**
   - Find non-Discord way of communicating
   - Areas for improvement

7. **Conclusion**
   - Key takeaways
   - Review of new plans/changes to plans


**Sprint 1 Retrospective Meeting Minutes**

**Attendees:**
- Sua Bae
- Andrew Beketov
- Surya Jasper
- Shweta Kumaran
- Warren Wu

**1. Conclusion of Sprint 1 Discussion:**
- Discussion about the conclusion of Sprint 1
- We found that we were successful in what we wanted to get done
- Everyone did a good job in communication and task completion

**2. Review of Tasks Completed:**
- Goals set for Sprint 1 were reviewed
- We were able to complete all the tasks we wanted to

**3. Successes and Challenges:**
- We were able to complete all the tasks we set up for ourselves
- We had an issue with backend deployment, this was the biggest challenge. SSL Certificate route didn't solve it in time so we dockerized the backend to deploy


**4. Product Backlog Changes:**
- Came up with a few new ideas and added them to the backlog
- Discussed why these ideas are good

**5. Planning for Next Sprint:**
- Discussed plans and tasks for Sprint 2
- Outlined major tasks and major goal for Sprint 2

**6. Communication and Collaboration:**
- Created an iMessage group chat as a secondary form of communication
- Found that we overall did a good job of communicating

**7. Conclusion:**
- Summarized all key takeaways and plans
- Discussed possible goals for implementing new backlog items
---
### Sprint 2:
#### Standup #1: 4/2
- **Sua Bae:**
  - What I did yesterday:
    - Brainstormed on how to implement new backlog features
  - What I plan to do today:
    - Help on Sprint 2 plans
  - Any blockers:
    - None
- **Andrew Beketov:**
  - What I did yesterday:
    - Led retrospective meeting
    - Discussed new features
  - What I plan to do today:
    - Help on Sprint 2 plans
  - Any blockers:
    - None
- **Surya Jasper:**
  - What I did yesterday:
    - Brainstormed on how to implement new backlog features
  - What I plan to do today:
    - Help on Sprint 2 plans
  - Any blockers:
    - None
- **Shweta Kumaran:**
  - What I did yesterday:
    - Looked at possible feature implementations
  - What I plan to do today:
    - Discuss Sprint 2 plans
  - Any blockers:
    - None
- **Warren Wu:**
  - What I did yesterday:
    - Brainstormed on how to implement new backlog features
  - What I plan to do today:
    - Begin on and discuss Sprint 2 plans
  - Any blockers:
    - None
---
**Sprint 2 Planning Agenda**

**Date:** 4/3
**Time:** 9:10am 
**Location:** Zach 592


**Agenda:**

- **Overview of Sprint 2**
  - Overview of the purpose of sprint 2

- **Review of Sprint 2 Goal and Backlog**
  - Discussion about the goal for Sprint 2
  - Review of the backlog items and their priorities

- **Assignment of Tasks**
  - Assigning tasks to team members based on priority
  - Try to maintain more equal spread of work

- **Discussion on Implementation**
  - Discussion on how to approach the implementation of backlog items efficiently

- **Communication and Collaboration**
  - Discuss how to communicate for Sprint 2

- **Conclusion and Next Steps**
  - Summary of key points discussed
  - Clarification of any questions
  - Agree on a timeline

---

**Sprint 2 Planning Meeting Minutes**

**Attendees:**
- Sua Bae
- Andrew Beketov
- Surya Jasper
- Shweta Kumaran
- Warren Wu

**Overview of Sprint 2:**
- Provided an overview of the purpose of Sprint 2
- Figured out that we needed to fully complete functionality


**Review of Sprint 2 Goal and Backlog:**
- Try to get as functional as completed Project 2
- Review backlog items, look at new additions

**Assignment of Tasks:**
- Tasks were assigned to everyone
- Tried to spread work out more equally

**Discussion on Implementation:**
- Discussed various approaches to efficiently implement backlog items

**Communication and Collaboration:**
- Discussion on when to communicate on Discord vs iMessages

**Conclusion and Next Steps:**
- Summarized key points discussed during the meeting
- Addressed questions about logistics and implementation
- Agreed on a timeline for Sprint 2 tasks


### Sprint 2 Plan:
#### Goal: 
- The goal for this sprint is to fully connect all components of our site and appeal to users while achieving all functionality goals. 

#### Backlog:    

| Task                                                  | Priority | Time Estimate (min) | Status      | User Story Point | Assigned To |
|-------------------------------------------------------|----------|---------------------|-------------|------------------|-------------|
| Search bar to search for items while taking order    | low      | 20                  | incomplete  | 5                | Warren      |
| Order button to submit order                          | low      | 20                  | incomplete  | 4                | Warren      |
| Order confirmation page                              | low      | 20                  | incomplete  | 5                | Warren      |
| Set up the cashier display front end                 | medium   | 20                  | incomplete  | 5                | Warren      |
| Cashier landing page                                 | medium   | 20                  | incomplete  | 3                | Shweta      |
| Make the items dynamically update on menu ordering   | medium   | 20                  | incomplete  | 1                | Warren      |
| Display weather                                      | low      | 20                  | incomplete  | 5                | Andrew      |
| Can view suggested items based on the weather        | low      | 20                  | incomplete  | 5                | Andrew      |
| Order button to submit order                          | low      | 20                  | incomplete  | 3                | Warren      |
| Tip buttons                                          | low      | 20                  | incomplete  | 3                | Warren      |
| Implement the ordering confirmation page             | medium   | 20                  | incomplete  | 3                | Warren      |
| Include pictures of each item                        | low      | 20                  | incomplete  | 3                | Shweta      |
| A table with a list of ingredients with its attributes | medium | 20                  | incomplete  | 4                | Sua         |
| Restock low-stock items                              | low      | 20                  | incomplete  | 5                | Sua         |
| View low-stock items                                 | low      | 20                  | incomplete  | 5                | Sua         |
| Add a new ingredient                                 | medium   | 20                  | incomplete  | 4                | Sua         |
| Update ingredient                                    | medium   | 20                  | incomplete  | 3                | Sua         |
| Delete ingredient                                    | medium   | 20                  | incomplete  | 3                | Sua         |
| Implement update image                               | medium   | 20                  | incomplete  | 2                | Shweta      |
| A table with a list of orders with its attributes    | medium   | 20                  | incomplete  | 4                | Sua         |
| Update order                                         | medium   | 20                  | incomplete  | 3                | Sua         |
| Delete order                                         | medium   | 20                  | incomplete  | 3                | Sua         |
| Implement date filter                                | medium   | 20                  | incomplete  | 4                | Andrew      |
| A table with a list of orders with its attributes    | medium   | 20                  | incomplete  | 4                | Surya       |
| Add a new menu item                                  | medium   | 20                  | incomplete  | 3                | Surya       |
| Update menu item                                     | medium   | 20                  | incomplete  | 3                | Surya       |
| Delete menu item                                     | medium   | 20                  | incomplete  | 3                | Surya       |
| Product usage chart                                  | low      | 20                  | incomplete  | 5                | Andrew      |
| Sales report                                         | low      | 20                  | incomplete  | 5                | Andrew      |
| Excess report                                        | low      | 20                  | incomplete  | 5                | Andrew      |
| What sells together - ordering trend report          | low      | 20                  | incomplete  | 4                | Andrew      |
| Implement manager home page                          | low      | 20                  | incomplete  | 3                | Shweta      |
| Add an image attribute to item in database           | high     | 20                  | incomplete  | 3                | Shweta      |
| Add a description attribute to item in database      | high     | 20                  | incomplete  | 2                | Shweta      |
| Set up categories for easier navigation              | medium   | 20                  | incomplete  | 3                | Shweta      |
| Redesign the home landing page                       | low      | 20                  | incomplete  | 5                | Shweta      |
| Redesign the login page                              | low      | 20                  | incomplete  | 4                | Surya       |
| Redesign the menu board as separate screens          | medium   | 20                  | incomplete  | 2                | Shweta      |
| Reimplement the menu board                           | medium   | 20                  | incomplete  | 5                | Shweta      |
| Finish adding order functionality                    | high     | 20                  | incomplete  | 4                | Warren      |
| Add security to the page (cannot access manager without login) | medium | 20              | incomplete  | 4                | Surya       |
| Add cashier login functionality                      | medium   | 20                  | incomplete  | 4                | Surya       |
| Add non-google oauth login functionality             | low      | 20                  | incomplete  | 4                | Surya       |
| Connect to cashier home or manager home depending on login type | medium | 20            | incomplete  | 3                | Surya       |
| SSL certificate for backend cloud hosting            | high     | 20                  | incomplete  | 1                | Surya       |
| Set up Jacoco                                        | medium   | 20                  | incomplete  | 1                | Surya       |
| Start backend testing                                | medium   | 20                  | incomplete  | 1                | Shweta      |

**Sprint 2 SCRUM Standup Meeting 1**

**Date:** 4/2
**Time:** 8:30am 
**Location:** Zach 244

**Attendees:**
- Sua Bae
- Andrew Beketov
- Surya Jasper
- Shweta Kumaran
- Warren Wu

### Meeting Agenda Items
- Standup
- Discuss features and their implementation
- Discuss sprint plan

### Status Update Since Last Meeting
**Accomplishments:**
- Completed Sprint 1 successfully and demoed the developments.
- Began Sprint 2 planning.

**Tasks Completed:**
- **Discuss when to meet for Sprint 2 planning:** Assigned to Andrew (Completed)
- **Schedule Sprint 2 retrospective:** Assigned to Andrew (Completed)

### Plans Before The Next Meeting
- Team members to brainstorm potential new features to implement for enhanced functionality.

### Minutes from Previous Meeting
Each team member reflected on their contributions that led to the successful completion of Sprint 1. We reviewed our successes and formulated a strategy to maintain efficiency for Sprint 2. The plan includes implementing basic functionalities for a comprehensive point-of-sale system, which encompasses:
- Login page
- Ordering pages for customers, cashiers, and managers
- Inventory and order history management
- Sales trend analysis

Additionally, we planned to enhance the user interface by splitting the menu board into multiple pages, allowing customers to view the entire menu without excessive scrolling.

---

## SCRUM Standup Meeting 2

**Date:** 4/4
**Time:** 8:30am 
**Location:** Zach 244

**Attendees:**
- Sua Bae
- Andrew Beketov
- Surya Jasper
- Shweta Kumaran
- Warren Wu

### Meeting Agenda Items
- Review tasks completed since the last standup.
- Identify any roadblocks on current tasks and discuss solutions.
- Discuss what to focus on until the next meeting.

### Status Update Since Last Meeting
**Accomplishments:**
- Updated the ordering page to include categories and item images.
- Enhanced the database to store images for each menu item.
- Redesigned the login page.

**Tasks Completed:**
- **Add an image attribute to item in database:** Assigned to Shweta (Completed)
- **Add a description attribute to item in database:** Assigned to Shweta (Completed)
- **Redesign the login page:** Assigned to Surya (Completed)

### Plans Before The Next Meeting
- Focus on developing manager-side features.
- Start the redesign of the menu board to display on different screens for better user interaction.

### Task Assignments
- **A table with a list of ingredients with its attributes:** Assigned to Sua
- **Restock low-stock items:** Assigned to Sua
- **Product usage chart:** Assigned to Andrew
- **Redesign the menu board as separate screens:** Assigned to Shweta
- **Reimplement the menu board:** Assigned to Shweta
- **Add security measures to the page (restrict manager access without login):** Assigned to Surya
- **Finish adding order functionality:** Assigned to Warren

### Minutes from Previous Meeting
We reviewed the considerable progress made since the initial Sprint 2 meeting. Our achievements included the successful integration of new images and descriptions for menu items into the database, and a complete overhaul of the ordering and login pages to enhance visual and functional appeal. The next steps involve adding necessary security features and continuing the redesign of managerial functionalities to streamline operations further.

## SCRUM Meeting 3

**Date:** 4/9
**Time:** 8:30am 
**Location:** Zach 244

**Attendees:**
- Sua Bae
- Andrew Beketov
- Surya Jasper
- Shweta Kumaran
- Warren Wu

### Meeting Agenda Items
- Discuss progress on tasks.
- Identify and address any roadblocks.
- Plan future manager-side pages and features.

### Status Update Since Last Meeting
**Accomplishments:**
- Completed basic features for the manager-side.
- Updated the menu board design.

**Tasks Completed:**
- **A table with a list of ingredients with its attributes:** Assigned to Sua (Completed)
- **Restock low-stock items:** Assigned to Sua (Completed)
- **Product usage chart:** Assigned to Andrew (Completed)
- **Redesign the menu board as separate screens:** Assigned to Shweta (Completed)
- **Reimplement the menu board:** Assigned to Shweta (Completed)
- **Add security to the page (manager login required):** Assigned to Surya (Completed)
- **Finish adding order functionality:** Assigned to Warren (Completed)

### Plans Before The Next Meeting
- **Setup SSL certificate on server** to host backend more securely.
- **Set up backend tests** to ensure functionality and stability.
- **Improve inventory tables with filters** for better management.
- **Add sales report and excess report** for detailed managerial insights.

### Task Assignments
- **View low-stock items:** Assigned to Sua
- **Add a new ingredient:** Assigned to Sua
- **SSL certificate for backend cloud hosting:** Assigned to Surya
- **Set up Jacoco for code coverage:** Assigned to Surya
- **Sales report:** Assigned to Andrew
- **Excess report:** Assigned to Andrew
- **Order button to submit order:** Assigned to Warren
- **Order confirmation page:** Assigned to Warren
- **Set up the cashier display front end:** Assigned to Warren
- **Set up categories for easier navigation:** Assigned to Shweta
- **Redesign the home landing page:** Assigned to Shweta
- **Update ingredient:** Assigned to Sua
- **Delete ingredient:** Assigned to Sua

### Minutes from Previous Meeting
We were able to finish significant tasks from our backlog, setting up a good foundation for the manager and customer views, involving both backend and frontend integrations. With several functionalities shaped up, including basic manager-side features and a revamped menu board, our focus shifts towards enhancing security measures and expanding reporting features.

---

## SCRUM Meeting 4

**Date:** 4/11
**Time:** 8:30am 
**Location:** Zach 244  

**Attendees:**
- Sua Bae
- Andrew Beketov
- Surya Jasper
- Shweta Kumaran
- Warren Wu

### Meeting Agenda Items
- Review tasks completed since the last meeting.
- Discuss ongoing task progress and any new issues.
- Outline future plans for backend and frontend integration.

### Status Update Since Last Meeting
**Accomplishments:**
- Established backend hosting on a secure server.
- Advanced the customer and cashier order features.
- Initiated the inventory management system.
- Enhanced site navigation for better accessibility.

**Tasks Completed:**
- **View low-stock items:** Assigned to Sua (Completed)
- **Add a new ingredient:** Assigned to Sua (Completed)
- **SSL certificate for backend cloud hosting:** Assigned to Surya (Completed)
- **Set up Jacoco:** Assigned to Surya (Completed)
- **Update ingredient:** Assigned to Sua (Completed)
- **Delete ingredient:** Assigned to Sua (Completed)
- **Excess report:** Assigned to Andrew (Completed)
- **Order button to submit order:** Assigned to Warren (Completed)
- **Order confirmation page:** Assigned to Warren (Completed)
- **Set up the cashier display front end:** Assigned to Warren (Completed)
- **Set up categories for easier navigation:** Assigned to Shweta (Completed)
- **Redesign the home landing page:** Assigned to Shweta (Completed)

### Plans Before The Next Meeting
- **Implement the weather API** to enhance customer experience based on local weather conditions.
- **Complete the order page** with full functionality.
- **Add new menu items and ingredients** to expand the menu offerings.
- **Update ingredients and images** for items in the backend to improve the menu visuals.

### Task Assignments
- **Order button to submit order:** Assigned to Warren
- **Display weather:** Assigned to Andrew
- **Add a new menu item:** Assigned to Surya
- **Add a new ingredient:** Assigned to Sua
- **A table with a list of orders with its attributes:** Assigned to Sua
- **Implement update image feature:** Assigned to Shweta
- **Update order:** Assigned to Sua
- **Delete order:** Assigned to Sua
- **Implement date filter:** Assigned to Andrew
- **Update menu item:** Assigned to Surya
- **Delete menu item:** Assigned to Surya
- **Ordering trend report based on what sells together:** Assigned to Andrew
- **Order confirmation page setup:** Assigned to Warren
- **Implement the ordering confirmation page:** Assigned to Warren
- **Include pictures for each item on the menu:** Assigned to Shweta

### Minutes from Previous Meeting
Our progress remained strong with the completion of critical tasks such as backend setup, customer/cashier order functionalities, and initial steps towards a comprehensive inventory management system. We tackled new and ongoing tasks methodically, ensuring we stay on schedule for a successful sprint completion.

---

## SCRUM Meeting 5

**Date:** 4/13
**Time:** 8:30am 
**Location:** Zach 244

**Attendees:**
- Sua Bae
- Andrew Beketov
- Surya Jasper
- Shweta Kumaran
- Warren Wu

### Meeting Agenda Items
- Review completed tasks.
- Address backend issue with Order History.
- Plan for Sprint 3.

### Status Update Since Last Meeting
**Accomplishments:**
- Completed all manager-side functionalities: inventory, menu updates, trends, and order history.
- Finalized order functionalities for cashier and customer sides.
- Wrapped up most backend tasks.
- Achieved most goals set for Sprint 2.

**Tasks Completed:**
- **Order button to submit order:** Assigned to Warren (Completed)
- **Display weather:** Assigned to Andrew (Completed)
- **Add a new menu item:** Assigned to Surya (Completed)
- **Add a new ingredient:** Assigned to Sua (Completed)
- **A table with a list of orders with its attributes:** Assigned to Sua (Completed)
- **Implement update image feature:** Assigned to Shweta (Completed)
- **Update order:** Assigned to Sua (Completed)
- **Delete order:** Assigned to Sua (Completed)
- **Implement date filter:** Assigned to Andrew (Completed)
- **Update menu item:** Assigned to Surya (Completed)
- **Delete menu item:** Assigned to Surya (Completed)
- **Ordering trend report:** Assigned to Andrew (Completed)
- **Order confirmation page setup:** Assigned to Warren (Completed)
- **Implement the ordering confirmation page:** Assigned to Warren (Completed)
- **Include pictures for each menu item:** Assigned to Shweta (Completed)

### Plans Before The Next Meeting
- **Complete remaining tasks** not finished in Sprint 2.
- **Plan and outline tasks for Sprint 3** focusing on enhancing functionalities and user experience.

### Task Assignments
- **Review remaining tasks in Sprint 2 backlog:** Assigned to Andrew
- **Outline and plan Sprint 3 tasks:** Assigned to Andrew

### Minutes from Previous Meeting
In our previous session, we addressed the pressing need to finalize all pending tasks for the GitHub Release. We managed to implement comprehensive functionalities across the manager, customer, and cashier interfaces, setting a robust foundation for the upcoming Sprint 3.

---

**Sprint 3 Planning Meeting Minutes**

**Attendees:**
- Sua Bae
- Andrew Beketov
- Surya Jasper
- Shweta Kumaran
- Warren Wu

**Overview of Sprint 3:**
- Provided an overview of the purpose of Sprint 3
- Figured out that we needed to fully complete functionality


**Review of Sprint 3 Goal and Backlog:**
- Complete the web app and all accessibility features
- Review backlog items and add any additional tasks observed from the user study

**Assignment of Tasks:**
- Tasks were assigned and distributed to everyone
- Tasks were equally spread out and covered a variety of tasks

**Discussion on Implementation:**
- Discussed various approaches to efficiently implement backlog items
- Discussed potential backlog items that could be added or removed

**Conclusion and Next Steps:**
- Decided on key features that needed to be implemented first
- Summarized key points discussed during the meeting
- Addressed questions about logistics and implementation
- Agreed on a timeline for Sprint 3 tasks


### Sprint 3 Plan:
#### Goal: 
- The goal for this sprint is to ensure that the website is accessible to everyone and that the it's inuitive and easy to use for all users.

#### Backlog:    

| Task                                                  | Assigned to | User Story Points | Priority | Time Estimate (min) | Status     |
|-------------------------------------------------------|-------------|--------------|----------|---------------------|------------|
| data validation for quantity, min quantity, and price | Sua         | 3            | medium   | 20                  | Incomplete |
| implement edit for other inventory attributes         | Sua         | 2            | medium   | 20                  | In progress|
| add a confirmation pop-up for deleting an ingredient  | Sua         | 3            | medium   | 20                  | Incomplete |
| sort option to sort ingredient list - every column in the table  | Sua         | 3            | medium   | 20                  | Incomplete |
| add a confirmation pop-up for updating an ingredient | Sua         | 3            | medium   | 20                  | Incomplete |
| Implement translation button functionality       | Shweta      | 3            | high     | 20                  | Incomplete |
| Implement Google translate                      | Shweta      | 5            | high     | 20                  | Incomplete |
| Run accessibility checker -- add tasks to support good things | Andrew      | 5            | high     | 10                  | Incomplete |
| Dark Mode                                        | Warren      | 5            | high     | 20                  | Incomplete |
| Enlarge Text                                     | Andrew      | 5            | high     | 20                  | Incomplete |
| Recommend Menu item based on weather            | Andrew      | 5            | high     | 20                  | Incomplete |
| Sort option to sort ingredient list                         | Sua         | 4            | medium   | 20                  | Incomplete |
| A table with a list of orders with its attributes            | Sua         | 3            | medium   | 20                  | Complete   |
| Update order                                                 | Sua         | 3            | medium   | 20                  | Incomplete |
| Delete order                                                 | Sua         | 3            | medium   | 20                  | Complete   |
| Add a confirmation pop-up for updating an order              | Sua         | 3            | medium   | 20                  | Incomplete |
| Add a confirmation pop-up for deleting an order             | Sua         | 3            | medium   | 20                  | Incomplete |
| Put start date after end date                                | Andrew      | 5            | low      | 5                   | Incomplete |
| Fix the backend for order history - itemToQuantity attribute | Shweta      | 2            | high     | 40                  | Incomplete |
| Allow user to directly input quantity (so user doesn't have to click + 50 times)  | Warren | 3 | low | 10 | Incomplete |
| Add search functionality to cashier ordering page                            | Warren | 4 | low | 10 | Incomplete |
| List IDs for each item and even spacing for item elements                     | Warren | 5 | low | 30 | Incomplete |
| Add manager navbar component to cashier ordering page                         | Surya  | 4 | low | 5  | Incomplete |
| Send help ticker when help button is clicked                                 | Warren | 5 | medium | 20 | Incomplete |
| Add quick ordering via IDs functionality                                     | Warren | 5 | low | 10 | Incomplete |
| Add confirmation to delete menu item    | Surya       | 4            | medium   | 15                  | Incomplete |
| Sort for every column in the table      | Surya       | 5            | high     | 10                  | Incomplete |
| Validate inputs to new and update menu item | Surya    | 4            | medium   | 10                  | Incomplete |
| Put start date after end date | Andrew      | 4            | low      | 10                  | Incomplete |
| Update styling to look appealing | Shweta      | 3            | low      | 30                  | Incomplete |
| Update styling to look appealing | Shweta      | 5            | low      | 30                  | Incomplete |
| Add cashier login functionality                           | Surya       | 3            | medium   | 30                  | Incomplete |
| Add non google oauth login functionality                 | Surya       | 1            | medium   | 15                  | Incomplete |
| Connect to cashier home or manager home depending on login type | Surya | 1            | medium   | 10                  | Incomplete |
| Set up admin home                                         | Surya       | 3            | medium   | 30                  | Incomplete |
| Implement admin add cashier/manager backend edit          | Surya       | 4            | medium   | 20                  | Incomplete |
| Implement admin delete cashier/manager backdend edit      | Surya       | 4            | medium   | 20                  | Incomplete |
| A profile page for cashier w clock in and out             | Shweta      | 4            | medium   | 10                  | Incomplete |
| A profile page for manager w cashier management thing     | Shweta      | 4            | medium   | 10                  | Incomplete |
| Implement clock for timesheets                            | Shweta      | 3            | medium   | 10                  | Incomplete |
| A profile page for admin                                  | Shweta      | 4            | medium   | 10                  | Incomplete |
| Set up backend testing                             | Andrew      | 3            | high     | 20                  | Incomplete |
| Write unit test for each endpoint                  | Andrew      | 3            | high     | 40                  | Incomplete |
| Write edge cases (invalid input) for each endpoint | Andrew      | 3            | high     | 40                  | Incomplete |
| Set up frontend testing             | Warren      | 3            | high     | 20                  | Incomplete |
| Write tests for each component      | Warren      | 3            | high     | 40                  | Incomplete |


### Sprint 3 SCRUM Standup Meeting 1

**Date:** 4/15/2024  
**Time:** 7:00pm  
**Location:** Northpoint Crossing  

**Meeting Agenda Items:**  
- Standup  
- Discuss any features and ways to implement them  
- Discuss sprint planning  

**Status Update Since Last Meeting:**  
**Accomplishments:**  
- Completed sprint 2 and demoed successfully  
- Discuss sprint 3 planning and schedule  

**Tasks Completed:**  
- **Task Description:** Discuss when to meet for sprint 3 planning  
  - **Assigned to:** Andrew  
  - **Completed?:** yes  
- **Task Description:** Sprint 3 retrospective scheduled  
  - **Assigned to:** Andrew  
  - **Completed?:** yes  

**Before The Next Meeting:**  
**Plans:**  
- Think of any new features to implement  

**Minutes from Previous Meeting:**  
- Through the meeting, each member discussed various things they did to ensure the success of sprint 2. We discussed the reasons why we were successful and able to get all our tasks done on time and made sure everyone would follow the same work ethic for a successful sprint 3. This was utilized to brainstorm and make logistical and planning decisions for sprint 3. For sprint 3, we decided to implement all of our accessibility features, improve the UI of various pages, and ensure smooth navigation.  

---

### Sprint 3 SCRUM Standup Meeting 2

**Date:** 4/18/2024  
**Time:** 7:00pm  
**Location:** Northpoint Crossing  

**Meeting Agenda Items:**  
- Discuss tasks completed so far  
- Discuss roadblocks on tasks if there are any  
- Discuss what to focus on until next meeting  

**Status Update Since Last Meeting:**  
**Accomplishments:**  
- Fixed the backend issue from sprint 2  
- Started securing login  

**Tasks Completed:**  
- **Task Description:** Fix the backend for order history - itemToQuantity attribute  
  - **Assigned to:** Shweta  
  - **Completed?:** yes  
- **Task Description:** Add cashier login functionality  
  - **Assigned to:** Surya  
  - **Completed?:** yes  
- **Task Description:** Add non google oauth login functionality  
  - **Assigned to:** Surya  
  - **Completed?:** yes  

**Before The Next Meeting:**  
**Plans:**  
- Start sprint tasks  
- Implement data validation  
- Add more login functionality  

**Task Assignments:**  
- **Task Description:** data validation for quantity, min quantity, and price  
  - **Assigned to:** Sua  
- **Task Description:** implement edit for other inventory attributes  
  - **Assigned to:** Sua  
- **Task Description:** add a confirmation pop-up for deleting an ingredient  
  - **Assigned to:** Sua  
- **Task Description:** Allow user to directly input quantity (so user doesn't have to click + 50 times)  
  - **Assigned to:** Warren  
- **Task Description:** Add search functionality to cashier ordering page  
  - **Assigned to:** Warren  
- **Task Description:** List IDs for each item and even spacing for item elements  
  - **Assigned to:** Warren  
- **Task Description:** Update styling to look appealing  
  - **Assigned to:** Shweta  
- **Task Description:** Secure the database password and change the .env  
  - **Assigned to:** Shweta  
- **Task Description:** Connect to cashier home or manager home depending on login type  
  - **Assigned to:** Surya  
- **Task Description:** Set up admin home  
  - **Assigned to:** Surya  
- **Task Description:** Implement admin add cashier/manager backend edit  
  - **Assigned to:** Surya  
- **Task Description:** Recommend Menu item based on weather  
  - **Assigned to:** Andrew  

**Minutes from Previous Meeting:**  
- Through this sprint meeting, the team went through the tasks that were given. Some issues from sprint 2 have been resolved to start sprint 3. Login functionality concerns were raised last meeting and progress has been made. We hope to fix the data validation issues by the next meeting and finish details. Everyone is confident in finishing all tasks.

### Sprint 3 SCRUM Standup Meeting 3

**Date:** 4/23/2024  
**Time:** 7:00pm  
**Location:** Northpoint Crossing  

**Meeting Agenda Items:**  
- Discuss progress on tasks  
- Discuss roadblocks  
- Discuss future plans for manager side pages and features  

**Status Update Since Last Meeting:**  
**Accomplishments:**  
- Implement data validation  
- Fixes in ordering page and new functionalities  
- Update styling  
- Security implementations  

**Tasks Completed:**  
- **Task Description:** data validation for quantity, min quantity, and price  
  - **Assigned to:** Sua  
  - **Completed?:** yes  
- **Task Description:** implement edit for other inventory attributes  
  - **Assigned to:** Sua  
  - **Completed?:** yes  
- **Task Description:** add a confirmation pop-up for deleting an ingredient  
  - **Assigned to:** Sua  
  - **Completed?:** yes  
- **Task Description:** Allow user to directly input quantity (so user doesn't have to click + 50 times)  
  - **Assigned to:** Warren  
  - **Completed?:** yes  
- **Task Description:** Add search functionality to cashier ordering page  
  - **Assigned to:** Warren  
  - **Completed?:** yes  
- **Task Description:** List IDs for each item and even spacing for item elements  
  - **Assigned to:** Warren  
  - **Completed?:** yes  
- **Task Description:** Update styling to look appealing  
  - **Assigned to:** Shweta  
  - **Completed?:** yes  
- **Task Description:** Secure the database password and change the .env  
  - **Assigned to:** Shweta  
  - **Completed?:** yes  
- **Task Description:** Connect to cashier home or manager home depending on login type  
  - **Assigned to:** Surya  
  - **Completed?:** yes  
- **Task Description:** Set up admin home  
  - **Assigned to:** Surya  
  - **Completed?:** yes  
- **Task Description:** Implement admin add cashier/manager backend edit  
  - **Assigned to:** Surya  
  - **Completed?:** yes  
- **Task Description:** Recommend Menu item based on weather  
  - **Assigned to:** Andrew  
  - **Completed?:** yes  

**Before The Next Meeting:**  
**Plans:**  
- Implement table sorting  
- Implement date filters  
- Implement translation  
- Implement help ticker  
- Update styling and consolidate navigation bars  

**Minutes from Previous Meeting:**  
- We were able to finish a good amount of tasks, but we saw that there were still quite a few tasks pending in our backlog. To finish on time, we scheduled to set out many tasks and start working on the implementation of features suggested in the demo. We also are set to start working on the cook page and discussed the layout and details of that. Thus, through planning, we are confident to finish tasks.

---

### Sprint 3 SCRUM Standup Meeting 4

**Date:** 4/25/2024  
**Time:** 7:00pm  
**Location:** Northpoint Crossing  

**Meeting Agenda Items:**  
- Discuss completed tasks  
- Discuss progress on ongoing tasks  
- Discuss plans moving forward for backend and frontend integration  

**Status Update Since Last Meeting:**  
**Accomplishments:**  
- Sorting options  
- Google translate  
- Date filters  
- Order updates  
- Help ticket  
- Styling, navbar  

**Tasks Completed:**  
- **Task Description:** sort option to sort ingredient list - every column in the table  
  - **Assigned to:** Sua  
  - **Completed?:** yes  
- **Task Description:** add a confirmation pop-up for updating an ingredient  
  - **Assigned to:** Sua  
  - **Completed?:** yes  
- **Task Description:** Implement translation button functionality  
  - **Assigned to:** Shweta  
  - **Completed?:** yes  
- **Task Description:** Implement Google translate  
  - **Assigned to:** Shweta  
  - **Completed?:** yes  
- **Task Description:** Run accessibility checker -- add tasks to support good things  
  - **Assigned to:** Andrew  
  - **Completed?:** yes  
- **Task Description:** put start date after end date  
  - **Assigned to:** Andrew  
  - **Completed?:** yes  
- **Task Description:** sort option to sort ingredient list (medium, 20 min, incomplete, 4)  
  - **Assigned to:** Sua  
  - **Completed?:** yes  
- **Task Description:** A table with a list of orders with its attributes (medium, 20 min, incomplete, 4)  
  - **Assigned to:** Sua  
  - **Completed?:** yes  
- **Task Description:** Update order (medium, 20 min, incomplete, 3)  
  - **Assigned to:** Sua  
  - **Completed?:** yes  
- **Task Description:** Delete order (medium, 20 min, incomplete, 3)  
  - **Assigned to:** Sua  
  - **Completed?:** yes  
- **Task Description:** Add manager navbar component to cashier ordering page  
  - **Assigned to:** Surya  
  - **Completed?:** yes  
- **Task Description:** Send help ticker when help button is clicked  
  - **Assigned to:** Warren  
  - **Completed?:** yes  
- **Task Description:** Add quick ordering via IDs functionality  
  - **Assigned to:** Warren  
  - **Completed?:** yes  
- **Task Description:** Update styling to look appealing  
  - **Assigned to:** Shweta  
  - **Completed?:** yes  
- **Task Description:** Implement admin delete cashier/manager backend edit  
  - **Assigned to:** Surya  
  - **Completed?:** yes  

**Before The Next Meeting:**  
**Plans:**  
- Confirmation pop-ups  
- Accessibility features - dark mode, enlarge text  
- Menu manager view  
- Clock in and clock out pages  
- Testing  
- Cook page  

**Minutes from Previous Meeting:**  
- We were able to finish a good amount of tasks and fixes to ensure that we finish accessibility and kitchen features. The team finished table styling, data validation, and security tasks. We hope to finish all of these tasks by the end of the sprint. We are aware there are a few days left, however, the team is pretty confident. Details about the kitchen and cook page were sorted out and are off to implementation. Additionally, accessibility features are planned to be made and tested.

---

### Sprint 3 SCRUM Standup Meeting 5

**Date:** 4/17/2024  
**Time:** 7:00pm  
**Location:** Northpoint Crossing  

**Meeting Agenda Items:**  
- Discuss completed tasks  
- Backend issue with Order History  
- Discuss plans for sprint 3  

**Status Update Since Last Meeting:**  
**Accomplishments:**  
- Confirmation pop-ups  
- Accessibility features - dark mode, enlarge text  
- Menu manager view  
- Clock in and clock out pages  
- Testing  
- Cook page  

**Tasks Completed:**  
- **Task Description:** add a confirmation pop-up for updating an order (medium, 20 min, incomplete, 4)  
  - **Assigned to:** Sua  
  - **Completed?:** yes  
- **Task Description:** add a confirmation pop-up for deleting an order (medium, 20 min, incomplete, 4)  
  - **Assigned to:** Sua  
  - **Completed?:** yes  
- **Task Description:** Run accessibility checker -- add tasks to support good things  
  - **Assigned to:** Andrew  
  - **Completed?:** yes  
- **Task Description:** Enlarge Text  
  - **Assigned to:** Andrew  
  - **Completed?:** yes  
- **Task Description:** Dark Mode  
  - **Assigned to:** Warren  
  - **Completed?:** yes  
- **Task Description:** Add confirmation to delete menu item  
  - **Assigned to:** Surya  
  - **Completed?:** yes  
- **Task Description:** Sort for every column in the table  
  - **Assigned to:** Surya  
  - **Completed?:** yes  
- **Task Description:** Validate inputs to new and update menu item  
  - **Assigned to:** Surya  
  - **Completed?:** yes  
- **Task Description:** Update styling to look appealing  
  - **Assigned to:** Shweta  
  - **Completed?:** yes  
- **Task Description:** a profile page for cashier w clock in and out  
  - **Assigned to:** Shweta  
  - **Completed?:** yes  
- **Task Description:** a profile page for manager w cashier management thing  
  - **Assigned to:** Shweta  
  - **Completed?:** yes  
- **Task Description:** implement clock for timesheets  
  - **Assigned to:** Shweta  
  - **Completed?:** yes  
- **Task Description:** Set up backend testing  
  - **Assigned to:** Andrew  
  - **Completed?:** yes  
- **Task Description:** Write unit test for each endpoint  
  - **Assigned to:** Andrew  
  - **Completed?:** yes  
- **Task Description:** Write edge cases (invalid input) for each endpoint  
  - **Assigned to:** Andrew  
  - **Completed?:** yes  
- **Task Description:** Set up frontend testing  
  - **Assigned to:** Warren  
  - **Completed?:** yes  
- **Task Description:** Write tests for each component  
  - **Assigned to:** Warren  
  - **Completed?:** yes  
- **Task Description:** Edit Orders table in database  
  - **Assigned to:** Shweta  
  - **Completed?:** yes  
- **Task Description:** Create cook page that shows  
  - **Assigned to:** Sua  
  - **Completed?:** yes  

**Before The Next Meeting:**  
**Plans:**  
- Complete the few holdover tasks that may emerge upon demo and retro meeting  
- Plan for presentation  

**Task Assignments:**  
- **Task Description:** Look to add any more tasks  
  - **Assigned to:** Andrew  
- **Task Description:** Plan for presentation  
  - **Assigned to:** Andrew  

**Minutes from Previous Meeting:**  
- The team is wrapping up final details and tasks and has completed the sprint tasks. Accessibility was tested. However, a critical issue arose due to the Google translate. This is an issue the scrum master plans to bring up. Beyond that, other features were implemented and the system was tested.


**Sprint 3 Retrospective Meeting Agenda**

**Date:** 4/29
**Time:** 7:00pm
**Location:** Northpoint Crossing
 

**Agenda:**

1. **Conclusion of Spring 1 Discussion**
   - Discussion about the conclusion of sprint 3

2. **Review of Tasks completed**
   - Goals set for Sprint 3
   - Review of what was completed
   - Review the project overall

3. **Successes and Challenges**
   - What did we do successfully?
   - Did we encounter any major challenges?

4. **Product Backlog Changes**
   - Review of changes
   - Why did we change?

5. **Conclusion**
   - Key takeaways
   - Final thoughts about sprint 3


**Sprint 3 Retrospective Meeting Minutes**

**Attendees:**
- Sua Bae
- Andrew Beketov
- Surya Jasper
- Shweta Kumaran
- Warren Wu

**1. Conclusion of Sprint 1 Discussion:**
- Discussion about the conclusion of Sprint 3
- We found that we were successful in what we wanted to get done
- Everyone did a good job in communication and task completion

**2. Review of Tasks Completed:**
- Goals set for Sprint 3 were reviewed
- We were able to complete all the tasks we wanted to

**3. Successes and Challenges:**
- We were able to complete all the tasks we set up for ourselves
- Couple issues with database crashing but was all fixed

**4. Product Backlog Changes:**
- View completed product
- Check completed product against our planned completed product
- Everything planned was implemented and we had additional stuff

**5. Conclusion:**
- Summarized all key takeaways and Sprint 3 items
- Expressed our final thoughts about Sprint 3 and the project overall



