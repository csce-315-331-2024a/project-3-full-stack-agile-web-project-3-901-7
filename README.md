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

   

