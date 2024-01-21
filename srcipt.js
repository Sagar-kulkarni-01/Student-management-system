let students = [];

async function addStudent() {
    const name = document.getElementById('name').value;
    const course = document.getElementById('course').value;
    const grade = document.getElementById('grade').value;

    if (name && course && grade) {
        const response = await fetch('http://localhost:3001/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, course, grade }),
        });

        const newStudent = await response.json();
        students.push(newStudent);
        updateStudentList();
        clearInputFields();
    } else {
        alert('Please fill in all fields.');
    }
}

async function viewStudentList() {
    const response = await fetch('http://localhost:3001/students');
    students = await response.json();

    const listTitle = document.getElementById('listTitle');
    const studentListTable = document.getElementById('studentList');

    if (students.length > 0) {
        listTitle.style.display = 'block';
        studentListTable.style.display = 'table';
        updateStudentListTable(students);
    } else {
        alert('The student list is empty.');
    }
}

async function deleteStudent(id) {
    await fetch(`http://localhost:3001/students/${id}`, {
        method: 'DELETE',
    });

    students = students.filter(student => student.id !== id);
    updateStudentList();
}

function updateStudentListTable(students) {
    const studentListTableBody = document.querySelector('#studentList tbody');
    studentListTableBody.innerHTML = '';

    students.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>${student.grade}</td>
            <td>
                <button onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;
        studentListTableBody.appendChild(tr);
    });
}

function clearInputFields() {
    document.getElementById('name').value = '';
    document.getElementById('course').value = '';
    document.getElementById('grade').value = '';
}