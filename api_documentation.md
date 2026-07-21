# Dokumentasi API - Study Center Edumina Backend

Dokumentasi ini dibuat untuk memandu developer Frontend dalam mengintegrasikan aplikasi client dengan Backend API **Study Center Edumina**.

---

## 📌 Informasi Umum

*   **Base URL (Lokal):** `http://localhost:5000`
*   **Akses File Statis (Gambar):** `http://localhost:5000/uploads/...` (e.g., `http://localhost:5000/uploads/aktivitas/nama-file.jpg`)
*   **Format Response:** JSON (kecuali untuk file upload menggunakan `multipart/form-data`)
*   **Skema Autentikasi:** JWT Bearer Token
    *   Kirimkan token pada header HTTP: `Authorization: Bearer <token>`
    *   Masa berlaku token: **24 Jam**

---

## 🔒 Hak Akses (Role-Based Access Control)

Backend ini memiliki dua peran pengguna (role) dengan tingkat akses yang berbeda:
1.  **Admin:** Memiliki kontrol penuh atas seluruh sistem, termasuk Manajemen User (CRUD Admin/Operator) dan Manajemen Konten.
2.  **Operator:** Hanya dapat mengelola konten (Aktivitas, Produk, Paket Edukasi, Berita, File Upload) dan tidak dapat mengakses modul manajemen user.
3.  **Public (Tanpa Login):** Hanya dapat membaca data (Aktivitas, Produk, Paket Edukasi, Berita).

---

## 📦 Format Response Global

Backend secara konsisten mengembalikan struktur response berikut untuk mempermudah parsing data di Frontend.

### 1. Response Sukses (Success Response)
```json
{
  "success": true,
  "message": "Pesan informasi operasi sukses",
  "data": {}, // Berisi objek atau array data (opsional)
  "meta": {   // Berisi metadata pagination (opsional)
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

### 2. Response Error (Error Response)
```json
{
  "success": false,
  "message": "Pesan informasi kesalahan"
}
```

### 3. Response Error Validasi Input (Validation Error)
Dikembalikan ketika payload yang dikirim tidak lolos validasi `express-validator` (HTTP 400).
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "type": "field",
      "value": "invalid_email",
      "msg": "Email tidak valid",
      "path": "email",
      "location": "body"
    }
  ]
}
```

---

## 🔌 API Endpoints

### 1. Modul: Health Check
Mengetahui status keaktifan server.

#### Get Server Health
*   **URL:** `/api/health`
*   **Method:** `GET`
*   **Auth:** Public (Tidak Butuh Login)
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "OK",
      "data": {
        "service": "study-center-edumina-backend",
        "status": "healthy"
      }
    }
    ```

---

### 2. Modul: Authentication (`/api/auth`)

#### 2.1. Login User
Melakukan autentikasi untuk mendapatkan token JWT.
*   **URL:** `/api/auth/login`
*   **Method:** `POST`
*   **Auth:** Public
*   **Headers:** `Content-Type: application/json`
*   **Payload (Request Body):**
    ```json
    {
      "username": "admin", // Dapat menggunakan username atau email
      "password": "Admin1234!" // Minimal 8 karakter
    }
    ```
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Login berhasil",
      "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6...",
        "token_type": "Bearer",
        "expires_in": 86400,
        "user": {
          "id": 1,
          "username": "admin",
          "email": "admin@studycenteredumina.com",
          "nama_lengkap": "Administrator",
          "role": "admin",
          "status": "active"
        }
      }
    }
    ```
*   **Response Error (401 Unauthorized):**
    ```json
    {
      "success": false,
      "message": "Username/email atau password salah"
    }
    ```

#### 2.2. Logout User
Mencabut keabsahan token JWT yang digunakan saat ini.
*   **URL:** `/api/auth/logout`
*   **Method:** `POST`
*   **Auth:** Bearer Token (Semua Role)
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Logout berhasil"
    }
    ```

#### 2.3. Get Profile (Me)
Mendapatkan informasi detail user yang sedang login.
*   **URL:** `/api/auth/me`
*   **Method:** `GET`
*   **Auth:** Bearer Token (Semua Role)
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Current user",
      "data": {
        "id": 1,
        "username": "admin",
        "email": "admin@studycenteredumina.com",
        "nama_lengkap": "Administrator",
        "role": "admin",
        "status": "active",
        "created_at": "2026-07-18T15:32:00.000Z",
        "updated_at": "2026-07-18T15:32:00.000Z"
      }
    }
    ```

