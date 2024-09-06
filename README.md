# **Project Setup and Configuration Guide**

## **Description**

This guide provides a detailed step-by-step process to clone, install, configure, and run the project. It covers everything from setting up environment variables, including database URI, Cloudinary account, and Gmail app password, to running the project in development and production modes. Follow these instructions to seamlessly get your project up and running.

---

# Installation Guide

## **1. Clone the Project Repository**

First, you need to clone the project repository from your version control platform (e.g., GitHub, GitLab).

Open your terminal and execute the following command:

```bash
git clone <repository-url>
```

Replace `<repository-url>` with the actual URL of your repository.

## **2. Navigate to the Project Directory**

Once the repository is cloned, navigate to the project directory:

```bash
cd project-name
```

Replace `project-name` with the name of the directory created by the `git clone` command.

## **3. Install All Packages**

Next, install all the required dependencies listed in the `package.json` file. You can use either Yarn or npm:

With **Yarn**:

```bash
yarn install
```

Or with **npm**:

```bash
npm install
```

This command will install all the necessary packages.

## **4. Configure Environment Variables**

### **4.1 Rename the `.env.example` File**

The project includes an `.env.example` file that contains example environment variables. Rename this file to `.env`:

```bash
mv .env.example .env
```

This will create a `.env` file where you will store your actual environment variables.

### **4.2 Retrieve the MongoDB Connection URI**

Since you already have a MongoDB cluster and user set up, retrieve the connection string from MongoDB Atlas:

1. **Log in to MongoDB Atlas:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and log in with your credentials.

2. **Select Your Cluster:**
   - Once logged in, you’ll see your clusters on the dashboard. Click on the cluster you’ve already created.

3. **Connect to Your Cluster:**
   - On the cluster page, click the "Connect" button.

4. **Choose a Connection Method:**
   - Select **"Connect your application."**

5. **Select Driver and Version:**
   - Ensure the "Driver" dropdown is set to **"Node.js"** and the version is appropriate.

6. **Copy the Connection String:**
   - MongoDB Atlas will display a connection string like this:

   ```plaintext
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

7. **Replace Placeholders in the Connection String:**
   - Replace `<username>` with your MongoDB username.
   - Replace `<password>` with your MongoDB user's password.
   - Replace `<dbname>` with the name of the database you want to connect to.

   For example:

   ```plaintext
   mongodb+srv://admin:Admin123456@cluster0.xxxxx.mongodb.net/lost-and-found?retryWrites=true&w=majority
   ```

8. **Add the Database URI to Your `.env` File**

   Open the `.env` file in the project root and add the following line:

   ```bash
   DB_URL=mongodb+srv://admin:Admin123456@cluster0.xxxxx.mongodb.net/lost-and-found?retryWrites=true&w=majority
   ```

   Replace the URI with your actual MongoDB connection string.

### **4.3 Set Up Cloudinary Account and Credentials**

Cloudinary is used for managing and delivering images. To set it up:

1. Visit [Cloudinary](https://cloudinary.com/).
2. Sign up or log in to your account.
3. Go to the Cloudinary Dashboard.
4. Note down your `Cloud Name`, `API Key`, and `API Secret`.

Add these credentials to your `.env` file:

```bash
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
```

Replace `<your-cloud-name>`, `<your-api-key>`, and `<your-api-secret>` with your Cloudinary account details.

### **4.4 Set Up Gmail App Password**

To send emails through your Gmail account, you need to generate an app password:

1. Go to your [Google Account Security Settings](https://myaccount.google.com/security).
2. Under "Signing in to Google," enable 2-Step Verification.
3. Once 2-Step Verification is enabled, go back to the Security page and click on "App passwords."
4. Select "Mail" as the app and your device type, then generate the app password.
5. Copy the generated password.

Add your Gmail credentials to the `.env` file:

```bash
SENDER_EMAIL=<your-email>
SENDER_APP_PASS=<your-app-password>
```

Replace `<your-email>` with your Gmail address and `<your-app-password>` with the app password you generated.

### **4.5 Add Remaining Environment Variables**

Complete your `.env` file with the following variables:

```bash
NODE_ENV=development
PORT=3000
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=secret
JWT_ACCESS_EXPIRES_IN=7d
JWT_REFRESH_SECRET=refreshsecret
JWT_REFRESH_EXPIRES_IN=1y
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=123456
ADMIN_MOBILE_NUMBER=1234567890
ADMIN_PROFILE_PHOTO=https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png
```

## **5. Run the Project**

After setting up the environment variables, you can run the project.

### **5.1 Run in Development Mode**

To start the project in development mode, run:

With **Yarn**:

```bash
yarn dev
```

Or with **npm**:

```bash
npm run dev
```

This will start the development server with hot-reloading enabled.

### **5.2 Run in Production Mode**

To start the project in production mode:

1. **Build the Project:**

   With **Yarn**:

   ```bash
   yarn build
   ```

   Or with **npm**:

   ```bash
   npm run build
   ```

2. **Start the Server:**

   With **Yarn**:

   ```bash
   yarn start
   ```

   Or with **npm**:

   ```bash
   npm start
   ```

## **6. Access the Application**

Once the server is running, you can access the application in your browser by visiting:

```bash
http://localhost:5000
```

This guide should help you set up, configure, and run your project seamlessly. If you encounter any issues or need further assistance, feel free to ask!
