import React, { useState, useEffect } from 'react'
import "./style.css"
//HELPER FUNCTIONS
// Getting data from the local storage
const getLocalData = () => {
    const list = localStorage.getItem("myTodoList")
    if (list) {
        return JSON.parse(list)
    }
    else {
        return []
    }
}

//HELPER FUNCTIONS END
const Todo = () => {
    //Hooks
    //var toggle = false
    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData())
    const [isEditItem, setIsEditItem] = useState("")
    const [toggleButton, setToggleButton] = useState(false)

    const addItem = () => {
        if (!inputData) {
            alert('Please enter an item before adding it to the list')
        }
        // for the edit button
        // if the current element id equals to the edited item, keep the list as it is but change the name of an item
        // with the current inputData (text in the input box)
        else if (inputData && toggleButton) {
            setItems(
                items.map((currElement) => {
                    if (currElement.id === isEditItem) {
                        return { ...currElement, name: inputData }
                    }
                    return currElement
                })
            )
            // set everything back to null to clear out the input field after editing the item
            setInputData([])
            setIsEditItem(null)
            setToggleButton(false)
        }
        else {
            // Previous data in the previous state gets spread and added into the next data
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, myNewInputData])
            setInputData("")
        }
    }
    // filter method allows us to return the list of items which do not equal to the selected item's id 
    const deleteItem = (id) => {
        const updatedItems = items.filter((currElement) => {
            return (
                currElement.id !== id
            )
        })
        setItems(updatedItems)
    }
    const editItem = (id) => {
        const itemToEdit = items.find((currElement) => {
            return (
                currElement.id === id
            )
        })
        //toggle = !toggle
        setInputData(itemToEdit.name)
        setIsEditItem(id)
        setToggleButton(true)
    }
    const removeAll = () => {
        setItems([])
    }

    // Adding items to local storage
    useEffect(() => {
        localStorage.setItem("myTodoList", JSON.stringify(items))
    }, [items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo_removed_bg.png" alt="todo" />
                        <figcaption> List your items/tasks here</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text"
                            placeholder="Add items here"
                            className="form-control"
                            value={inputData}
                            onChange={(event) => setInputData(event.target.value)}

                        />
                        {/* DONT USE additem() because it keeps on calling the function, hence why just declare addItem */}
                        {toggleButton ?
                            <i className="far fa-edit add-btn" onClick={addItem}></i>
                            :
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>
                        }
                        {/* <i className="fa fa-plus add-btn" onClick={addItem}></i> */}
                    </div>
                    {/* show all the items here */}
                    <div className="showItems">
                        {items.map((currElement, index) => {
                            return (
                                <div className="eachItem" key={index}>
                                    <h3>{currElement.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn"
                                            onClick={() => editItem(currElement.id)}></i>
                                        <i className="far fa-trash-alt add-btn"
                                            onClick={() => deleteItem(currElement.id)}></i>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All"
                            onClick={removeAll}>
                            <span>Check List</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