---

### 3. Modul: User Management (`/api/users`)
> [!IMPORTANT]
> Seluruh endpoint di modul `/api/users` (kecuali `/api/users/me` yang dialihkan ke auth) **hanya dapat diakses oleh user dengan Role `admin`**.

#### 3.1. List Users
Mendapatkan daftar semua user yang terdaftar dalam sistem.
*   **URL:** `/api/users`
*   **Method:** `GET`
*   **Auth:** Bearer Token (Role: **admin**)
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Daftar user",
      "data": [
        {
          "id": 1,
          "username": "admin",
          "email": "admin@studycenteredumina.com",
          "nama_lengkap": "Administrator",
          "role": "admin",
          "status": "active",
          "created_at": "2026-07-18T15:32:00.000Z",
          "updated_at": "2026-07-18T15:32:00.000Z"
        },
        {
          "id": 2,
          "username": "operator",
          "email": "operator@studycenteredumina.com",
          "nama_lengkap": "Operator KKN",
          "role": "operator",
          "status": "active",
          "created_at": "2026-07-18T15:32:00.000Z",
          "updated_at": "2026-07-18T15:32:00.000Z"
        }
      ]
    }
    ```

#### 3.2. Detail User
Mendapatkan data lengkap satu user berdasarkan ID.
*   **URL:** `/api/users/:id`
*   **Method:** `GET`
*   **Auth:** Bearer Token (Role: **admin**)
*   **Path Parameter:** `id` (Integer)
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Detail user",
      "data": {
        "id": 2,
        "username": "operator",
        "email": "operator@studycenteredumina.com",
        "nama_lengkap": "Operator KKN",
        "role": "operator",
        "status": "active",
        "created_at": "2026-07-18T15:32:00.000Z",
        "updated_at": "2026-07-18T15:32:00.000Z"
      }
    }
    ```

#### 3.3. Create User
Membuat akun baru (Admin atau Operator).
*   **URL:** `/api/users`
*   **Method:** `POST`
*   **Auth:** Bearer Token (Role: **admin**)
*   **Headers:** `Content-Type: application/json`
*   **Payload (Request Body):**
    | Field | Tipe Data | Keterangan | Validasi |
    | :--- | :--- | :--- | :--- |
    | `username` | String | Username unik untuk login | Wajib |
    | `email` | String | Email unik pengguna | Wajib, format email valid |
    | `password` | String | Password akun | Wajib, minimal 8 karakter |
    | `nama_lengkap` | String | Nama lengkap pengguna | Wajib |
    | `role` | String | Peran sistem | Opsional (default: `operator`), Enum: `admin`, `operator` |
    | `status` | String | Status keaktifan | Opsional (default: `active`), Enum: `active`, `inactive` |

    *Contoh Payload:*
    ```json
    {
      "username": "operator_kkn",
      "email": "kkn.edumina@gmail.com",
      "password": "PasswordKKN123",
      "nama_lengkap": "Tim KKN Edumina",
      "role": "operator",
      "status": "active"
    }
    ```
*   **Response Sukses (201 Created):**
    ```json
    {
      "success": true,
      "message": "User berhasil dibuat",
      "data": {
        "id": 3,
        "username": "operator_kkn",
        "email": "kkn.edumina@gmail.com",
        "nama_lengkap": "Tim KKN Edumina",
        "role": "operator",
        "status": "active",
        "created_at": "2026-07-18T22:30:00.000Z",
        "updated_at": "2026-07-18T22:30:00.000Z"
      }
    }
    ```
*   **Response Error (409 Conflict):**
    Terjadi jika username atau email sudah terdaftar.
    ```json
    {
      "success": false,
      "message": "email sudah digunakan" // atau "username sudah digunakan"
    }
    ```

