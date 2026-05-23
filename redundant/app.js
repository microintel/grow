import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, addDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase App Credentials Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4FXsaho9Je9GM_2MFVjDMM8MRlOshyVY",
    authDomain: "microintel-redundant.firebaseapp.com",
    projectId: "microintel-redundant",
    storageBucket: "microintel-redundant.firebasestorage.app",
    messagingSenderId: "61382405090",
    appId: "1:61382405090:web:c340e3c91a0a8c5e3f67bb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// System Runtime Variables
let currentUser = null;
let currentAcademicData = [];
let perfChartInstance = null;
let attChartInstance = null;

// Application Initialization Lifecycle
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    setupCoreEventListeners();
});

// Authentication Guard Checks
onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        showAppScreen();
        await syncSystemData();
    } else {
        currentUser = null;
        showAuthScreen();
    }
});

/* ==========================================================================
   UI Route Shell Switching Logic
   ========================================================================== */
function showAuthScreen() {
    document.getElementById("auth-screen").classList.remove("hidden");
    document.getElementById("app-screen").classList.add("hidden");
}

function showAppScreen() {
    document.getElementById("auth-screen").classList.add("hidden");
    document.getElementById("app-screen").classList.remove("hidden");
}

function showToast(message) {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
}

// Navigation Router State Logic
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        navLinks.forEach(l => l.classList.remove("active"));
        e.target.classList.add("active");
        
        document.querySelectorAll(".app-section").forEach(sec => sec.classList.add("hidden"));
        document.getElementById(e.target.dataset.target).classList.remove("hidden");
        
        // Dynamic Mobile Sidebar Drawer Collapsing
        document.querySelector(".sidebar").classList.remove("open");
    });
});

document.getElementById("btn-menu-toggle").addEventListener("click", () => {
    document.querySelector(".sidebar").classList.toggle("open");
});

/* ==========================================================================
   Theme Preference Management Engine
   ========================================================================== */
function initTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
}

document.getElementById("btn-theme-toggle").addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const targetTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", targetTheme);
    localStorage.setItem("theme", targetTheme);
});

/* ==========================================================================
   Data Synchronization Architecture
   ========================================================================== */
async function syncSystemData() {
    if (!currentUser) return;
    document.getElementById("nav-user-name").innerText = currentUser.displayName || currentUser.email;
    
    await loadUserProfile();
    await loadAcademicTree();
    calculateSystemMetrics();
}

async function loadUserProfile() {
    const userDocRef = doc(db, "users", currentUser.uid);
    const profileSnap = await getDoc(userDocRef);
    
    if (profileSnap.exists() && profileSnap.data().profile) {
        const prof = profileSnap.data().profile;
        document.getElementById("prof-name").value = prof.name || "";
        document.getElementById("prof-usn").value = prof.usn || "";
        document.getElementById("prof-college").value = prof.college || "";
        document.getElementById("prof-dept").value = prof.dept || "";
        document.getElementById("prof-course").value = prof.course || "";
        document.getElementById("prof-sem").value = prof.semester || "";
        document.getElementById("prof-year").value = prof.academicYear || "";
        document.getElementById("prof-phone").value = prof.phone || "";
        document.getElementById("prof-skills").value = prof.skills || "";
    }
    document.getElementById("prof-email").value = currentUser.email;
}

// Interacting & Structuring Data Tree from Firestore Hierarchies
async function loadAcademicTree() {
    const semsRef = collection(db, "users", currentUser.uid, "semesters");
    const semsSnap = await getDocs(semsRef);
    
    let localTreeData = [];

    for (const semDoc of semsSnap.docs) {
        let semObj = { id: semDoc.id, ...semDoc.data(), subjects: [] };
        
        const subsRef = collection(db, "users", currentUser.uid, "semesters", semDoc.id, "subjects");
        const subsSnap = await getDocs(subsRef);
        
        for (const subDoc of subsSnap.docs) {
            let subObj = { id: subDoc.id, ...subDoc.data(), assessments: [] };
            
            const assessRef = collection(db, "users", currentUser.uid, "semesters", semDoc.id, "subjects", subDoc.id, "assessments");
            const assessSnap = await getDocs(assessRef);
            
            subObj.assessments = assessSnap.docs.map(d => ({ id: d.id, ...d.data() }));
            semObj.subjects.push(subObj);
        }
        localTreeData.push(semObj);
    }
    
    currentAcademicData = localTreeData;
    renderAcademicSection();
    renderFilterSelects();
    // Cache local snapshot copy for standalone fallback execution strategies
    localStorage.setItem(`redundant_cache_${currentUser.uid}`, JSON.stringify(currentAcademicData));
}

