# NodeJs Marketplace Server

Buatkan server menggunakan ORM `Sequelize` dan Database `MySQL`

## Ketentuan
1. Gunakan fungsi `addColumn` untuk menambahkan column ke table
2. Tambahkan `seeder` Products untuk menambahkan 5 data product
3. Buat validasi untuk `Email` (format email dan unique email) dan `Password` (panjang minimal 6 karakter, minimal satu huruf kapital, minimal satu nomor dan satu symbol)
4. Authentication menggunakan `bcryptjs` dan `jsonwebtoken`
5. Authorization `SELLER` dan `BUYER` (tentukan privileges dari `SELLER` dan `BUYER`)
6. Buat Transaksi (gunakan `Sequelize Transaction` - Optional)
7. Buat endpoint menggunakan `Raw Query` (SELECT * FROM products)

## Flow
1. User Register
2. User Login
3. User Create Stores (CRUD)
4. User Create Products (CRUD) -> (SEEDERS)
5. User Buy Products
6. User Transaction (include payment)
7. User Logout