#### 3.4. Update User
Mengubah informasi user yang sudah ada.
*   **URL:** `/api/users/:id`
*   **Method:** `PATCH`
*   **Auth:** Bearer Token (Role: **admin**)
*   **Path Parameter:** `id` (Integer)
*   **Headers:** `Content-Type: application/json`
*   **Payload (Request Body):**
    Semua field bersifat *opsional*. Kirim hanya field yang ingin diubah.
    | Field | Tipe Data | Keterangan | Validasi |
    | :--- | :--- | :--- | :--- |
    | `email` | String | Email baru | Format email valid |
    | `nama_lengkap` | String | Nama lengkap baru | Tidak boleh kosong jika dikirim |
    | `role` | String | Role baru | Enum: `admin`, `operator` |
    | `status` | String | Status baru | Enum: `active`, `inactive` |
    | `password` | String | Password baru | Minimal 8 karakter |

    *Contoh Payload:*
    ```json
    {
      "nama_lengkap": "Tim KKN Edumina Siroto",
      "status": "inactive"
    }
    ```
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "User berhasil diperbarui",
      "data": {
        "id": 3,
        "username": "operator_kkn",
        "email": "kkn.edumina@gmail.com",
        "nama_lengkap": "Tim KKN Edumina Siroto",
        "role": "operator",
        "status": "inactive",
        "created_at": "2026-07-18T22:30:00.000Z",
        "updated_at": "2026-07-18T22:35:00.000Z"
      }
    }
    ```

#### 3.5. Delete User
Menghapus user dari sistem database.
*   **URL:** `/api/users/:id`
*   **Method:** `DELETE`
*   **Auth:** Bearer Token (Role: **admin**)
*   **Path Parameter:** `id` (Integer)
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "User berhasil dihapus"
    }
    ```
*   **Response Error (400 Bad Request):**
    Terjadi jika admin mencoba menghapus dirinya sendiri.
    ```json
    {
      "success": false,
      "message": "Tidak bisa menghapus akun sendiri"
    }
    ```

---

### 4. Modul: Aktivitas (`/api/aktivitas`)
Modul ini digunakan untuk mengelola aktivitas/kegiatan yang diselenggarakan oleh Study Center.

#### 4.1. List Aktivitas (Paginated)
Mendapatkan daftar aktivitas diurutkan berdasarkan tanggal terbaru (`tanggal` DESC).
*   **URL:** `/api/aktivitas`
*   **Method:** `GET`
*   **Auth:** Public
*   **Query Parameters:**
    *   `page`: Nomor halaman (Integer, opsional, default: `1`)
    *   `limit`: Jumlah data per halaman (Integer, opsional, default: `10`, maksimal `100`)
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Daftar aktivitas",
      "data": [
        {
          "id": 3,
          "judul": "Workshop Pengolahan Produk Lele",
          "tanggal": "2026-07-10T00:00:00.000Z",
          "gambar": "uploads/aktivitas/default.jpg", // Path relatif gambar
          "created_at": "2026-07-18T15:32:00.000Z",
          "updated_at": "2026-07-18T15:32:00.000Z"
        }
      ],
      "meta": {
        "page": 1,
        "limit": 10,
        "total": 3,
        "totalPages": 1
      }
    }
    ```

#### 4.2. Detail Aktivitas
*   **URL:** `/api/aktivitas/:id`
*   **Method:** `GET`
*   **Auth:** Public
*   **Path Parameter:** `id` (Integer)
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Detail aktivitas",
      "data": {
        "id": 3,
        "judul": "Workshop Pengolahan Produk Lele",
        "tanggal": "2026-07-10T00:00:00.000Z",
        "gambar": "uploads/aktivitas/default.jpg",
        "created_at": "2026-07-18T15:32:00.000Z",
        "updated_at": "2026-07-18T15:32:00.000Z"
      }
    }
    ```

#### 4.3. Create Aktivitas
*   **URL:** `/api/aktivitas`
*   **Method:** `POST`
*   **Auth:** Bearer Token (Role: **admin**, **operator**)
*   **Headers:** `Content-Type: multipart/form-data`
*   **Payload (FormData):**
    | Field | Tipe Data | Keterangan | Validasi |
    | :--- | :--- | :--- | :--- |
    | `judul` | String | Judul aktivitas | Wajib |
    | `tanggal` | String | Tanggal pelaksanaan | Wajib, Format tanggal ISO8601 (e.g. `2026-07-15`) |
    | `gambar` | File (Binary) | File foto aktivitas | Opsional, Maks 5MB, format: JPG/PNG/WebP |
*   **Response Sukses (201 Created):**
    ```json
    {
      "success": true,
      "message": "Aktivitas berhasil dibuat",
      "data": {
        "id": 4,
        "judul": "Kunjungan Studi Banding Kelompok Tani",
        "tanggal": "2026-07-15T00:00:00.000Z",
        "gambar": "uploads/aktivitas/1715482390123-ab3d6e5a.png",
        "created_at": "2026-07-18T22:40:00.000Z",
        "updated_at": "2026-07-18T22:40:00.000Z"
      }
    }
    ```

