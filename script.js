// GET ELEMENTS
// -------------------------

const exportPDF = document.querySelector("#exportBtn");
const nameInput = document.querySelector("#nameInput");
const jobInput = document.querySelector("#jobInput");
const emailInput = document.querySelector("#emailInput");
const phoneInput = document.querySelector("#phoneInput");
const linkedinInput = document.querySelector("#linkedinInput");
const githubInput = document.querySelector("#GithubInput");
const aboutInput = document.querySelector("#aboutInput");

const resumeName = document.querySelector("#resumeName");
const resumeJob = document.querySelector("#resumeJob");
// const resumeContact = document.querySelector("#resumeContact");
const resumeContact = document.querySelector("#resumeContact");
const resumeEmail = document.querySelector("#resumeEmail");
const resumePhone = document.querySelector("#resumePhone");
const resumeLinkedin = document.querySelector("#resumeLinkedin");
const resumeGithub = document.querySelector("#resumeGithub");
const resumeAbout = document.querySelector("#resumeAbout");

const projectContainer = document.querySelector("#projectsContainer");
const projectNameInput = document.querySelector("#projectNameInput");
const projectDescriptionInput = document.querySelector(
  "#projectDescriptionInput",
);
const addProjectBtn = document.querySelector("#addProjectBtn");
const resumeProjects = document.querySelector("#resumeProjects");

const skillInput = document.querySelector("#skillInput");
const skillsContainer = document.querySelector("#skillsContainer");
const resumeSkills = document.querySelector("#resumeSkills");
// -------------------------
// LIVE PREVIEW
// -------------------------

const resumeData = {
  name: "",
  job: "",
  email: "",
  phone: "",
  linkedin:"",
  Github:"",
  about: ""
};

function bindInput(input, key) {
  input.addEventListener("input", () => {
    resumeData[key] = input.value;
    renderResume();
  });
}
bindInput(nameInput, "name");
bindInput(jobInput, "job");
bindInput(emailInput, "email");
bindInput(phoneInput, "phone");
bindInput(linkedinInput, "linkedin");
bindInput(githubInput, "Github");
bindInput(aboutInput, "about");

function renderResume() {
  resumeName.textContent = resumeData.name || "Your Name";
  resumeJob.textContent = resumeData.job || "Job Title";
  resumeEmail.textContent = resumeData.email || "example@gmail.com";
  resumePhone.textContent = resumeData.phone || "+92 000 0000000";

  resumeLinkedin.textContent = resumeData.linkedin || "LinkedIn";
  resumeLinkedin.href = resumeData.linkedin;

  resumeGithub.textContent = resumeData.Github || "Github";
  resumeGithub.href = resumeData.Github;

  resumeAbout.textContent = resumeData.about || "Write About Your Self";
}
// PROJECTS SECTION
let projects = [];
addProjectBtn.addEventListener("click", () => {
  let project = {
    name: "",
    tools: "",
    description: "",
    github: "",
    liveDemo: "",
  };

  projects.push(project);

  renderProjects();
});

function bindProject(input, project, key) {
  input.addEventListener("input", () => {
    project[key] = input.value;
    renderResumeProject();
  });
}

function renderProjects() {
  projectContainer.innerHTML = "";

  projects.forEach((project, index) => {
    const projectFields = document.createElement("div");
    projectFields.classList.add("project-field");
    const projectHeading = document.createElement("h3");

    projectHeading.textContent = `project-${index + 1}`;

    const projectName = document.createElement("input");
    projectName.placeholder = "Project name";

    const projecttools = document.createElement("input");
    projecttools.placeholder = "Tools Used (e.g HTML, CSS, JS etc)";

    const projectDescription = document.createElement("textarea");
    projectDescription.placeholder = "Project description";

    const links = document.createElement("div");
    links.classList.add("links");

    const github = document.createElement("input");
    github.placeholder = "Github Link";
    const demo = document.createElement("input");
    demo.placeholder = "Live Demo";

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "Remove Project";

    projectName.value = project.name;
    projectDescription.value = project.description;
    github.value = project.github;
    demo.value = project.liveDemo;

    bindProject(projectName, project, "name");
    bindProject(projecttools, project, "tools");
    bindProject(projectDescription, project, "description");
    bindProject(github, project, "github");
    bindProject(demo, project, "liveDemo");

    links.appendChild(github);
    links.appendChild(demo);

    projectFields.appendChild(projectHeading);
    projectFields.appendChild(projectName);
    projectFields.appendChild(projecttools);
    projectFields.appendChild(projectDescription);
    projectFields.appendChild(links);
    projectFields.appendChild(removeBtn);

    projectContainer.appendChild(projectFields);

    removeBtn.addEventListener("click", () => {
      projects.splice(index, 1);
      renderProjects();
      renderResumeProject();
    });
  });
}

function renderResumeProject() {
  resumeProjects.innerHTML = "";
  projects.forEach((project, index) => {
    const projectBox = document.createElement("div");
    projectBox.classList.add("project-container");

    const heading = document.createElement("h3");
    heading.classList.add("project-name");
    heading.textContent = project.name;

    const tools = document.createElement("p");
    tools.classList.add("tools");
    tools.textContent = project.tools;

    const description = document.createElement("p");
    description.classList.add("description");
    description.textContent = project.description;

    const links = document.createElement("div");
    links.classList.add("links-container");

    if (project.github) {
      const githubLabel = document.createElement("span");
      githubLabel.textContent = "Github Link: ";

      const github = document.createElement("a");
      github.classList.add("github-repo");
      github.textContent = project.github;
      github.href = project.github;
      github.target = "_blank";

      const gitContainer = document.createElement("div");
      gitContainer.classList.add("git-container")
      gitContainer.appendChild(githubLabel);
      gitContainer.appendChild(github);

      links.appendChild(gitContainer);
    }

    if (project.liveDemo) {
      const liveDemoLabel = document.createElement("span");
      liveDemoLabel.textContent = "Live Demo: ";

      const liveDemo = document.createElement("a");
      liveDemo.classList.add("live-Demo");
      liveDemo.textContent = project.liveDemo;
      liveDemo.href = project.liveDemo;
      liveDemo.target = "_blank";

       const demoContainer = document.createElement("div");
      demoContainer.classList.add("demo-container")
      demoContainer.appendChild(liveDemoLabel);
      demoContainer.appendChild(liveDemo);

      links.appendChild(demoContainer);
    }

    projectBox.appendChild(heading);
    projectBox.appendChild(tools);
    projectBox.appendChild(description);
    projectBox.appendChild(links);

    resumeProjects.appendChild(projectBox);
  });
}

// SKILLS
let skills = [];

skillInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const skillinput = skillInput.value.trim();

    if (skillinput === "") {
      return;
    } else {
      skills.push(skillinput);
    }

    renderSkills();
    renderSkillsTag();
    skillInput.value = "";
  }
});

function renderSkillsTag() {
  skillsContainer.innerHTML = "";
  skills.forEach((skill, index) => {
    const tag = document.createElement("div");
    tag.classList.add("skill-tag");
    tag.innerHTML = `${skill}<span class="skill-remove">×</span>`;
    tag.querySelector(".skill-remove").addEventListener("click", () => {
      skills.splice(index, 1);
      renderSkills();
      renderSkillsTag();
    });
    skillsContainer.appendChild(tag);
  });
}

function renderSkills() {
  resumeSkills.innerHTML = "";
  skills.forEach((skillset) => {
    resumeSkills.innerHTML += `<span class="resumeSkill">${skillset}</span>`;
  });
}
// Export Resume
exportPDF.addEventListener("click", () => {
  window.print();
});