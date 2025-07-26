// "use client"
// import { useEffect, useState } from "react"

// export default function CreateProjectModal({ onClose, onSubmit }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     priority: "medium",
//     deadline: "",
//     budget: "",
//     teamSize: "",
//   })

//   // const handleSubmit = (e) => {
//   //   e.preventDefault()
//   //   onSubmit({
//   //     ...formData,
//   //     status: "active",
//   //   })
//   // }

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch("http://localhost:5000/api/projects", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`, // update if you store token elsewhere
//       },
//       body: JSON.stringify({
//         name: formData.name,
//         description: formData.description,
//         priority: formData.priority,
//         deadline: formData.deadline,
//         budget: Number(formData.budget),
//         teamMembers: [], // You can later add team handling
//         technologies: [],
//       }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "Failed to create project");
//     }

//     console.log("Project created successfully:", data);
//     onSubmit?.(data); // Trigger parent callback (optional)
//     onClose(); // Close modal

//   } catch (error) {
//     console.error("Error creating project:", error.message);
//     alert(error.message);
//   }
// };



// const suggestions = {
//   ecommerce: "An online shopping platform with features like product listings, cart, payment gateway integration, and order management.",
//   food: "A food delivery app for browsing restaurant menus, placing orders, real-time tracking, and reviewing meals.",
//   chat: "A real-time chat application with support for private messaging, group chats, typing indicators, and file sharing.",
//   hrms: "A Human Resource Management System for employee profiles, attendance, payroll, leave tracking, and performance management.",
//   portfolio: "A personal portfolio website to highlight skills, showcase projects, and include contact and resume sections.",
//   crm: "A Customer Relationship Management system for managing client interactions, sales pipelines, and follow-up reminders.",
//   blog: "A blogging platform with features for creating, editing, commenting, and managing articles with user authentication.",
//   task: "A task management system for creating, assigning, and tracking tasks with deadlines, priorities, and notifications.",
//   inventory: "An inventory management system to track stock levels, purchases, sales, and generate low-stock alerts.",
//   billing: "An invoicing and billing solution for generating and sending invoices, tracking payments, and customer records.",
//   education: "An e-learning platform with video courses, progress tracking, quizzes, and certification generation.",
//   healthcare: "A healthcare management system for scheduling appointments, patient profiles, prescriptions, and lab reports.",
//   finance: "A financial dashboard for tracking income, expenses, transactions, and generating insightful analytics.",
//   weather: "A weather forecasting application using APIs to display temperature, humidity, and weekly forecasts by location.",
//   movie: "A movie search and streaming platform with movie details, trailers, ratings, and watchlist functionality.",
//   news: "A news aggregator app fetching top headlines, filtering by category, and enabling bookmarking of articles.",
//   travel: "A travel booking app for flights, hotels, and itineraries with integrated payment and confirmation features.",
//   quiz: "An interactive quiz application with multiple-choice questions, scoring, and leaderboards.",
//   banking: "An online banking platform with account management, fund transfers, statements, and authentication.",
//   todo: "A simple to-do list app for adding, editing, checking off, and removing daily tasks.",
//   notes: "A note-taking app with support for rich text, tags, folders, and cloud syncing.",
//   music: "A music streaming app with playlists, song search, and real-time playback controls.",
//   video: "A video-sharing platform with upload, playback, comments, and content categorization.",
//   expense: "An expense tracker to monitor personal or business spending and categorize expenses with charts.",
//   event: "An event management app for creating, scheduling, and promoting events with RSVP tracking.",
//   gym: "A fitness and gym management system with workout plans, trainer schedules, and member tracking.",
//   resume: "An online resume builder tool that allows users to create, preview, and export resumes in multiple formats.",
//   calendar: "A calendar scheduling app for creating events, setting reminders, and viewing monthly agendas.",
//   feedback: "A feedback collection tool to gather customer reviews and generate insights using data visualization.",
//   ai: "An AI-powered assistant integrating machine learning for automation, predictions, or chatbot interactions.",
//   ml: "A machine learning model deployment dashboard to upload, train, test, and evaluate datasets.",
//   admin: "An admin dashboard template with analytics, user management, system monitoring, and notifications.",
//   marketplace: "A multi-vendor marketplace for product listings, vendor profiles, and transaction management.",
//   ride: "A ride-booking app with real-time driver tracking, fare calculation, and payment integration.",
//   hotel: "A hotel booking app to search availability, view rooms, and complete reservations.",
//   freelance: "A freelance project platform for clients to post jobs, hire freelancers, and manage contracts.",
//   donation: "A donation platform for nonprofits to list causes, accept donations, and track campaigns.",
//   auction: "An online auction system for bidding on products with timers and winner selection logic.",
//   booking: "A booking system for services like salons, doctors, or rentals with time slots and notifications.",
//   scanner: "A QR/Barcode scanner app that reads and interprets codes with optional history tracking.",
//   nft: "An NFT marketplace to mint, view, buy, and sell digital collectibles with blockchain integration.",
//   blogcms: "A content management system for creating and managing blog posts with admin control and rich editor.",
//   forum: "A community forum platform with threads, replies, moderation tools, and user profiles.",
//   job: "A job portal where users can post, search, and apply for jobs with resume uploads and filtering.",
//   realestate: "A real estate listing platform to view, filter, and inquire about properties for sale or rent.",
//   school: "A school management system with student records, grades, attendance, and timetable features.",
//   banking: "A core banking application to manage savings, loans, transactions, and user verification securely.",
//   crowdfunding: "A crowdfunding platform to launch fundraising campaigns and receive donations securely.",
//   support: "A customer support ticketing system to submit, manage, and resolve customer queries with admin response tools.",
// }


// useEffect(() => {
//   const nameLower = formData.name.toLowerCase();

//   for (const keyword in suggestions) {
//     if (nameLower.includes(keyword)) {
//       if (
//         formData.description.trim() === "" ||
//         Object.values(suggestions).includes(formData.description)
//       ) {
//         setFormData(prev => ({ ...prev, description: suggestions[keyword] }))
//       }
//       break;
//     }
//   }
// }, [formData.name])



//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
//       <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-medium text-gray-900">Create New Project</h3>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
//             <input
//               type="text"
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               placeholder="Enter project name"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <textarea
//               required
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               placeholder="Enter project description"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
//               <select
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={formData.priority}
//                 onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
//               >
//                 <option value="low">Low</option>
//                 <option value="medium">Medium</option>
//                 <option value="high">High</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
//               <input
//                 type="date"
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={formData.deadline}
//                 onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
//               <input
//                 type="text"
                
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={formData.budget}
//                 onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
//                 placeholder="$100,000"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
//               <input
//                 type="number"
//                 required
//                 min="1"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={formData.teamSize}
//                 onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
//                 placeholder="5"
//               />
//             </div>
//           </div>

//           <div className="flex justify-end space-x-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
//             >
//               Create Project
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }



"use client";
import { useEffect, useState } from "react";

export default function CreateProjectModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "medium",
    deadline: "",
    budget: "",
    teamSize: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          priority: formData.priority,
          deadline: formData.deadline,
          budget: Number(formData.budget),
          teamSize: formData.teamSize ? Number(formData.teamSize) : 1, // ✅ Now sending teamSize
          teamMembers: [],
          technologies: [],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create project");
      }

      console.log("Project created successfully:", data);
      onSubmit?.(data); // Update parent list
      onClose();
    } catch (error) {
      console.error("Error creating project:", error.message);
      alert(error.message);
    }
  };

  // Auto-fill description based on name
 const suggestions = {
  ecommerce: "An online shopping platform with features like product listings, cart, payment gateway integration, and order management.",
  food: "A food delivery app for browsing restaurant menus, placing orders, real-time tracking, and reviewing meals.",
  chat: "A real-time chat application with support for private messaging, group chats, typing indicators, and file sharing.",
  hrms: "A Human Resource Management System for employee profiles, attendance, payroll, leave tracking, and performance management.",
  portfolio: "A personal portfolio website to highlight skills, showcase projects, and include contact and resume sections.",
  crm: "A Customer Relationship Management system for managing client interactions, sales pipelines, and follow-up reminders.",
  blog: "A blogging platform with features for creating, editing, commenting, and managing articles with user authentication.",
  task: "A task management system for creating, assigning, and tracking tasks with deadlines, priorities, and notifications.",
  inventory: "An inventory management system to track stock levels, purchases, sales, and generate low-stock alerts.",
  billing: "An invoicing and billing solution for generating and sending invoices, tracking payments, and customer records.",
  education: "An e-learning platform with video courses, progress tracking, quizzes, and certification generation.",
  healthcare: "A healthcare management system for scheduling appointments, patient profiles, prescriptions, and lab reports.",
  finance: "A financial dashboard for tracking income, expenses, transactions, and generating insightful analytics.",
  weather: "A weather forecasting application using APIs to display temperature, humidity, and weekly forecasts by location.",
  movie: "A movie search and streaming platform with movie details, trailers, ratings, and watchlist functionality.",
  news: "A news aggregator app fetching top headlines, filtering by category, and enabling bookmarking of articles.",
  travel: "A travel booking app for flights, hotels, and itineraries with integrated payment and confirmation features.",
  quiz: "An interactive quiz application with multiple-choice questions, scoring, and leaderboards.",
  banking: "An online banking platform with account management, fund transfers, statements, and authentication.",
  todo: "A simple to-do list app for adding, editing, checking off, and removing daily tasks.",
  notes: "A note-taking app with support for rich text, tags, folders, and cloud syncing.",
  music: "A music streaming app with playlists, song search, and real-time playback controls.",
  video: "A video-sharing platform with upload, playback, comments, and content categorization.",
  expense: "An expense tracker to monitor personal or business spending and categorize expenses with charts.",
  event: "An event management app for creating, scheduling, and promoting events with RSVP tracking.",
  gym: "A fitness and gym management system with workout plans, trainer schedules, and member tracking.",
  resume: "An online resume builder tool that allows users to create, preview, and export resumes in multiple formats.",
  calendar: "A calendar scheduling app for creating events, setting reminders, and viewing monthly agendas.",
  feedback: "A feedback collection tool to gather customer reviews and generate insights using data visualization.",
  ai: "An AI-powered assistant integrating machine learning for automation, predictions, or chatbot interactions.",
  ml: "A machine learning model deployment dashboard to upload, train, test, and evaluate datasets.",
  admin: "An admin dashboard template with analytics, user management, system monitoring, and notifications.",
  marketplace: "A multi-vendor marketplace for product listings, vendor profiles, and transaction management.",
  ride: "A ride-booking app with real-time driver tracking, fare calculation, and payment integration.",
  hotel: "A hotel booking app to search availability, view rooms, and complete reservations.",
  freelance: "A freelance project platform for clients to post jobs, hire freelancers, and manage contracts.",
  donation: "A donation platform for nonprofits to list causes, accept donations, and track campaigns.",
  auction: "An online auction system for bidding on products with timers and winner selection logic.",
  booking: "A booking system for services like salons, doctors, or rentals with time slots and notifications.",
  scanner: "A QR/Barcode scanner app that reads and interprets codes with optional history tracking.",
  nft: "An NFT marketplace to mint, view, buy, and sell digital collectibles with blockchain integration.",
  blogcms: "A content management system for creating and managing blog posts with admin control and rich editor.",
  forum: "A community forum platform with threads, replies, moderation tools, and user profiles.",
  job: "A job portal where users can post, search, and apply for jobs with resume uploads and filtering.",
  realestate: "A real estate listing platform to view, filter, and inquire about properties for sale or rent.",
  school: "A school management system with student records, grades, attendance, and timetable features.",
  banking: "A core banking application to manage savings, loans, transactions, and user verification securely.",
  crowdfunding: "A crowdfunding platform to launch fundraising campaigns and receive donations securely.",
  support: "A customer support ticketing system to submit, manage, and resolve customer queries with admin response tools.",
}


  useEffect(() => {
    const nameLower = formData.name.toLowerCase();

    for (const keyword in suggestions) {
      if (nameLower.includes(keyword)) {
        if (
          formData.description.trim() === "" ||
          Object.values(suggestions).includes(formData.description)
        ) {
          setFormData((prev) => ({
            ...prev,
            description: suggestions[keyword],
          }));
        }
        break;
      }
    }
  }, [formData.name]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Create New Project</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter project name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter project description"
            />
          </div>

          {/* Priority and Deadline */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>
          </div>

          {/* Budget and Team Size */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                placeholder="$100,000"
              />
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
             <input
  type="number"
  required
  min="1"
  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  value={formData.teamSize}
  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
  placeholder="5"
/>

            </div> */}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

