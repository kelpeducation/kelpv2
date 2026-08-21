# Website CMS Setup

This project now includes a built-in JSON CMS for key website content.

## What You Can Manage

- `site-settings`: shared brand/contact/social/footer data
- `products`: market categories and products
- `chatbot-knowledge`: AI chatbot company knowledge and FAQ

These files are stored in:

- `src/content/cms/site-settings.json`
- `src/content/cms/products.json`
- `src/content/cms/chatbot-knowledge.json`

## Admin Dashboard

Open:

- `/cms`

From this page you can:

1. Select a content section.
2. Edit JSON safely.
3. Save changes to disk.

## Security

Set this in `.env.local`:

```env
CMS_ADMIN_PASSWORD=your-strong-password
```

Save requests are protected using this password.

## API Endpoints

- `GET /api/cms/:section` -> read section JSON
- `PUT /api/cms/:section` -> update section JSON (requires header `x-cms-key`)

Valid sections:

- `site-settings`
- `products`
- `chatbot-knowledge`

## Notes

- Product and chatbot content now come from CMS JSON files.
- Contact and social details in navbar/footer/contact page now come from CMS site settings.
- Keep JSON valid; invalid JSON cannot be saved.
