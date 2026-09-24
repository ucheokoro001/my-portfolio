const WA_NUMBER="2349128685771";

const menuToggle=document.getElementById("menuToggle");
const nav=document.getElementById("nav");

menuToggle.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const progress=document.querySelector(".progress");
window.addEventListener("scroll",()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(max>0?(window.scrollY/max)*100:0)+"%";
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const form=document.getElementById("projectForm");
const formMessage=document.getElementById("formMessage");

form.addEventListener("submit",e=>{
  e.preventDefault();

  const name=document.getElementById("clientName").value.trim();
  const contact=document.getElementById("clientContact").value.trim();
  const description=document.getElementById("projectDescription").value.trim();
  const budget=document.getElementById("budget").value.trim();
  const deadline=document.getElementById("deadline").value.trim();

  if(!name||!description){
    formMessage.textContent="Please enter your name and describe what you want built.";
    return;
  }

  const message=`Hello Uche 👋

I would like to discuss a project with you.

👤 Name:
${name}

📱 WhatsApp / Email:
${contact||"Not provided"}

💻 What I want:
${description}

💰 Budget:
${budget||"Not provided"}

📅 Deadline:
${deadline||"Not provided"}

I found you through your portfolio.`;

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`,"_blank");
});
