# TypeScript Express Starter

While working on another project, I needed a server that could support some token based authentication. I figured it could be useful for future projects, so I've re-written a bare bones auth server in TypeScript so I can get things running faster.

## Features

- Uses Mongodb (with mongoose)
- JWT authentication (jsonwebtoken)
- Bcrpyt for password hashing (bcryptjs)

## Things To Do Before Ready

- HTTPS for production builds
- Nodemon or something similar for hot reloading
- Maybe split the token into refresh/access
- Maybe add passport to check auths
