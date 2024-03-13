const getStudentInfo = () => {
    let studentId = document.getElementById("student-id").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let math = document.getElementById("math").value;
    let physic = document.getElementById("physic").value;
    let chemical = document.getElementById("chemical").value;

    let newStudent = new Student(studentId, name, email, math, physic, chemical);
    return newStudent;

}
const editStudent = (studentID) => {
  let jsonStudents = localStorage.getItem("students");
  let students = JSON.parse(jsonStudents);

  for (let i = 0; i < students.length; i++) {
    let student = students[i];
    if (student && student.id == studentID) { // Kiểm tra xem sinh viên có tồn tại và có ID trùng với studentID không
      // Lấy giá trị của sinh viên cần chỉnh sửa
      let studentId = student.id;
      let name = student.name;
      let email = student.email;
      let math = student.math;
      let physic = student.physic;
      let chemical = student.chemical;

      // Gán giá trị lên form
      document.getElementById("student-id").value = studentId;
      document.getElementById("student-id").readOnly = true;
      document.getElementById("name").value = name;
      document.getElementById("email").value = email;
      document.getElementById("math").value = math;
      document.getElementById("physic").value = physic;
      document.getElementById("chemical").value = chemical;

      break; // Thoát khỏi vòng lặp sau khi tìm thấy sinh viên cần chỉnh sửa
    }
  }
};
  const deleteStudent = (studentID) => {
    let jsonStudents = localStorage.getItem("students");
    let students = JSON.parse(jsonStudents);

    for (let i = 0; i < students.length; i++) {
      let student = students[i];
          if (!student) {
            console.log("Không có studentID nào để xóa.");
          } else{
          console.log("studentID Số cần xóa", studentID);
            if (student === studentID); {
              students.splice(i,1);
              localStorage.setItem("students", JSON.stringify(students)); // Cập nhật dữ liệu trong localStorage
              renderStudent(students); // Cập nhật lại bảng
            }      
    }
  }
  }

const renderStudent = (students) => {
    // Sắp xếp mảng sinh viên theo studentID tăng dần
    students.sort((a, b) => a.id - b.id);

    let contentHTML = "";
    for (let i = 0; i < students.length; i++) {
        let currentStudent = students[i];
        let studentID = currentStudent.id;
        let contentTr = `
            <tr>
                <td>${currentStudent.id}</td>
                <td>${currentStudent.name}</td>
                <td>${currentStudent.email}</td>
                <td>${(Number(currentStudent.math) + Number(currentStudent.physic) + Number(currentStudent.chemical))/3}</td>
                <td>
                    <form id="editForm" onsubmit="return false;">
                        <button onclick="editStudent(${studentID})">Sửa</button>
                        <button onclick="deleteStudent(${studentID})" style="background-color: red">Xóa</button>
                    </form>
                </td>
            </tr>
        `;
        contentHTML += contentTr;
    }
    document.getElementById("table-body").innerHTML = contentHTML;
};

const setStudentToLocalStorage = (students) => {
    let jsonStudents = JSON.stringify(students);
    localStorage.setItem("students", jsonStudents)

}

const getStudentFromLocalStorage = () => {
    let jsonStudents = localStorage.getItem("students");
    return JSON.parse(jsonStudents);

}