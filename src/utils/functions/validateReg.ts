

  export function clearSpaces(str:string) {
    return str.replace(/\s/g, '');
  }
  export const validateReg = (
    inputs: any,
    participants: any,
    maxTeamMember: number,
    requirements: string[]
  ) => {
    let errors: any = {
      teamName: "",
      teamLeadPhone: "",
      teamLeadEmail: "",
      teamLeadRoll: "",
    };
  
    let uniquePhones = new Set<string>();
    let uniqueEmails = new Set<string>();
    const teamErrors: any[] = [];
  
    const regexPhone =
      /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    // Basic validation for team info
    if (inputs.teamName === "") {
      errors.teamName = "Team Name is required";
    } else if (inputs.teamName.length < 3) {
      errors.teamName = "Team Name is too short";
    }
  
    if (inputs.college === "") {
      errors.college = "College is required";
    }
  
    if (inputs.teamLeadPhone === "") {
      errors.teamLeadPhone = "Phone is required";
    } else if (!regexPhone.test(clearSpaces(inputs.teamLeadPhone).trim())) {
      errors.teamLeadPhone = "Invalid Phone Number";
    }
  
    if (inputs.teamLeadEmail === "") {
      errors.teamLeadEmail = "Email is required";
    } else if (!regexEmail.test(inputs.teamLeadEmail)) {
      errors.teamLeadEmail = "Invalid Email";
    }

    if (inputs.teamLeadEmail === "") {
      errors.teamLeadRoll = "College Roll is required";
    }
  
    // Validation logic for team members if maxTeamMember > 1
    if (maxTeamMember > 1) {
      participants.forEach((participant: any, index: number) => {
        teamErrors[index] = {
          email: "",
          phone: "",
          name: "",
          roll: "",
        };
  
        if (participant.email === "") {
          teamErrors[index].email = "Email is required";
        } else if (!regexEmail.test(participant.email)) {
          teamErrors[index].email = "Invalid Email";
        } else if (uniqueEmails.has(participant.email)) {
          teamErrors[index].email = `Email is already used in the team`;
        } else {
          uniqueEmails.add(participant.email);
        }

        if (participant.roll === "") {
          teamErrors[index].roll = "College Roll is required";
        }
  
        if (participant.phone === "") {
          teamErrors[index].phone = "Phone is required";
        } else if (!regexPhone.test(clearSpaces(participant.phone).trim())) {
          teamErrors[index].phone = "Invalid Phone Number";
        } else if (uniquePhones.has(clearSpaces(participant.phone).trim())) {
          teamErrors[index].phone = "Phone number is already used in the team";
        } else {
          teamErrors[index].phone = "";
          uniquePhones.add(participant.phone.trim());
        }
  
        if (participant.name === "") {
          teamErrors[index].name = "Name is required";
        }
  
        // Add requirements check for each participant
        requirements.forEach((field) => {
          console.log(field, "participant[field]");
          if (participant[field] === "") {
            teamErrors[index][field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
          }
        });
      });
    } else {
      // If maxTeamMember === 1, apply the requirements to the main errors object
      requirements.forEach((field) => {
        if (inputs[field] === "") {
          errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        }
      });
    }
  
    return { errors, teamErrors };
  };
  
  
  export const validateUserReg = (inputs: any) => {
    const errors = {
      name: "",
      email: "",
      collegeRoll: "",
      department: "",
      section: "",
      phone: "",
      gender: "",
      year: "",
    };
    const regexPhone =
      /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    if (inputs.name === "") {
      errors.name = "Name is required";
    }
    if (inputs.phone === "") {
      errors.phone = "Phone is required";
    } else if (!regexPhone.test(clearSpaces(inputs.phone).trim())) {
      errors.phone = "Invalid Phone Number";
    }

    if(inputs.collegeRoll === "") {
      errors.collegeRoll = "College Roll is required";
    }
    if (inputs.department === "") {
      errors.department = "Department is required";
    }
    if (inputs.section === "") {
      errors.section = "Section is required";
    }
    if (inputs.year === "") {
      errors.year = "Year is required";
    }

    if (inputs.gender === "") {
      errors.gender = "Gender is required";
    }
  
    return errors;
  };
  
  export const validateEventInputs = (
    inputs: any,
    eventInputs: any[],
  ) => {
    let errors = {
      teamName: "",
      teamLeadPhone: "",
      teamLeadEmail: "",
      college: "",
      
    };
    const regexPhone =
      /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    if (inputs.teamName === "") {
      errors.teamName = "Team Name is required";
    } else if (inputs.teamName.length < 3) {
      errors.teamName = "Team Name is too short";
    }
  
    if(inputs.college === "") {
      errors.college = "College is required";
    }
  
    if (inputs.teamLeadPhone === "") {
      errors.teamLeadPhone = "Phone is required";
    } else if (!regexPhone.test(inputs.teamLeadPhone)) {
      errors.teamLeadPhone = "Invalid Phone Number";
    }
  
    if (inputs.teamLeadEmail === "") {
      errors.teamLeadEmail = "Email is required";
    } else if (!regexEmail.test(inputs.teamLeadEmail)) {
      errors.teamLeadEmail = "Invalid Email";
    }
  
    const eventInputErrors: any[] = [];
  
    eventInputs.forEach((eventInput: any, index: number) => {
      console.log(eventInput, "eventInput");
      let teamErrors = {
        phone: "",
        name: "",
      };
  
      if (eventInput.participants[index].phone === "") {
        teamErrors.phone = "Phone is required";
      } else if (!regexPhone.test(eventInput.participants.phone)) {
        teamErrors.phone = "Invalid Phone Number";
      }
  
      if (eventInput.participants[index].name === "") {
        teamErrors.name = "Name is required";
      }
  
      eventInputErrors.push(teamErrors);
      console.log(teamErrors);
    });
  
    return { errors };
  };