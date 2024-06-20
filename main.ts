#! /user/bin/env node

import inquirer from "inquirer";

class student {
  static counter = 10000;
  id: number;
  name: string;
  courses: string[];
  balance: number;


  constructor(name: string) {
    this.id = student.counter++;
    this.name = name;
    this.courses = [];
    this.balance = 100;
  }

  // method to enroll student in course
  enroll_course(course: string) {
    this.courses.push(course)
  }

  //   method to view student balance
  view_balnce() {
    console.log(`balnce for ${this.name} : ${this.balance}`);
  }

  // method to pay student fees
  pay_fees(amount: number) {
    this.balance -= amount;
    console.log(`$${amount} fees paid sucessfull for ${this.name}`);
  }

  //   show student status
  show_status() {
    console.log(`ID: ${this.id}`);
    console.log(`name: ${this.name}`);
    console.log(`course: ${this.courses}`);
    console.log(`balance : ${this.balance}`);

  }
}



// define student management to amnagae student

class student_manager {
  students: student[];

  constructor() {
    this.students = [];
  }

  //method to find student by student id
  find_student(student_id: number) {
    return this.students.find(std => std.id === student_id)
  }

  //  method to add new student
  add_student(name: string) {
    let Student = new student(name);
    this.students.push(Student);
    console.log(`student: ${name} added sucessfully. student ID: ${Student.id}`);

  }
  //  method to enroll student in a course
  enroll_student(student_id: number, course: string) {
    let student = this.find_student(student_id);
    if (student) {
      student.enroll_course(course);
      console.log(`${student.name} enrooled in course ${course} successfully`);
    }

  }

  // method to view student in a balance
  view_student_balance(student_id: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.view_balnce();
    }
    else {
      console.log("student not found. please enter a correct student ID");
    }
  }
  //  mehod to pay student fees
  pay_student_fees(student_id: number, amount: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.pay_fees(amount);
    } else {
      console.log("student not found. please enter a correct student ID");
    }
  }
  // method to show student status
  show_student_status(student_id: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.show_status();
    }
  }

}
// using assync function 
async function main() {
  console.log("Welcome to 'iqra naz' student management system ");
  console.log("*".repeat(50));

  let Student_manager = new student_manager();
  while (true) {
    let choice = await inquirer.prompt([
      {
        name: "choices",
        type: "list",
        message: "select an option",
        choices: ["Add student", "Enroll student", "view student balance", "pay fees", "show status", "Exit"]

      }
    ])

    // using switch case to handle user input
    switch (choice.choices) {
      case "Add student":
        let name_input = await inquirer.prompt([
          {

            name: "name",
            type: "input",
            message: "Enter a student name"
          }
        ])
        Student_manager.add_student(name_input.name);
        break;


      case "Enroll student":
        let course_input = await inquirer.prompt([
          {

            name: "student_id",
            type: "number",
            message: "Enter a student ID"
          },
          {
            name: "course",
            type: "input",
            message: "Enter the course name"

          }
        ])
        Student_manager.enroll_student(course_input.student_id, course_input.course)
        break;

      case "pay fees":
        let fees_input = await inquirer.prompt([
          {

            name: "student_id",
            type: "number",
            message: "Enter a student Id"
          },
          {

            name: "amount",
            type: "number",
            message: "Enter the amount to pay"
          }
        ])
        Student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
        break;

        case "show status":
          let status_input = await inquirer.prompt([
            {
  
              name: "student_id",
              type: "number",
              message: "Enter a student Id"
            }
          ])
          Student_manager.show_student_status(status_input.student_id);

      case "Exit":
        console.log("Exciting...")
        process.exit();
    }

  }
}
main();