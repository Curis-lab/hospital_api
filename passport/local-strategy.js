import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import PatientServices from "../services/patient-services.js";
import { isCorrectPassword } from "../services/auth-services.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        let user;
        const patientServices = new PatientServices();
        user = await patientServices.hasPatientByMail(email);

        if (!user) {
          return done(null, false, { message: "Invalid email." });
        }

        const isMatch = await isCorrectPassword(password, user.password);

        if (!isMatch) {
          return done(null, false, {
            message: "Invalid password",
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const patientServices = new PatientServices();

    const user = await patientServices.getPatientById(id);
    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
