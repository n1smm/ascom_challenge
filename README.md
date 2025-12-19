#heheuh
# Ascom challenge
# 🏥 Scuola42 Frontend Engineer Test – Patient Manager

This is a React-based frontend application to manage and display patient data from a remote API.
---


## 📦 Project Overview

**Goal:**
Develop a React application that manages "Patient" entities with support for data fetching, sorting, filtering, and editing. Each patient has personal information and a list of medical parameters.

**API Base URL:**
`https://mobile.digistat.it/CandidateApi`

**Swagger Docs:**
[Swagger UI](https://mobile.digistat.it/CandidateApi/swagger/index.html)

---

## 📁 Technologies Used

* **Frontend:** React (with Hooks & Functional Components)
* **HTTP Client:** Axios
* **Styling:** Tailwind CSS

---

## 📁 Dependencies 
project was tested with:
- ubuntu 24.04lts
- firefox 140.0.2
- node 22.12.0
- npm 11.0.0
---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/n1smm/ascom_challenge.git
cd ascom_challenge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Authentication (make .env file)

Add HTTP Basic Auth to env (which should be in the root of the project)
you can also just rename env_example.txt to .env or copy paste this into the file:
```c
VITE_API_USER=test
VITE_API_PASS=TestMePlease!
```

### 4. Run the app

```bash
npm run dev
```

or

```bash
npm run build && npm run preview
```

## 🩺 Data Model

### 🧝 Patient

| Field        | Type     | Description                  |
| ------------ | -------- | ---------------------------- |
| `ID`         | `int`    | Unique identifier            |
| `FamilyName` | `string` | Last name                    |
| `GivenName`  | `string` | First name                   |
| `BirthDate`  | `date`   | Date of birth                |
| `Sex`        | `string` | Gender (e.g., Male / Female) |
| `Parameters` | `array`  | List of parameter objects    |

### 📊 Parameter

| Field   | Type      | Description                        |
| ------- | --------- | ---------------------------------- |
| `ID`    | `int`     | Unique identifier                  |
| `Name`  | `string`  | Name of the parameter              |
| `Value` | `string`  | Parameter value                    |
| `Alarm` | `boolean` | `true` if parameter triggers alarm |

-- 

## 🛠️ things to improve

- better cache for patient list (tried to build the SWR caching, but sometimes it's not refreshing correctly and needs to be done manually)

- some UI elements need some more work (like select drop-down menu, checkbox, notification)
    - i used the basic ones already present in standard html, but they are not as modifiable/designable as lets say headlesUI components)
- table could also be made as a proper custom element, since i had problems modifying how styling was applied to the table(e.g. rounded edges, highlighting cells).
