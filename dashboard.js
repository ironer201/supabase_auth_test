const profile = document.getElementById('profile');
const setting = document.getElementById('setting');
const one = document.getElementById('one');
const two = document.getElementById('two');

// Default visible page
one.classList.add("active");

setting.addEventListener("click", () => {
    one.classList.remove("active");
    one.classList.add("out-left");

    two.classList.remove("out-right");
    two.classList.add("active");
});

profile.addEventListener("click", () => {
    two.classList.remove("active");
    two.classList.add("out-right");

    one.classList.remove("out-left");
    one.classList.add("active");
});
