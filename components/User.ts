// User.ts
class User {
    firstName: string;
    lastName: string;
    colleagueId: string;
    contactNo: string;
    position: string;
    location: string;
    holidays: number;
  
    constructor(
      firstName: string,
      lastName: string,
      colleagueId: string,
      contactNo: string,
      position: string,
      location: string,
      holidays: number
    ) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.colleagueId = colleagueId;
      this.contactNo = contactNo;
      this.position = position;
      this.location = location;
      this.holidays = holidays;
    }
  
    updateContactNumber(newContactNo: string) {
      this.contactNo = newContactNo;
    }
  
    updatePosition(newPosition: string) {
      this.position = newPosition;
    }
  
    getFullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
  }
  
  export default User;
  