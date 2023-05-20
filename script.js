import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-893d7-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addBtnEl = document.getElementById("add-button") 
const shoppingListEl = document.getElementById("shopping-list")


addBtnEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot){

    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
    
        clearshoppingListEl()

        for (let i = 0; i < itemsArray.length; i++) {

            let currentItem = itemsArray[i]
            
            appendShoppingListEl(currentItem)
        }
    }
    else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
    
})

function clearshoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendShoppingListEl(items) {
        
    let itemsID = items[0]
    let itemValue = items[1]
    let newEl = document.createElement("li")
 
    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function(){

        let exactLocationInDB = ref(database, `shoppingList/${itemsID}`)

        remove(exactLocationInDB)
    })

    shoppingListEl.append(newEl)
}