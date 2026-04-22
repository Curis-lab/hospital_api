# API Documentation (Current + Recommended)

## 1) Current API Surface

- Base URL: `/api/v1`

### Auth (`/auth`)
- `POST /register` - Register user (supports multipart image upload via `image` field).
- `POST /login` - Login and return auth payload/token.
- `GET /auth` - Get ImageKit authentication parameters.

### Doctors (`/doctors`)
- `GET /` - Get all doctors (supports `search` query).
- `GET /:id` - Get a single doctor by ID.
- `PUT /` - Update current doctor profile (authenticated, doctor role).
- `DELETE /:id` - Delete doctor by ID (authenticated, doctor role).
- `GET /profile/me` - Get current doctor profile and related appointments.
- `GET /appointments-list/me` - Get current doctor's appointments (authenticated, doctor role).
- Nested reviews: `/doctors/:doctorId/reviews`.

### Users (`/user`)
- `GET /` - Get all users (authenticated, admin role).
- `GET /:id` - Get a single user (authenticated, patient role).
- `PUT /:id` - Update user by ID (authenticated, patient role).
- `DELETE /:id` - Delete user by ID (authenticated, patient role).
- `GET /profile/me` - Get current user profile (authenticated, patient role).
- `GET /appointments/my-appointment` - Get current user's appointments (authenticated, patient role).

### Reviews (`/reviews`)
- `GET /` - Get all reviews.
- `POST /` - Create review (authenticated, patient role).

### Bookings (`/bookings`)
- `POST /checkout-session/:doctorId` - Create booking checkout session (authenticated).

## 2) Recommended Routes to Add

### Booking lifecycle
- `GET /bookings/:id` - Get booking detail for patient/doctor/admin.
- `GET /bookings` - List bookings with filters: `status`, `doctorId`, `patientId`, `date`.
- `PATCH /bookings/:id/status` - Change booking status (`confirmed`, `cancelled`, `completed`).
- `DELETE /bookings/:id` - Cancel/delete booking with policy validation.

### Doctor availability
- `GET /doctors/:id/availability` - Get public availability slots.
- `PUT /doctors/availability/me` - Update own schedule (doctor role).

### Review management
- `GET /doctors/:id/reviews` - Get reviews for a specific doctor.
- `PATCH /reviews/:id` - Update review (owner/admin).
- `DELETE /reviews/:id` - Delete review (owner/admin).

### Auth/session hardening
- `POST /auth/refresh-token` - Rotate access token.
- `POST /auth/logout` - Invalidate current session/token.
- `POST /auth/forgot-password` - Start password reset flow.
- `POST /auth/reset-password` - Complete password reset.

### Notifications
- `GET /notifications/me` - Get current user notifications.
- `PATCH /notifications/:id/read` - Mark notification as read.

## 3) REST vs Socket.IO (Recommended Rule)

### Use REST for
- Create/update/delete operations requiring validation and persistence.
- Read endpoints where eventual refresh is acceptable.
- Sensitive flows such as auth, profile update, payment/booking creation.

### Use Socket.IO for
- Real-time chat between patient and doctor.
- Live booking updates after REST mutation is completed.
- Push notifications (new booking, status changed, reminders).
- Presence, typing indicators, and live session status.

### Hybrid pattern (best practice)
- Step 1: Client writes data through REST.
- Step 2: Server commits to DB, then emits socket event.
- Step 3: Clients update local state and optionally re-fetch via REST.