#### 4.4. Update Aktivitas
*   **URL:** `/api/aktivitas/:id`
*   **Method:** `PATCH`
*   **Auth:** Bearer Token (Role: **admin**, **operator**)
*   **Path Parameter:** `id` (Integer)
*   **Headers:** `Content-Type: multipart/form-data`
*   **Payload (FormData):**
    | Field | Tipe Data | Keterangan | Validasi |
    | :--- | :--- | :--- | :--- |
    | `judul` | String | Judul baru | Opsional, tidak boleh kosong jika dikirim |
    | `tanggal` | String | Tanggal baru | Opsional, format ISO8601 |
    | `gambar` | File (Binary) | Gambar baru | Opsional, Maks 5MB, format: JPG/PNG/WebP |
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Aktivitas berhasil diperbarui",
      "data": {
        "id": 4,
        "judul": "Kunjungan Studi Banding Kelompok Tani Baru",
        "tanggal": "2026-07-15T00:00:00.000Z",
        "gambar": "uploads/aktivitas/1715482455987-bf7e82ac.png", // Gambar lama akan otomatis terhapus di server jika file baru diupload
        "created_at": "2026-07-18T22:40:00.000Z",
        "updated_at": "2026-07-18T22:45:00.000Z"
      }
    }
    ```

#### 4.5. Delete Aktivitas
*   **URL:** `/api/aktivitas/:id`
*   **Method:** `DELETE`
*   **Auth:** Bearer Token (Role: **admin**, **operator**)
*   **Path Parameter:** `id` (Integer)
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Aktivitas berhasil dihapus"
    }
    ```

---

### 5. Modul: Produk (`/api/produk`)
Modul untuk mengelola katalog produk lele dan olahannya.

#### 5.1. List Produk (Paginated)
Mendapatkan daftar produk untuk ditampilkan pada katalog/landing page.
*   **URL:** `/api/produk`
*   **Method:** `GET`
*   **Auth:** Public (Tidak Butuh Token)
*   **Query Parameters:**
    *   `page`: Nomor halaman (Integer, opsional, default: `1`)
    *   `limit`: Jumlah data per halaman (Integer, opsional, default: `12`, maksimal `100`)
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Daftar produk",
      "data": [
        {
          "id": 1,
          "nama_produk": "Lele Segar",
          "harga": "25000.00",
          "link_wa": "628156392250",
          "gambar": "uploads/produk/default.jpg",
          "created_at": "2026-07-20T03:00:00.000Z",
          "updated_at": "2026-07-20T03:00:00.000Z"
        }
      ],
      "meta": {
        "page": 1,
        "limit": 12,
        "total": 3,
        "totalPages": 1
      }
    }
    ```

#### 5.2. Detail Produk
Mendapatkan deskripsi dan harga detail produk untuk kebutuhan popup modal di Frontend.
*   **URL:** `/api/produk/:id`
*   **Method:** `GET`
*   **Auth:** Public
*   **Path Parameter:** `id` (Integer)
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Detail produk",
      "data": {
        "id": 1,
        "nama_produk": "Lele Segar",
        "harga": "25000.00",
        "gambar": "uploads/produk/default.jpg",
        "deskripsi": "Lele segar hasil budidaya kolam Siroto. Ukuran konsumsi 3-5 ekor/kg.",
        "link_wa": "628156392250",
        "created_at": "2026-07-20T03:00:00.000Z",
        "updated_at": "2026-07-20T03:00:00.000Z"
      }
    }
    ```

#### 5.3. Create Produk
*   **URL:** `/api/produk`
*   **Method:** `POST`
*   **Auth:** Bearer Token (Role: **admin**, **operator**)
*   **Headers:** `Content-Type: multipart/form-data`
*   **Payload (FormData):**
    | Field | Tipe Data | Keterangan | Validasi |
    | :--- | :--- | :--- | :--- |
    | `nama_produk` | String | Nama produk | Wajib |
    | `harga` | Decimal / Number | Harga produk (e.g. `25000` atau `25000.00`) | Opsional |
    | `deskripsi` | String | Deskripsi produk lele | Opsional |
    | `link_wa` | String | Nomor WhatsApp tujuan order (e.g. `08156392250` atau `628156392250`) | Opsional. Sistem menormalkan awalan `0` menjadi `62`. |
    | `gambar` | File (Binary) | Foto produk | Opsional, Maks 5MB, format: JPG/PNG/WebP |

