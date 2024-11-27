import {messages} from "../data/messSent.js";

const data = {
    user: "",
    userImg: "",
    date: "",

    msgData: {
      content: "",
      ID: '',
    },
}

const contentArray = []

let isFirstMsg = true

const input = document.querySelector(".js-input-bar")

/*
messages.forEach((object) => {
  console.log(object)
  renderInput(object, true)
});
*/

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getInput()
        input.value = ''
    }
})

function getInput() {

  const userImg = "/images/other/anonymous person.webp"
  const user = "Bennnnur"

  let clonedReference = JSON.parse(JSON.stringify(data));
  if (input.value === '') {
    return;
  }

  if (isFirstMsg === true){
    isFirstMsg = false
    clonedReference.user = user
    clonedReference.userImg = userImg
    clonedReference.msgData.content = input.value
    clonedReference.msgData.ID = Math.random()
    console.log(contentArray)
    d = new Date()
    clonedReference.date = `Today at ${d.getHours()}:${d.getMinutes()}`

    messages.push(clonedReference)

    renderInput(clonedReference, true)
  } else {
    clonedReference.msgData.content = input.value
    clonedReference.msgData.ID = Math.random()

    messages.push(clonedReference.msgData)
    renderInput(clonedReference, false)
    console.log(contentArray)

  }

  //localStorage.setItem("msgData", JSON.stringify(messages))
  console.log(messages)

}

function renderInput(clonedReference, msgBoolean) {
    const html = `  <div class="msg-container">
        <div class="acc-img-container">
          <img src="${clonedReference.userImg}" alt="" />
        </div>
        <div class="flex">
          <div class="acc-name">
            ${clonedReference.user} <span class="date">${clonedReference.date}</span>
          </div>
        </div>
      </div>`

      const content = `<div class="msg-content">${clonedReference.msgData.content}
      <div data-msg-id="${clonedReference.msgData.ID}"
      class="more-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="30px"
            fill="gray"
          >
            <path
              d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"
            />
          </svg>
        </div></div>`



      let container;

      if (msgBoolean === true) {
        returnValue()
        } else {
          contentArray.push(content)
          container = document.querySelector(".flex");
          container.innerHTML += content;

          return;}

      function returnValue(){
          contentArray.push(content)
          document.querySelector(".generated-section").innerHTML += html
          container = document.querySelector(".flex")
          container.innerHTML += content;
 
      }

      const moreContainer = document.querySelectorAll(".more-container")

      moreContainer.forEach((element) => {
        console.log(element)
      element.addEventListener("click", () => {
        const msgId = element.dataset.msgId

        loopThroughData(content, clonedReference, msgId )
        })
      })
}

function loopThroughData(content, object){    // the "content" paramater is the DOM representation

  contentArray.forEach(() => {
   if (object.msgData.ID === msgId) {
      delete object.msgData;
      content.innerHTML = ""
    }
  })
}

document.body.addEventListener("keydown", (event) => {
  if (event.key === "x") {
    localStorage.clear("msgData")
  }
})