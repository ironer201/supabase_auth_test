const login = document.getElementById('login');
const signup = document.getElementById('signup');
const sidebutton = document.getElementById('sidebtn');
const sideloginbutton = document.getElementById('sidebtnlogin');
const container = document.querySelector('.container');


function fadesSwap(hideEl, showEl, titleText) {
	//fadeout container
	container.classList.add('hidden');
	setTimeout(() => {
		//hide current form
		hideEl.style.display = 'none';
		//show target form
		showEl.style.display = 'block';
		//update title inside the newly shown form
		const title = document.querySelector('.title p');

		if (title){
			title.textContent = titleText;
		}
		//Fade container back in
		container.classList.remove('hidden');
	}, 400);
}
sidebutton.addEventListener('click',() =>{
	document.getElementById('logintitle').style.display = 'none';

	
	fadesSwap(signup,login,'Log in');

});

sideloginbutton.addEventListener('click', () => {
	fadesSwap(login,signup,'Sign up');
	
});
//intial state
signup.style.display = 'none';
container.classList.remove('hidden'); //raw

