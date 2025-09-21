import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";

const card =
  "max-w-md mx-auto bg-[#0f1429] border border-[#232a5a] rounded-2xl p-8 shadow-2xl text-[#e9ecff]"; // removed mt-16
const input =
  "w-full bg-[#151a38] border border-[#2a3166] rounded-xl px-4 py-3 outline-none focus:border-[#5ad2c7] placeholder-[#a9b1ff80]";
const btn =
  "w-full rounded-xl px-4 py-3 font-semibold transition active:translate-y-[1px]";

const ROLES = [
  "Student",
  "Mentor",
  "Faculty",
  "Parent",
  "Professional",
] as const;

export default function Signup() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<(typeof ROLES)[number] | "">("");
  const [state, setState] = useState("");
  const [about, setAbout] = useState("");
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const nav = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!role) {
      setMsg("Please select your role.");
      return;
    }
    if (p1 !== p2) {
      setMsg("Passwords do not match.");
      return;
    }

    setBusy(true);
    console.log("📨 Starting signup…");

    try {
      console.log("🔎 Checking providers for:", email);
      let methods: string[] = [];
      try {
        methods = await fetchSignInMethodsForEmail(auth, email);
        console.log("ℹ️ Existing sign-in methods:", methods);
      } catch (err) {
        console.warn("⚠️ fetchSignInMethodsForEmail failed (continuing):", err);
      }

      if (methods.includes("google.com")) {
        setMsg(
          "This email is registered with Google. Please use 'Continue with Google' on the login page."
        );
        return;
      }

      console.log("👤 Creating user in Firebase Auth…");
      const cred = await createUserWithEmailAndPassword(auth, email, p1);
      console.log("✅ User created:", cred.user.uid);

      console.log("📝 Updating display name…");
      await updateProfile(cred.user, { displayName: fullName });
      console.log("✅ Display name updated");

      console.log("🗄️ Creating profile in Firestore…");
      await setDoc(doc(db, "profiles", cred.user.uid), {
        uid: cred.user.uid,
        email,
        display_name: fullName,
        role,
        state,
        about,
        created_at: new Date().toISOString(),
      });
      console.log("✅ Profile document created");

      toast.success("Signed up successfully! Please sign in.");
      nav("/auth/login");
    } catch (e: any) {
      if (e?.code === "auth/email-already-in-use") {
        setMsg("This email already has an account. Try signing in instead.");
      } else if (e?.code === "permission-denied") {
        setMsg(
          "Signup almost worked, but Firestore blocked the profile save. Please publish the Firestore rules I sent, then try again."
        );
      } else {
        setMsg(`Signup error: ${e?.message || "Something went wrong"}`);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[100dvh] bg-[#0b0f24] pt-6 md:pt-8">
      <div className={card + " mt-0"}>
        <h1 className="text-2xl font-bold text-center">Join InnovativeMind</h1>
        <p className="text-center text-[#a9b1ff] mb-6">
          Fill in your details to create an account
        </p>

        <form className="space-y-4" onSubmit={submit}>
          <div>
            <label className="block mb-1 text-sm">Email *</label>
            <input
              className={input}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Full Name *</label>
            <input
              className={input}
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-sm">Role *</label>
              <select
                className={input}
                required
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
              >
                <option value="">Select your role</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm">State</label>
              <input
                className={input}
                value={state}
                onChange={(e) => setState(e.target.value)}
                autoComplete="address-level1"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm">
              About yourself (optional)
            </label>
            <textarea
              className={input}
              rows={3}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-sm">Password *</label>
              <input
                className={input}
                type="password"
                required
                value={p1}
                onChange={(e) => setP1(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Confirm Password *</label>
              <input
                className={input}
                type="password"
                required
                value={p2}
                onChange={(e) => setP2(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          </div>

          {msg && (
            <p className="text-[#ffd56b]" aria-live="polite">
              {msg}
            </p>
          )}

          <button
            className={`${btn} bg-[#5ad2c7] text-[#0b1126] disabled:opacity-60`}
            disabled={busy}
            type="submit"
          >
            {busy ? "Creating…" : "Create Account"}
          </button>

          <p className="text-center text-[#a9b1ff]">
            Already have an account?{" "}
            <Link className="text-[#5ad2c7]" to="/auth/login">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
