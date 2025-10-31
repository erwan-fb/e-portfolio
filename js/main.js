const root = document.querySelector(":root");

const main_wrapper = document.getElementById("main_wrapper");
//const theme_button = undefined;
const write_space = document.getElementById("write_space");
const shell_window = document.getElementById("shell_window");
const title_window = document.getElementById("title_window");

// sub-windows
const image_window = document.getElementById("image_window");
const cv_window = document.getElementById("cv");
const pitch_window = document.getElementById("elevator_pitch");
const link_project_window = document.getElementById("link_project_window");
const gcc_logo = document.getElementById("gcc_logo");
const climbing_photo_window = document.getElementById("climbing_photo_window");
const ghidra_screenshot_window = document.getElementById("ghidra_screenshot_window");
const vscode_screenshot_window = document.getElementById("vscode_screenshot_window");
const code_preview = document.getElementById("code_preview");

var cursor = document.getElementById("cursor");

var fast_forward = false;

let dark_theme = true;
let menu_shown = true;
let cursor_shown = true;
let visited = null;

let writing = false;

var timeoutID = -1;

function update_theme(){
  if (dark_theme){
    //root.style.setProperty(`--theme-color-${index + 1}`, `${element}`);
  } else {
    //root.style.setProperty(`--theme-color-${index + 1}`, `${element}`);
  }
}

update_theme();

function remove_cursor(){
  if (document.querySelector("#cursor") !== null && write_space.childNodes.length) write_space.removeChild(write_space.childNodes[write_space.childNodes.length-1]);
}

function update_cursor(){
  cursor = document.getElementById("cursor");
  write_space.scroll(0, write_space.scrollTopMax) 
}

function prompt_entry(){
  let content = "";
  if (write_space.textContent){
    remove_cursor();
    content = write_space.textContent + "\n";
  }
  write_space.innerHTML = content + "guest ~ > " + '<i id="cursor">█</i>';
  update_cursor();
  clearTimeout(timeoutID);
  blink();
}

function write_each_character(text, resolve){
  writing = true;
  if (text) {
    remove_cursor();
    write_space.innerHTML += text[0] + '<i id="cursor">█</i>';
    window.setTimeout(write_each_character, 50  * (1-fast_forward), text.slice(1), resolve);
  } else {
    writing = false;
    update_cursor();
    window.setTimeout(blink, 500 * (1-fast_forward));
    resolve();
  }
}

function write_shell(text){
  clearTimeout(timeoutID);
  return new Promise((resolve) => {write_each_character(text, resolve)});
}

function paste_text(text){
  //clearTimeout(timeoutID);
  remove_cursor();
  return new Promise((resolve) => {
    remove_cursor();
    write_space.innerHTML += text + '<i id="cursor">█</i>';
    update_cursor();
    //window.setTimeout(blink, 500);
    resolve();
  })
}

function loading_bar(i=0, curr_index=-1, resolve=undefined){
  remove_cursor();
  curr_index = curr_index == -1? write_space.innerHTML.length : curr_index
  if (i != 0){
    write_space.innerHTML = write_space.innerHTML.slice(0, curr_index)
  }
  paste_text(`[${"=".repeat(2*i)}${" ".repeat(2*(10-i))}] ${10*i}%\n<i id="cursor">█</i>`);
  if (i < 10){
    window.setTimeout(loading_bar, 40 * (1-fast_forward), i+1, curr_index, resolve)
  } else {
    //blink();
    if (resolve != undefined){
      resolve();
    }
  }
}

function write_loading_bar(){
  clearTimeout(timeoutID);
  return new Promise((resolve) => {loading_bar(0, -1, resolve)});
}

function pause(time){
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve()
    }, 1000 * time  * (1-fast_forward))
  })
}

function clear_console(){
  write_space.innerHTML = '<i id="cursor">█</i>';
}

function hide_all_windows(){
  let windows = document.querySelectorAll("window-frame");
  let exceptions = ["shell_window", "title_window", "link_window"];
  windows.forEach((element) => {
    if (exceptions.indexOf(element.getAttribute("id")) == -1) element.style.display = "none";
  });
}

function set_title(text){
  title_window.lastChild.lastChild.textContent = text;
}

function get_visited(index){
  visited = window.localStorage.getItem("visited_pages");
  visited = visited ? visited : "000000";
  return visited[index] == "1";
}

function set_visited(index){
  visited = visited ? visited : "000000";
  visited = visited.substring(0, index) + "1" + visited.substring(index+1, visited.length);
  window.localStorage.setItem("visited_pages", visited);
}

function reset_visited(){
  window.localStorage.setItem("visited_pages", "000000");
}

function set_fast_forward(bool){
  fast_forward = bool;
}

