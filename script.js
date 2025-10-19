// ===== Province / District / Local Level Dropdown =====
const provinceSelect = document.getElementById("province");
const districtSelect = document.getElementById("district");
const localSelect = document.getElementById("localLevel");

// ===== Partner / Agent Toggle Buttons =====
const showPartner = document.getElementById("showPartner");
const showAgent = document.getElementById("showAgent");
const partnerForm = document.getElementById("partnerForm");
const agentForm = document.getElementById("agentForm");
const buttonBox = document.querySelector(".button-box");

// Create the sliding border element dynamically
const slider = document.createElement("div");
slider.classList.add("slide-border");
buttonBox.appendChild(slider);

// Function to move the slider
function moveSlider(targetBtn) {
  const btnRect = targetBtn.getBoundingClientRect();
  const boxRect = buttonBox.getBoundingClientRect();
  const left = btnRect.left - boxRect.left;
  const width = btnRect.width;
  slider.style.left = `${left}px`;
  slider.style.width = `${width}px`;
}

// Initial position (default to Partner)
window.addEventListener("load", () => {
  moveSlider(showPartner);
});

// Click events
showPartner.addEventListener("click", () => {
  partnerForm.style.display = "block";
  agentForm.style.display = "none";
  moveSlider(showPartner);
  showPartner.classList.add("active");
  showAgent.classList.remove("active");
});

showAgent.addEventListener("click", () => {
  agentForm.style.display = "block";
  partnerForm.style.display = "none";
  moveSlider(showAgent);
  showAgent.classList.add("active");
  showPartner.classList.remove("active");
});

// ===== Province Loading =====
async function loadProvinces() {
  try {
    const res = await fetch("data/provinces.json");
    const provinces = await res.json();
    provinces.forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p;
      opt.textContent = p;
      provinceSelect.appendChild(opt);
    });
  } catch (err) {
    console.error("Error loading provinces:", err);
  }
}

provinceSelect.addEventListener("change", async (e) => {
  const province = e.target.value;
  districtSelect.innerHTML = '<option value="">Loading...</option>';
  localSelect.innerHTML = '<option value="">Select Local Level</option>';

  try {
    const res = await fetch("data/districts.json");
    const data = await res.json();
    districtSelect.innerHTML = '<option value="">Select District</option>';
    (data[province] || []).forEach((d) => {
      const opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d;
      districtSelect.appendChild(opt);
    });
  } catch (err) {
    console.error("Error loading districts:", err);
  }
});

districtSelect.addEventListener("change", async (e) => {
  const district = e.target.value;
  localSelect.innerHTML = '<option value="">Loading...</option>';
  try {
    const res = await fetch("data/locallevels.json");
    const data = await res.json();
    localSelect.innerHTML = '<option value="">Select Local Level</option>';
    (data[district] || []).forEach((l) => {
      const opt = document.createElement("option");
      opt.value = l;
      opt.textContent = l;
      localSelect.appendChild(opt);
    });
  } catch (err) {
    console.error("Error loading local levels:", err);
  }
});

// Initialize
loadProvinces();

// ===== Registration Authority Auto-fill =====
const businessType = document.getElementById("businessType");
const regAuthority = document.getElementById("regAuthority");

const authorityMap = {
  company: "Office of the Company Registrar (OCR)",
  partnership: "Office of the Company Registrar (OCR)",
  ngo: "Social Welfare Council",
  sole: "Municipality / Local Government Office"
};

businessType.addEventListener("change", (e) => {
  const type = e.target.value;
  regAuthority.value = authorityMap[type] || "";
});
