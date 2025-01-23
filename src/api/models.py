from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    
    email = db.Column(db.String(120), unique=True, nullable=False)
    role = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "role": self.role,
        }

class Parent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    full_name = db.Column(db.String(120), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)

    def __repr__(self):
        return f'<Parent {self.full_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "full_name": self.full_name,
            "phone_number": self.phone_number,
        }

class Teacher(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    full_name = db.Column(db.String(120), nullable=False)
    specialization = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<Teacher {self.full_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "full_name": self.full_name,
            "specialization": self.specialization,
        }

class Child(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('parent.id'), nullable=False)
    full_name = db.Column(db.String(120), nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f'<Child {self.full_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "parent_id": self.parent_id,
            "full_name": self.full_name,
            "date_of_birth": self.date_of_birth,
        }

class Class(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)
    age = db.Column(db.String(50), nullable=False)
    time = db.Column(db.String(50), nullable=False)
    capacity = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(200))

    def __repr__(self):
        return f'<Class {self.name}>'
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "price": self.price,
            "description": self.description,
            "age": self.age,
            "time": self.time,
            "capacity": self.capacity,
            "image": self.image
        }
    


class Enrollment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_name = db.Column(db.String(120), nullable=False)
    class_name = db.Column(db.String(120), nullable=False)
    enrollment_date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Enrollment {self.student_name} - {self.class_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "student_name": self.student_name,
            "class_name": self.class_name,
            "enrollment_date": self.enrollment_date.isoformat(),
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }

class Program(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teacher.id'), nullable=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    capacity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    age = db.Column(db.String(20), nullable=False)
    time = db.Column(db.String(50), nullable=False)


    def __repr__(self):
        return f'<Program {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "name": self.name,
            "description": self.description,
            "capacity": self.capacity,
            "price": self.price,
            "age": self.age,
            "time": self.time,
        }
        
class Subscription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('parent.id'), nullable=False)
    plan_type = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f'<Subscription {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "parent_id": self.parent_id,
            "plan_type": self.plan_type,
            "start_date": self.start_date,
            "end_date": self.end_date,
        }

class ProgressReport(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    child_id = db.Column(db.Integer, db.ForeignKey('child.id'), nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teacher.id'), nullable=False)
    report_date = db.Column(db.Date, nullable=False)
    content = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'<ProgressReport {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "child_id": self.child_id,
            "teacher_id": self.teacher_id,
            "report_date": self.report_date,
            "content": self.content,
        }

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f'<Event {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "start_time": self.start_time,
            "end_time": self.end_time,
        }

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f'<Message {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "sender_id": self.sender_id,
            "receiver_id": self.receiver_id,
            "content": self.content,
            "timestamp": self.timestamp,
        }

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teacher.id'), nullable=False)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    due_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<Task {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "title": self.title,
            "description": self.description,
            "due_date": self.due_date,
            "status": self.status,
        }

class Attendance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    child_id = db.Column(db.Integer, db.ForeignKey('child.id'), nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey('class.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<Attendance {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "child_id": self.child_id,
            "class_id": self.class_id,
            "date": self.date,
            "status": self.status,
        }

class Grade(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    child_id = db.Column(db.Integer, db.ForeignKey('child.id'), nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey('class.id'), nullable=False)
    grade = db.Column(db.String(50), nullable=False)
    date = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f'<Grade {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "child_id": self.child_id,
            "class_id": self.class_id,
            "grade": self.grade,
            "date": self.date,
        }

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('parent.id'), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f'<Payment {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "parent_id": self.parent_id,
            "amount": self.amount,
            "date": self.date,
        }

class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    class_name = db.Column(db.String(120), nullable=False)
    teacher = db.Column(db.String(120), nullable=False)
    dayOfWeek = db.Column(db.String(20), nullable=False)
    startTime = db.Column(db.String(5), nullable=False)
    endTime = db.Column(db.String(5), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    enrolled = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Schedule {self.class_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "class": self.class_name,
            "teacher": self.teacher,
            "dayOfWeek": self.dayOfWeek,
            "startTime": self.startTime,
            "endTime": self.endTime,
            "capacity": self.capacity,
            "enrolled": self.enrolled,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }
class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Integer, nullable=False)
    age = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Course {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "age": self.age,
        }

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<Notification {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "content": self.content,
            "date": self.date,
            "status": self.status,
        }

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(120), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    message = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'<Contact {self.first_name}{self.last_name}>'

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.first_name,
            "email": self.email,
            "subject": self.subject,
            "phone_number": self.phone_number,
            "message": self.message,
        }
class Newsletter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<Newsletter {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }
    
class Getintouch(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(120), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    message = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'<Getintouch {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "subject": self.subject,
            "phone_number": self.phone_number,
            "message": self.message,
        }
    
class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), nullable=False, default='Activo')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Client {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "status": self.status,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }
    
class Inventory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(120), nullable=False)
    last_updated = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Inventory {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "quantity": self.quantity,
            "category": self.category,
            "last_updated": self.last_updated.isoformat(),
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }

class BlogPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(120), nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f'<BlogPost {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "author": self.author,
            "date": self.date.isoformat()
        }

class Approval(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    details = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    date = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f'<Approval {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type,
            "name": self.name,
            "details": self.details,
            "status": self.status,
            "date": self.date.isoformat()
        }
    
class Email(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    to = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    scheduled_date = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return f'<Email {self.subject}>'

    def serialize(self):
        return {
            "id": self.id,
            "to": self.to,
            "subject": self.subject,
            "content": self.content,
            "date": self.date.isoformat(),
            "scheduledDate": self.scheduled_date.isoformat() if self.scheduled_date else None
        }
    