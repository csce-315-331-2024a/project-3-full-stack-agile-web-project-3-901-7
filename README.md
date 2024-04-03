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


