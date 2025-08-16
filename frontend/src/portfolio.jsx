

import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PortfolioBuilder = () => {
  const [personal, setPersonal] = useState({ name: "", title: "", about: "" });
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contact, setContact] = useState({ email: "", phone: "" });
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const [skillInput, setSkillInput] = useState("");
  const [projectInput, setProjectInput] = useState({ name: "", desc: "" });
  const [eduInput, setEduInput] = useState({ school: "", degree: "", cgpa: "" });
  const [certInput, setCertInput] = useState("");
  const [achInput, setAchInput] = useState("");

  const resumeRef = useRef(); // For PDF

  // Handlers
  const handlePersonalChange = (e) => setPersonal({ ...personal, [e.target.name]: e.target.value });
  const handleContactChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

  const addSkill = () => {
    if (skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const addProject = () => {
    if (projectInput.name.trim() && projectInput.desc.trim()) {
      setProjects([...projects, projectInput]);
      setProjectInput({ name: "", desc: "" });
    }
  };

  const addEducation = () => {
    if (eduInput.school && eduInput.degree && eduInput.cgpa) {
      setEducation([...education, eduInput]);
      setEduInput({ school: "", degree: "", cgpa: "" });
    }
  };

  const addCertification = () => {
    if (certInput.trim()) {
      setCertifications([...certifications, certInput.trim()]);
      setCertInput("");
    }
  };

  const addAchievement = () => {
    if (achInput.trim()) {
      setAchievements([...achievements, achInput.trim()]);
      setAchInput("");
    }
  };

  // Download PDF
  const downloadPDF = () => {
    const input = resumeRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("portfolio.pdf");
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-12">
      <h1 className="text-4xl font-bold text-center mb-8">Portfolio Builder</h1>

      {/* Personal & Contact Info */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Personal Info</h2>
          <input type="text" name="name" placeholder="Full Name" value={personal.name} onChange={handlePersonalChange} className="w-full p-2 mb-3 rounded bg-gray-700 border border-gray-600" />
          <input type="text" name="title" placeholder="Title" value={personal.title} onChange={handlePersonalChange} className="w-full p-2 mb-3 rounded bg-gray-700 border border-gray-600" />
          <textarea name="about" rows="4" placeholder="About Me" value={personal.about} onChange={handlePersonalChange} className="w-full p-2 mb-3 rounded bg-gray-700 border border-gray-600" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Info</h2>
          <input type="email" name="email" placeholder="Email" value={contact.email} onChange={handleContactChange} className="w-full p-2 mb-3 rounded bg-gray-700 border border-gray-600" />
          <input type="text" name="phone" placeholder="Phone" value={contact.phone} onChange={handleContactChange} className="w-full p-2 mb-3 rounded bg-gray-700 border border-gray-600" />
        </div>
      </div>

      {/* Skills */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <div className="flex gap-2 mb-3">
          <input type="text" placeholder="Add Skill" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} className="p-2 rounded bg-gray-700 border border-gray-600 flex-1" />
          <button onClick={addSkill} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">Add</button>
        </div>
        <div className="flex flex-wrap gap-2">{skills.map((skill, i) => <span key={i} className="px-3 py-1 bg-blue-700 rounded">{skill}</span>)}</div>
      </div>

      {/* Projects */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <div className="flex flex-col gap-2 mb-3">
          <input type="text" placeholder="Project Name" value={projectInput.name} onChange={(e) => setProjectInput({ ...projectInput, name: e.target.value })} className="p-2 rounded bg-gray-700 border border-gray-600" />
          <input type="text" placeholder="Project Description" value={projectInput.desc} onChange={(e) => setProjectInput({ ...projectInput, desc: e.target.value })} className="p-2 rounded bg-gray-700 border border-gray-600" />
          <button onClick={addProject} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 w-max">Add Project</button>
        </div>
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        <div className="flex flex-col gap-2 mb-3">
          <input type="text" placeholder="School/College" value={eduInput.school} onChange={(e) => setEduInput({ ...eduInput, school: e.target.value })} className="p-2 rounded bg-gray-700 border border-gray-600" />
          <input type="text" placeholder="Degree / Qualification" value={eduInput.degree} onChange={(e) => setEduInput({ ...eduInput, degree: e.target.value })} className="p-2 rounded bg-gray-700 border border-gray-600" />
          <input type="text" placeholder="CGPA / Percentage" value={eduInput.cgpa} onChange={(e) => setEduInput({ ...eduInput, cgpa: e.target.value })} className="p-2 rounded bg-gray-700 border border-gray-600" />
          <button onClick={addEducation} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 w-max">Add Education</button>
        </div>
      </div>

      {/* Certifications */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Certifications</h2>
        <div className="flex gap-2 mb-3">
          <input type="text" placeholder="Certification Name" value={certInput} onChange={(e) => setCertInput(e.target.value)} className="p-2 rounded bg-gray-700 border border-gray-600 flex-1" />
          <button onClick={addCertification} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">Add</button>
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
        <div className="flex gap-2 mb-3">
          <input type="text" placeholder="Achievement" value={achInput} onChange={(e) => setAchInput(e.target.value)} className="p-2 rounded bg-gray-700 border border-gray-600 flex-1" />
          <button onClick={addAchievement} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">Add</button>
        </div>
      </div>

      {/* Resume Preview */}
      <div ref={resumeRef} className="mb-6 border border-gray-600 p-6 rounded bg-gray-800">
        <h2 className="text-3xl font-bold mb-4">{personal.name || "Your Name"}</h2>
        <p className="italic mb-2">{personal.title || "Title"}</p>
        <p className="mb-4">{personal.about || "About you..."}</p>

        <h3 className="text-xl font-semibold mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2 mb-4">{skills.map((skill, i) => <span key={i} className="px-3 py-1 bg-blue-700 rounded">{skill}</span>)}</div>

        <h3 className="text-xl font-semibold mb-2">Projects</h3>
        <div className="flex flex-col gap-2 mb-4">{projects.map((proj, i) => (
          <div key={i} className="border border-gray-700 p-2 rounded">
            <h4 className="font-semibold">{proj.name}</h4>
            <p>{proj.desc}</p>
          </div>
        ))}</div>

        <h3 className="text-xl font-semibold mb-2">Education</h3>
        <div className="flex flex-col gap-2 mb-4">{education.map((edu, i) => (
          <div key={i} className="border border-gray-700 p-2 rounded">
            <p><strong>{edu.school}</strong> - {edu.degree} ({edu.cgpa})</p>
          </div>
        ))}</div>

        <h3 className="text-xl font-semibold mb-2">Certifications</h3>
        <ul className="list-disc ml-6 mb-4">{certifications.map((cert, i) => <li key={i}>{cert}</li>)}</ul>

        <h3 className="text-xl font-semibold mb-2">Achievements</h3>
        <ul className="list-disc ml-6 mb-4">{achievements.map((ach, i) => <li key={i}>{ach}</li>)}</ul>

        <h3 className="text-xl font-semibold mb-2">Contact</h3>
        <p>Email: {contact.email || "your.email@example.com"}</p>
        <p>Phone: {contact.phone || "+91-0000000000"}</p>
      </div>

      <div className="text-center">
        <button onClick={downloadPDF} className="px-6 py-3 bg-green-600 rounded hover:bg-green-500">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PortfolioBuilder;
