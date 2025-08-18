import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Navbar } from "./components/Navbar"
export const Hacking = () => {
     const [oldupdate, newupdate] = useState(true);
  const [oldarray] = useState([
    {
      id: "68579bb0c30e07f7639969cd",
      title: "Web Development",
      description: `
Web development is one of the most sought-after skills in the digital world. 
It covers frontend (what users see) and backend (server-side logic), allowing you to build complete applications. 
Modern web development requires knowledge of frameworks, databases, version control, and deployment strategies.
      `,
      technologies: [
        { name: "HTML", details: "HTML structures the web content using tags for headings, paragraphs, images, links, forms, and semantic elements." },
        { name: "CSS", details: "CSS styles web pages, controlling layouts, colors, typography, animations, and responsiveness for different devices." },
        { name: "JavaScript", details: "JavaScript adds interactivity, from handling events to building dynamic web apps and integrating APIs." },
        { name: "React.js", details: "React is a popular frontend library for building reusable components and responsive UI efficiently." },
        { name: "Node.js", details: "Node.js allows running JavaScript on the server-side, creating APIs and handling server logic." },
        { name: "Databases", details: "Databases like MySQL, PostgreSQL, and MongoDB store and manage structured or unstructured data for applications." },
        { name: "Version Control", details: "Git & GitHub help manage project code, track changes, and collaborate with teams." }
      ],
      youtubeRecommendations: [
        { title: "Web Development Roadmap 2025", link: "https://www.youtube.com/watch?v=FJDVKeh7RJI" },
        { title: "React JS Full Course", link: "https://www.youtube.com/watch?v=bMknfKXIFA8" }
      ]
    },
    {
      id: "68579bb0c30e07f7639969d1",
      title: "Cloud Hosting",
      description: `
Cloud hosting provides scalable, reliable infrastructure for hosting websites and apps. 
It allows automatic scaling, security, and global accessibility. Developers often start with basic platforms before moving to enterprise-level cloud services.
      `,
      technologies: [
        { name: "AWS", details: "Amazon Web Services offers scalable solutions like EC2, S3, RDS, and Lambda functions for hosting and serverless computing." },
        { name: "Azure", details: "Microsoft Azure provides cloud hosting, databases, DevOps pipelines, and AI-powered services for applications." },
        { name: "Google Cloud", details: "GCP offers scalable infrastructure, storage, APIs, and machine learning integration for modern apps." },
        { name: "Docker", details: "Docker containerizes applications, ensuring they run consistently in any environment." },
        { name: "Kubernetes", details: "Kubernetes orchestrates containers, managing scaling, deployment, and load balancing automatically." },
        { name: "CI/CD", details: "Continuous Integration and Deployment pipelines automate building, testing, and deploying apps on the cloud." }
      ],
      youtubeRecommendations: [
        { title: "Cloud Hosting Explained", link: "https://www.youtube.com/watch?v=mxT233EdY5c" },
        { title: "Deploy MERN App to Render", link: "https://www.youtube.com/watch?v=1zPgJ1A2V3Y" }
      ]
    },
    {
      id: "68579bb0c30e07f7639969cf",
      title: "SEO Optimization",
      description: `
SEO (Search Engine Optimization) ensures your website ranks high in search results. 
It drives organic traffic and improves visibility. A strong SEO strategy includes on-page, off-page, and technical optimizations.
      `,
      technologies: [
        { name: "On-Page SEO", details: "Optimize meta tags, headings, content, images, and URLs to make pages search-engine friendly." },
        { name: "Technical SEO", details: "Ensure fast page load, mobile-friendliness, sitemap, robots.txt, structured data, and Core Web Vitals." },
        { name: "Off-Page SEO", details: "Build backlinks, guest posts, and increase domain authority to improve search rankings." },
        { name: "Keyword Research", details: "Use tools like SEMrush or Ahrefs to target the right keywords for your content." },
        { name: "Analytics", details: "Track website performance with Google Analytics and Search Console to make data-driven improvements." }
      ],
      youtubeRecommendations: [
        { title: "SEO Roadmap for Beginners", link: "https://www.youtube.com/watch?v=gmB_TC92I8w" },
        { title: "Technical SEO Crash Course", link: "https://www.youtube.com/watch?v=bn8qsi8X2kY" }
      ]
    },
    {
      id: "68579bb0c30e07f7639969d0",
      title: "App Development",
      description: `
App development covers creating mobile and desktop applications. 
You can build native apps or cross-platform apps using modern frameworks. 
Understanding UI/UX, APIs, authentication, notifications, and offline storage is essential.
      `,
      technologies: [
        { name: "React Native", details: "Build cross-platform mobile apps for Android and iOS with a single codebase." },
        { name: "Flutter", details: "Flutter allows creating visually rich apps with high performance for multiple platforms." },
        { name: "Android Development", details: "Use Java or Kotlin to build native Android applications with full device integration." },
        { name: "iOS Development", details: "Swift or Objective-C is used to create native iOS applications for iPhones and iPads." },
        { name: "Firebase", details: "Firebase provides real-time databases, authentication, cloud functions, and notifications." },
        { name: "Testing Tools", details: "Use Jest, Appium, or Detox to ensure app reliability and bug-free releases." }
      ],
      youtubeRecommendations: [
        { title: "React Native Full Course", link: "https://www.youtube.com/watch?v=0-S5a0eXPoc" },
        { title: "Flutter Roadmap 2025", link: "https://www.youtube.com/watch?v=VPvVD8t02U8" }
      ]
    },
    {
      id: "68579bb0c30e07f7639969ce",
      title: "Graphic Design",
      description: `
Graphic design is creating visually appealing content for digital and print media. 
It involves understanding color, typography, layout, and UI/UX principles. Designers use multiple tools to bring ideas to life.
      `,
      technologies: [
        { name: "Adobe Photoshop", details: "Used for photo editing, graphics creation, and visual effects." },
        { name: "Adobe Illustrator", details: "Vector graphics tool for logos, illustrations, and scalable designs." },
        { name: "Figma", details: "Collaborative design tool for UI/UX, wireframes, and prototypes." },
        { name: "Canva", details: "User-friendly online tool for quick graphics, social media posts, and presentations." },
        { name: "Motion Graphics", details: "After Effects enables animation and dynamic visual content for videos." },
        { name: "3D Design", details: "Blender or Cinema 4D allows creating 3D models and animations." }
      ],
      youtubeRecommendations: [
        { title: "Graphic Design for Beginners", link: "https://www.youtube.com/watch?v=Vv9rY1gYk0M" },
        { title: "Figma UI/UX Tutorial", link: "https://www.youtube.com/watch?v=jwCmIBJ8Jtc" }
      ]
    }
  ])

  const { id } = useParams()
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const checking = oldarray.find((curr) => curr.id === id)
    setSelected(checking)
  }, [id, oldarray])

  if (!selected) {
    return <h1 className="text-red-500 text-xl">Course Not Found</h1>
  }

  return (
    <>
        <Navbar value={newupdate} value2={oldupdate} />
    <div className="p-6 max-w-4xl mx-auto bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400">{selected.title}</h1>
      <p className="whitespace-pre-line text-gray-300 mb-6">{selected.description}</p>

      {/* Technologies Section */}
      <h2 className="text-2xl font-semibold mt-6 mb-3 text-cyan-400">🛠 Technologies Covered</h2>
      <ul className="space-y-3">
        {selected.technologies?.map((tech, index) => (
          <li key={index} className="border border-gray-700 p-4 rounded-lg bg-gray-900 shadow-md">
            <h3 className="text-lg font-bold text-green-400">{tech.name}</h3>
            <p className="text-gray-300">{tech.details}</p>
          </li>
        ))}
      </ul>

      {/* YouTube Section */}
      <h2 className="text-2xl font-semibold mt-8 mb-3 text-purple-400">📺 YouTube Recommendations</h2>
      <ul className="list-disc ml-6 space-y-2">
        {selected.youtubeRecommendations.map((vid, index) => (
          <li key={index}>
            <a
              href={vid.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600 hover:underline"
            >
              {vid.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}
