import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import entryActions from '../entry-actions';
import AiModal from '../components/AiModal/AiModal';

const mockMessages = [
  {
    id: 'local:1723897015521',
    role: 'user',
    content: 'create a project',
  },
  {
    id: 'local:1723897015520',
    role: 'assistant',
    content: `# Project: Online Bookstore Platform Development\n\n## Boards Overview\n\n### Board 1: User Interface Design\nThis board focuses on the design aspects of the Online Bookstore, including the layout, color schemes, and overall user experience (UX).\n\n#### Card 1: Homepage Design\n- **User Story**: As a user, I want an attractive homepage that showcases featured books and promotions so that I can easily find popular books.\n- **Functional Requirements**:\n  - The homepage must display top-selling and newly released books.\n  - It must include a search bar for quick access to the library.\n- **Non-Functional Requirements**:\n  - The homepage should load in less than 3 seconds.\n  - Accessibility standards (WCAG 2.1 Level AA) must be met.\n- **Acceptance Criteria**:\n  - Users can see featured books on the homepage.\n  - The search functionality can find books accurately based on titles and authors.\n  \n  ##### Tasks:\n  - Research and gather inspiration for homepage designs.\n  - Create wireframes for the homepage layout.\n  - Develop a prototype using design tools (Figma/Sketch).\n  - Collect feedback from stakeholders on the design.\n  - Finalize homepage design based on feedback.\n\n#### Card 2: Book Detail Page Design\n- **User Story**: As a user, I want to view detailed information about a book so that I can decide if I want to buy it.\n- **Functional Requirements**:\n  - The page should display the book cover, title, author, description, ISBN, and pricing.\n  - Include an \"Add to Cart\" button.\n- **Non-Functional Requirements**:\n  - The design must be responsive, scaling appropriately on different devices.\n  - Load time should not exceed 2 seconds.\n- **Acceptance Criteria**:\n  - Users can see all details about the book including an \"Add to Cart\" button.\n  \n  ##### Tasks:\n  - Draft initial layouts for the book detail page.\n  - Define the information hierarchy and how it will be displayed.\n  - Create mockups for mobile and desktop views.\n  - Conduct usability testing to ensure ease of use.\n  - Revise the design based on user feedback.\n\n### Board 2: Backend Development\nThis board is dedicated to the server-side functionalities of the Online Bookstore, including data management, APIs, and user accounts.\n\n#### Card 1: User Authentication Module\n- **User Story**: As a user, I want to create an account and log in securely so that I can have a personalized experience.\n- **Functional Requirements**:\n  - Implement registration and login functionalities.\n  - Provide password recovery/reset options.\n- **Non-Functional Requirements**:\n  - All sensitive data must be encrypted.\n  - Response times for login and registration requests must be under 1 second.\n- **Acceptance Criteria**:\n  - Users can register, log in, and log out successfully.\n  - Users can recover their passwords via email.\n  \n  ##### Tasks:\n  - Set up the database schema for user accounts.\n  - Implement registration and login APIs using authentication standards (e.g., JWT).\n  - Create an email service for password recovery.\n  - Write unit tests for the authentication module.\n  - Conduct security audits to ensure data protection measures are valid.\n\n#### Card 2: Book Inventory Management\n- **User Story**: As an admin, I want to manage the inventory of books so that I can add, update, or remove books from the store.\n- **Functional Requirements**:\n  - Create, read, update, and delete (CRUD) functionalities for books.\n  - Set up an admin dashboard to view inventory metrics.\n- **Non-Functional Requirements**:\n  - The API should handle up to 100 requests per second.\n  - The system must have a recovery plan for data integrity.\n- **Acceptance Criteria**:\n  - Admins can successfully perform CRUD operations on books.\n  - Inventory metrics are displayed accurately on the dashboard.\n  \n  ##### Tasks:\n  - Design the database schema for book management.\n  - Implement the CRUD operations for book data.\n  - Build the admin dashboard interface.\n  - Create tests for API endpoints.\n  - Conduct performance testing to ensure scalability.\n\n---\n\nThis high-level requirements document can now be broken down into smaller actionable items on a Kanban board that allows developers to track and manage tasks efficiently. Each board should be regularly updated and reviewed in sprint meetings to ensure progress is on track.`, // eslint-disable-line no-useless-escape
    refusal: null,
  },
];

const mapStateToProps = ({
  ai: stateData,
  ui: {
    projectCreateForm: {
      data: { defaultData },
      isSubmitting,
    },
  },
}) => ({ stateData: { ...stateData }, defaultData, isSubmitting });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onRegenerate: entryActions.aiMessageRegenerateResponse,
      onCreate: entryActions.aiMessageCreate,
      onClose: entryActions.closeModal,
      onProjectCreate: entryActions.createAiProject,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AiModal);
