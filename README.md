## 🧾<a href="easy-access-contents">Easy Access Contents</a>

1. 🙋‍♂️[Introduction](#introduction)
2. 🤩[Quick Start](#quick-start)
3. ⚙️[Techologies Used](#techologies-used)
4. ⭐[Features](#features)
5. 🛠️[Customization](#customization)
6. 🎊[Moral of Story](#moral-of-story)

## 🙋‍♂️<a href="introduction">Introduction</a>

**Overview**

This project provides a fully customizable authentication solution using NextAuth, designed to be open-source and reusable. Whether you're building a personal project or a large-scale application, this repository allows you to implement authentication effortlessly so that you can focus on your primary project goals.

**Objective**

The main objective of this project is to offer a plug-and-play authentication system that developers can easily integrate into their Next.js applications. With full customization options, users can tailor the authentication flow to suit their specific needs. By utilizing this solution, developers can bypass the complexities of building an authentication system from scratch and instead concentrate on the core aspects of their application.


## 🤩<a href="quick-start">Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the repository and start building**

```bash
git clone https://github.com/ManishZ007/easy-authentication.git
cd easy-authentication
```

**Installation**
Install the project dependencies using npm

```bash
npm install
```

**Set Up Environment Variables**
create a file called .env.loacl in your root root project and add this content in it

```bash

AUTH_SECRET= # Added by `npx auth`. Read more: https://cli.authjs.dev it will automatically generate this secret key
NEXTAUTH_URL=http://localhost:3000/

# Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# github
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# mongodb connection
MONGODB_URL=

```

replace the placeholder values with your actual respective account credentials. You can obtain these credentials by signing up on the [GoogleClude](https://console.cloud.google.com/welcome), [MongoDB](https://www.mongodb.com/), [Github](https://github.com)

**Running The Project**

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## ⚙️<a href="techologies-used">Technologies Used</a>

- **Next.js**: A React framework for server-rendered applications.
- **TypeScript**: A statically typed superset of JavaScript that enhances code reliability and maintainability.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js, used here for managing data storage.
- **Tailwind CSS**: A utility-first CSS framework for styling the user interface.
- **NextAuth**: A complete authentication solution for Next.js applications.
- **ShadCN**: A library for building user interfaces quickly and efficiently.

## ⭐<a href="features">Features</a>
- **Customizable Authentication**: Fully customizable authentication flow, allowing users to add their own content and modify the authentication process as needed.
- **User Management**
   - Sign Up: Allow users to register an account.
   - Sign In: Enable users to log into their accounts.
   - Delete User: Users can delete their accounts if needed.
   - Update User: Users can update their account details.
- **Focus on Core Application**: By using this project, developers can offload the authentication process and focus on the main objectives of their application.
- **Open Source**: This project is open-source, enabling contributions and adaptations by the developer community.
- **Easy UI Development**: With ShadCN, building and customizing UI components is straightforward, saving development time.
- **Theme Management**: Includes a theme toggle button that allows users to easily switch between light and dark themes, enhancing the user experience.


## 🛠️<a href="customization">Customization</a>

This project is designed to be fully customizable. You can modify the authentication pages, integrate additional providers, or change the data models according to your needs.

**Adding Custom Content**

To add your own content, navigate to the relevant components in the ```/components``` or ```/pages``` directories and modify them as needed. The project is built with modularity in mind, so adding or removing features should be straightforward.

**User Management Customization**

All user management features—sign-up, sign-in, delete user, and update user—are fully customizable. You can modify these features to fit your specific requirements by editing the relevant functions and components.

**Theme Management**

This project is open for contributions. If you have suggestions for improvements or new features, feel free to submit a pull request or open an issue on the GitHub repository.


## 🎊<a href="moral-of-story">Moral of Story</a>

This starter kit is perfect for anyone looking to quickly implement a robust authentication system with a polished UI, theme management, and additional features, while retaining the flexibility to tailor it to their needs.








