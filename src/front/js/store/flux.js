const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: null,
			message: null,
			uploadedFileUrl: null,
			error: null,
			classes: [],
			programs: [],
			clients: [],
			schedules: [],
			scheduleManagement: [],
			enrollments: [],
			reports: [],
			blogPosts: [],
			approvals: [],
			emails: [],
			scheduledEmails: [],
			// /admin-dashboard/classes
			// /admin-dashboard/enrollments
			// /admin-dashboard/reports
			// /admin-dashboard/blog

			// /admin-dashboard/inventory
			// /admin-dashboard/emails
			// /admin-dashboard/notifications
			// /admin-dashboard/archive
			// /admin-dashboard/schedule
			// /admin-dashboard/tasks
			// /admin-dashboard/activities
			// /admin-dashboard/videos
			// /admin-dashboard/inactive-accounts
			// /admin-dashboard/approvals
			// /admin-dashboard/maintenance
			// /admin-dashboard/staff-signup
			// /admin-dashboard/settings

			
		},
		actions: {
			signUp: async (username, email, password) => {
				let role = "user";
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ username, email, password, role }),
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.error || "Sign Up Failed");
					}

					const data = await response.json();
					setStore({ user: data });
					return { success: true, data };
				} catch (error) {
					console.error("Sign Up Error:", error.message);
					return { success: false, error: error.message };
				}
			},
			uploadToCloudinary: async (file) => {
				const BACKEND_URL = process.env.BACKEND_URL;
				const store = getStore();

				try {
					const formData = new FormData();
					formData.append("file", file);

					const response = await fetch(`${BACKEND_URL}/api/upload`, {
						method: "POST",
						body: formData,
					});

					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.error || "Failed to upload file");
					}

					const data = await response.json();
					setStore({ uploadedFileUrl: data.url, error: null });

					return { success: true, url: data.url };
				} catch (error) {
					console.error("Upload Error:", error.message);
					setStore({ error: error.message });
					return { success: false, error: error.message };
				}
			},
			fetchClasses: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/classes");
					if (response.ok) {
						const data = await response.json();
						setStore({ classes: data });
					} else {
						console.error("Error fetching classes:", response.status);
					}
				} catch (error) {
					console.error("Error fetching classes:", error);
				}
			},
			login: async (email, password) => {
				try {
					// fetching data from the backend
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email: email,
							password: password
						})

					});

					if (!response.ok) {
						const errorData = await response.json();
						if (response.status === 401) {
							alert('Bad email or password');
						} else if (response.status === 400) {
							alert('Email and password are required.');
						} else {
							alert('Unknow error. Please, try again.');
						}
						throw new Error(errorData.message || 'Failed to login');
					}
					const data = await response.json()

					localStorage.setItem("token", data.token)
					localStorage.setItem("user", JSON.stringify(data.user))
					setStore({ user: data.user })

					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			newsletter: async (email) => {
				try {
					// fetching data from the backend
					const response = await fetch(process.env.BACKEND_URL + "/api/newsletter", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email: email,
						})

					});

					if (response.status === 400 || response.status === 422) {
						alert('The email is not in a valid format. ');
					}
					else if (response.status === 409) {
						alert('This email is already subscribed..');
					}

					const data = await response.json()

					setStore({ user: data.user })
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			getinTouch: async (name, email, subject, phone_number, message) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/getintouch", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ name, email, subject, phone_number, message }),
					});
			
					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.error || "Failed to send message");
					}
			
					const data = await response.json();
					return { success: true, data };
				} catch (error) {
					console.error("Get in touch Error:", error.message);
					return { success: false, error: error.message };
				}
			},
			contactUs: async (first_name,last_name, email, subject, phone_number, message) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/contacts", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ first_name,last_name, email, subject, phone_number, message }),
					});
			
					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.error || "Failed to send message");
					}
			
					const data = await response.json();
					return { success: true, data };
				} catch (error) {
					console.error("Contact Us touch Error:", error.message);
					return { success: false, error: error.message };
				}
			},

			logout: () => {
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				setStore({ user: null });
			},

			// Admin Dashboard  
		// /admin-dashboard/clients
		fetchClients: async () => {
			try {
			const response = await fetch(process.env.BACKEND_URL + "/api/clients")
			if (response.ok) {
				const data = await response.json()
				setStore({ clients: data })

				// Si la base de datos está vacía, cargar datos iniciales
				if (data.length === 0) {
				getActions().loadInitialClientsData()
				}
			} else {
				console.error("Error fetching clients:", response.status)
			}
			} catch (error) {
			console.error("Error fetching clients:", error)
			}
		},

		loadInitialClientsData: async () => {
			const initialClients = [
			{ name: "Juan Pérez", email: "juan@example.com", phone: "123-456-7890", status: "Activo" },
			{ name: "María García", email: "maria@example.com", phone: "098-765-4321", status: "Inactivo" },
			{ name: "Carlos Rodríguez", email: "carlos@example.com", phone: "555-555-5555", status: "Activo" },
			]

			try {
			for (const client of initialClients) {
				await getActions().addClient(client)
			}
			} catch (error) {
			console.error("Error loading initial clients data:", error)
			}
		},

		addClient: async (clientData) => {
			try {
			const response = await fetch(process.env.BACKEND_URL + "/api/clients", {
				method: "POST",
				headers: {
				"Content-Type": "application/json",
				},
				body: JSON.stringify(clientData),
			})

			if (response.ok) {
				const newClient = await response.json()
				const store = getStore()
				setStore({ clients: [...store.clients, newClient] })
				return newClient
			} else {
				console.error("Error adding client:", response.status)
			}
			} catch (error) {
			console.error("Error adding client:", error)
			}
		},

		updateClient: async (id, clientData) => {
			try {
			const response = await fetch(`${process.env.BACKEND_URL}/api/clients/${id}`, {
				method: "PUT",
				headers: {
				"Content-Type": "application/json",
				},
				body: JSON.stringify(clientData),
			})

			if (response.ok) {
				const updatedClient = await response.json()
				const store = getStore()
				const updatedClients = store.clients.map((client) => (client.id === id ? updatedClient : client))
				setStore({ clients: updatedClients })
				return updatedClient
			} else {
				console.error("Error updating client:", response.status)
			}
			} catch (error) {
			console.error("Error updating client:", error)
			}
		},

		deleteClient: async (id) => {
			try {
			const response = await fetch(`${process.env.BACKEND_URL}/api/clients/${id}`, {
				method: "DELETE",
			})

			if (response.ok) {
				const store = getStore()
				const updatedClients = store.clients.filter((client) => client.id !== id)
				setStore({ clients: updatedClients })
			} else {
				console.error("Error deleting client:", response.status)
			}
			} catch (error) {
			console.error("Error deleting client:", error)
			}
		},

		// /admin-dashboard/schedule-management
		fetchSchedules: async () => {
			try {
			const response = await fetch(process.env.BACKEND_URL + "/api/schedules")
			if (response.ok) {
				const data = await response.json()
				setStore({ schedules: data })

				// Si la base de datos está vacía, cargar datos iniciales
				if (data.length === 0) {
				getActions().loadInitialSchedulesData()
				}
			} else {
				console.error("Error fetching schedules:", response.status)
			}
			} catch (error) {
			console.error("Error fetching schedules:", error)
			}
		},

		loadInitialSchedulesData: async () => {
			const initialSchedules = [
			{
				class: "Arte y Creatividad",
				teacher: "María García",
				dayOfWeek: "Lunes",
				startTime: "09:00",
				endTime: "10:30",
				capacity: 15,
				enrolled: 12,
			},
			{
				class: "Música y Movimiento",
				teacher: "Juan Pérez",
				dayOfWeek: "Martes",
				startTime: "11:00",
				endTime: "12:30",
				capacity: 20,
				enrolled: 18,
			},
			{
				class: "Juegos Educativos",
				teacher: "Ana Rodríguez",
				dayOfWeek: "Miércoles",
				startTime: "14:00",
				endTime: "15:30",
				capacity: 12,
				enrolled: 10,
			},
			]

			try {
			for (const schedule of initialSchedules) {
				await getActions().addSchedule(schedule)
			}
			} catch (error) {
			console.error("Error loading initial schedules data:", error)
			}
		},

		addSchedule: async (scheduleData) => {
			try {
			const response = await fetch(process.env.BACKEND_URL + "/api/schedules", {
				method: "POST",
				headers: {
				"Content-Type": "application/json",
				},
				body: JSON.stringify(scheduleData),
			})

			if (response.ok) {
				const newSchedule = await response.json()
				const store = getStore()
				setStore({ schedules: [...store.schedules, newSchedule] })
				return newSchedule
			} else {
				console.error("Error adding schedule:", response.status)
			}
			} catch (error) {
			console.error("Error adding schedule:", error)
			}
		},

		updateSchedule: async (id, scheduleData) => {
			try {
			const response = await fetch(`${process.env.BACKEND_URL}/api/schedules/${id}`, {
				method: "PUT",
				headers: {
				"Content-Type": "application/json",
				},
				body: JSON.stringify(scheduleData),
			})

			if (response.ok) {
				const updatedSchedule = await response.json()
				const store = getStore()
				const updatedSchedules = store.schedules.map((schedule) =>
				schedule.id === id ? updatedSchedule : schedule,
				)
				setStore({ schedules: updatedSchedules })
				return updatedSchedule
			} else {
				console.error("Error updating schedule:", response.status)
			}
			} catch (error) {
			console.error("Error updating schedule:", error)
			}
		},

		deleteSchedule: async (id) => {
			try {
			const response = await fetch(`${process.env.BACKEND_URL}/api/schedules/${id}`, {
				method: "DELETE",
			})

			if (response.ok) {
				const store = getStore()
				const updatedSchedules = store.schedules.filter((schedule) => schedule.id !== id)
				setStore({ schedules: updatedSchedules })
			} else {
				console.error("Error deleting schedule:", response.status)
			}
			} catch (error) {
			console.error("Error deleting schedule:", error)
			}
		},
		// /admin-dashboard/classes
		fetchClasses: async () => {
			try {
			  const response = await fetch(process.env.BACKEND_URL + "/api/classes")
			  if (response.ok) {
				const data = await response.json()
				setStore({ classes: data })
				console.log(data)
				
				// if (data.length === 0) {
				//   getActions().loadInitialClassesData()
				// }
			  } else {
				console.error("Error fetching classes:", response.status)
			  }
			} catch (error) {
			  console.error("Error fetching classes:", error)
			}
		  },
	
		  loadInitialClassesData: async () => {
			const initialClasses = [
			  { name: "Clase de Arte", teacher: "María García", capacity: 15,schedule: "Lunes y Miércoles 09:00-10:30", enrolled: 12 },
			  { name: "Clase de Música", teacher: "Juan Pérez", capacity: 20, schedule: "Martes y Jueves 11:00-12:30", enrolled: 18 },
			  { name: "Clase de Baile", teacher: "Ana Rodríguez", capacity: 12, schedule: "Miércoles y Viernes 14:00-15:30", enrolled: 10 },
			]
			// schedule: "Lunes y Miércoles 10:00-11:30"
			try {
			  for (const classItem of initialClasses) {
				await getActions().addClass(classItem)
				
			  }
			} catch (error) {
			  console.error("Error loading initial classes data:", error)
			}
		  },
	
		  addClass: async (classData) => {
			console.log("classData recibido en addClass:", classData);
			try {
			  const response = await fetch(process.env.BACKEND_URL + "/api/classes", {
				method: "POST",
				body: classData, 
			  });
		  
			  if (response.ok) {
				const newClass = await response.json();
				const store = getStore();
				setStore({ classes: [...store.classes, newClass] });
				return newClass;
			  } else {
				console.error("Error adding class:", response.status);
			  }
			} catch (error) {
			  console.error("Error adding class:", error);
			}
		  },
		  
	
		  updateClass: async (id, classData) => {
			try {
			  const response = await fetch(`${process.env.BACKEND_URL}/api/classes/${id}`, {
				method: "PUT",
				body: classData, // Now sending FormData
			  })
	
			  if (response.ok) {
				const updatedClass = await response.json()
				const store = getStore()
				const updatedClasses = store.classes.map((classItem) => (classItem.id === id ? updatedClass : classItem))
				setStore({ classes: updatedClasses })
				return updatedClass
			  } else {
				console.error("Error updating class:", response.status)
			  }
			} catch (error) {
			  console.error("Error updating class:", error)
			}
		  },
 
		// /admin-dashboard/enrollments
		fetchEnrollments: async () => {
			try {
			  const response = await fetch(process.env.BACKEND_URL + "/api/enrollments")
			  if (response.ok) {
				const data = await response.json()
				setStore({ enrollments: data })
	
				// Si la base de datos está vacía, cargar datos iniciales
				if (data.length === 0) {
				  getActions().loadInitialEnrollmentsData()
				}
			  } else {
				console.error("Error fetching enrollments:", response.status)
			  }
			} catch (error) {
			  console.error("Error fetching enrollments:", error)
			}
		  },
	
		  loadInitialEnrollmentsData: async () => {
			const initialEnrollments = [
			  { client: "Juan Pérez", class: "Clase de Arte", schedule: "Lunes y Miércoles 10:00-11:30", status: "Activo" },
			  { client: "María García", class: "Clase de Música", schedule: "Martes y Jueves 11:00-12:30", status: "Inactivo" },
			  { client: "Carlos Rodríguez", class: "Clase de Baile", schedule: "Miércoles y Viernes 14:00-15:30", status: "Activo" },
			]
	
			try {
			  for (const enrollment of initialEnrollments) {
				await getActions().addEnrollment(enrollment)
			  }
			} catch (error) {
			  console.error("Error loading initial enrollments data:", error)
			}
		  },
	
		  addEnrollment: async (enrollmentData) => {
			try {
			  const response = await fetch(process.env.BACKEND_URL + "/api/enrollments", {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify(enrollmentData),
			  })
	
			  if (response.ok) {
				const newEnrollment = await response.json()
				const store = getStore()
				setStore({ enrollments: [...store.enrollments, newEnrollment] })
				return newEnrollment
			  } else {
				console.error("Error adding enrollment:", response.status)
			  }
			} catch (error) {
			  console.error("Error adding enrollment:", error)
			}
		  },
	
		  updateEnrollment: async (id, enrollmentData) => {
			try {
			  const response = await fetch(`${process.env.BACKEND_URL}/api/enrollments/${id}`, {
				method: "PUT",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify(enrollmentData),
			  })
	
			  if (response.ok) {
				const updatedEnrollment = await response.json()
				const store = getStore()
				const updatedEnrollments = store.enrollments.map(enrollment =>
				  enrollment.id === id ? updatedEnrollment : enrollment
				)
				setStore({ enrollments: updatedEnrollments })
				return updatedEnrollment
			  } else {
				console.error("Error updating enrollment:", response.status)
			  }
			} catch (error) {
			  console.error("Error updating enrollment:", error)
			}
		  },
	
		  deleteEnrollment: async (id) => {
			try {
			  const response = await fetch(`${process.env.BACKEND_URL}/api/enrollments/${id}`, {
				method: "DELETE",
			  })
	
			  if (response.ok) {
				const store = getStore()
				const updatedEnrollments = store.enrollments.filter(enrollment => enrollment.id !== id)
				setStore({ enrollments: updatedEnrollments })
			  } else {
				console.error("Error deleting enrollment:", response.status)
			  }
			} catch (error) {
			  console.error("Error deleting enrollment:", error)
			}
		  },
		// /admin-dashboard/reports
		fetchReports: async () => {
			try {
			  const response = await fetch(process.env.BACKEND_URL + "/api/reports")
			  if (response.ok) {
				const data = await response.json()
				setStore({ reports: data })
	
				// Si la base de datos está vacía, cargar datos iniciales
				if (data.length === 0) {
				  getActions().loadInitialReportsData()
				}
			  } else {
				console.error("Error fetching reports:", response.status)
			  }
			} catch (error) {
			  console.error("Error fetching reports:", error)
			}
		  },
	
		  loadInitialReportsData: async () => {
			const initialReports = [
			  { client: "Juan Pérez", class: "Clase de Arte", schedule: "Lunes y Miércoles 10:00-11:30", status: "Activo" },
			  { client: "María García", class: "Clase de Música", schedule: "Martes y Jueves 11:00-12:30", status: "Inactivo" },
			  { client: "Carlos Rodríguez", class: "Clase de Baile", schedule: "Miércoles y Viernes 14:00-15:30", status: "Activo" },
			]
	
			try {
			  for (const report of initialReports) {
				await getActions().addReport(report)
			  }
			} catch (error) {
			  console.error("Error loading initial reports data:", error)
			}
		  },
	
		  addReport: async (reportData) => {
			try {
			  const response = await fetch(process.env.BACKEND_URL + "/api/reports", {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify(reportData),
			  })
	
			  if (response.ok) {
				const newReport = await response.json()
				const store = getStore()
				setStore({ reports: [...store.reports, newReport] })
				return newReport
			  } else {
				console.error("Error adding report:", response.status)
			  }
			} catch (error) {
			  console.error("Error adding report:", error)
			}
		  },
	
		  updateReport: async (id, reportData) => {
			try {
			    const response = await fetch(`${process.env.BACKEND_URL}/api/reports/${id}`, {
				method: "PUT",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify(reportData),
			  })
	
			  if (response.ok) {
				const updatedReport = await response.json()
				const store = getStore()
				const updatedReports = store.reports.map(report =>
				  report.id === id ? updatedReport : report
				)
				setStore({ reports: updatedReports })
				return updatedReport
			  } else {
				console.error("Error updating report:", response.status)
			  }
			}															
			catch (error) {
			  console.error("Error updating report:", error)
			}
		  },
	
		  deleteReport: async (id) => {
			try {
			  const response = await fetch(`${process.env.BACKEND_URL}/api/reports/${id}`, {
				method: "DELETE",
			  })

			  if (response.ok) {
				const store = getStore()
				const updatedReports = store.reports.filter(report => report.id !== id)
				setStore({ reports: updatedReports })
			  }
			  else {
				console.error("Error deleting report:", response.status)
			  }
			} catch (error) {
				console.error("Error deleting report:", error)
			}									
		},
		 // Blog actions
		 fetchBlogPosts: async () => {
			try {
			  const response = await fetch(process.env.BACKEND_URL + "/api/blog-posts")
			  if (response.ok) {
				const data = await response.json()
				setStore({ blogPosts: data })
			  } else {
				console.error("Error fetching blog posts:", response.status)
			  }
			} catch (error) {
			  console.error("Error fetching blog posts:", error)
			}
		  },
	
		  addBlogPost: async (postData) => {
			try {
			  const response = await fetch(process.env.BACKEND_URL + "/api/blog-posts", {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify(postData),
			  })
	
			  if (response.ok) {
				const newPost = await response.json()
				const store = getStore()
				setStore({ blogPosts: [...store.blogPosts, newPost] })
				return newPost
			  } else {
				console.error("Error adding blog post:", response.status)
			  }
			} catch (error) {
			  console.error("Error adding blog post:", error)
			}
		  },
	
		  deleteBlogPost: async (id) => {
			try {
			  const response = await fetch(`${process.env.BACKEND_URL}/api/blog-posts/${id}`, {
				method: "DELETE",
			  })
	
			  if (response.ok) {
				const store = getStore()
				const updatedPosts = store.blogPosts.filter((post) => post.id !== id)
				setStore({ blogPosts: updatedPosts })
			  } else {
				console.error("Error deleting blog post:", response.status)
			  }
			} catch (error) {
			  console.error("Error deleting blog post:", error)
			}
		  },
	
		  // Approval actions
		  fetchApprovals: async () => {
			try {
			  const response = await fetch(process.env.BACKEND_URL + "/api/approvals")
			  if (response.ok) {
				const data = await response.json()
				if (data.length === 0) {
					getActions().loadInitialApprovalsData()

				}
				setStore({ approvals: data })
			  } else {
				console.error("Error fetching approvals:", response.status)
			  }
			} catch (error) {
			  console.error("Error fetching approvals:", error)
			}
		  },
		  
		  updateApproval: async (id, status) => {
			console.log(id, status)
			try {
			  const response = await fetch(`${process.env.BACKEND_URL}/api/approvals/${id}`, {
				method: "PUT",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify({ status }),
			  })
	
			  if (response.ok) {
				const updatedApproval = await response.json()
				const store = getStore()
				const updatedApprovals = store.approvals.map((approval) =>
				  approval.id === id ? updatedApproval : approval,
				)
				setStore({ approvals: updatedApprovals })
				return updatedApproval
			  } else {
				console.error("Error updating approval:", response.status)
			  }
			} catch (error) {
			  console.error("Error updating approval:", error)
			}
		  },
		  sendApproval: async (approvalData) => {
			try {
			  const response = await fetch(process.env.BACKEND_URL + "/api/approvals", {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify(approvalData),
			  })
			  

			  if (response.ok) {

				const newApproval = await response.json()
				const store = getStore()
				
				setStore({ approvals: [...store.approvals, newApproval] })
				return newApproval
			  }
			  else {
				console.error("Error sending approval:", response.status)
			  }

			} catch (error) {
			  console.error("Error sending approval:", error)							
			}
			 },		
		loadInitialApprovalsData: async () => {
		const initialApprovals = [
			{ type: "Clase de Arte", name: "Juan Pérez", details: "Solicitud de inscripción", date: "2021-09-01", status: "approved" },
			{ type: "Clase de Música", name: "María García", details: "Solicitud de inscripción", date: "2021-09-02", status: "rejected" },
			{ type: "Clase de Baile", name: "Carlos Rodríguez", details: "Solicitud de inscripción", date: "2021-09-03", status: "pending" },
		]
		
		try {
				for (const approval of initialApprovals) {
			await getActions().sendApproval(approval)
			}
		}
		catch (error) {
			console.error("Error loading initial approvals data:", error)
		}				
		},					

		  // Email actions
		  fetchEmails: async () => {
			try {
			  const response = await fetch(process.env.BACKEND_URL + "/api/emails")
			  if (response.ok) {
				const data = await response.json()
				const emails = data.filter((email) => !email.scheduledDate)
				const scheduledEmails = data.filter((email) => email.scheduledDate)
				setStore({ emails, scheduledEmails })
			  } else {
				console.error("Error fetching emails:", response.status)
			  }
			} catch (error) {
			  console.error("Error fetching emails:", error)
			}
		  },
	
		  sendEmail: async (emailData) => {
			console.log(emailData);
			try {
			  const response = await fetch(process.env.BACKEND_URL + "/api/emails", {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify(emailData),
			  })
	
			  if (response.ok) {
				const newEmail = await response.json()
				const store = getStore()
				if (newEmail.scheduledDate) {
				  setStore({ scheduledEmails: [...store.scheduledEmails, newEmail] })
				} else {
				  setStore({ emails: [...store.emails, newEmail] })
				}
				return newEmail
			  } else {
				console.error("Error sending email:", response.status)
			  }
			} catch (error) {
			  console.error("Error sending email:", error)
			}
		  },
	
		  deleteEmail: async (id) => {
			try {
			  const response = await fetch(`${process.env.BACKEND_URL}/api/emails/${id}`, {
				method: "DELETE",
			  })
	
			  if (response.ok) {
				const store = getStore()
				const updatedEmails = store.emails.filter((email) => email.id !== id)
				const updatedScheduledEmails = store.scheduledEmails.filter((email) => email.id !== id)
				setStore({ emails: updatedEmails, scheduledEmails: updatedScheduledEmails })
			  } else {
				console.error("Error deleting email:", response.status)
			  }
			} catch (error) {
			  console.error("Error deleting email:", error)
			}
		  },

// /admin-dashboard/inventory

// /admin-dashboard/notifications
// /admin-dashboard/archive
// /admin-dashboard/schedule
// /admin-dashboard/tasks
// /admin-dashboard/activities
// /admin-dashboard/videos
// /admin-dashboard/inactive-accounts

// /admin-dashboard/maintenance
// /admin-dashboard/staff-signup
// /admin-dashboard/settings

		
		}
	};
};

export default getState;
