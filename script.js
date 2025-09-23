import { supabase } from './supabaseClient.js';

const login = document.getElementById('login');
const signup = document.getElementById('signup');
const sidebutton = document.getElementById('sidebtn');
const sideloginbutton = document.getElementById('sidebtnlogin');
const container = document.querySelector('.container');

const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

// --- UI fade logic (unchanged) ---
function fadesSwap(hideEl, showEl, titleText) {
	container.classList.add('hidden');
	setTimeout(() => {
		hideEl.style.display = 'none';
		showEl.style.display = 'block';
		const title = document.querySelector('.title p');
		if (title) title.textContent = titleText;
		container.classList.remove('hidden');
	}, 400);
}
sidebutton.addEventListener('click', () => {
	document.getElementById('logintitle').style.display = 'none';
	fadesSwap(signup, login, 'Log in');
});
sideloginbutton.addEventListener('click', () => {
	fadesSwap(login, signup, 'Sign up');
});
signup.style.display = 'none';
container.classList.remove('hidden');

// --- Supabase Signup ---
signupForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const email = document.getElementById('signup-email').value;
	const password = document.getElementById('signup-password').value;

	const { data, error } = await supabase.auth.signUp({ email, password });

	if (error) {
		alert(`Signup Error: ${error.message}`);
	} else {
		alert('Signup successful! Please confirm via email.');
	}
});

// --- Supabase Login + Profile Row Insert ---
// --- Supabase Login + Insert Profile Row ---
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert(`Login Error: ${error.message}`);
    return;
  }

  // ✅ Get logged in user
  const user = data.user;
  if (!user) {
    alert("No user returned from Supabase login.");
    return;
  }

  const userEmail = user.email;
  localStorage.setItem('loggedInEmail', userEmail);

 // ✅ Check if row exists
  const { data: existing, error: selectError } = await supabase
    .from('auth')
    .select('Email')
    .eq('Email', userEmail)
    .maybeSingle();

  if (selectError) {
    console.error("Select error:", selectError.message);
  }

  if (!existing) {
    // Row does not exist → insert a blank profile
    const { error: insertError } = await supabase
      .from('auth')
      .insert([
        {
          Email: userEmail,
          Name: '',
          Phone: '',
          PresentAddress: '',
          PermanentAddress: '',
          Gender: '',
          Nationality: ''
        }
      ]);

    if (insertError) {
      console.error("Insert Error:", insertError.message);
    } else {
      console.log("✅ New user row created for:", userEmail);
    }
  } else {
    console.log("ℹ️ User already exists, skipping insert:", userEmail);
  }

  window.location.href = 'dashboard.html';
});