*   **Response Sukses (201 Created):**
    ```json
    {
      "success": true,
      "message": "Produk berhasil dibuat",
      "data": {
        "id": 4,
        "nama_produk": "Abon Lele Edumina",
        "harga": "30000.00",
        "deskripsi": "Abon lele gurih non-MSG, cocok untuk anak-anak.",
        "link_wa": "628156392250",
        "gambar": "uploads/produk/1715482390123-ab3d6e5a.png",
        "created_at": "2026-07-20T03:17:00.000Z",
        "updated_at": "2026-07-20T03:17:00.000Z"
      }
    }
    ```

#### 5.4. Update Produk
*   **URL:** `/api/produk/:id`
*   **Method:** `PATCH`
*   **Auth:** Bearer Token (Role: **admin**, **operator**)
*   **Path Parameter:** `id` (Integer)
*   **Headers:** `Content-Type: multipart/form-data`
*   **Payload (FormData):**
    Semua field bersifat *opsional*.
    | Field | Tipe Data | Keterangan | Validasi |
    | :--- | :--- | :--- | :--- |
    | `nama_produk` | String | Nama produk baru | Opsional, tidak boleh kosong jika dikirim |
    | `harga` | Decimal / Number | Harga baru (kirim string kosong `""` jika ingin menghapus harga) | Opsional |
    | `deskripsi` | String | Deskripsi baru | Opsional |
    | `link_wa` | String | Nomor WA tujuan baru | Opsional, validasi sama seperti Create |
    | `gambar` | File (Binary) | Foto produk baru | Opsional, Maks 5MB, format: JPG/PNG/WebP |
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Produk berhasil diperbarui",
      "data": {
        "id": 4,
        "nama_produk": "Abon Lele Edumina Pedas",
        "harga": "35000.00",
        "deskripsi": "Abon lele gurih varian rasa pedas.",
        "link_wa": "628156392250",
        "gambar": "uploads/produk/1715482500123-cd8e9f2a.png", // Gambar lama akan terhapus jika file baru dikirim
        "created_at": "2026-07-20T03:17:00.000Z",
        "updated_at": "2026-07-20T03:18:00.000Z"
      }
    }
    ```

#### 5.5. Delete Produk
*   **URL:** `/api/produk/:id`
*   **Method:** `DELETE`
*   **Auth:** Bearer Token (Role: **admin**, **operator**)
*   **Path Parameter:** `id` (Integer)
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Produk berhasil dihapus"
    }
    ```

---

### 6. Modul: Paket Edukasi (`/api/paket-edukasi`)
Modul untuk mengelola paket pelatihan budidaya lele di Study Center.

#### 6.1. List Paket Edukasi (Paginated)
Mendapatkan daftar paket edukasi. Response list ini sengaja dibuat lebih ringkas untuk kebutuhan grid view.
*   **URL:** `/api/paket-edukasi`
*   **Method:** `GET`
*   **Auth:** Public
*   **Query Parameters:**
    *   `page`: Nomor halaman (Integer, opsional, default: `1`)
    *   `limit`: Jumlah data per halaman (Integer, opsional, default: `10`, maksimal `100`)
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Daftar paket edukasi",
      "data": [
        {
          "id": 1,
          "judul": "Paket Dasar Budidaya Lele",
          "deskripsi_singkat": "Paket pemula untuk belajar budidaya lele dari nol.",
          "harga": "350000.00", // Decimal bertipe string di JSON response
          "gambar": "uploads/paket/default.jpg",
          "created_at": "2026-07-18T15:32:00.000Z",
          "updated_at": "2026-07-18T15:32:00.000Z"
        }
      ],
      "meta": {
        "page": 1,
        "limit": 10,
        "total": 3,
        "totalPages": 1
      }
    }
    ```

#### 6.2. Detail Paket Edukasi
Mendapatkan seluruh informasi paket termasuk fasilitas, durasi, dan deskripsi lengkap.
*   **URL:** `/api/paket-edukasi/:id`
*   **Method:** `GET`
*   **Auth:** Public
*   **Path Parameter:** `id` (Integer)
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Detail paket edukasi",
      "data": {
        "id": 1,
        "judul": "Paket Dasar Budidaya Lele",
        "deskripsi_singkat": "Paket pemula untuk belajar budidaya lele dari nol.",
        "deskripsi_lengkap": "Program pembelajaran komprehensif selama 2 hari yang mencakup pengenalan kolam, pemilihan bibit, pemberian pakan, dan pengelolaan kualitas air. Cocok untuk pemula yang ingin memulai usaha budidaya lele.",
        "harga": "350000.00",
        "durasi": "2 Hari",
        "fasilitas": "Modul cetak, Makan siang, Sertifikat, Praktek langsung di kolam",
        "gambar": "uploads/paket/default.jpg",
        "link_wa": "https://wa.me/628156392250",
        "created_at": "2026-07-18T15:32:00.000Z",
        "updated_at": "2026-07-18T15:32:00.000Z"
      }
    }
    ```

