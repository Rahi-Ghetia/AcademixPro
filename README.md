# AcademixPro

AcademixPro is a comprehensive web application designed to streamline academic management for students, faculty, and administrators. The platform offers a range of functionalities tailored to the needs of each user role, ensuring efficient and effective management of academic activities.

## Key Features

### Initial Login
![Initial_Login](https://github.com/user-attachments/assets/71d7c2e9-dcf5-4bfd-a682-697442ea5828)

### For Students
- **View Timetable**: Students can view their batch-specific timetable, ensuring they are always aware of their class schedules.
![Student_Time_Table](https://github.com/user-attachments/assets/d6001124-95f7-44e6-a537-61466acbcb33)

- **Notifications**: Students can receive and view notifications sent by the admin, keeping them informed about important updates and announcements.

- **Upcoming Exams**: Students can see a list of upcoming exams, helping them prepare in advance.
![Student_Exams](https://github.com/user-attachments/assets/a6737d21-3542-4731-8c5c-7a8da8bfbace)

- **Give Exams**: Students can take exams uploaded by faculty members directly through the platform.
![Student_Exam_Take](https://github.com/user-attachments/assets/5fe55edc-c890-4fe6-a179-022b18a7a20a)

### For Faculty
- **View Schedule**: Faculty members can view their own schedule of lectures, ensuring they are aware of their teaching commitments.
![Faculty_Time_Table](https://github.com/user-attachments/assets/06fed4e3-907f-4f68-b945-fa6b8d6aa841)

- **Add Lectures**: Faculty can add new lectures to their schedule, providing flexibility in managing their teaching responsibilities.
![Add_Time_Table_Faculty](https://github.com/user-attachments/assets/fad0ee92-2050-4c03-88ea-3d3a0fa58749)

- **Create Exams**: Faculty can create and manage exams for students, streamlining the assessment process.
![Add_Exam_Faculty](https://github.com/user-attachments/assets/d38bab93-0dd3-4bd4-b2b6-b256f99e55b9)

![Add_Exam_Faculty_Time_Clash](https://github.com/user-attachments/assets/6bb0ee2a-0b5b-47af-a6fd-b886d9688246)

### For Admin
- **Add Students and Faculty**: Admins can add new students and faculty members to the platform, managing user roles and access.
![Sign_Up_Student](https://github.com/user-attachments/assets/1c43f30b-9641-40c7-bda4-157859800c55)

![Sign_Up_Faculty](https://github.com/user-attachments/assets/a75a4775-4d7d-40ca-9ca8-cb3745dd0e28)

- **Manage Timetable**: Admins can update or delete timetable data, ensuring the accuracy and relevance of scheduling information.
![Admin_Time_Table_Edit](https://github.com/user-attachments/assets/5e5fc9ac-2495-4dee-a54f-2e3f2ecfb426)

- **Admin Table**: Admins have access to a comprehensive table that contains all relevant data, providing a centralized view of academic activities.
![Admin_Time_Table](https://github.com/user-attachments/assets/27a9cd44-e84a-4e4b-bdfa-ab9868716eb8)

- **Send Notifications**: Admins can send notifications to students, faculty, or both, ensuring effective communication across the institution.
![Sent_Noti_Fac](https://github.com/user-attachments/assets/e0540609-a465-4781-b124-82f3b04310b7)

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

1. Navigate to the backend directory:
    ```sh
    cd ../python_backend
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
3. For Student Login Use | Username : 0 | Password : Student
4. For Faculty Login Use | Username : Faculty | Password : Faculty
5. For Admin Login Use | Username : Academix | Password : Academix

**AcademixPro** aims to simplify academic management, providing a seamless experience for students, faculty, and administrators. By integrating various functionalities into a single platform, it enhances efficiency, communication, and overall academic performance.

