# Ascom challenge
# 🏥 Scuola42 Frontend Engineer Test – Patient Manager

This is a React-based frontend application to manage and display patient data from a remote API. The application interacts with a secured REST API, supporting full CRUD functionality for patient entities and their parameters.

---

## color pallet
- ascom red - #ED1C24
- text - #4B4B4B
- header - #333333
- bg - #FFFFFF
- clicked btn - #9CB6CC
- button - 487aa0

## 📦 Project Overview

**Goal:**
Develop a React application that manages "Patient" entities with support for data fetching, sorting, filtering, and editing. Each patient has personal information and a list of medical parameters.

**API Base URL:**
`https://mobile.digistat.it/CandidateApi`

**Swagger Docs:**
[Swagger UI](https://mobile.digistat.it/CandidateApi/swagger/index.html)

**Authentication (HTTP Basic Auth):**
...

---

## 📁 Technologies Used

* **Frontend:** React (with Hooks & Functional Components)
* **HTTP Client:** Axios or Fetch API
* **Styling:** Tailwind CSS / Material UI / Styled Components *(choose one)*
* **State Management:** React Context / Redux Toolkit *(if needed)*
* **Date Formatting:** date-fns or dayjs

---

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

---

## ✅ Required Functionalities

### 🔹 LEVEL 1

* Display a **grid of all patients** from `/Patient/GetList`.
* Show the following columns:

  * `FamilyName`
  * `GivenName`
  * `Sex`
  * `BirthDate` (formatted)
  * `Number of Parameters`
  * A **red icon or label** if any parameter has `Alarm = true`.

### 🔹 LEVEL 2

* Enable **sorting** and **filtering** on all grid columns.

### 🔹 LEVEL 3

* Clicking a patient opens a **Detail/Edit Dialog**:

  * Display the same fields as the grid.
  * Show a **non-editable table** of that patient’s parameters.

### 🔹 LEVEL 4

* Allow **editing** of `FamilyName`, `GivenName`, and `Sex`.
* Save updated data using `/Patient/Update`.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/patient-manager.git
cd patient-manager
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Authentication

Add HTTP Basic Auth in your Axios instance or fetch options.

```ts
const basicAuth = {
  username: 'test',
  password: 'TestMePlease!'
};
```

### 4. Run the app

```bash
npm start
# or
yarn start
```

---

## 📂 Folder Structure

```bash
src/
├── api/             # Axios instance and API calls
├── components/      # Reusable UI components
├── pages/           # Page-level components (e.g., PatientGrid, DetailDialog)
├── utils/           # Helper functions (e.g., formatDate)
└── App.tsx
    index.tsx
```

---

## 📌 Tips for Implementation

* Use `useEffect` to fetch data on mount.
* Use `useMemo` for computed properties like alarm flags and number of parameters.
* Format `BirthDate` using `date-fns.format(new Date(birthDate), 'dd MMM yyyy')`.
* For modal/dialog, use Material UI's `Dialog` or a custom modal component.

---

## 📢 API Reference (Summary)

### 🔹 Get All Patients

```http
GET /Patient/GetList
```

### 🔹 Update Patient

```http
POST /Patient/Update
Content-Type: application/json
```

Body should include full patient object (including updated fields).

