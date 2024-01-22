import { compile } from "sass";
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormStudent.scss";
import { randomId } from "@mieuteacher/meomeojs";
import React, { useState, useEffect } from "react";

export default function FormStudent() {
  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [allFormData, setAllFormData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  // const [exportFileType, setExportFileType] = useState(null);

  const exportToExcel = async () => {
    let isFileSaved = false;
    if (!isFileSaved) {
      const fileNameFromUser = prompt("Nhập tên file Excel:");
      if (fileNameFromUser) {
        const storedFileName = localStorage.getItem("storedFileName");
        if (storedFileName && storedFileName === fileNameFromUser) {
          alert("File đã được lưu với tên này trước đó. Không thể lưu lại.");
          return;
        }

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(allFormData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "StudentFormData");
        XLSX.writeFile(workbook, `${fileNameFromUser}.xlsx`);

        localStorage.setItem("storedFileName", fileNameFromUser);
        isFileSaved = true;

        setAllFormData([]);
      } else {
        alert("Bạn đã hủy việc nhập tên file.");
      }
    } else {
      alert("File đã được lưu. Không thể lưu lại.");
    }
  };
  // const openExportOptionsDialog = () => {
  //   const selectedFileType = prompt("Chọn loại file (excel/word):");

  //   if (selectedFileType === "excel" || selectedFileType === "word") {
  //     setExportFileType(selectedFileType);
  //     exportData(selectedFileType);
  //   } else {
  //     alert("Loại file không hợp lệ.");
  //   }
  // };
  // const exportData = (fileType) => {
  //   if (!fileType) {
  //     // Handle the case where fileType is null or undefined
  //     alert("Vui lòng chọn loại file trước khi xuất dữ liệu.");
  //     return;
  //   }

  //   if (fileType === "excel") {
  //     exportToExcel();
  //   } else if (fileType === "word") {
  //     exportToWord();
  //   }
  // };

  // const exportToExcel = async () => {
  //   const workbook = XLSX.utils.book_new();
  //   const worksheet = XLSX.utils.json_to_sheet(allFormData);
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "StudentFormData");

  //   const fileNameFromUser = prompt("Nhập tên file Excel:");
  //   if (fileNameFromUser) {
  //     XLSX.writeFile(workbook, `${fileNameFromUser}.xlsx`);
  //   } else {
  //     alert("Bạn đã hủy việc nhập tên file.");
  //   }
  // };

  // const exportToWord = async () => {
  //   try {
  //     const fileNameFromUser = await new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve(prompt("Nhập tên file Word:"));
  //       }, 0);
  //     });

  //     if (fileNameFromUser) {
  //       const templateFile = fs.readFileSync("student-template.docx", "binary");
  //       const template = new Docxtemplater(templateFile);

  //       const data = {
  //         studentName,
  //         studentAge,
  //         email,
  //         gender,
  //         joinDate,
  //       };

  //       template.setData(data);
  //       template.render();
  //       const output = template.getZip().generate({ type: "nodebuffer" });

  //       fs.writeFileSync(`${fileNameFromUser}.docx`, output);
  //       console.log("Xuất file Word thành công!");
  //     } else {
  //       console.log("Bạn đã hủy việc nhập tên file.");
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi xuất Word:", error);
  //     alert("Xuất Word thất bại!");
  //   }
  // };

  const importFromExcel = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Vui lòng chọn một tệp Excel.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const importedData = XLSX.utils.sheet_to_json(worksheet);

      setAllFormData(importedData);
      localStorage.setItem("studentFormData", JSON.stringify(importedData));
    };

    reader.readAsArrayBuffer(file);
  };
  const handleEdit = (index) => {
    const formDataToEdit = allFormData[index];

    setStudentName(formDataToEdit.studentName);
    setStudentAge(formDataToEdit.studentAge);
    setEmail(formDataToEdit.email);
    setGender(formDataToEdit.gender);
    setJoinDate(formDataToEdit.joinDate);

    setEditingIndex(index);
  };
  const handleDelete = (index) => {
    if (!confirm("Xác nhận muốn xóa")) return;
    const updatedFormData = [...allFormData];
    updatedFormData.splice(index, 1);

    setAllFormData(updatedFormData);

    const localStorageData =
      JSON.parse(localStorage.getItem("studentFormData")) || [];
    localStorageData.splice(index, 1);
    localStorage.setItem("studentFormData", JSON.stringify(localStorageData));
  };

  useEffect(() => {
    const savedData = localStorage.getItem("studentFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setAllFormData(parsedData);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      id: randomId(),
      studentName,
      studentAge,
      email,
      gender,
      joinDate,
    };

    const updatedFormData =
      editingIndex !== null
        ? [
            ...allFormData.slice(0, editingIndex),
            formData,
            ...allFormData.slice(editingIndex + 1),
          ]
        : [...allFormData, formData];

    setAllFormData(updatedFormData);
    setEditingIndex(null);

    // Lưu dữ liệu đã cập nhật vào localStorage
    await localStorage.setItem(
      "studentFormData",
      JSON.stringify(updatedFormData)
    );

    e.target.reset();
    setStudentName("");
    setStudentAge("");
    setEmail("");
    setGender("");
    setJoinDate("");
  };

  return (
    <>
      <h1 className="form">Student Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          id="studentName"
          placeholder="Enter your name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />

        <input
          type="number"
          id="studentAge"
          placeholder="Enter your age"
          value={studentAge}
          onChange={(e) => setStudentAge(e.target.value)}
        />

        <input
          type="email"
          id="emailId"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div id="sex">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={() => setGender("male")}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={() => setGender("female")}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              checked={gender === "other"}
              onChange={() => setGender("other")}
            />
            Other
          </label>
        </div>

        <label htmlFor="joinDate">Date of birth</label>
        <input
          type="date"
          id="joinDate"
          value={joinDate}
          onChange={(e) => setJoinDate(e.target.value)}
        />

        <button type="submit" id="btn-submit" class="btn btn-outline-secondary">
          Submit
        </button>
      </form>
      <div>
        <button onClick={exportToExcel} className="btn btn-outline-success">
          Xuất Dữ Liệu
        </button>
        {/* <button onClick={uploadEditedExcelFile} className="btn btn-success">
          Upload File Excel Chỉnh Sửa
        </button> */}
        <input
          type="file"
          accept=".xlsx"
          onChange={importFromExcel}
          id="file-Excel"
        />
      </div>
      <div className="formDataContainer">
        <h5>Student information</h5>
        <table className="formDataTable">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Tuổi</th>
              <th>Email</th>
              <th>Giới Tính</th>
              <th>Ngày Sinh</th>
              <th>Công cụ</th>
            </tr>
          </thead>
          <tbody>
            {allFormData.map((formData, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{formData.studentName}</td>
                <td>{formData.studentAge}</td>
                <td>{formData.email}</td>
                <td>{formData.gender}</td>
                <td>{formData.joinDate}</td>
                <td>
                  <button
                    onClick={() => handleDelete(index)}
                    class="btn btn-outline-danger"
                  >
                    Xóa
                  </button>
                  <button
                    onClick={() => handleEdit(index)}
                    class="btn btn-danger"
                    id="btn-ebit"
                  >
                    Chỉnh sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