/* ==========================================================================
   Calculations & Analytic Render Engine (Chart.js implementation)
   ========================================================================== */
function calculateSystemMetrics() {
    let totalAttendance = 0;
    let totalSubjectsCount = 0;
    let totalSemestersCount = currentAcademicData.length;
    let subjectScores = [];
    let semesterGpas = [];

    currentAcademicData.forEach(sem => {
        let semTotalMarks = 0;
        let semMaxMarks = 0;
        
        sem.subjects.forEach(sub => {
            totalAttendance += parseFloat(sub.attendance) || 0;
            totalSubjectsCount++;
            
            let finalMark = parseFloat(sub.finalMarks) || 0;
            subjectScores.push({ name: sub.name, score: finalMark });
            
            // Dynamic computational aggregation across assessment metrics
            sub.assessments.forEach(ass => {
                semTotalMarks += parseFloat(ass.marksObtained) || 0;
                semMaxMarks += parseFloat(ass.maxMarks) || 100;
            });
        });

        let semGpa = semMaxMarks > 0 ? (semTotalMarks / semMaxMarks) * 10 : 0;
        semesterGpas.push({ label: sem.name, gpa: semGpa.toFixed(2) });
    });

    const avgAttendance = totalSubjectsCount > 0 ? (totalAttendance / totalSubjectsCount).toFixed(1) : 0;
    
    // Sort array components safely to determine extrema structures
    subjectScores.sort((a,b) => b.score - a.score);
    const highest = subjectScores.length > 0 ? `${subjectScores[0].name} (${subjectScores[0].score})` : "N/A";
    const lowest = subjectScores.length > 0 ? `${subjectScores[subjectScores.length - 1].name} (${subjectScores[subjectScores.length - 1].score})` : "N/A";

    let calculatedCgpa = 0;
    if(semesterGpas.length > 0) {
        calculatedCgpa = (semesterGpas.reduce((sum, item) => sum + parseFloat(item.gpa), 0) / semesterGpas.length).toFixed(2);
    }

    // Bind metrics into domestic UI references
    document.getElementById("dash-attendance").innerText = `${avgAttendance}%`;
    document.getElementById("dash-cgpa").innerText = calculatedCgpa;
    document.getElementById("dash-sems").innerText = totalSemestersCount;
    document.getElementById("dash-subjects").innerText = totalSubjectsCount;
    document.getElementById("dash-high").innerText = highest;
    document.getElementById("dash-low").innerText = lowest;

    renderSystemCharts(semesterGpas, subjectScores);
}

function renderSystemCharts(gpaData, scoreData) {
    const ctxPerf = document.getElementById("chart-performance").getContext("2d");
    const ctxAtt = document.getElementById("chart-attendance").getContext("2d");

    if (perfChartInstance) perfChartInstance.destroy();
    if (attChartInstance) attChartInstance.destroy();

    // Chart Instance 1: Semester GPA Analytics Profile
    perfChartInstance = new Chart(ctxPerf, {
        type: "bar",
        data: {
            labels: gpaData.map(d => d.label),
            datasets: [{
                label: "GPA Timeline Profile",
                data: gpaData.map(d => d.gpa),
                backgroundColor: "#2563eb",
                borderWidth: 0
            }]
        },
        options: { responsive: true, scales: { y: { min: 0, max: 10 } } }
    });

    // Chart Instance 2: Cumulative Target Competency Distribution 
    attChartInstance = new Chart(ctxAtt, {
        type: "line",
        data: {
            labels: scoreData.map(d => d.name),
            datasets: [{
                label: "Subject Absolute Score Profile",
                data: scoreData.map(d => d.score),
                borderColor: "#3b82f6",
                tension: 0.1,
                fill: false
            }]
        },
        options: { responsive: true }
    });
}

/* ==========================================================================
   Academic Document Mapping and Filtering Framework
   ========================================================================== */
function renderFilterSelects() {
    const select = document.getElementById("filter-sem");
    select.innerHTML = `<option value="all">All Semesters</option>`;
    currentAcademicData.forEach(sem => {
        select.innerHTML += `<option value="${sem.id}">${sem.name}</option>`;
    });
}

