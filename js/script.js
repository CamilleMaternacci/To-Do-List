let $todoInput
let $todoAddBtn
let $todoArea
let $todoTitle
let $todoTasks
let $allTasks
let $deleteAllBtn
let $popup
let $editInput
let $editTodoBtn
let $editedTask
let $cancelTodoBtn
let $shadow
let $idNumber = 0
let $newTask
let $completeBtn
let $editBtn
let $deleteBtn

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	$todoInput = document.querySelector('#todo-input')
	$todoAddBtn = document.querySelector('.add-todo')
	$todoArea = document.querySelector('.todo-area')
	$todoTitle = document.querySelector('.todo-title')
	$todoTasks = document.querySelector('.todo-tasks')
	$allTasks = document.getElementsByTagName('li')
	$deleteAllBtn = document.querySelector('.delete-all')
	$popup = document.querySelector('.popup')
	$editInput = document.querySelector('#todo-edit')
	$editTodoBtn = document.querySelector('.btn-edit-todos')
	$cancelTodoBtn = document.querySelector('.btn-cancel')
	$shadow = document.querySelector('.shadow')
}

const prepareDOMEvents = () => {
	$todoAddBtn.addEventListener('click', addNewTask)
	$todoInput.addEventListener('keyup', enterCheck)
	$editInput.addEventListener('keyup', enterCheckEdit)
	window.addEventListener('keyup', escEdit)
	$todoTasks.addEventListener('click', checkClick)
	$cancelTodoBtn.addEventListener('click', closePopup)
	$editTodoBtn.addEventListener('click', saveChanges)
	$deleteAllBtn.addEventListener('click', deleteAllTasks)
}

const checkTaskArea = () => {
	if ($allTasks.value !== 0) {
		$deleteAllBtn.style.display = 'block'
		$todoTitle.style.display = 'none'
	}
}

const addNewTask = () => {
	checkTaskArea()
	if ($todoInput.value !== '') {
		$idNumber++
		$newTask = document.createElement('li')
		$newTask.innerText = $todoInput.value
		$newTask.setAttribute('id', `single-${$idNumber}`)
		$todoTasks.append($newTask)
		createBtns()
		$todoInput.value = ''
		$todoInput.classList.remove('error-input')
	} else {
		$todoInput.classList.add('error-input')
	}
}

const enterCheck = e => {
	if (e.keyCode == 13) {
		addNewTask()
	}
}

const enterCheckEdit = e => {
	if (e.keyCode == 13) {
		saveChanges()
	}
}

const escEdit = e => {
	if (e.keyCode == 27) {
		closePopup()
	}
}

const createBtns = () => {
	const newBtns = document.createElement('div')
	newBtns.classList.add('btns-area')
	newBtns.classList.add('border-btn')
	$newTask.append(newBtns)

	$completeBtn = document.createElement('button')
	$completeBtn.classList.add('done-btn')
	$completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>'

	$editBtn = document.createElement('button')
	$editBtn.classList.add('edit-btn')
	$editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'

	$deleteBtn = document.createElement('button')
	$deleteBtn.classList.add('delete-btn')
	$deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

	newBtns.append($completeBtn)
	newBtns.append($editBtn)
	newBtns.append($deleteBtn)
}

const checkClick = e => {
	if (e.target.classList.value !== '') {
		if (e.target.closest('button').classList.contains('done-btn')) {
			e.target.closest('li').classList.toggle('task-done')
		} else if (e.target.closest('button').classList.contains('edit-btn')) {
			showPopup(e)
		} else if (e.target.closest('button').classList.contains('delete-btn')) {
			deleteTask(e)
		}
	}
}

const showPopup = e => {
	$popup.style.display = 'flex'
	$shadow.style.display = 'block'

	const oldTask = e.target.closest('li').id
	$editedTask = document.getElementById(oldTask)
	$editInput.value = $editedTask.firstChild.textContent
}

const editTask = e => {
	const oldTask = e.target.closest('li').id
	$editedTask = document.getElementById(oldTask)
}

const closePopup = () => {
	$popup.style.display = 'none'
	$shadow.style.display = 'none'
}

const saveChanges = () => {
	if ($editInput.value !== '') {
		$editedTask.firstChild.textContent = $editInput.value
		$editInput.classList.remove('error-input')
		closePopup()
	} else {
		$editInput.classList.add('error-input')
	}
}

const deleteTask = e => {

	const deleteSingleTask = e.target.closest('li')
	deleteSingleTask.remove()

	
	if ($allTasks.length == 0) {
		$todoTitle.style.display = 'block'
		$deleteAllBtn.style.display = 'none'
	}

	
}

const deleteAllTasks = () => {
	$todoTasks.textContent = ''
	$todoTitle.style.display = 'block'
	$deleteAllBtn.style.display = 'none'
}

document.addEventListener('DOMContentLoaded', main)