function blink(){
  if (writing) return

  if (cursor_shown){
    cursor.style.color = 'var(--shell-color)'
  } else {
    cursor.style.color = 'rgba(0, 0, 0, 0)'
  }
  cursor_shown = !cursor_shown;
  timeoutID = window.setTimeout(blink, 500);
}

function add_menu(text, function_name){
  remove_cursor();
  write_space.innerHTML += `<select-menu text="${text}" onclick="${function_name}()"></select-menu><i id="cursor">█</i>`;
  update_cursor();
}

function print_menu(){
  add_menu(" > Home", "terminal_home")
  add_menu(" > Engineering Courses", "terminal_engineering_course")
  add_menu(" > Mobility", "terminal_mobility")
  add_menu(" > Civic Engagement", "terminal_civic_engagement")
  add_menu(" > Sports & Other Activities", "terminal_sport_other_activities")
  add_menu(" > Career Development", "terminal_career_development")
  write_space.scrollIntoView(cursor)
}

async function terminal_home(){
  set_fast_forward(get_visited(0));
  set_visited(0);
  await paste_text("guest ~ > clear\n");
  await pause(0.1);
  set_title("Home");
  hide_all_windows();
  clear_console();
  await write_shell("Welcome,\n");
  await pause(1);
  await write_shell("I'm Erwan Falaux-Bachelot, an engineering student at ENSEEIHT in computer science.\n");
  await pause(0.1);
  await paste_text("\nguest ~ > wget media.licdn.com/dms/image/v2/D4E03AQF8XgDUbDOVIw/profile-displayphoto-crop_800_800/B4EZnfivBeHgAM-/0/1760392049787?e=1763596800&v=beta&t=bPTkdUsbRHOyu2pzNtDYzF0_U8khR8NNv4fjFC3oAkA -o profile_picture.jpg\n");
  await pause(0.1);
  await write_loading_bar();
  await paste_text("Saving to profile_picture.jpg\n\n")
  await pause(0.1);
  image_window.style.display = "block";
  await pause(1);
  await write_shell("This is me.\n");
  await pause(2);
  await write_shell("As you could have guessed, I'm passionate about computer science.");
  await pause(0.5);
  await write_shell(" And I am even more about cybersecurity.\n");
  await pause(2);
  await write_shell("To show it to you, I almost hid flags around here.");
  await pause(0.5);
  await write_shell(" But I argued against it since this is not a game.\n");
  await pause(2);
  await write_shell("\nNow, let me introduce myself in a short video.\n")
  await pause(0.1);
  /*await write_shell("Loading cv link");
  await pause(0.2);
  await write_shell(".");
  await pause(0.2);
  await write_shell(".");
  await pause(0.2);
  await write_shell(".");
  await pause(0.2);
  cv_window.style.display = "block";*/
  await write_shell("\nLoading video");
  await pause(0.2);
  await write_shell(".");
  await pause(0.2);
  await write_shell(".");
  await pause(0.2);
  await write_shell(".");
  await pause(0.2);
  pitch_window.style.display = "block";
  await write_shell("\n\nSo what do you want to know about me ?");
  print_menu();
}

async function terminal_engineering_course() {
  set_fast_forward(get_visited(1));
  set_visited(1);
  await paste_text("guest ~ > clear\n");
  await pause(0.1);
  set_title("Engineering Courses");
  hide_all_windows();
  clear_console();
  await pause(1);
  await write_shell("This year, I follow quite a bit of courses, some are more mathematical, others more oriented at computer science.\n");
  await pause(1);
  await write_shell("For example I take a Modelisation course which is a computer science course, oriented towards solving decisions problems with rocq or creating languages with camllex.\n");
  await pause(0.5);
  await write_shell("I'll also be taking Computer Architecture classes, which hypes me quite a lot.\n")
  await pause(2);
  await write_shell("\nI haven't done any big project yet.\n")
  await pause(1);
  await write_shell("However, last year, when I was still in prepa, a friend and I created an esoteric language.\n");
  code_preview.style.display = "block";
  await pause(0.5);
  await write_shell("Then, we created a website and an interpreter for this language and we hosted a comptetion for the students in MP2I.\n");
  await pause(0.5);
  await write_shell("The website is still accessible and you can follow the link on the opened window.\n");
  link_project_window.style.display = "block";
  await pause(1);
  await write_shell("\nThanks to this project, I learned the basics of git, how to cooperate with a team and managing the front-end of the website (the back-end was made by my friend).\n");
  await pause(2);
  await write_shell("\nThis project took a lot of time.\n")
  await pause(0.5);
  await write_shell("It is far from perfect because the editor was made by hand and is not that reliable, the server on the other side scales badly with a lot of people, and the name is childish.\n")
  await pause(0.5);
  await write_shell("But it was fun.\n");
  await pause(2);
  await write_shell("\nWhere do you want to go next ? ")
  print_menu();
}

