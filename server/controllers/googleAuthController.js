const { OAuth2Client } = require('google-auth-library');
const env = require('../config/env');
const User = require('../models/User');
const authService = require('../services/authService');
const { sendSuccess, sendError } = require('../utils/response');

class GoogleAuthController {
  async loginWithGoogle(req, res, next) {
    try {
      const googleClientId = env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
      const client = new OAuth2Client(googleClientId);
      const { token } = req.body; // Google ID token
      if (!token) {
        return sendError(res, 'Google token is required', 400);
      }
      // Verify token with Google
      const ticket = await client.verifyIdToken({ idToken: token, audience: googleClientId });
      const payload = ticket.getPayload();
      const email = payload.email;
      const name = payload.name || email.split('@')[0];
      const picture = payload.picture;

      let user = await User.findOne({ email });
      if (!user) {
        // Auto-register user with a random placeholder password
        const randomPassword = Math.random().toString(36).slice(-8);
        user = new User({
          name,
          email,
          password: randomPassword,
          role: 'student',
          isEmailVerified: true,
          profilePhoto: picture,
        });
        await user.save();
      }

      // Generate JWT/refresh tokens using existing service
      const tokens = await authService.generateTokens(user);
      return sendSuccess(res, 'Google login successful', tokens, 200);
    } catch (err) {
      console.error('Google auth error:', err);
      return sendError(res, 'Google authentication failed', 401);
    }
  }
}

module.exports = new GoogleAuthController();
