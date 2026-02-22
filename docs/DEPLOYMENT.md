# Deployment Checklist

## Prerequisites

- [ ] Node.js 18+ installed
- [ ] pnpm package manager installed
- [ ] MongoDB database (Atlas or self-hosted)
- [ ] Resend account for email notifications
- [ ] Vercel account (or other hosting platform)

## Environment Variables

Required environment variables to configure before deployment:

### Database
- `DATABASE_URL` - MongoDB connection string
  - Example: `mongodb+srv://username:password@cluster.mongodb.net/powerwashing`

### Payload CMS
- `PAYLOAD_SECRET` - Secret key for Payload CMS (use `openssl rand -base64 32` to generate)

### Email (Resend)
- `RESEND_API_KEY` - Your Resend API key for sending emails
- `ADMIN_EMAIL` - Email address to receive quote request notifications
- `FROM_EMAIL` - Email address to send emails from (must be verified in Resend)

### Site Configuration
- `NEXT_PUBLIC_SITE_URL` - Your site's public URL
  - Example: `https://powerwashing.yoursite.com`

## Pre-Deployment Steps

### 1. Test Locally
- [ ] Run `pnpm dev` to verify the application starts
- [ ] Test all pages load correctly:
  - [ ] Home page (`/`)
  - [ ] Services page (`/servicii`)
  - [ ] Portfolio page (`/portofoliu`)
  - [ ] About page (`/despre`)
  - [ ] Contact page (`/contact`)
  - [ ] Quote request page (`/solicita-oferta`)
- [ ] Test the quote request form submission
- [ ] Verify email notifications are sent (if Resend is configured)

### 2. Build Verification
- [ ] Run `pnpm build` to verify production build succeeds
- [ ] Check for any warnings or errors
- [ ] Run `pnpm start` to test production build locally

### 3. Database Setup
- [ ] Create MongoDB database
- [ ] Test connection string locally
- [ ] Ensure database user has necessary permissions

### 4. Email Setup
- [ ] Create Resend account
- [ ] Verify sender domain in Resend
- [ ] Test email sending with Resend API

## Deployment Steps

### Option 1: Vercel (Recommended)

#### 1. Push to GitHub
- [ ] Initialize git repository (if not already done)
- [ ] Commit all changes
- [ ] Push to GitHub repository

#### 2. Connect to Vercel
- [ ] Log in to Vercel dashboard
- [ ] Click "Add New Project"
- [ ] Import your GitHub repository

#### 3. Configure Vercel
- [ ] Set Build Command: `pnpm build`
- [ ] Set Output Directory: `.next`
- [ ] Set Framework Preset: `Next.js`
- [ ] Configure environment variables (see Environment Variables section above)

#### 4. Deploy
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Test the live application

#### 5. Post-Deployment
- [ ] Update `NEXT_PUBLIC_SITE_URL` to the production URL
- [ ] Redeploy if URL changed
- [ ] Test all pages on the production URL
- [ ] Test quote request form on production
- [ ] Verify email notifications work

### Option 2: Other Platforms

#### Self-Hosted / VPS
- [ ] Set up server with Node.js 18+
- [ ] Clone repository to server
- [ ] Install dependencies: `pnpm install`
- [ ] Build application: `pnpm build`
- [ ] Set environment variables (use `.env` or `.env.production`)
- [ ] Start application with PM2 or similar process manager:
  ```bash
  pm2 start pnpm --name "powerwashing-site" -- start
  ```
- [ ] Set up Nginx reverse proxy (optional, for custom domain)
- [ ] Configure SSL certificate (Let's Encrypt recommended)

#### Other PaaS (Railway, Render, etc.)
- [ ] Follow platform-specific deployment instructions
- [ ] Set environment variables in platform dashboard
- [ ] Connect GitHub repository
- [ ] Deploy and test

## Post-Deployment Configuration

### Payload Admin Access
- [ ] Visit `/admin` route (e.g., `https://yoursite.com/admin`)
- [ ] Create first admin user
- [ ] Configure initial content:
  - [ ] Add services
  - [ ] Add gallery items
  - [ ] Add testimonials
  - [ ] Configure site settings

### Content Management
- [ ] Add your actual services with pricing
- [ ] Upload before/after images for portfolio
- [ ] Add real customer testimonials
- [ ] Configure contact information in site settings

## Monitoring and Maintenance

### Regular Tasks
- [ ] Monitor database storage usage
- [ ] Check email delivery rates (Resend dashboard)
- [ ] Review and respond to quote requests
- [ ] Update content regularly
- [ ] Monitor site performance

### Backup Strategy
- [ ] Set up MongoDB automated backups (Atlas has built-in backups)
- [ ] Keep local backups of important content
- [ ] Document content restoration process

## Troubleshooting

### Build Errors
- Check Node.js version is 18+
- Verify all dependencies are installed
- Check for TypeScript errors in `pnpm build` output

### Runtime Errors
- Verify environment variables are set correctly
- Check database connection
- Verify Resend API key is valid
- Check browser console for client-side errors

### Email Issues
- Verify Resend API key
- Check sender domain is verified
- Verify recipient email is correct
- Check Resend dashboard for delivery status

### Performance Issues
- Optimize images before upload
- Consider enabling caching
- Monitor database query performance
- Use Content Delivery Network (CDN) for static assets

## Security Checklist

- [ ] Change default admin password immediately
- [ ] Keep PAYLOAD_SECRET secure and never commit to git
- [ ] Use strong MongoDB credentials
- [ ] Enable MongoDB authentication
- [ ] Restrict database IP access if possible
- [ ] Keep dependencies updated
- [ ] Enable HTTPS on production
- [ ] Set up firewall rules on server (if self-hosted)
- [ ] Regular security audits

## Rollback Plan

If deployment fails or issues arise:

1. **Quick Rollback** (Vercel): Use Vercel's deployment history to revert
2. **Database Issues**: Restore from MongoDB backup
3. **Content Issues**: Restore from content backup or admin exports
4. **Email Issues**: Verify Resend configuration and API keys

## Support Resources

- Payload CMS Documentation: https://payloadcms.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Vercel Documentation: https://vercel.com/docs
- Resend Documentation: https://resend.com/docs
- MongoDB Documentation: https://www.mongodb.com/docs

## Notes

- This project uses Next.js 16 with the App Router
- Payload CMS v3 for content management
- MongoDB for database
- Resend for email notifications
- shadcn/ui components for UI
- Romanian language default with English support

## Additional Considerations

- **Performance**: Consider using image optimization and CDN
- **SEO**: Update meta tags and sitemap for production
- **Analytics**: Add analytics tracking (Google Analytics, etc.)
- **Monitoring**: Set up error tracking (Sentry, etc.)
- **Testing**: Consider adding E2E tests for critical flows
