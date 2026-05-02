# 📁 DocuVault - Digital Document Manager (Cloudinary Edition)

A production-ready web application for managing digital documents with Cloudinary Storage, Redux Toolkit, and React.

## Screenshort
<img width="1900" height="1065" alt="localhost_5173_" src="https://github.com/user-attachments/assets/c360b29c-ed04-47b7-a99f-084fd750367c" />

## ✨ Features

- **Upload Documents**: Support for PDFs, images, spreadsheets, presentations, and more
- **Cloud Storage**: Secure file storage using Cloudinary with CDN delivery
- **State Management**: Centralized state with Redux Toolkit and async thunks
- **Preview Files**: View images and PDFs directly in the browser
- **Download Files**: Quick download functionality
- **Delete Documents**: Remove files with confirmation dialogs
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Real-time Updates**: Loading states and error handling
- **File Metadata**: Display file size, type, and upload date
- **Image Optimization**: Automatic image transformations and CDN delivery

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **State Management**: Redux Toolkit
- **Cloud Storage**: Cloudinary
- **HTTP Client**: Axios
- **Styling**: Custom CSS with CSS Variables
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Formatting**: date-fns

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Cloudinary account (free tier available)

## 🚀 Quick Setup (3 Minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Cloudinary Setup

**A. Create Account**
- Go to https://cloudinary.com/users/register_free
- Sign up and verify email

**B. Get Cloud Name**
- Login to dashboard
- Note your **Cloud Name** (top of page)

**C. Create Upload Preset**
1. Settings → Upload tab
2. Add upload preset
3. Name: `document_uploads`
4. Signing Mode: **Unsigned**
5. Save

**D. Update Config**
Edit `src/config/cloudinary.js`:
```javascript
export const cloudinaryConfig = {
  cloudName: "your_cloud_name",
  uploadPreset: "document_uploads",
};
```

### 3. Run
```bash
npm run dev
```

Open http://localhost:5173 🎉

## 📁 Project Structure

```
src/
├── components/         # React components
├── config/            # Cloudinary config ⚠️ 
├── services/          # Cloudinary API service
├── store/             # Redux store & slices
├── utils/             # Helper functions
└── context/           # Theme context
```

## 🎯 How It Works

1. **Upload**: File → Cloudinary (direct from browser)
2. **Store**: Metadata saved to localStorage
3. **Display**: Documents shown in grid with previews
4. **Delete**: Remove from localStorage (optionally from Cloudinary via backend)

## 🔒 Security Notes

**Current**: Unsigned uploads (great for development)
**Production**: Implement signed uploads via backend API

See `CLOUDINARY-SETUP-GUIDE.md` for production security.

## 📊 Free Tier Limits

- 25 GB storage
- 25 GB bandwidth/month
- 25,000 transformations/month
- Perfect for development!

## 🐛 Common Issues

**"Upload preset error"** → Ensure preset is Unsigned
**"Invalid cloud name"** → Check dashboard for exact name
**Files don't show** → Clear localStorage, refresh

## 📚 Documentation

- See `CLOUDINARY-SETUP-GUIDE.md` for detailed setup
- Cloudinary Docs: https://cloudinary.com/documentation

## 📄 License

MIT License

---

Built with React, Redux Toolkit & Cloudinary ☁️
