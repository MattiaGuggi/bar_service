# 🍸 Craft Cocktail Lounge

A modern, full-stack web application designed for mixologists and cocktail enthusiasts to explore craft recipes, discover unique ingredients, and manage personal mixology collections. Built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## ✨ Features

* **🔐 Session-Based Authentication:**
  * Client-side auth hydration via `UserContext` and `js-cookie`.
  * Middleware-level route protection (`middleware.ts`) enforcing authenticated access to restricted pages.
  * Cookie scoping across application paths with seamless persistence on page refreshes.
* **🍸 Cocktail & Ingredient Discovery:**
  * Search and filter through craft cocktail recipes and ingredients in real time.
* **👤 User Profile Management:**
  * Customizable mixologist profile with credential management (username, email, password updates).
  * Uncommitted local state handling with clean save/cancel operations.
* **🎨 Premium UI/UX:**
  * Dark-mode aesthetics crafted with rich stone, amber, and glowing ambient visual accents.
  * Iconography powered by **Lucide React**.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Client Storage** | [js-cookie](https://github.com/js-cookie/js-cookie) |

---

## 📂 Project Structure

```text
│   ├──bar_service/
│   └── public/                     # Static assets
│   ├── src/
│   │   ├── app/
│   │   ├── (protected)/
│   │   │   ├── drinks/page.tsx     # Drinks creation
│   │   │   ├── profile/page.tsx    # Account management & settings
│   │   │   ├── layout.tsx          # Protected layout
│   │   │   └── page.tsx            # Home / Lounge Dashboard
│   │   ├── api/                    # API's endpoints
│   │   ├── login/                  # Sign-in route
│   │   ├── signup/                 # Sign-up route
│   │   ├── layout.tsx              # Root layout wrapped with UserProvider
│   │   ├── components/             # Reusable UI components (Toast, Loader, etc.)
│   │   ├── context/                # Auth state provider & cookie management
│   │   ├── lib/                    # Backend with db
│   │   └── middleware.ts           # Server-side route protection & redirects