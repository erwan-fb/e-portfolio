customElements.define(
  "select-menu",
  class extends HTMLElement {
    constructor(){
      super();
    }

    connectedCallback(){
      if (this.hasAttribute("initiated")){
        return
      }

      this.setAttribute("initiated", "true");

      const wrapper = document.createElement("div");
      wrapper.setAttribute("class", "menu_wrapper");

      const text = document.createElement("p");
      if(this.hasAttribute("text")){
        text.innerText = this.getAttribute("text");
        this.removeAttribute("text");
      }
      wrapper.appendChild(text);

      const style = document.createElement("style");
      style.textContent = 
      `
      .menu_wrapper{
        display: flex;
        padding: 5px;
      }

      .menu_wrapper.selected {
        background-color: var(--shell-color);
        color: #002b00;
      }

      .menu_wrapper:not(.selected){
        background_color: rgba(0, 0, 0, 0);
        color: var(--shell-color);
      } 

      .menu_wrapper p{
        margin: 0px;
      }
      `

      this.appendChild(style);
      this.appendChild(wrapper);

      let menus = document.querySelectorAll("select-menu");
      menus.forEach((elem) => {
        elem.addEventListener("mouseover", this.select);
        //elem.addEventListener("click", () => {console.log(this, "clicked")});
      });
      
    }

    select(){
      document.querySelectorAll("select-menu").forEach((e) => e.children[1].classList.remove("selected"));
      this.children[1].classList.add("selected");
    }
  }  
)

document.addEventListener("keydown", (event) =>{
  let selected = document.querySelectorAll(".selected");
  let elem = selected[0];
  let new_elem;
  if (elem == null) {
    if (event.code == "ArrowUp") {
      new_elem = write_space.lastElementChild.previousElementSibling;
    } else if (event.code == "ArrowDown") {
      new_elem = write_space.firstElementChild;
    } else {
      return
    }
  } else {
    if (event.code == "ArrowUp") {
      new_elem = elem.parentElement.previousElementSibling;
    } else if (event.code == "ArrowDown") {
      new_elem = elem.parentElement.nextElementSibling;
    } else if (event.code == "Enter"){
      elem.parentElement.click();
      return;
    } else {
      return
    }
  }
  
  if (new_elem.tagName != null && new_elem.tagName !== "SELECT-MENU") return;

  new_elem.select();
})