function renderAcademicSection() {
    const container = document.getElementById("semesters-container");
    container.innerHTML = "";
    
    const filterVal = document.getElementById("filter-sem").value;
    const searchVal = document.getElementById("search-subject").value.toLowerCase();

    currentAcademicData.forEach(sem => {
        if (filterVal !== "all" && sem.id !== filterVal) return;

        // Check if any subjects in this semester match the search criteria
        const filteredSubjects = sem.subjects.filter(sub => 
            sub.name.toLowerCase().includes(searchVal) || 
            sub.code.toLowerCase().includes(searchVal)
        );

        if (searchVal !== "" && filteredSubjects.length === 0) return;

        const semCard = document.createElement("div");
        semCard.className = "card sem-card";
        
        let subjectsHtml = "";
        const targetSubjectsList = searchVal === "" ? sem.subjects : filteredSubjects;

        targetSubjectsList.forEach(sub => {
            const isWarning = (parseFloat(sub.attendance) < 75) ? `<div class="attendance-warning">Attendance Critical: ${sub.attendance}%</div>` : "";
            
            let assessmentRows = "";
            sub.assessments.forEach(ass => {
                assessmentRows += `
                    <tr>
                        <td>${ass.name}</td>
                        <td>${ass.marksObtained} / ${ass.maxMarks}</td>
                        <td>${ass.date || "-"}</td>
                        <td>
                            <button class="btn btn-secondary" onclick="triggerEditAssessment('${sem.id}','${sub.id}','${ass.id}')">Edit</button>
                            <button class="btn btn-danger" onclick="triggerDeleteAssessment('${sem.id}','${sub.id}','${ass.id}')">Delete</button>
                        </td>
                    </tr>
                `;
            });

            subjectsHtml += `
                <div class="sub-card">
                    <div class="sub-header">
                        <div>
                            <h4>${sub.name} (${sub.code})</h4>
                            <small>Faculty Consultant: ${sub.faculty || "N/A"}</small>
                        </div>
                        <div class="action-buttons">
                            <button class="btn btn-secondary" onclick="triggerAddAssessment('${sem.id}','${sub.id}')">Add Assessment</button>
                            <button class="btn btn-secondary" onclick="triggerEditSubject('${sem.id}','${sub.id}')">Edit</button>
                            <button class="btn btn-danger" onclick="triggerDeleteSubject('${sem.id}','${sub.id}')">Delete</button>
                        </div>
                    </div>
                    <div class="sub-details-grid">
                        <div><strong>Credits:</strong> ${sub.credits}</div>
                        <div><strong>Attendance:</strong> ${sub.attendance}%</div>
                        <div><strong>Final marks:</strong> ${sub.finalMarks}</div>
                    </div>
                    ${isWarning}
                    
                    <div class="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Assessment Type</th>
                                    <th>Evaluation Ratio</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>${assessmentRows}</tbody>
                        </table>
                    </div>
                </div>
            `;
        });

        semCard.innerHTML = `
            <div class="sem-header">
                <h3>${sem.name}</h3>
                <div class="action-buttons">
                    <button class="btn btn-secondary" onclick="triggerAddSubject('${sem.id}')">Add Subject</button>
                    <button class="btn btn-danger" onclick="triggerDeleteSemester('${sem.id}')">Delete Semester</button>
                </div>
            </div>
            <div class="subjects-container">${subjectsHtml}</div>
        `;
        container.appendChild(semCard);
    });
}

/* ==========================================================================
   CRUD Controller Functionality
   ========================================================================== */
const modalOverlay = document.getElementById("modal-container");
const modalFields = document.getElementById("modal-form-fields");
const modalForm = document.getElementById("modal-form");
let modalSubmitCallback = null;

function displayModal(title, fieldsHtml, submitCallback) {
    document.getElementById("modal-title").innerText = title;
    modalFields.innerHTML = fieldsHtml;
    modalOverlay.classList.remove("hidden");
    modalSubmitCallback = submitCallback;
}

modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (modalSubmitCallback) {
        await modalSubmitCallback();
        modalOverlay.classList.add("hidden");
        await syncSystemData();
    }
});

document.getElementById("btn-modal-cancel").addEventListener("click", () => {
    modalOverlay.classList.add("hidden");
});

// Create Semester Action Hook
document.getElementById("btn-add-sem").addEventListener("click", () => {
    const fields = `
        <div class="form-group">
            <label>Semester Identifier Description</label>
            <input type="text" id="m-sem-name" placeholder="eg: Semester 1" required>
        </div>
    `;
    displayModal("Add Semester Record", fields, async () => {
        const nameVal = document.getElementById("m-sem-name").value;
        await addDoc(collection(db, "users", currentUser.uid, "semesters"), { name: nameVal });
        showToast("Semester instance created.");
    });
});

