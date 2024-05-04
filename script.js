function encrypt() {
    var plaintext = document.getElementById("inputText").value;
    var key = prompt("Enter encryption key:");
    var ciphertext = rc4Encrypt(plaintext, key);
    document.getElementById("outputText").value = ciphertext;
}

function decrypt() {
    var ciphertext = document.getElementById("inputText").value;
    var key = prompt("Enter decryption key:");
    var plaintext = rc4Decrypt(ciphertext, key);
    document.getElementById("outputText").value = plaintext;
}

function rc4Encrypt(plaintext, key) {
    var s = [];
    var result = "";
    for (var i = 0; i < 256; i++) {
        s[i] = i;
    }
    var j = 0;
    for (var i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        var temp = s[i];
        s[i] = s[j];
        s[j] = temp;
    }
    var i = 0;
    j = 0;
    for (var k = 0; k < plaintext.length; k++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        var temp = s[i];
        s[i] = s[j];
        s[j] = temp;
        var keystream = s[(s[i] + s[j]) % 256];
        result += String.fromCharCode(plaintext.charCodeAt(k) ^ keystream);
    }
    return result;
}

function rc4Decrypt(ciphertext, key) {
    return rc4Encrypt(ciphertext, key); // RC4 decryption is the same as encryption
}