const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function generateEmailVariations(email) {
    const [username, domain] = email.split('@');
    const variations = new Set();

    // Dapatkan semua kombinasi posisi titik di antara karakter username
    for (let i = 0; i < (1 << (username.length - 1)); i++) {
        let variant = '';
        for (let j = 0; j < username.length; j++) {
            variant += username[j];
            // Jika bit pada posisi `j` di `i` diatur ke 1, tambahkan titik
            if (i & (1 << j) && j < username.length - 1) {
                variant += '.';
            }
        }
        variations.add(`${variant}@${domain}`);
    }

    // Kembalikan semua variasi unik
    return Array.from(variations);
}

rl.question("Masukkan email induk: ", function(emailInduk) {
    const emailChilds = generateEmailVariations(emailInduk);

    // Tulis hasil ke dalam file results.txt
    fs.writeFile('results.txt', emailChilds.join('\n'), (err) => {
        if (err) throw err;
        console.log('Variasi email anak telah disimpan ke results.txt');
    });

    rl.close();
});
