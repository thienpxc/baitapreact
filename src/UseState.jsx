// import React, { useState } from "react";
// import { randomId } from "@mieuteacher/meomeojs";
// export default function UseState() {
//   const savedData = localStorage.getItem("studentFormData");
//   const [users, setNumber] = useState([
//     {
//       id: randomId(),
//       name: "Thien",
//       age: 20,
//     },
//   ]);

//   return (
//     <div>
//     <button onClick={()=>{
//       const newUser = [...users];
//       newUser.push({
//         id: randomId(),
//         name: "Thien",
//         age: 20,
//       });
//       setNumber(newUser);
//     }

//     }>Add</button>
//       <table>
//         <tr>
//           <th>STT</th>
//           <th>Name</th>
//           <th>age</th>
//           <th>Tools</th>
//         </tr>
//         {users.map((user, index) => (
//           <tr key={randomId()}>
//             <th>{index + 1}</th>
//             <th>{user.name}</th>
//             <th>{user.age}</th>
//             <th>
//               <button onClick={()=>{
//                 const newUser = [...users];
//                 newUser.splice(index,1);
//                 setNumber(newUser);
//               }}>Delete</button>
//               <button onClick={()=>{
//                 const newUser = [...users];
//                 newUser[index].name = "Thien";
//                 newUser[index].age = 20;
//                 setNumber(newUser);
//               }}>
//                 Edit
//               </button>
//             </th>
//           </tr>
//         ))}
//       </table>
//     </div>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { randomId } from "@mieuteacher/meomeojs";

// export default function UseState() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Load data from localStorage when the component is mounted
//     const savedData = localStorage.getItem("studentFormData");
//     if (savedData) {
//       const parsedData = JSON.parse(savedData);
//       setUsers(parsedData);
//     }
//   }, []);

//   const handleAdd = () => {
//     const newUser = [...users];

//     setUsers(newUser);

//     // Lưu dữ liệu đã cập nhật vào localStorage
//     localStorage.setItem("studentFormData", JSON.stringify(newUser));
//   };

//   const handleDelete = (index) => {
//     const newUser = [...users];
//     newUser.splice(index, 1);
//     setUsers(newUser);

//     // Lưu dữ liệu đã cập nhật vào localStorage
//     localStorage.setItem("studentFormData", JSON.stringify(newUser));
//   };

//   const handleEdit = (index) => {
//     const newUser = [...users];
//     newUser[index].name = "Thien";
//     newUser[index].age = 20;
//     setUsers(newUser);

//     // Lưu dữ liệu đã cập nhật vào localStorage
//     localStorage.setItem("studentFormData", JSON.stringify(newUser));
//   };

//   return (
//     <div>
//       <button onClick={handleAdd}>Thêm</button>
//       <table
//         style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
//       >
//         <tr>
//           <th>STT</th>
//           <th>Tên</th>
//           <th>Tuổi</th>
//           <th>Email</th>
//           <th>Giới Tính</th>
//           <th>Ngày Sinh</th>
//         </tr>
//         {users.map((user, index) => (
//           <tr key={user.id}>
//             <th>{index + 1}</th>
//             <th>{user.studentName}</th>
//             <th>{user.studentAge}</th>
//             <th>{user.email}</th>
//             <th>{user.gender}</th>
//             <th>{user.joinDate}</th>
//             <th>
//               <button onClick={() => handleDelete(index)}>Xóa</button>
//               <button onClick={() => handleEdit(index)}>Chỉnh sửa</button>
//             </th>
//           </tr>
//         ))}
//       </table>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { randomId } from "@mieuteacher/meomeojs";

export default function UseState() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Load data from localStorage when the component is mounted
    const savedData = localStorage.getItem("studentFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setUsers(parsedData);
    }
  }, []);

  const handleAdd = () => {
    const newUser = {
      id: randomId(),
      studentName: "Thien",
      studentAge: 20,
      email: "example@example.com", // Thay thế bằng dữ liệu email thực tế
      gender: "Nam", // Thay thế bằng dữ liệu giới tính thực tế
      joinDate: "2024-01-01", // Thay thế bằng dữ liệu ngày tham gia thực tế
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);

    // Lưu dữ liệu đã cập nhật vào localStorage
    localStorage.setItem("studentFormData", JSON.stringify(updatedUsers));
  };

  const handleDelete = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);

    // Lưu dữ liệu đã cập nhật vào localStorage
    localStorage.setItem("studentFormData", JSON.stringify(updatedUsers));
  };

  const handleEdit = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].studentName = "Thien";
    updatedUsers[index].studentAge = 20;
    setUsers(updatedUsers);

    // Lưu dữ liệu đã cập nhật vào localStorage
    localStorage.setItem("studentFormData", JSON.stringify(updatedUsers));
  };

  return (
    <div>
      <button onClick={handleAdd}>Thêm</button>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
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
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.studentName}</td>
              <td>{user.studentAge}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.joinDate}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Xóa</button>
                <button onClick={() => handleEdit(index)}>Chỉnh sửa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
