const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || null,  
			user: JSON.parse(localStorage.getItem("user")) || null,  
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white",
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white",
				},
			],
			uploadedFileUrl: null,
			error: null,
			classes: [],
			programs: [],
			clients: [],
			schedules: [],
			emails: [],
			scheduledEmails: [],
			videos: [],
			inactiveAccounts: [],
			approvals: [],
			activities: [],
			events: [],
			teachers: [],
			services: [],
			gallery: [],
			subscriptions: [],

			// Parent dashboard store
			parentData: null,
			parentChildren: [],
			parentSchedule: [],
			parentPayments: [],
			parentActivities: [],
			parentSettings: null,
			parentVirtualClasses: [],
			notifications: [],

			// Teacher dashboard store
			teacherData: null,
			teacherClasses: [],
		},
		actions: {
			signUp: async (signupData) => {

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(signupData),
					})

					if (!response.ok) {
						const errorData = await response.json()
						throw new Error(errorData.error || "Sign Up Failed")
					}

					const data = await response.json()
					setStore({ user: data.user, token: data.token })
					return { success: true, data }
				} catch (error) {
					console.error("Sign Up Error:", error.message)
					return { success: false, error: error.message }
				}
			},
			uploadToCloudinary: async (file) => {
				const BACKEND_URL = process.env.BACKEND_URL
				const store = getStore()

				try {
					const formData = new FormData()
					formData.append("file", file)

					const response = await fetch(`${BACKEND_URL}/api/upload`, {
						method: "POST",
						body: formData,
					})

					if (!response.ok) {
						const errorData = await response.json()
						throw new Error(errorData.error || "Failed to upload file")
					}

					const data = await response.json()
					setStore({ uploadedFileUrl: data.url, error: null })

					return { success: true, url: data.url }
				} catch (error) {
					console.error("Upload Error:", error.message)
					setStore({ error: error.message })
					return { success: false, error: error.message }
				}
			},
			uploadToCloudinaryImg: async (file) => {
				const BACKEND_URL = process.env.BACKEND_URL
				const store = getStore()

				try {
					const formData = new FormData()
					formData.append("file", file)

					const response = await fetch(`${BACKEND_URL}/api/upload/img`, {
						method: "POST",
						body: formData,
					})

					if (!response.ok) {
						const errorData = await response.json()
						throw new Error(errorData.error || "Failed to upload file")
					}

					const data = await response.json()
					setStore({ uploadedFileUrl: data.url, error: null })

					return { success: true, url: data.url }
				} catch (error) {
					console.error("Upload Error:", error.message)
					setStore({ error: error.message })
					return { success: false, error: error.message }
				}
			},
			fetchClasses: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/classes")
					if (response.ok) {
						const data = await response.json()
						setStore({ classes: data })
					} else {
						console.error("Error fetching classes:", response.status)
					}
				} catch (error) {
					console.error("Error fetching classes:", error)
					return null
				}
			},
			login: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, password }),
					});
			
					const data = await response.json();
					console.log("DATOS RECIBIDOS EN LOGIN:", data);  // 👀 Verifica si `data.token` existe
			
					if (response.ok) {
						// Aquí almacenamos el token y el user en localStorage y en el store
						localStorage.setItem("token", data.token);
						localStorage.setItem("user", JSON.stringify(data.user));
						
						// Asegúrate de utilizar setStore correctamente para actualizar el estado
						setStore({ 
							token: data.token, 
							user: data.user 
						});
			
						console.log("TOKEN GUARDADO EN STORE:", getStore().token);  // 👀 Verifica si se guarda correctamente
			
						return data;
					} else {
						console.log("Error en login:", response.status, response.statusText);
					}
				} catch (error) {
					console.log("Error en login:", error);
				}
			},
			newsletter: async (email) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/newsletter", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: email,
						}),
					})

					if (response.status === 400 || response.status === 422) {
						alert("The email is not in a valid format. ")
					} else if (response.status === 409) {
						alert("This email is already subscribed.")
					}

					const data = await response.json()

					setStore({ user: data.user })
					return data
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
					})

					if (!response.ok) {
						const errorData = await response.json()
						throw new Error(errorData.error || "Failed to send message")
					}

					const data = await response.json()
					return { success: true, data }
				} catch (error) {
					console.error("Get in touch Error:", error.message)
					return { success: false, error: error.message }
				}
			},
			contactUs: async (first_name, last_name, email, subject, phone_number, message) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/contacts", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ first_name, last_name, email, subject, phone_number, message }),
					})

					if (!response.ok) {
						const errorData = await response.json()
						throw new Error(errorData.error || "Failed to send message")
					}

					const data = await response.json()
					return { success: true, data }
				} catch (error) {
					console.error("Contact Us Error:", error.message)
					return { success: false, error: error.message }
				}
			},

			getPrograms: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/programs")
					if (response.ok) {
						const data = await response.json()
						setStore({ programs: data })
					} else {
						console.error("Error fetching programs:", response.status)
					}
				} catch (error) {
					console.error("Error fetching programs:", error)
				}
			},

			// Admin Dashboard actions

			// Clients
			GetClients: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/clients")
					if (response.ok) {
						const data = await response.json()
						setStore({ clients: data })

						// If the database is empty, load initial data
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

			// Schedules
			GetSchedules: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/schedules")
					if (response.ok) {
						const data = await response.json()
						setStore({ schedules: data })

						// If the database is empty, load initial data
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

			//Email
			GetEmails: async () => {
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
			fetchVideos: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/videos")
					if (response.ok) {
						const data = await response.json()
						setStore({ videos: data })
					} else {
						console.error("Error fetching videos:", response.status)
					}
				} catch (error) {
					console.error("Error fetching videos:", error)
				}
			},

			uploadVideo: async (formData) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/videos", {
						method: "POST",
						body: formData,
					})

					if (response.ok) {
						const data = await response.json()
						return { success: true, data }
					} else {
						const errorData = await response.json()
						return { success: false, error: errorData.error || "Failed to upload video" }
					}
				} catch (error) {
					console.error("Error uploading video:", error)
					return { success: false, error: error.message }
				}
			},

			deleteVideo: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/videos/${id}`, {
						method: "DELETE",
					})

					if (response.ok) {
						return { success: true }
					} else {
						const errorData = await response.json()
						return { success: false, error: errorData.error || "Failed to delete video" }
					}
				} catch (error) {
					console.error("Error deleting video:", error)
					return { success: false, error: error.message }
				}
			},
			formEvent: async (full_name, events_selection, parent_name, special_request) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/eventsuscription", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ full_name, events_selection, parent_name, special_request }),
					})

					if (!response.ok) {
						const errorData = await response.json()
						throw new Error(errorData.error || "Failed to send message")
					}

					const data = await response.json()
					return { success: true, data }
				} catch (error) {
					console.error("form event Error:", error.message)
					return { success: false, error: error.message }
				}
			},
			fetchInactiveAccounts: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/inactive-accounts")
					if (response.ok) {
						const data = await response.json()
						setStore({ inactiveAccounts: data })
					} else {
						console.error("Error fetching inactive accounts:", response.status)
					}
				} catch (error) {
					console.error("Error fetching inactive accounts:", error)
				}
			},

			reactivateAccount: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/inactive-accounts/${id}/reactivate`, {
						method: "POST",
					})
					if (response.ok) {
						const updatedAccount = await response.json()
						const store = getStore()
						const updatedAccounts = store.inactiveAccounts.map((account) =>
							account.id === id ? updatedAccount : account,
						)
						setStore({ inactiveAccounts: updatedAccounts })
						return { success: true, data: updatedAccount }
					} else {
						console.error("Error reactivating account:", response.status)
						return { success: false, error: "Failed to reactivate account" }
					}
				} catch (error) {
					console.error("Error reactivating account:", error)
					return { success: false, error: error.message }
				}
			},

			sendReminder: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/inactive-accounts/${id}/send-reminder`, {
						method: "POST",
					})
					if (response.ok) {
						return { success: true }
					} else {
						console.error("Error sending reminder:", response.status)
						return { success: false, error: "Failed to send reminder" }
					}
				} catch (error) {
					console.error("Error sending reminder:", error)
					return { success: false, error: error.message }
				}
			},

			deleteInactiveAccount: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/inactive-accounts/${id}`, {
						method: "DELETE",
					})
					if (response.ok) {
						const store = getStore()
						const updatedAccounts = store.inactiveAccounts.filter((account) => account.id !== id)
						setStore({ inactiveAccounts: updatedAccounts })
						return { success: true }
					} else {
						console.error("Error deleting inactive account:", response.status)
						return { success: false, error: "Failed to delete inactive account" }
					}
				} catch (error) {
					console.error("Error deleting inactive account:", error)
					return { success: false, error: error.message }
				}
			},
			// Approvals actions
			fetchApprovals: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/approvals")
					if (response.ok) {
						const data = await response.json()
						setStore({ approvals: data })
					} else {
						console.error("Error fetching approvals:", response.status)
					}
				} catch (error) {
					console.error("Error fetching approvals:", error)
				}
			},
			updateApprovalStatus: async (id, status) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/approvals/${id}`, {
						method: "PATCH",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ status }),
					});
					if (!response.ok) throw new Error("Error actualizando el estado");
					const updatedApproval = await response.json();

					// Actualiza el estado global
					setStore({
						approvals: getStore().approvals.map((item) =>
							item.id === updatedApproval.id ? updatedApproval : item
						),
					});

					return { success: true };
				} catch (error) {
					console.error(error);
					return { success: false, error: error.message };
				}
			},

			fetchActivities: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/activities")
					if (response.ok) {
						const data = await response.json()
						setStore({ activities: data })
						return { success: true, data }
					} else {
						console.error("Error fetching activities:", response.status)
						return { success: false, error: "Failed to fetch activities" }
					}
				} catch (error) {
					console.error("Error fetching activities:", error)
					return { success: false, error: error.message }
				}
			},

			createActivity: async (formData) => {
				try {
					const form = new FormData();

					for (const key in formData) {
						if (key === "image" && typeof formData[key] === "string") {
							form.append("image", formData[key]);
						} else if (key === "image" && formData[key] instanceof File) {
							form.append("image", formData[key]);
						} else {
							form.append(key, formData[key]);
						}
					}

					const response = await fetch(process.env.BACKEND_URL + "/api/activities", {
						method: "POST",
						body: form,
					});

					if (response.ok) {

						const newActivity = await response.json();
						const store = getStore();
						setStore({ activities: [...store.activities, newActivity] });
						return { success: true, data: newActivity };
					} else {
						const error = await response.json();
						console.error("Error response:", error); // Log error response
						return { success: false, error: error.error || "Failed to create activity" };
					}
				} catch (error) {
					console.error("Error creating activity:", error);
					return { success: false, error: error.message };
				}
			},

			updateActivity: async (id, activityData) => {

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/activities/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(activityData),
					})

					if (response.ok) {

						const updatedActivity = await response.json()
						const store = getStore()
						const updatedActivities = store.activities.map((activity) => (activity.id === id ? updatedActivity : activity))
						setStore({ activities: updatedActivities })
						return { success: true, data: updatedActivity }
					} else {
						const error = await response.json()
						return { success: false, error: error.error || "Failed to update activity" }
					}
				} catch (error) {
					console.error("Error updating activity:", error)
					return { success: false, error: error.message }
				}
			},

			deleteActivity: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/activities/${id}`, {
						method: "DELETE",
					})

					if (response.ok) {
						const store = getStore()
						const updatedActivities = store.activities.filter((activity) => activity.id !== id)
						setStore({ activities: updatedActivities })
						return { success: true }
					} else {
						const error = await response.json()
						return { success: false, error: error.error || "Failed to delete activity" }
					}
				} catch (error) {
					console.error("Error deleting activity:", error)
					return { success: false, error: error.message }
				}
			},
			addClass: async (teacher_id, name, description, capacity, price, age, time, image) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/classes", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ teacher_id, name, description, capacity, price, age, time, image }),
					})

					if (!response.ok) {
						const errorData = await response.json()
						throw new Error(errorData.error || "Failed to create class")
					}

					const data = await response.json()
					return { success: true, data }
				} catch (error) {
					console.error("Class Error:", error.message)
					return { success: false, error: error.message }
				}
			},
			getVirtualClasses: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/virtual-classes")
					if (response.ok) {
						const data = await response.json()
						setStore({ parentvirtualClasses: data })
					}
				} catch (error) {
					console.error("Error fetching parent virtual classes:", error)
				}
			},
			deleteClass: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/classes/${id}`, {
						method: "DELETE",
					});

					if (response.ok) {
						return { success: true };
					} else {
						console.error("Error deleting class:", response.status);
						return { success: false, error: `Status: ${response.status}` };
					}
				} catch (error) {
					console.error("Error deleting class:", error);
					return { success: false, error: error.message };
				}
			},
			updateClass: async (id, classData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/classes/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(classData),
					})

					if (response.ok) {
						const updatedClass = await response.json()
						const store = getStore()
						const updatedClasses = store.classes.map((classes) => (classes.id === id ? updatedClass : classes))
						setStore({ classes: updatedClasses })
						return updatedClass
					} else {
						console.error("Error updating client:", response.status)
					}
				} catch (error) {
					console.error("Error updating client:", error)
				}
			},
			fetchEvents: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/events")
					if (response.ok) {
						const data = await response.json()
						setStore({ events: data })
					} else {
						console.error("Error fetching events:", response.status)
					}
				} catch (error) {
					console.error("Error fetching events:", error)
					return null
				}
			},
			deleteEvent: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${id}`, {
						method: "DELETE",
					});

					if (response.ok) {
						return { success: true };
					} else {
						console.error("Error deleting event:", response.status);
						return { success: false, error: `Status: ${response.status}` };
					}
				} catch (error) {
					console.error("Error deleting events:", error);
					return { success: false, error: error.message };
				}
			},
			addEvent: async (name, description, start_time, end_time, image) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/events", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ name, description, start_time, end_time, image }),
					})

					if (!response.ok) {
						const errorData = await response.json()
						throw new Error(errorData.error || "Failed to create event")
					}

					const data = await response.json()
					return { success: true, data }
				} catch (error) {
					console.error("Event Error:", error.message)
					return { success: false, error: error.message }
				}
			},
			updateEvent: async (id, eventData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(eventData),
					})

					if (response.ok) {
						const updatedEvent = await response.json()
						const store = getStore()
						const updatedEvents = store.events.map((events) => (events.id === id ? updatedEvent : events))
						setStore({ events: updatedEvents })
						return updatedEvent
					} else {
						console.error("Error updating event:", response.status)
					}
				} catch (error) {
					console.error("Error updating event:", error)
				}
			},
			fetchTeachers: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/teachers")
					if (response.ok) {
						const data = await response.json()
						setStore({ teachers: data })
						return { success: true, data }
					} else {
						console.error("Error fetching teachers:", response.status)
						return { success: false, error: "Failed to fetch activities" }
					}
				} catch (error) {
					console.error("Error fetching activities:", error)
					return { success: false, error: error.message }
				}
			},
			fetchServices: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/services")
					if (response.ok) {
						const data = await response.json()
						setStore({ services: data })
						return { success: true, data }
					} else {
						console.error("Error fetching services:", response.status)
						return { success: false, error: "Failed to fetch services" }
					}
				} catch (error) {
					console.error("Error fetching activities:", error)
					return { success: false, error: error.message }
				}
			},
			addService: async (name, description, image) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/services", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ name, description, image }),
					})

					if (!response.ok) {
						const errorData = await response.json()
						throw new Error(errorData.error || "Failed to create event")
					}

					const data = await response.json()
					return { success: true, data }
				} catch (error) {
					console.error("Service Error:", error.message)
					return { success: false, error: error.message }
				}
			},
			updateService: async (id, serviceData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/services/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(serviceData),
					})

					if (response.ok) {
						const updatedService = await response.json()
						const store = getStore()
						const updatedServices = store.services.map((services) => (services.id === id ? updatedService : services))
						setStore({ services: updatedServices })
						return updatedService
					} else {
						console.error("Error updating service:", response.status)
					}
				} catch (error) {
					console.error("Error updating service:", error)
				}
			},
			deleteService: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/services/${id}`, {
						method: "DELETE",
					});

					if (response.ok) {
						return { success: true };
					} else {
						console.error("Error deleting service:", response.status);
						return { success: false, error: `Status: ${response.status}` };
					}
				} catch (error) {
					console.error("Error deleting service:", error);
					return { success: false, error: error.message };
				}
			},
			fetchGallery: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/gallery")
					if (response.ok) {
						const data = await response.json()
						setStore({ gallery: data })
						return { success: true, data }
					} else {
						console.error("Error fetching gallery:", response.status)
						return { success: false, error: "Failed to fetch gallery" }
					}
				} catch (error) {
					console.error("Error fetching gallery:", error)
					return { success: false, error: error.message }
				}
			},
			updateGallery: async (id, galleryData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/gallery/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(galleryData),
					})

					if (response.ok) {
						const updatedGallery = await response.json()
						const store = getStore()
						const updatedGalleries = store.gallery.map((gallery) => (gallery.id === id ? updatedGallery : gallery))
						setStore({ gallery: updatedGalleries })
						return updatedGallery
					} else {
						console.error("Error updating service:", response.status)
					}
				} catch (error) {
					console.error("Error updating service:", error)
				}
			},
			addGallery: async (name, image) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/gallery", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ name, image }),
					})

					if (!response.ok) {
						const errorData = await response.json()
						throw new Error(errorData.error || "Failed to create image")
					}

					const data = await response.json()
					return { success: true, data }
				} catch (error) {
					console.error("gallery Error:", error.message)
					return { success: false, error: error.message }
				}
			},
			deleteGallery: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/gallery/${id}`, {
						method: "DELETE",
					});

					if (response.ok) {
						return { success: true };
					} else {
						console.error("Error deleting image:", response.status);
						return { success: false, error: `Status: ${response.status}` };
					}
				} catch (error) {
					console.error("Error deleting image:", error);
					return { success: false, error: error.message };
				}
			},
			// Datos del usuario
			fetchUserData: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/user`)
					if (!resp.ok) throw new Error("Failed to fetch user data")
					const data = await resp.json()
					setStore({ user: data })
				} catch (error) {
					console.error("Error fetching user data:", error)
				}
			},

			// Datos del padre
			fetchParentData: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/parents")
					const data = await resp.json()

					setStore({ parentData: data })
				} catch (error) {
					console.error("Error fetching parent data:", error)
				}
			},

			// Hijos
			fetchParentChildren: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/children")
					const data = await resp.json()
					setStore({ parentChildren: data })
				} catch (error) {
					console.error("Error fetching parent children:", error)
				}
			},
			addChild: async (childData) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/children`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(childData),
					})
					if (!resp.ok) throw new Error("Failed to add child")
					const newChild = await resp.json()
					const store = getStore()
					setStore({ parentChildren: [...store.parentChildren, newChild] })
					return true
				} catch (error) {
					console.error("Error adding child:", error)
					return false
				}
			},
			// Horario
			fetchParentSchedule: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/parent_schedules`)
					if (!resp.ok) throw new Error("Failed to fetch parent schedule")
					const data = await resp.json()
					setStore({ parentSchedule: data })
				} catch (error) {
					console.error("Error fetching parent schedule:", error)
				}
			},

			// Pagos
			fetchParentPayments: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/parent_payments`)
					if (!resp.ok) throw new Error("Failed to fetch parent payments")
					const data = await resp.json()
					setStore({ parentPayments: data })
				} catch (error) {
					console.error("Error fetching parent payments:", error)
				}
			},

			// Actividades
			fetchParentActivities: async () => {

				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/parent_activities`)

					const data = await resp.json()

					setStore({ parentActivities: data })
				} catch (error) {
					console.error("Error fetching parent activities:", error)
				}
			},

			addParentActivity: async (activityData) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/add_parent_activity", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(activityData),
					})
					const data = await resp.json()
					const store = getStore()
					setStore({ parentActivities: [...store.parentActivities, data] })
				} catch (error) {
					console.error("Error adding parent activity:", error)
				}
			},

			// Configuración
			fetchParentSettings: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/parent_settings`)
					if (!resp.ok) throw new Error("Failed to fetch parent settings")
					const data = await resp.json()
					console.log(data)
					setStore({ parentSettings: data })
				} catch (error) {
					console.error("Error fetching parent settings:", error)
				}
			},

			updateParentSettings: async (settings) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/parent_settings`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(settings),
					})
					if (!resp.ok) throw new Error("Failed to update parent settings")
					const data = await resp.json()
					setStore({ parentSettings: data })
				} catch (error) {
					console.error("Error updating parent settings:", error)
				}
			},

			// Clases virtuales
			fetchParentVirtualClasses: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/parent_virtual_classes`)
					if (!resp.ok) throw new Error("Failed to fetch parent virtual classes")
					const data = await resp.json()
					setStore({ parentVirtualClasses: data })
				} catch (error) {
					console.error("Error fetching parent virtual classes:", error)
				}
			},

			// Mensajes
			fetchMessages: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/messagesP`)
					if (!resp.ok) throw new Error("Failed to fetch messages")
					const data = await resp.json()
					console.log(data)
					setStore({ messages: data })
				} catch (error) {
					console.error("Error fetching messages:", error)
				}
			},

			sendMessage: async (message) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/messages`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(message),
					})
					if (!resp.ok) throw new Error("Failed to send message")
					const data = await resp.json()
					setStore({ messages: [...store.messages, data] })
				} catch (error) {
					console.error("Error sending message:", error)
				}
			},

			// Notificaciones
			fetchNotifications: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/notifications`)
					if (!resp.ok) throw new Error("Failed to fetch notifications")
					const data = await resp.json()
					setStore({ notifications: data })
				} catch (error) {
					console.error("Error fetching notifications:", error)
				}
			},

			markNotificationAsRead: async (notificationId) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/notifications/${notificationId}`, {
						method: "PUT",
					})
					if (!resp.ok) throw new Error("Failed to mark notification as read")
					const updatedNotifications = store.notifications.map((notif) =>
						notif.id === notificationId ? { ...notif, read: true } : notif,
					)
					setStore({ notifications: updatedNotifications })
				} catch (error) {
					console.error("Error marking notification as read:", error)
				}
			},
			fetchSettings: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/settings`)
					if (!resp.ok) throw new Error("Failed to fetch settings")
					const data = await resp.json()
					
					setStore({ settings: data[0] })
				} catch (error) {
					console.error("Error fetching messages:", error)
				}
			},
			updateSettings: async (id, settingsData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/settings/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(settingsData),
					})

					if (response.ok) {
						const updatedSettings = await response.json()
						console.log('Respuesta de la API:', updatedSettings);
						const store = getStore()
						const updatedSetting = store.settings.map((settings) => (settings.id === id ? updatedSettings : settings))
						setStore({ settings: updatedSetting })
						return updatedSettings
					} else {
						console.error("Error updating settings:", response.status)
					}
				} catch (error) {
					console.error("Error updating settings:", error)
				}
			},
			addAdmin:  async () => {
				try {
				
					const response = await fetch(`${process.env.BACKEND_URL}/api/create_admin`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						}
					});
			
					if (!response.ok) {
						throw new Error('Error al crear el admin: ' + response.statusText);
					}
				} catch (error) {
					console.error('Error al crear el admin:', error.message);
		
				}
			},
			
			
			

			updateSubscription: async (id, subscriptionData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/subscription/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(subscriptionData),
					})

					if (response.ok) {
						const updatedSubscription = await response.json()
						const store = getStore()
						const updatedSubscriptions = store.subscriptions.map((subscription) => (subscription.id === id ? updatedSubscription : subscription))
						setStore({ subscriptions: updatedSubscriptions })
						return updatedSubscription
					} else {
						console.error("Error updating subscription:", response.status)
					}
				} catch (error) {
					console.error("Error updating subscription:", error)
				}
			},

			//   deleteSubscription: async (id) => {
			// 	try {
			// 	  const response = await fetch(`${process.env.BACKEND_URL}/api/subscriptions/${id}`, {
			// 		method: "DELETE",
			// 	  })

			// 	  if (response.ok) {
			// 		const store = getStore()
			// 		const updatedSubscription = store.subscriptions.filter((subscription) => subscription.id !== id)
			// 		setStore({ subscriptions: updatedSubscription })
			// 	  } else {
			// 		console.error("Error deleting subscription:", response.status)
			// 	  }
			// 	} catch (error) {
			// 	  console.error("Error deleting subscription:", error)
			// 	}
			//   },
			deleteSubscription: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/subscriptions/${id}`, {
						method: "DELETE",
					});

					if (response.ok) {
						return { success: true };
					} else {
						console.error("Error deleting subscription:", response.status);
						return { success: false, error: `Status: ${response.status}` };
					}
				} catch (error) {
					console.error("Error deleting subscription:", error);
					return { success: false, error: error.message };
				}
			},
			fetchSubscriptions: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/subscriptions`)
					if (!resp.ok) throw new Error("Failed to fetch subscriptions")
					const data = await resp.json()
					console.log(data)
					setStore({ subscriptions: data })
				} catch (error) {
					console.error("Error fetching subscriptions:", error)
				}
			},
			addSubscription: async (student_name, class_name, start_date) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/subscriptions", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ student_name, class_name, start_date }),
					})

					if (!response.ok) {
						const errorData = await response.json()
						throw new Error(errorData.error || "Failed to create subscription")
					}

					const data = await response.json()
					return { success: true, data }
				} catch (error) {
					console.error("subscription Error:", error.message)
					return { success: false, error: error.message }
				}
			},


			//TEACHER
			getTeacherClasses: async () => {
				const store = getStore(); 
				const token = store.token || localStorage.getItem("token");

				if (!token) {
					console.error("No token found");
					return;
				}

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/teacher/classes`, {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`,  
						},
					});

					const data = await response.json();
					console.log("Clases recibidas:", data); 

					if (response.ok) {
						setStore({ teacherClasses: data.classes || [] });
					} else {
						console.error("Error al obtener las clases:", data.error);
					}
				} catch (error) {
					console.error("Error en la solicitud de clases:", error);
				}
			},
			setStore: (newStore) => {
				setStore(newStore);
			  },
		}
	}
}
export default getState



