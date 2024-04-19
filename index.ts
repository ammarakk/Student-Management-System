#! usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk' 
// Define the Student class
class Student {
    name: string;
    id: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.name = name;
        this.id = this.generateStudentID();
        this.courses = [];
        this.balance = 0;
    }

    // Method to generate unique 5-digit student ID
    private generateStudentID(): string {
        return Math.random().toString(36).substr(2, 5).toUpperCase();
    }

    // Method to enroll in a course
    async enroll() {
        const { course } = await inquirer.prompt({
            type: 'input',
            name: 'course',
            message: 'Enter the name of the course you want to enroll in:'
            
        });
        this.courses.push(course);
        console.log(`${this.name} has been enrolled in ${course}.`);
    }

    // Method to view balance
    viewBalance() {
        console.log(`${this.name}'s balance is $${this.balance}.`);
    }

    // Method to pay tuition fees
    async payTuition() {
        const { amount } = await inquirer.prompt({
            type: 'number',
            name: 'amount',
            message: 'Enter the amount you want to pay towards tuition fees:'
        });
        this.balance -= amount;
        console.log(`${this.name} has paid $${amount} towards tuition fees.`);
        this.viewBalance();
    }

    // Method to show status
    showStatus() {
        console.log(chalk.blue(`  Name: ${this.name}`));
        console.log(chalk.green(`  ID: ${this.id}`));
        console.log(chalk.redBright(`  Courses Enrolled: ${this.courses.join(', ')}`));
        this.viewBalance();
    }
}

// Main function to run the program
async function main() {
    const { name } = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter your name:'
    });

    const student = new Student(name);

    let choice;
    do {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Enroll in a course', 'View balance', 'Pay tuition fees', 'Show status', 'Exit']
        });
        choice = action;

        switch (choice) {
            case 'Enroll in a course':
                await student.enroll();
                break;
            case 'View balance':
                student.viewBalance();
                break;
            case 'Pay tuition fees':
                await student.payTuition();
                break;
            case 'Show status':
                student.showStatus();
                break;
            default:
                console.log(' Exiting...');
                break;
        }
    } while (choice !== 'Exit');
}

// Run the program
main();

