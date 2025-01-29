# School Supplies E-Shop

This is mainly a portfolio project to showcase my skills in Frontend Development. This project was built using the following:

- React for the user interface
- Styled Components for styling
- Firebase for Authentication and Database
- Netlify functions for the backend API utilizing Stripe for payment processing
- Images were generated using DALL-E and Gemini AI.
- Logo was created using Figma
- Google Fonts
- Redux Toolkit for state management
- Redux Persist for persisting the cart between page refreshes


## Database Seeding

The application includes scripts to seed the Firestore database with initial data. You can seed either the production database or the local emulator:

### Seeding Production Database

```bash
npm run seed
```

This will:
1. Deploy temporary open security rules
2. Seed the production database
3. Restore the original security rules

