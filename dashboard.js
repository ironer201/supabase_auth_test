import { supabase } from './supabaseClient.js';

const profile = document.getElementById('profile');
const setting = document.getElementById('setting');
const one = document.getElementById('one');
const two = document.getElementById('two');
// UPDATED: button id changed to saveProfileBtn in HTML
const saveBtn = document.getElementById('saveProfileBtn');

// Display spans (view section)
const spanName = document.getElementById('name');
const spanEmail = document.getElementById('email');
const spanPhone = document.getElementById('phone');
const spanAddress = document.getElementById('address');
const spanGender = document.getElementById('gender');
const spanNationality = document.getElementById('nationality');

// Edit inputs (edit section)
const inputName = document.getElementById('nameedit');
const inputEmail = document.getElementById('emailedit');
const inputPhone = document.getElementById('phoneedit');
const inputPresentAddress = document.getElementById('presentaddressedit');
const inputPermanentAddress = document.getElementById('permanentaddressedit');
const inputGender = document.getElementById('genderedit');
const inputNationality = document.getElementById('nationalityedit');
const statusEl = document.getElementById('profile-status');

// --- SECTION TOGGLE LOGIC (unchanged except variable rename) ---
one.classList.add("active");
if (saveBtn) saveBtn.style.display = "none";

setting.addEventListener("click", () => {
    one.classList.remove("active");
    one.classList.add("out-left");

    two.classList.remove("out-right");
    two.classList.add("active");
    if (saveBtn) saveBtn.style.display = "block";
});

profile.addEventListener("click", () => {
    two.classList.remove("active");
    two.classList.add("out-right");

    one.classList.remove("out-left");
    one.classList.add("active");
    if (saveBtn) saveBtn.style.display = "none";
});

// Logout button event
document.getElementById('logout').addEventListener('click', async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout Error:", error.message);
    alert("Failed to log out. Try again!");
  } else {
    console.log("✅ Logged out successfully");
    window.location.href = 'index.html';  // Redirect to login page
  }
});

// ================= PROFILE LOAD & SAVE LOGIC =================
// 1. Get email stored during login.
const storedEmail = localStorage.getItem('loggedInEmail');

// 2. If no email found, optionally redirect.
if (!storedEmail) {
  console.warn('No stored email found in localStorage.');
} else {
  // Immediately show email in both view + edit sections.
  if (spanEmail) spanEmail.textContent = storedEmail;
  if (inputEmail) inputEmail.value = storedEmail; // we generally keep email readonly for identity
  if (inputEmail) inputEmail.readOnly = true;
  loadProfile(storedEmail);
}

// Fetch existing profile row by Email and populate UI
async function loadProfile(email) {
  if (!email) return;
  setStatus('Loading profile...', '#555');
  const { data, error } = await supabase
    .from('auth')
    .select('*')
    .eq('Email', email)
    .single();

  if (error) {
    console.warn('No existing profile row or error:', error.message);
    setStatus('No existing profile found. You can create one.', '#a67c00');
    return;
  }

  // Populate view spans
  spanName && (spanName.textContent = data.Name || '');
  spanPhone && (spanPhone.textContent = data.Phone || '');
  spanAddress && (spanAddress.textContent = data.PresentAddress || '');
  spanGender && (spanGender.textContent = data.Gender || '');
  spanNationality && (spanNationality.textContent = data.Nationality || '');

  // Populate edit inputs
  inputName && (inputName.value = data.Name || '');
  inputPhone && (inputPhone.value = data.Phone || '');
  inputPresentAddress && (inputPresentAddress.value = data.PresentAddress || '');
  inputPermanentAddress && (inputPermanentAddress.value = data.PermanentAddress || '');
  inputGender && (inputGender.value = data.Gender || '');
  inputNationality && (inputNationality.value = data.Nationality || '');
  setStatus('Profile loaded.', 'green');
}

// Helper to set status message
function setStatus(msg, color='') {
  if (!statusEl) return;
  statusEl.textContent = msg;
  if (color) statusEl.style.color = color;
}

// Save button handler (Upsert by Email)
if (saveBtn) {
  saveBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!storedEmail) {
      alert('No email found. Please log in again.');
      return;
    }

    const payload = {
      Email: storedEmail, // identity key
      Name: inputName?.value.trim() || '',
      Phone: inputPhone?.value.trim() || '',
      PresentAddress: inputPresentAddress?.value.trim() || '',
      PermanentAddress: inputPermanentAddress?.value.trim() || '',
      Gender: inputGender?.value || '',
      Nationality: inputNationality?.value.trim() || ''
    };

    // Basic validation (Email always present, Name optional per your original spec; enforce if needed)
    setStatus('Saving...', '#555');

    const { data, error } = await supabase
      .from('auth')
      .upsert(payload, { onConflict: 'Email' })
      .select();

    if (error) {
      console.error('Save error:', error.message);
      setStatus('Error saving profile: ' + error.message, 'red');
      alert('Failed to save profile.');
      return;
    }

    // Update view section with new values
    spanName && (spanName.textContent = payload.Name);
    spanPhone && (spanPhone.textContent = payload.Phone);
    spanAddress && (spanAddress.textContent = payload.PresentAddress);
    spanGender && (spanGender.textContent = payload.Gender);
    spanNationality && (spanNationality.textContent = payload.Nationality);

   
    alert('Profile data uploaded successfully!');
  });
}

// ================= END PROFILE LOGIC =================