window.triggerDeleteSemester = async (semId) => {
    if(confirm("Confirm structural purge of this semester record and all internal metadata files?")) {
        await deleteDoc(doc(db, "users", currentUser.uid, "semesters", semId));
        showToast("Semester instance destroyed.");
        await syncSystemData();
    }
};

// Create Subject Action Hook
window.triggerAddSubject = (semId) => {
    const fields = `
        <div class="form-group"><label>Subject Name</label><input type="text" id="m-sub-name" required></div>
        <div class="form-group"><label>Subject Code</label><input type="text" id="m-sub-code" required></div>
        <div class="form-group"><label>Faculty</label><input type="text" id="m-sub-fac"></div>
        <div class="form-group"><label>Credits Value</label><input type="number" id="m-sub-cred" min="1" max="6" value="4"></div>
        <div class="form-group"><label>Attendance Percentage</label><input type="number" id="m-sub-att" min="0" max="100" value="100"></div>
        <div class="form-group"><label>Final External CIE Score</label><input type="number" id="m-sub-fin" min="0" max="100" value="0"></div>
    `;
    displayModal("Add Subject Record", fields, async () => {
        await addDoc(collection(db, "users", currentUser.uid, "semesters", semId, "subjects"), {
            name: document.getElementById("m-sub-name").value,
            code: document.getElementById("m-sub-code").value,
            faculty: document.getElementById("m-sub-fac").value,
            credits: document.getElementById("m-sub-cred").value,
            attendance: document.getElementById("m-sub-att").value,
            finalMarks: document.getElementById("m-sub-fin").value
        });
        showToast("Subject entry recorded.");
    });
};

window.triggerEditSubject = (semId, subId) => {
    const sem = currentAcademicData.find(s => s.id === semId);
    const sub = sem.subjects.find(sb => sb.id === subId);
    
    const fields = `
        <div class="form-group"><label>Subject Name</label><input type="text" id="m-sub-name" value="${sub.name}" required></div>
        <div class="form-group"><label>Subject Code</label><input type="text" id="m-sub-code" value="${sub.code}" required></div>
        <div class="form-group"><label>Faculty</label><input type="text" id="m-sub-fac" value="${sub.faculty}"></div>
        <div class="form-group"><label>Credits Value</label><input type="number" id="m-sub-cred" value="${sub.credits}"></div>
        <div class="form-group"><label>Attendance Percentage</label><input type="number" id="m-sub-att" value="${sub.attendance}"></div>
        <div class="form-group"><label>Final External CIE Score</label><input type="number" id="m-sub-fin" value="${sub.finalMarks}"></div>
    `;
    displayModal("Edit Subject Parameters", fields, async () => {
        await updateDoc(doc(db, "users", currentUser.uid, "semesters", semId, "subjects", subId), {
            name: document.getElementById("m-sub-name").value,
            code: document.getElementById("m-sub-code").value,
            faculty: document.getElementById("m-sub-fac").value,
            credits: document.getElementById("m-sub-cred").value,
            attendance: document.getElementById("m-sub-att").value,
            finalMarks: document.getElementById("m-sub-fin").value
        });
        showToast("Subject modifications persistent.");
    });
};

window.triggerDeleteSubject = async (semId, subId) => {
    if(confirm("Purge selected Subject document mapping database configuration?")) {
        await deleteDoc(doc(db, "users", currentUser.uid, "semesters", semId, "subjects", subId));
        showToast("Subject entry decoupled.");
        await syncSystemData();
    }
};

// Create / Modify Assessment Hooks (Dynamic Schema Matrix Architecture)
window.triggerAddAssessment = (semId, subId) => {
    const fields = `
        <div class="form-group">
            <label>Assessment Classification Category</label>
            <select id="m-ass-name">
                <option value="MSE1">MSE 1</option><option value="MSE2">MSE 2</option>
                <option value="Assignment">Assignment</option><option value="Quiz">Quiz</option>
                <option value="Lab">Lab Experiment</option><option value="Project">Project Presentation</option>
            </select>
        </div>
        <div class="form-group"><label>Marks Obtained</label><input type="number" id="m-ass-get" required></div>
        <div class="form-group"><label>Maximum Threshold Marks</label><input type="number" id="m-ass-max" required></div>
        <div class="form-group"><label>Date Conducted</label><input type="date" id="m-ass-date"></div>
    `;
    displayModal("Register Assessment Record", fields, async () => {
        await addDoc(collection(db, "users", currentUser.uid, "semesters", semId, "subjects", subId, "assessments"), {
            name: document.getElementById("m-ass-name").value,
            marksObtained: document.getElementById("m-ass-get").value,
            maxMarks: document.getElementById("m-ass-max").value,
            date: document.getElementById("m-ass-date").value
        });
        showToast("Assessment verification written to data stream.");
    });
};

