const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

function renderCalendar() {
  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();

  let datesHtml = "";

  for (let i = start; i > 0; i--) {
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }

  for (let i = 1; i <= endDate; i++) {
    let className =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? ' class="today"'
        : "";
    datesHtml += `<li${className}>${i}</li>`;
  }

  for (let i = end; i < 6; i++) {
    datesHtml += `<li class="inactive">${i - end + 1}</li>`;
  }

  dates.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;
}

navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "prev" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "next" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "next" ? month + 1 : month - 1;
    }

    date = new Date(year, month, new Date().getDate());
    year = date.getFullYear();
    month = date.getMonth();

    renderCalendar();
  });
});

renderCalendar();


document.querySelector('#push').onclick = function() {
  // Check if there are already 7 tasks
  var tasksCount = document.querySelectorAll('.task').length;
  if (tasksCount >= 7) {
      alert("You can only add up to 7 tasks.");
      return; // Exit the function if the limit is reached
  }

  var taskInput = document.querySelector('#newtask input');
  var taskName = taskInput.value.trim();

  if (taskName.length == 0) {
      alert("Please Enter a Task");
  } else {
      // Truncate task name to 19 characters if it exceeds
      if (taskName.length > 50) {
          taskName = taskName.substring(0, 50);
      }

      document.querySelector('#tasks').innerHTML += `
          <div class="task">
              <span id="taskname">
                  ${taskName}
              </span>
              <button class="delete">
                  <i class="far fa-trash-alt"></i>
              </button>
          </div>
      `;

      var currentTasks = document.querySelectorAll(".delete");
      for (var i = 0; i < currentTasks.length; i++) {
          currentTasks[i].onclick = function() {
              this.parentNode.remove();
          }
      }

      var tasks = document.querySelectorAll(".task");
      for (var i = 0; i < tasks.length; i++) {
          tasks[i].onclick = function() {
              this.classList.toggle('completed');
          }
      }

      taskInput.value = "";
  }
}
document.querySelector('#newtask input').addEventListener('input', function() {
  var maxLength = 50;
  var inputValue = this.value;

  // Check if input length exceeds the maximum length
  if (inputValue.length > maxLength) {
      // If it exceeds, truncate the input value to maxLength
      this.value = inputValue.slice(0, maxLength);
  }
});