#### 6.3. Create Paket Edukasi
*   **URL:** `/api/paket-edukasi`
*   **Method:** `POST`
*   **Auth:** Bearer Token (Role: **admin**, **operator**)
*   **Headers:** `Content-Type: multipart/form-data`
*   **Payload (FormData):**
    | Field | Tipe Data | Keterangan | Validasi |
    | :--- | :--- | :--- | :--- |
    | `judul` | String | Judul paket pelatihan | Wajib |
    | `harga` | Decimal | Harga paket | Wajib, harus angka desimal/bulat valid |
    | `deskripsi_singkat` | String | Penjelasan singkat | Opsional |
    | `deskripsi_lengkap` | String | Penjelasan lengkap kurikulum/jadwal | Opsional |
    | `durasi` | String | Durasi kegiatan (e.g. `"2 Hari"`, `"3 Jam"`) | Opsional |
    | `fasilitas`| String | Fasilitas yang didapat (e.g. `"Sertifikat, Makan siang"`) | Opsional |
    | `link_wa` | String | Link langsung WhatsApp pesanan | Opsional, **harus berupa URL valid** (e.g. `https://wa.me/628156392250`) |
    | `gambar` | File (Binary) | Brosur/foto paket edukasi | Opsional, Maks 5MB, format: JPG/PNG/WebP |

*   **Response Sukses (201 Created):**
    ```json
    {
      "success": true,
      "message": "Paket edukasi berhasil dibuat",
      "data": {
        "id": 4,
        "judul": "Paket VIP Bioflok Komersial",
        "deskripsi_singkat": "Pelatihan tingkat lanjut bioflok skala bisnis.",
        "deskripsi_lengkap": "Program 4 hari intensif...",
        "harga": "1500000.00",
        "durasi": "4 Hari",
        "fasilitas": "Penginapan, Konsumsi, Sertifikat, Konsultasi 1 Bulan",
        "link_wa": "https://wa.me/628156392250",
        "gambar": "uploads/paket/1715482390123-ab3d6e5a.png",
        "created_at": "2026-07-18T23:00:00.000Z",
        "updated_at": "2026-07-18T23:00:00.000Z"
      }
    }
    ```

#### 6.4. Update Paket Edukasi
*   **URL:** `/api/paket-edukasi/:id`
*   **Method:** `PATCH`
*   **Auth:** Bearer Token (Role: **admin**, **operator**)
*   **Path Parameter:** `id` (Integer)
*   **Headers:** `Content-Type: multipart/form-data`
*   **Payload (FormData):**
    Semua field bersifat *opsional*.
    | Field | Tipe Data | Keterangan | Validasi |
    | :--- | :--- | :--- | :--- |
    | `judul` | String | Judul paket baru | Opsional, tidak boleh kosong jika dikirim |
    | `harga` | Decimal | Harga baru | Opsional, harus desimal/angka valid |
    | `deskripsi_singkat` | String | Penjelasan singkat baru | Opsional |
    | `deskripsi_lengkap` | String | Penjelasan lengkap baru | Opsional |
    | `durasi` | String | Durasi baru | Opsional |
    | `fasilitas` | String | Fasilitas baru | Opsional |
    | `link_wa` | String | Link WA baru | Opsional, harus berupa URL valid |
    | `gambar` | File (Binary) | Brosur/foto baru | Opsional, Maks 5MB, format: JPG/PNG/WebP |
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Paket edukasi berhasil diperbarui",
      "data": {
        "id": 4,
        "judul": "Paket VIP Bioflok Komersial PRO",
        "harga": "1750000.00",
        ...
      }
    }
    ```

#### 6.5. Delete Paket Edukasi
*   **URL:** `/api/paket-edukasi/:id`
*   **Method:** `DELETE`
*   **Auth:** Bearer Token (Role: **admin**, **operator**)
*   **Path Parameter:** `id` (Integer)
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Paket edukasi berhasil dihapus"
    }
    ```

