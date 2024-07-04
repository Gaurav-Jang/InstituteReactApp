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

    // post method
    SetStudent: "/api/Student/SetStudent",

    // delete student
    DeleteStudent: "/api/Student/DeleteStudent?StudentId={0}",

    // edit student
    GetStudentByStudentId: "/api/Student/GetStudentByStudentId?StudentId={0}",

    // update student
    UpdateStudent: "/api/Student/UpdateStudent",
  },

  // fees structure api
  FeeStructure: {
    // get method
    GetActiveFeeStructure: "/api/FeeStructure/GetActiveFeeStructure",

    // post method
    SetFeeStructure: "/api/FeeStructure/SetFeeStructure",

    // delete fee structure
    DeleteFeeStructure:
      "/api/FeeStructure/DeleteFeeStructure?FeeStructureId={0}",

    // edit fee structure
    GetFeeStructureByFeeStructureId:
      "/api/FeeStructure/GetFeeStructureByFeeStructureId?FeeStructureId={0}",

    // update fee structure
    UpdateFeeStructure: "/api/FeeStructure/UpdateFeeStructure",
  },

  // support api
  Support: {
    // post method
    SetSupport: "/api/Support/SetSupport",
  },
};

export default InstituteSoft;
