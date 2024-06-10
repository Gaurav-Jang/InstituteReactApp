const InstituteSoft = {
  BaseURL: "http://localhost:5002",

  // class room api
  ClassRoom: {
    // get method
    GetActiveClassRoom: "/api/ClassRoom/GetActiveClassRoom",
    GetActiveClass: "/api/ClassRoom/GetActiveClass",
    GetActiveClassRoomType: "/api/ClassRoom/GetActiveClassRoomType",

    // post method
    SetClassRoom: "/api/ClassRoom/SetClassRoom",

    // deleted Classroom
    DeleteClassRoom: "/api/ClassRoom/DeleteClassRoom?ClassRoomId={0}",
    EditClassRoom: "/api/ClassRoom/EditClassRoom?ClassRoomId={0}",
  },

  // student api
  Student: {
    GetActiveStudent: "/api/Student/GetActiveStudent",

    //Post method
    SetStudent: "/api/Student/SetStudent",

    //Delete Student
    DeleteStudent: "/api/Student/DeleteStudent?StudentId={0}",
  },
};

export default InstituteSoft;
