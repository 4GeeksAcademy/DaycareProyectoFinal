  
import os
from flask_admin import Admin
from .models import db, User, Parent, Teacher, Class, Enrollment, Child, Program, Subscription, ProgressReport,Event, Course,Message,Task, Attendance, Grade, Payment, Schedule, Notification, Contact, Newsletter, Getintouch, Client, Inventory, Approval, Email, BlogPost
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Parent, db.session))
    admin.add_view(ModelView(Teacher, db.session))
    admin.add_view(ModelView(Class, db.session))
    admin.add_view(ModelView(Enrollment, db.session))
    admin.add_view(ModelView(Child, db.session))
    admin.add_view(ModelView(Program, db.session))
    admin.add_view(ModelView(Subscription, db.session))
    admin.add_view(ModelView(ProgressReport, db.session))
    admin.add_view(ModelView(Event, db.session))
    admin.add_view(ModelView(Course, db.session))
    admin.add_view(ModelView(Message, db.session))
    admin.add_view(ModelView(Task, db.session))
    admin.add_view(ModelView(Attendance, db.session))
    admin.add_view(ModelView(Grade, db.session))
    admin.add_view(ModelView(Payment, db.session))
    admin.add_view(ModelView(Schedule, db.session))
    admin.add_view(ModelView(Notification, db.session))
    admin.add_view(ModelView(Contact, db.session))
    admin.add_view(ModelView(Newsletter, db.session))
    admin.add_view(ModelView(Getintouch, db.session))
    admin.add_view(ModelView(Client, db.session))
    admin.add_view(ModelView(Inventory, db.session))
    admin.add_view(ModelView(Approval, db.session))
    admin.add_view(ModelView(Email, db.session))
    admin.add_view(ModelView(BlogPost, db.session))



    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))