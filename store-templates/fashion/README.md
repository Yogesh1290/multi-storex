# Fashion Store Template

This is a fashion store template with admin authentication.

## Setup

1. Deploy the template to Vercel
2. Set up the following environment variables in your Vercel project:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `ADMIN_ROUTE`: Custom route for admin dashboard (default: "admin")
   - `JWT_SECRET`: Secret key for JWT authentication (min 32 characters)
   - `CLOUDINARY_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_KEY`: Your Cloudinary API key
   - `CLOUDINARY_SECRET`: Your Cloudinary API secret

## Admin Authentication

This template allows for up to 2 admin accounts. To create an admin account:

1. Visit `/auth/signup` on your deployed site
2. Create your admin account with email and password
3. Access the admin dashboard at `/{ADMIN_ROUTE}`

## MongoDB Setup

1. Create a free MongoDB Atlas account at [mongodb.com](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster and database
3. Get your connection string from the Atlas dashboard
4. Add the connection string to your Vercel project environment variables as `MONGODB_URI`
5. Redeploy your store

## Features

- Admin authentication with email/password
- Limited to 2 admin accounts
- Secure JWT-based sessions
- MongoDB integration for data storage
- Responsive admin dashboard
- Product, order, and customer management
