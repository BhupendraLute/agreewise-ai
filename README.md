# AgreeWise 📝🤝  
**Demystifying Legal Documents with Generative AI**

---

## 🚀 Overview  
**AgreeWise** is a web application that simplifies complex legal documents like rental agreements, loan contracts, and employment terms into **clear, plain language**.  

With the power of **Google Gemini (Generative AI)**, AgreeWise breaks down legal jargon into **Obligations, Rights, Risks, and Tips**, empowering users to make confident, informed decisions.  

---

## ✨ Key Features  
- 📂 **Upload or Paste Agreements** — Support for PDF and plain text input.  
- ⚡ **AI-Powered Simplification** — Automatically converts legal clauses into clear language.  
- 📑 **Clause Insights** — Categorization into obligations, rights, risks, and actionable tips.  
- 🔍 **Dashboard** — Manage and explore agreements in one place.  
- 🛡️ **Secure & Private** — User authentication and isolated storage.  
- 🌗 **Dark & Light Mode** — Modern UI with theme flexibility.  

---

## 🧩 Process Flow  
1. **User Uploads** agreement (PDF or text).  
2. **Backend Preprocessing** (PDF parsing or raw text handling).  
3. **AI Model (Gemini API)** simplifies and categorizes clauses.  
4. **Database (MongoDB)** stores agreements and results.  
5. **User Dashboard** displays simplified insights in a clear, actionable format.  

---

## 🏗️ System Architecture  
- **Frontend**: Next.js, TailwindCSS, Shadcn/UI, Framer Motion  
- **Backend**: Next.js API Routes (Node.js)  
- **AI Layer**: Google Gemini API (Generative AI for NLP tasks)  
- **Database**: MongoDB Atlas  
- **Authentication**: NextAuth (Google/GitHub sign-in)  
- **Hosting**: Vercel  
- **File Processing**: pdf-parse + `/tmp` storage for serverless compatibility  

---

## ⚙️ Installation & Setup  

### 1. Clone Repository  
```bash
git clone https://github.com/your-username/agreewise.git
cd agreewise
```

### 2. Install Dependencies  
```bash
npm install
```

### 3. Setup Environment Variables  
Create a `.env.local` file:  
```bash
APP_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Authentication
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Database
MONGODB_URI=

# Gemini API Key
GEMINI_API_KEY=
```

### 4. Run Development Server  
```bash
npm run dev
```

App runs on [http://localhost:3000](http://localhost:3000).

---

## 🧪 Usage  
1. **Sign in** with Google/GitHub.  
2. **Upload** your agreement (PDF or paste text).  
3. Let AI **analyze & simplify** the clauses.  
4. Explore results in your **dashboard** with tips, risks, and rights.  

---

## 🔮 Future Improvements  
- 🗣️ Multi-language support (English + Indian languages).  
- 📊 Risk scoring and visualization for agreements.  
- 🤖 Chat-style Q&A with agreement clauses.  
- 🔐 End-to-end encryption for uploaded documents.  

---

## 👨‍💻 Team  
**Legit Coders**  
Hackathon Project for *GenAI Exchange Hackathon*.  

---

## 📜 License  
This project is licensed under the [MIT License](LICENSE).  
