import React from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import ScrollToTop from "./component/scrollToTop"
import { BackendURL } from "./component/backendURL"

import { Home } from "./pages/home"
import { Demo } from "./pages/demo"
import { Single } from "./pages/single"
import injectContext from "./store/appContext"

import { Navbar } from "./component/navbar"
import { Footer } from "./component/footer"
import Login from "./pages/login.jsx"

import ContactUs from "./pages/ContactUs.jsx"
import Events from "./pages/Events.jsx"
import Programs from "./pages/Programs.jsx"

// Componentes del Admin Dashboard
import Sidebar from "./component/admin/Sidebar"
import Header from "./component/admin/Header"
import DashboardOverview from "./component/admin/DashboardOverview"
import ClientsView from "./component/admin/ClientsView"
import ScheduleManagement from "./component/admin/ScheduleManagement"
import ClassesView from "./component/admin/ClassesView"
import EnrollmentsView from "./component/admin/EnrollmentsView"
import ReportsView from "./component/admin/ReportsView"
import BlogView from "./component/admin/BlogView"
import InventoryView from "./component/admin/InventoryView"
import EmailsView from "./component/admin/EmailsView"
import NotificationsView from "./component/admin/NotificationsView"
import ArchiveView from "./component/admin/ArchiveView"
import ScheduleView from "./component/admin/ScheduleView"
import TasksView from "./component/admin/TasksView"
import ActivitiesView from "./component/admin/ActivitiesView"
import VideosView from "./component/admin/VideosView"
import InactiveAccountsView from "./component/admin/InactiveAccountsView"
import ApprovalsView from "./component/admin/ApprovalsView"
import MaintenanceView from "./component/admin/MaintenanceView"
import SettingsView from "./component/admin/SettingsView"
import DashboardContent from "./component/admin/DahboardContent.jsx"
import { SignupCommon } from "./pages/SignupCommon.jsx"
import { StaffSignup } from "./pages/StaffSignup.jsx"
import ProfileView from "./component/admin/ProfileView.jsx"

// Componentes del Teacher Dashboard
import TeacherDashboard from "./component/teacher/TeacherDashboard"
import TeacherOverview from "./component/teacher/TeacherOverview"
import TeacherClasses from "./component/teacher/TeacherClasses"
import TeacherStudents from "./component/teacher/TeacherStudents"
import TeacherAssignments from "./component/teacher/TeacherAssignments"
import TeacherSchedule from "./component/teacher/TeacherSchedule"
import TeacherSettings from "./component/teacher/TeacherSettings"
import TeacherSidebar from "./component/teacher/TeacherSidebar.jsx"
import TeacherHeader from "./component/teacher/TeacherHeader.jsx"

const AdminDashboard = () => (
  <div className="tw-flex tw-h-screen tw-overflow-hidden">
    <Sidebar />
    <div className="tw-flex-1 tw-overflow-auto">
      <Header />
      <main className="tw-p-6 tw-mt-2">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/clients" element={<ClientsView />} />
          <Route path="/schedule-management" element={<ScheduleManagement />} />
          <Route path="/classes" element={<ClassesView />} />
          <Route path="/enrollments" element={<EnrollmentsView />} />
          <Route path="/reports" element={<ReportsView />} />
          <Route path="/blog" element={<BlogView />} />
          <Route path="/inventory" element={<InventoryView />} />
          <Route path="/emails" element={<EmailsView />} />
          <Route path="/notifications" element={<NotificationsView />} />
          <Route path="/archive" element={<ArchiveView />} />
          <Route path="/schedule" element={<ScheduleView />} />
          <Route path="/tasks" element={<TasksView />} />
          <Route path="/activities" element={<ActivitiesView />} />
          <Route path="/videos" element={<VideosView />} />
          <Route path="/inactive-accounts" element={<InactiveAccountsView />} />
          <Route path="/approvals" element={<ApprovalsView />} />
          <Route path="/maintenance" element={<MaintenanceView />} />
          <Route path="/settings" element={<SettingsView />} />
          <Route path="/staff-signup" element={<StaffSignup />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/dashboard-content" element={<DashboardContent />} />
          <Route path="*" element={<h1>Not found!</h1>} />
        </Routes>
      </main>
    </div>
  </div>
)

const TeacherDashboardRoutes = () => (
  <div className="tw-flex tw-h-screen tw-overflow-hidden">
    <TeacherSidebar/>
    <div className="tw-flex-1 tw-overflow-auto">
    <TeacherHeader/>
    <main className="tw-p-6 tw-mt-2">
  <Routes>
    <Route path="/" element={<TeacherOverview/>} />
    <Route path="/classes" element={<TeacherClasses />} />
    <Route path="/students" element={<TeacherStudents />} />
    <Route path="/assignments" element={<TeacherAssignments />} />
    <Route path="/schedule" element={<TeacherSchedule />} />
    <Route path="/settings" element={<TeacherSettings />} />
    <Route path="*" element={<h1>Not found!</h1>} />
  </Routes>
  </main>
  </div>
</div>
)

const MainRoutes = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith("/admin-dashboard")
  const isTeacherRoute = location.pathname.startsWith("/teacher-dashboard")

  return (
    <>
      {!isAdminRoute && !isTeacherRoute && <Navbar />}
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/single/:theid" element={<Single />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupCommon />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/events" element={<Events />} />
        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
        <Route path="/teacher-dashboard/*" element={<TeacherDashboardRoutes />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="*" element={<h1>Not found!</h1>} />
      </Routes>
      {!isAdminRoute && !isTeacherRoute && <Footer />}
    </>
  )
}

const Layout = () => {
  const basename = process.env.BASENAME || ""

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />

  return (
    <BrowserRouter basename={basename}>
      <ScrollToTop />
      <MainRoutes />
    </BrowserRouter>
  )
}

export default injectContext(Layout)

