# Website Backend

# Install Dependencies
`npm install`

# Run
`node server.js`
Navigate to `http://localhost:3000` to confirm it is up and running.

# Create Key Pair (optional)
A key pair is needed when using the backend with Pi Security Cam.
Create private key `openssl genrsa -out uploadKey.pem 4096`.
Create public key from private key `openssl rsa -in uploadKey.pem -pubout > uploadKey.pub`.
Place `uploadKey.pub` in the keys folder.