window.triggerEditAssessment = (semId, subId, assId) => {
    const sem = currentAcademicData.find(s => s.id === semId);
    const sub = sem.subjects.find(sb => sb.id === subId);
    const ass = sub.assessments.find(a => a.id === assId);

    const fields = `
        <div class="form-group">
            <label>Assessment Classification Category</label>
            <input type="text" id="m-ass-name" value="${ass.name}" readonly />
        </div>
        <div class="form-group"><label>Marks Obtained</label><input type="number" id="m-ass-get" value="${ass.marksObtained}" required></div>
        <div class="form-group"><label>Maximum Threshold Marks</label><input type="number" id="m-ass-max" value="${ass.maxMarks}" required></div>
        <div class="form-group"><label>Date Conducted</label><input type="date" id="m-ass-date" value="${ass.date}"></div>
    `;
    displayModal("Modify Diagnostic Record Metrics", fields, async () => {
        await updateDoc(doc(db, "users", currentUser.uid, "semesters", semId, "subjects", subId, "assessments", assId), {
            marksObtained: document.getElementById("m-ass-get").value,
            maxMarks: document.getElementById("m-ass-max").value,
            date: document.getElementById("m-ass-date").value
        });
        showToast("Assessment score vectors updated.");
    });
};

window.triggerDeleteAssessment = async (semId, subId, assId) => {
    if(confirm("Confirm extraction removal tracking of internal metrics evaluation file?")) {
        await deleteDoc(doc(db, "users", currentUser.uid, "semesters", semId, "subjects", subId, "assessments", assId));
        showToast("Assessment node deleted.");
        await syncSystemData();
    }
};

/* ==========================================================================
   Secondary Listener Interfaces & Integration Management
   ========================================================================== */
function setupCoreEventListeners() {
    // Auth Integration Pipeline Link
    document.getElementById("btn-login").addEventListener("click", () => {
        signInWithPopup(auth, provider).catch(err => showToast("Authentication pipeline block: " + err.message));
    });
    document.getElementById("btn-logout").addEventListener("click", () => {
        signOut(auth).then(() => showToast("Session revoked cleanly."));
    });

    // Profile Document Stream Persistence Engine
    document.getElementById("form-profile").addEventListener("submit", async (e) => {
        e.preventDefault();
        if(!currentUser) return;
        
        const profilePayload = {
            name: document.getElementById("prof-name").value,
            usn: document.getElementById("prof-usn").value,
            college: document.getElementById("prof-college").value,
            dept: document.getElementById("prof-dept").value,
            course: document.getElementById("prof-course").value,
            semester: document.getElementById("prof-sem").value,
            academicYear: document.getElementById("prof-year").value,
            phone: document.getElementById("prof-phone").value,
            skills: document.getElementById("prof-skills").value
        };

        await setDoc(doc(db, "users", currentUser.uid), { profile: profilePayload }, { merge: true });
        showToast("Student database file synchronized securely.");
        await syncSystemData();
    });

    // Filtering Core Events Interface Linkage
    document.getElementById("filter-sem").addEventListener("change", renderAcademicSection);
    document.getElementById("search-subject").addEventListener("input", renderAcademicSection);

    // Document Serialization File Export Engine Architecture
    document.getElementById("btn-export-json").addEventListener("click", () => {
        const payloadData = {
            exportVersion: "2026.1",
            timestamp: new Date().toISOString(),
            owner: currentUser.email,
            academicDataset: currentAcademicData
        };
        const dataBlob = new Blob([JSON.stringify(payloadData, null, 4)], { type: "application/json" });
        const temporaryLinkNode = document.createElement("a");
        temporaryLinkNode.href = URL.createObjectURL(dataBlob);
        temporaryLinkNode.download = `academic_report_${currentUser.uid}.json`;
        temporaryLinkNode.click();
        showToast("Data export file generated successfully.");
    });
}