---

### 7. Modul: Berita (`/api/berita`)
Modul publikasi artikel/berita seputar Edumina. Backend otomatis meng-generate slug SEO-friendly unik dari judul artikel ketika dibuat/diperbarui.

#### 7.1. List Berita (Paginated)
Mendapatkan daftar artikel terbitan terbaru (`tanggal_publish` DESC).
*   **URL:** `/api/berita`
*   **Method:** `GET`
*   **Auth:** Public
*   **Query Parameters:**
    *   `page`: Nomor halaman (Integer, opsional, default: `1`)
    *   `limit`: Jumlah data per halaman (Integer, opsional, default: `9`, maksimal `100`)
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Daftar berita",
      "data": [
        {
          "id": 1,
          "judul": "Study Center Edumina Raih Penghargaan UMKM Unggulan Kota Semarang",
          "slug": "study-center-edumina-raih-penghargaan-umkm-unggulan-kota-semarang",
          "tanggal_publish": "2026-07-01T00:00:00.000Z",
          "gambar": "uploads/berita/default.jpg",
          "created_at": "2026-07-18T15:32:00.000Z",
          "updated_at": "2026-07-18T15:32:00.000Z"
        }
      ],
      "meta": {
        "page": 1,
        "limit": 9,
        "total": 3,
        "totalPages": 1
      }
    }
    ```

#### 7.2. Detail Berita (Berdasarkan Slug)
> [!IMPORTANT]
> Untuk mengakses detail berita di Frontend, parameter pencarian menggunakan **`slug`** (bukan `id`) demi kebutuhan SEO-friendly URL.
*   **URL:** `/api/berita/:slug`
*   **Method:** `GET`
*   **Auth:** Public
*   **Path Parameter:** `slug` (String, e.g. `study-center-edumina-raih-penghargaan-umkm-unggulan-kota-semarang`)
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Detail berita",
      "data": {
        "id": 1,
        "judul": "Study Center Edumina Raih Penghargaan UMKM Unggulan Kota Semarang",
        "slug": "study-center-edumina-raih-penghargaan-umkm-unggulan-kota-semarang",
        "isi_konten": "Study Center Edumina Kampung Siroto berhasil meraih penghargaan sebagai UMKM Unggulan Kota Semarang 2026 dalam bidang agribisnis. Penghargaan ini diberikan atas inovasi sistem bioflok yang terbukti meningkatkan produktivitas budidaya lele hingga 300%.",
        "tanggal_publish": "2026-07-01T00:00:00.000Z",
        "gambar": "uploads/berita/default.jpg",
        "created_at": "2026-07-18T15:32:00.000Z",
        "updated_at": "2026-07-18T15:32:00.000Z"
      }
    }
    ```
*   **Response Error (404 Not Found):**
    ```json
    {
      "success": false,
      "message": "Berita tidak ditemukan"
    }
    ```

#### 7.3. Create Berita
*   **URL:** `/api/berita`
*   **Method:** `POST`
*   **Auth:** Bearer Token (Role: **admin**, **operator**)
*   **Headers:** `Content-Type: multipart/form-data`
*   **Payload (FormData):**
    | Field | Tipe Data | Keterangan | Validasi |
    | :--- | :--- | :--- | :--- |
    | `judul` | String | Judul berita (menjadi acuan pembuatan slug) | Wajib |
    | `tanggal_publish` | String | Tanggal terbit berita | Wajib, format ISO8601 (e.g. `2026-07-18`) |
    | `isi_konten` | String | Isi tulisan berita / artikel | Opsional |
    | `gambar` | File (Binary) | Foto banner berita | Opsional, Maks 5MB, format: JPG/PNG/WebP |

*   **Response Sukses (201 Created):**
    ```json
    {
      "success": true,
      "message": "Berita berhasil dibuat",
      "data": {
        "id": 4,
        "judul": "Panen Raya Lele di Kampung Siroto",
        "slug": "panen-raya-lele-di-kampung-siroto", // Generated otomatis
        "isi_konten": "Warga Kampung Siroto hari ini merayakan panen raya...",
        "tanggal_publish": "2026-07-18T00:00:00.000Z",
        "gambar": "uploads/berita/1715482390123-ab3d6e5a.png",
        "created_at": "2026-07-18T23:10:00.000Z",
        "updated_at": "2026-07-18T23:10:00.000Z"
      }
    }
    ```

