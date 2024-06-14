const InstituteSoft = {
  BaseURL: "https://localhost:7193",

  // class room api
  ClassRoom: {
    // get method
    GetActiveClassRoom: "/api/ClassRoom/GetActiveClassRoom",
    GetActiveClass: "/api/ClassRoom/GetActiveClass",
    GetActiveClassRoomType: "/api/ClassRoom/GetActiveClassRoomType",

    // post method
    SetClassRoom: "/api/ClassRoom/SetClassRoom",

    // deleted ClassRoom
    DeleteClassRoom: "/api/ClassRoom/DeleteClassRoom?ClassRoomId={0}",

    // edit ClassRoom
    GetClassRoomByClassRoomId:
      "/api/ClassRoom/GetClassRoomByClassRoomId?ClassRoomId={0}",

    // update ClassRoom
    UpdateClassRoom: "/api/ClassRoom/UpdateClassRoom",
  },

  // student api
  Student: {
    GetActiveStudent: "/api/Student/GetActiveStudent",

    //Post method
    SetStudent: "/api/Student/SetStudent",

    //Delete Student
    DeleteStudent: "/api/Student/DeleteStudent?StudentId={0}",

    // edit student
    GetStudentByStudentId: "/api/ClassRoom/GetStudentByStudentId?StudentId={0}",

    // update student
    UpdateClassRoom: "/api/Student/UpdateStudent",
  },
};

export default InstituteSoft;