async function terminal_mobility(){
  set_fast_forward(get_visited(2));
  set_visited(2);
  await paste_text("guest ~ > clear\n");
  await pause(0.1);
  set_title("Mobility");
  hide_all_windows();
  clear_console();
  await pause(1);
  await write_shell("I'll be honest, thinking about mobility is always one of the most difficult part of my curriculum. ");
  await pause(1);
  await write_shell("USA is always my first choice. ");
  await pause(1);
  await write_shell("But is it really the best?\n");
  await pause(2);
  await write_shell("\nI mean, I may be biased because everyone that wants to go in an english-speaking country wants to go to USA.\n");
  await pause(1);
  await write_shell("As long as I can inprove my english skills, because it'll surely be part of anyone's job at some point, I'm okay with it.\n");
  await pause(2);
  await write_shell("\nThe main problem I have with choosing a country (and even a school to go to) is that I'm not choosing for the country itself but what I can study there.\n");
  await pause(1);
  await write_shell("And I lack a lot of research of what school I want to attend.\n");
  await pause(2);
  await write_shell("\nBut my objective is clear: find a school/university where I can continue learning computer science to follow my ultimate goal,");
  await pause(0.3);
  await write_shell(" study cybersecurity.\n");
  await pause(2);
  await write_shell("\nWhat is your next interest ?");
  print_menu();
}

async function terminal_civic_engagement(){
  set_fast_forward(get_visited(3));
  set_visited(3);
  await paste_text("guest ~ > clear\n");
  await pause(0.1);
  set_title("Civic Engagement");
  hide_all_windows();
  clear_console();
  await pause(1);
  await write_shell("For me, the ability to be free to choose whatever you want to do is important.\n");
  await pause(1);
  await write_shell("However, if you don't know a work category, you won't be able to know if it fits you well.\n");
  await pause(2);
  await write_shell("\nFor this reason, I want everyone to try a variety of skills.\n");
  await pause(2);
  await write_shell("But since I can't teach everyone everything, I want at least to focus on teaching code. ");
  await pause(1);
  await write_shell("And since coding is mostly dominated by men, it would be great if I could help the Prologin association with Girls Can Code.\n");
  gcc_logo.style.display = "block";
  await pause(2);
  await write_shell("\nWhat is more appealing to you ?");
  print_menu();
}

async function terminal_sport_other_activities() {
  set_fast_forward(get_visited(4));
  set_visited(4);
  await paste_text("guest ~ > clear\n");
  await pause(0.1);
  set_title("Sport and Other Activities");
  hide_all_windows();
  clear_console();
  await pause(1);
  await write_shell("When I have some free time, I can choose between four activities:\n")
  await pause(0.5);
  await write_shell("  • Coding various things, ranging from minecraft datapacks to a brainfuck debugger\n");
  vscode_screenshot_window.style.display = "block";
  await pause(0.5);
  await write_shell("  • Doing ctf or crackmes to train myself, using ghidra\n");
  ghidra_screenshot_window.style.display = "block";
  await pause(0.5);
  await write_shell("  • Playing chess online\n");
  await pause(0.5);
  await write_shell("  • Go climbing\n");
  climbing_photo_window.style.display = "block";
  await pause(1);
  await write_shell("(The photos are a bit small you can have a better look on my github until I implement the scale up button)\n")
  await pause(2);
  await write_shell("\nI'd also love to involve myself into clubs. ");
  await pause(0.5);
  await write_shell("For example, I'd like to be able to open climbing sessions in the Gr'inp club, but I missed the occasion this year.\n")
  await pause(0.5);
  await write_shell("Maybe next year.\n");
  await pause(2);
  await write_shell("\nWhat would be your next experience ?");
  print_menu();
}

async function terminal_career_development() {
  set_fast_forward(get_visited(5));
  set_visited(5);
  await paste_text("guest ~ > clear\n");
  await pause(0.1);
  set_title("Career development");
  hide_all_windows();
  clear_console();
  await write_shell("As of rigth now, I want to work in cybersecurity. ");
  await pause(0.5);
  await write_shell("But I'm not closed on the rest of the domains, like AI.\n");
  await pause(1);
  await write_shell("And here's my cv if you want to have a look at it.\n\n")
  await write_shell("Loading cv link");
  await pause(0.2);
  await write_shell(".");
  await pause(0.2);
  await write_shell(".");
  await pause(0.2);
  await write_shell(".");
  await pause(0.2);
  cv_window.style.display = "block";
  await pause(1);
  await write_shell("\n\nAnd my linkedin can be found in the links window on the bottom right.\n");
  await pause(2);
  await write_shell("\nWhat else may interest you ?");
  print_menu();
}

terminal_home();