#### 7.4. Update Berita (Berdasarkan ID)
> [!WARNING]
> Berbeda dengan proses baca (GET Detail) yang menggunakan `slug`, endpoint UPDATE dan DELETE berita di CMS menggunakan **`id` (Integer)**.
*   **URL:** `/api/berita/:id`
*   **Method:** `PATCH`
*   **Auth:** Bearer Token (Role: **admin**, **operator**)
*   **Path Parameter:** `id` (Integer)
*   **Headers:** `Content-Type: multipart/form-data`
*   **Payload (FormData):**
    Semua field bersifat *opsional*. Jika field `judul` diubah, backend otomatis memperbarui `slug` artikel tersebut dan menjamin keunikan slug baru.
    | Field | Tipe Data | Keterangan | Validasi |
    | :--- | :--- | :--- | :--- |
    | `judul` | String | Judul baru | Opsional, tidak boleh kosong |
    | `tanggal_publish` | String | Tanggal terbit baru | Opsional, format ISO8601 |
    | `isi_konten` | String | Konten artikel baru | Opsional |
    | `gambar` | File (Binary) | Foto banner baru | Opsional, Maks 5MB, format: JPG/PNG/WebP |
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Berita berhasil diperbarui",
      "data": {
        "id": 4,
        "judul": "Panen Raya Lele Kampung Siroto 2026",
        "slug": "panen-raya-lele-kampung-siroto-2026", // Slug ikut terupdate
        ...
      }
    }
    ```

#### 7.5. Delete Berita
Menghapus berita berdasarkan ID.
*   **URL:** `/api/berita/:id`
*   **Method:** `DELETE`
*   **Auth:** Bearer Token (Role: **admin**, **operator**)
*   **Path Parameter:** `id` (Integer)
*   **Response Sukses (200 OK):**
    ```json
    {
      "success": true,
      "message": "Berita berhasil dihapus"
    }
    ```

---

### 8. Modul: File Upload (`/api/upload`)
Modul utilitas mandiri untuk mengunggah file gambar umum tanpa terikat dengan entitas tertentu (misal: untuk gambar dalam editor teks berita).

#### Upload Single File
*   **URL:** `/api/upload`
*   **Method:** `POST`
*   **Auth:** Bearer Token (Role: **admin**, **operator**)
*   **Headers:** `Content-Type: multipart/form-data`
*   **Payload (FormData):**
    | Field | Tipe Data | Keterangan | Validasi |
    | :--- | :--- | :--- | :--- |
    | `file` | File (Binary) | File yang diupload | Wajib, Maks 5MB, format: JPG/PNG/WebP |
*   **Response Sukses (201 Created):**
    ```json
    {
      "success": true,
      "message": "Upload berhasil",
      "data": {
        "filename": "1715482390123-ab3d6e5a.png", // Nama unik di disk server
        "path": "uploads/1715482390123-ab3d6e5a.png", // Path relatif publik
        "mimetype": "image/png",
        "size": 154820 // Ukuran dalam bytes
      }
    }
    ```

---

## 🛠️ Tips Integrasi untuk Frontend Developer

1.  **Authorization Header Interceptor:**
    Gunakan Axios Interceptor atau sejenisnya pada Client-Side HTTP Client untuk otomatis menyisipkan Token JWT ke setiap request yang memerlukan otentikasi:
    ```javascript
    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    ```
2.  **Handling Form Data:**
    Untuk modul Aktivitas, Produk, Paket Edukasi, Berita, dan Upload, gunakan objek `FormData` ketika melakukan `POST` / `PATCH` karena payload menyertakan file binary:
    ```javascript
    const formData = new FormData();
    formData.append('judul', this.state.judul);
    if (this.state.fileGambar) {
      formData.append('gambar', this.state.fileGambar);
    }
    ```
3.  **Error Handling (401 & 403):**
    *   Jika menerima HTTP Status `401 Unauthorized` secara berturut-turut, bersihkan local token dan arahkan user kembali ke halaman Login.
    *   Jika menerima HTTP Status `403 Forbidden`, tampilkan peringatan bahwa akun tidak memiliki otoritas (misal: operator mengakses halaman kelola user).
