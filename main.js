let students = getStudentFromLocalStorage() || [];
renderStudent(students);


const addNewStudent = () => {
    let newStudent = getStudentInfo();
    console.log("newStudent", newStudent)
    students.push(newStudent)
    setStudentToLocalStorage(students)
    console.log("student", students)
    renderStudent(students)
    document.getElementById("form-control-student").reset();
}


const resertStudents = () => {
    students = [];
    localStorage.removeItem("students")
    renderStudent(students)
}

const updateStudent = () => {
    console.log("Update Student")
    let updatedStudent = {
        id: document.getElementById("student-id").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        math: document.getElementById("math").value,
        physic: document.getElementById("physic").value,
        chemical: document.getElementById("chemical").value,
      };
    
      let jsonStudents = localStorage.getItem("students");
      let students = JSON.parse(jsonStudents);
    
      if (students && students.length > 0) { // Tìm sinh viên cần chỉnh sửa trong mảng
        let studentIndex = students.findIndex(student => student.id === updatedStudent.id);
        if (studentIndex !== -1) {        // Cập nhật thông tin sinh viên
          students[studentIndex] = updatedStudent; // Lưu mảng students mới vào localStorage
          localStorage.setItem("students", JSON.stringify(students)); // In thông báo cập nhật thành công
          console.log("Thông tin sinh viên đã được cập nhật thành công:", updatedStudent);
        } else {
          console.log("Không tìm thấy sinh viên cần cập nhật trong LocalStorage");
        }
      } else {
        console.log("Không có dữ liệu sinh viên trong mảng trống");
      }
}