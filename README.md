# AcademixPro

AcademixPro is a comprehensive web application designed to streamline academic management for students, faculty, and administrators. The platform offers a range of functionalities tailored to the needs of each user role, ensuring efficient and effective management of academic activities.

## Key Features

### For Students
- **View Timetable**: Students can view their batch-specific timetable, ensuring they are always aware of their class schedules.
- **Notifications**: Students can receive and view notifications sent by the admin, keeping them informed about important updates and announcements.
- **Upcoming Exams**: Students can see a list of upcoming exams, helping them prepare in advance.
- **Give Exams**: Students can take exams uploaded by faculty members directly through the platform.

### For Faculty
- **View Schedule**: Faculty members can view their own schedule of lectures, ensuring they are aware of their teaching commitments.
- **Add Lectures**: Faculty can add new lectures to their schedule, providing flexibility in managing their teaching responsibilities.
- **Create Exams**: Faculty can create and manage exams for students, streamlining the assessment process.

### For Admin
- **Add Students and Faculty**: Admins can add new students and faculty members to the platform, managing user roles and access.
- **Manage Timetable**: Admins can update or delete timetable data, ensuring the accuracy and relevance of scheduling information.
- **Admin Table**: Admins have access to a comprehensive table that contains all relevant data, providing a centralized view of academic activities.
- **Send Notifications**: Admins can send notifications to students, faculty, or both, ensuring effective communication across the institution.

## Technical Details

- **Frontend**: Built using React, the frontend provides a responsive and user-friendly interface for all users.
- **Backend**: Developed with Django, the backend handles data management, user authentication, and business logic.
- **Database**: Utilizes a relational database to store and manage academic data, ensuring data integrity and security.
- **Real-time Communication**: Supports WebSocket for real-time updates and notifications, enhancing user experience.
- **Machine Learning Integration**: Incorporates machine learning models for advanced data analysis and predictions, leveraging TensorFlow and PyTorch.

## Installation

### Prerequisites
- Python 3.x
- Node.js and npm
- Virtualenv

### Backend Setup
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/academixpro.git
    cd academixpro/python_backend
    ```

2. Install the required dependencies:
    ```sh
    pip install -r requirements.txt
    ```

3. Run the Django server:
    ```sh
    python manage.py migrate
    python manage.py runserver
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```sh
    cd ../react_frontend
    ```

2. Install the required packages:
    ```sh
    npm install
    ```

3. Start the React development server:
    ```sh
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to access the frontend.
2. Use `http://localhost:8000` for backend API endpoints.

**AcademixPro** aims to simplify academic management, providing a seamless experience for students, faculty, and administrators. By integrating various functionalities into a single platform, it enhances efficiency, communication, and overall academic performance.
