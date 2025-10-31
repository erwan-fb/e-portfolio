customElements.define(
  "window-frame",
  class extends HTMLElement{
    constructor(){
      super();

      let DOMElems = this.innerHTML;
      this.innerHTML = "";
      
      const window_wrapper = document.createElement("div");
      window_wrapper.setAttribute("id", "window_wrapper");
      

      const top_bar = document.createElement("div");
      top_bar.setAttribute("id", "top_bar");
      window_wrapper.appendChild(top_bar);
      
      const close_btn = document.createElement("div");
      close_btn.setAttribute("id", "close_btn");
      close_btn.setAttribute("class", "wdw_btn");
      top_bar.appendChild(close_btn);
      
      const hide_btn = document.createElement("div");
      hide_btn.setAttribute("id", "hide_btn");
      hide_btn.setAttribute("class", "wdw_btn");
      top_bar.appendChild(hide_btn);
      
      const bigger_btn = document.createElement("div");
      bigger_btn.setAttribute("id", "bigger_btn");
      bigger_btn.setAttribute("class", "wdw_btn");
      top_bar.appendChild(bigger_btn);

      const name = document.createElement("p");
      name.setAttribute("id", "title");
      if (this.hasAttribute("name")){
        name.textContent = this.getAttribute("name")
      } else {
        name.textContent = "Dummy Window"
      }
      top_bar.appendChild(name);

      const style = document.createElement("style");
      style.textContent = 
      `
      #window_wrapper{
        border: solid 1px var(--ternary-color);
        background-color: var(--primary-color);
        border-radius: 5px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      #top_bar {
        display: flex;
        flex-direction: row;
        gap: 8px;
        padding: 4px;
        background-color: var(--secondary-color);
        border-radius: 5px 5px 0px 0px;
      }

      .wdw_btn {
        border-radius: 6px;
        width: 10px;
        height: 10px;
      }

      #title {
        color: var(--text-color);
        font-size: 10px;
        margin: 0px;
        flex: 1;
        margin-left: 10px !important;
      }

      #close_btn {
        background-color: red;
        border: solid 1px rgb(130, 0, 0);
      }

      #hide_btn {
        background-color: rgb(255, 204, 0);
        border: solid 1px rgb(255, 123, 0);
      }

      #bigger_btn {
        background-color: rgb(0, 165, 0);
        border: solid 1px green;
      }
      `

      this.appendChild(style);
      this.appendChild(window_wrapper);

      window_wrapper.innerHTML += DOMElems;
    }
  }
)